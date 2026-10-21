  const integrationStyles=document.createElement("style");integrationStyles.id="note-live-styles";integrationStyles.textContent="/* NOTE 4.2: compact, accessible cart suggestions and bundle choices */\n#cart-page-recommendations-section{margin-top:16px!important;padding:14px!important;border-radius:16px!important}\n#cart-page-recommendations-section h3,#cart-page-recommendations-section h2{font-size:14px!important;margin-bottom:10px!important}\n.note-compact-recs{display:flex!important;gap:10px!important;overflow-x:auto!important;scrollbar-width:thin;scroll-snap-type:none!important;padding:4px 0 8px!important;width:100%;max-width:100%;overscroll-behavior-x:contain}\n.note-mini-card{flex:0 0 152px;max-width:152px;min-width:0;background:#fafaf9;border:1px solid #e7e5e4;border-radius:12px;padding:8px;box-sizing:border-box;color:#111;text-align:right}\n.note-mini-card a{display:grid;grid-template-columns:44px 1fr;column-gap:7px;align-items:center;text-decoration:none;color:inherit}\n.note-mini-card img{width:44px;height:48px;object-fit:contain;grid-row:span 2;border-radius:6px;background:white}\n.note-mini-card span{font-size:10px;line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n.note-mini-card strong{font-size:11px;white-space:nowrap}\n.note-mini-card button{width:100%;min-height:30px;font-size:10px;border-radius:20px;background:#111;color:white;margin-top:6px;cursor:pointer}\n.note-bundle-options{margin:18px 0;padding:16px;border:1px solid #d6d3d1;border-radius:14px;clear:both;width:100%;font-size:13px}\n.note-bundle-options h3{font-weight:700;margin-bottom:12px}\n.note-bundle-options fieldset{margin:12px 0;border:0;padding:0}\n.note-bundle-options legend{font-weight:700;margin-bottom:6px}\n.note-bundle-options label{display:block;font-size:12px;margin:6px 0}\n.note-bundle-options select{display:block;width:100%;min-height:44px;background:white;color:#111;border:1px solid #a8a29e;border-radius:8px;padding:9px;margin-top:4px}\n.note-bundle-options select:focus-visible,.note-mini-card button:focus-visible{outline:2px solid #a58b52;outline-offset:3px}\n.note-empty-products{padding:16px;font-size:13px;color:#78716c}\nbutton:disabled{opacity:.5;cursor:not-allowed}\n@media(max-width:640px){.note-mini-card{flex-basis:142px;max-width:142px}#cart-page-recommendations-section{padding:10px!important}}\n@media(prefers-reduced-motion:reduce){.note-compact-recs{scroll-behavior:auto!important}}\n\nbutton[aria-label=\"\u062d\u0630\u0641 \u0627\u0644\u0645\u0646\u062a\u062c \u0645\u0646 \u0627\u0644\u0633\u0644\u0629\"]{color:#57534e!important}button[aria-label=\"\u062d\u0630\u0641 \u0627\u0644\u0645\u0646\u062a\u062c \u0645\u0646 \u0627\u0644\u0633\u0644\u0629\"]:hover{color:#be123c!important}\n";document.head.append(integrationStyles);
  // Live storefront integration. Kept separately so rebuilding templates preserves fixes.
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const liveImage = image => image?.image?.large || image?.image?.full_size || image?.image?.thumbnail || '';
  const liveMoney = value => value === null || value === undefined || value === '' ? null : (Number.isFinite(Number(value)) ? Number(value) : null);
  let liveCatalogReady = false;
  const originalCatalog = noteProductsCatalog.slice();
  // Demo products are never offered while the real catalog is loading.
  noteProductsCatalog.splice(0);
  productsData.splice(0);
  ZidSyncManager.CACHE_KEY = 'note_zid_catalog_v6';
  ZidSyncManager.CACHE_TIME_KEY = 'note_zid_catalog_time_v6';
  ZidSyncManager.loadCachedData = function() { return false; };
  ZidSyncManager.applyToCatalog = function(results) {
    if (!Array.isArray(results)) throw new Error('Invalid product catalog');
    const next = results.filter(z => z.id && liveMoney(z.price) !== null).map(z => {
      const slug = z.slug || z.id;
      // A stable Zid UUID is the only product identity. Slugs are route aliases only.
      const prior = originalCatalog.find(p => (zidSlugMap[p.id] || p.id) === slug) || {};
      const categories = z.categories || [];
      const category = categories.some(c=>/نيش/.test(c.name)) ? 'niche' : categories.some(c=>/30/.test(c.name)) ? 'travel' : categories.some(c=>/تول/.test(c.name)) ? 'tollah' : categories.some(c=>/عناية/.test(c.name)) ? 'body-care' : categories.some(c=>/باقات|مجموعات/.test(c.name)) || z.product_class==='dynamic_bundle' || z.product_class==='grouped_product' ? 'packages' : categories.some(c=>/جو|مفارش/.test(c.name)) ? 'linen' : categories.some(c=>/جسم/.test(c.name)) ? 'all-over' : 'perfumes';
      const sale = liveMoney(z.sale_price), price = liveMoney(z.price);
      const old = sale !== null && sale < price ? price : null;
      const sold = Number(z.sold_products_count) || 0;
      const entry = {...prior, id:z.id, zid_id:z.id, slug, title:z.name || '', title_en:z.name_en || '', price: sale ?? price, old_price:old,
        discount:old ? Math.round((old - sale)/old*100)+'%' : null,
        img:liveImage(z.images?.[0]), img_box:liveImage(z.images?.[1]) || null,
        cat:category, cat_ar:categories.find(c => String(c.id) === catUrlMap[category]?.split('/')[2])?.name || categories[0]?.name || '',
        category_ids:categories.map(c => String(c.id)),
        bestseller:sold > 0, sold_count:sold, tag:old ? 'خصم' : '',
        rating:Number(z.rating?.average) || 0, reviews_count:Number(z.rating?.total_count) || 0,
        in_stock:z.in_stock !== false && (z.is_infinite === true || Number(z.quantity) > 0), stock:z.is_infinite ? Infinity : Number(z.quantity),
        product_class:z.product_class, has_options:z.has_options, has_fields:z.has_fields,
        description:String(z.description || z.short_description || '').replace(/<[^>]*>/g,''), size:prior.size || '', concentration:prior.concentration || '', notes:prior.notes || '', slogan:'',
        created_at:z.created_at || ''};
      zidSlugMap[entry.id] = slug;
      return entry;
    });
    noteProductsCatalog.splice(0, noteProductsCatalog.length, ...next);
    productsData.splice(0, productsData.length, ...next);
    liveCatalogReady = true;
  };
  ZidSyncManager.fetchLiveCatalog = async function(timeoutMs=15000) {
    if (this.pending) return this.pending;
    this.pending = (async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const all = [], seen = new Set();
        let page = 1;
        while (true) {
          const response = await fetch('/api/v1/products?page_size=100&page='+page, {cache:'no-store',signal:controller.signal,headers:{Accept:'application/json'}});
          if (!response.ok) throw new Error('Catalog unavailable');
          const data = await response.json();
          if (!Array.isArray(data.results)) throw new Error('Invalid catalog response');
          data.results.forEach(p => {if (!seen.has(p.id)) {seen.add(p.id); all.push(p);}});
          if (!data.next && !(data.pages_count > page)) break;
          if (++page > 100) throw new Error('Catalog pagination limit');
        }
        this.applyToCatalog(all);
        this.lastSuccess = Date.now();
        return all;
      } catch (error) {
        console.warn('NOTE: تعذر تحديث المنتجات من زد', error.message);
        if (!liveCatalogReady) {
          document.querySelectorAll('#catalog-products-grid,#slider-bestsellers').forEach(el => {el.textContent='تعذر تحميل المنتجات. أعد المحاولة بعد قليل.';});
        }
        return null;
      } finally {clearTimeout(timer); this.pending=null;}
    })();
    return this.pending;
  };
  ZidSyncManager.refreshDomPrices = function() {
    if (!liveCatalogReady) return;
    if (NoteRouter.detectRoute().route==='product') {
      const id = NoteRouter.resolveProductId(location.pathname,new URLSearchParams(location.search));
      if (id && !document.getElementById('pdp-title')) document.getElementById('page-content').innerHTML=T.product;
      if (id) initPDP(id);
    }
    initSliders();
    if (document.getElementById('catalog-products-grid')) renderCatalog();
    CartManager.renderDrawer();
    if (document.getElementById('cart-page-items')) renderCartPage();
  };
  initSliders = function() {
    const groups = {
      'slider-bestsellers':noteProductsCatalog.filter(p => p.bestseller).sort((a,b) => b.sold_count-a.sold_count),
      'slider-niche':noteProductsCatalog.filter(p => p.cat === 'niche'),
      'slider-new':noteProductsCatalog.slice().sort((a,b) => String(b.created_at).localeCompare(String(a.created_at)))
    };
    Object.entries(groups).forEach(([id,products]) => {
      const track=document.getElementById(id);
      if (track) track.innerHTML=products.length ? products.slice(0,12).map(renderProductCard).join('') : '<p class="note-empty-products">'+(liveCatalogReady ? (id==='slider-bestsellers' ? 'لا تتوفر بيانات مبيعات لترتيب المنتجات حاليًا.' : 'لا توجد منتجات متاحة حاليًا.') : 'جاري تحميل المنتجات…')+'</p>';
    });
  };
  NoteRouter.resolveProductId = function(path, params) {
    const key=params.get('id') || decodeURIComponent(path).split('/').filter(Boolean).pop();
    const product=noteProductsCatalog.find(p => p.id===key || p.id.replace(/-/g,'')===key || p.slug===key);
    return product?.id || null;
  };
  const categoryRouteAliases={1748533:'perfumes',1500261:'niche',1759040:'niche',1697258:'bestsellers',1327929:'new',1759041:'new',1310036:'travel',1759043:'travel',1688838:'all-over',1759042:'all-over',1752110:'packages',1759047:'packages',1759085:'packages',1310037:'linen',1759044:'linen',1759045:'linen',1421002:'tollah',1750048:'body-care',1759046:'body-care'};
  const originalResolveCategory=NoteRouter.resolveCategory;
  NoteRouter.resolveCategory=function(path,params) {
    const categoryId=decodeURIComponent(path).match(/\/categor(?:y|ies)\/(\d+)/)?.[1];
    return params.get('cat') || categoryRouteAliases[categoryId] || originalResolveCategory.call(this,path,params);
  };
  const originalNavigate=NoteRouter.navigate;
  NoteRouter.navigate = function(url) {
    if (/^\/(checkout|auth|account)(\/|\?|$)/.test(url)) {location.href=url; return;}
    return originalNavigate.call(this,url);
  };
  const originalPDP=initPDP;
  let bundleRequest=0, activeBundleGroups=[], activeBundleSelections=[];
  initPDP = function(id) {
    const savedChoices=currentProduct?.id===id ? [...document.querySelectorAll("#note-bundle-options select")].map(select=>({group:select.dataset.group,value:select.value})) : [];
    const product=noteProductsCatalog.find(p => p.id===id);
    if (!product) {
      const content=document.getElementById('page-content');
      if (content) content.innerHTML='<main class="pt-32 p-8 text-center"><p>'+ (liveCatalogReady ? 'المنتج غير متاح حاليًا.' : 'جاري تحميل المنتج…')+'</p></main>';
      return;
    }
    originalPDP(id);
    activeBundleGroups=[]; activeBundleSelections=[];
    const token=++bundleRequest;
    const tag=document.getElementById('pdp-tag-badge');if(tag) tag.hidden=!product.tag;
    const old=document.getElementById('pdp-old-price'); if (old) old.hidden=!product.old_price;
    const discount=document.getElementById('pdp-discount-badge'); if (discount) discount.hidden=!product.discount;
    const rating=document.getElementById('pdp-rating-num'); if (rating) rating.textContent=product.reviews_count ? product.rating : 'لا توجد تقييمات';
    const count=document.getElementById('pdp-rating-count'); if (count) count.textContent='('+product.reviews_count+' تقييم)';
    const description=document.getElementById('pdp-full-description'); if(description) description.textContent=product.description;
    document.querySelectorAll('button[onclick*="addToCartCurrentProduct"],button[onclick*="buyNowCurrentProduct"]').forEach(b => {b.disabled=!product.in_stock; if(!product.in_stock) b.textContent='نفدت الكمية';});
    if (product.product_class==='dynamic_bundle') {
      const box=document.createElement('section'); box.id='note-bundle-options'; box.className='note-bundle-options'; box.textContent='جاري تحميل اختيارات الباقة…';
      document.getElementById('pdp-price')?.parentElement?.after(box);
      fetch('/api/v1/products/'+product.zid_id+'/selection-groups',{cache:'no-store',headers:{Accept:'application/json'}}).then(r => {if(!r.ok) throw Error();return r.json();}).then(groups => {
        if(token!==bundleRequest || currentProduct?.id!==id || !box.isConnected) return;
        if(!Array.isArray(groups) || !groups.length) throw Error();
        activeBundleGroups=groups;
        box.innerHTML='<h3>اختار مكونات الباقة</h3>';
        groups.forEach(group => {
          const fieldset=document.createElement('fieldset'),legend=document.createElement('legend');
          legend.textContent=group.name+' — اختر '+group.required_selection_count; fieldset.append(legend);
          const selects=[];
          for(let slot=0;slot<group.required_selection_count;slot++) {
            const label=document.createElement('label'),select=document.createElement('select');
            label.textContent=group.required_selection_count>1 ? 'الاختيار '+(slot+1) : group.name;
            select.required=true; select.dataset.group=group.selection_group_id; select.setAttribute('aria-label',label.textContent);
            select.add(new Option('اختر المنتج',''));
            group.items.forEach(item => {
              // Variant-bearing bundle components require their native configuration.
              if(item.variants?.length || item.options?.length) return;
              const option=new Option(item.name,item.item_id);
              option.disabled=!(item.is_infinite || item.quantity>0);
              if(option.disabled) option.textContent+=' — نفدت الكمية';
              select.add(option);
            });
            if(group.items.length===1 && Number(group.required_selection_count)===1 && !select.options[1]?.disabled) select.value=group.items[0].item_id;
            const priorChoice=savedChoices.filter(c=>c.group===group.selection_group_id)[slot];
            if(priorChoice && [...select.options].some(o=>o.value===priorChoice.value && !o.disabled)) select.value=priorChoice.value;
            select.onchange=() => {selects.forEach(s => [...s.options].forEach(o => {const item=group.items.find(i=>i.item_id===o.value); if(item) o.disabled=!(item.is_infinite || item.quantity>0) || (!group.allow_duplicate_items && selects.some(other=>other!==s && other.value===o.value));}));};
            label.append(select);fieldset.append(label);selects.push(select);
          }
          box.append(fieldset);
        });
      }).catch(() => {if(box.isConnected) box.textContent='تعذر تحميل اختيارات الباقة، حاول تحديث الصفحة.';});
    }
  };
  function collectBundleSelections(product) {
    if(product.product_class!=='dynamic_bundle') return [];
    if(!activeBundleGroups.length) throw Error('انتظر تحميل اختيارات الباقة');
    const selections=[];
    activeBundleGroups.forEach(group => {
      const fields=[...document.querySelectorAll('#note-bundle-options select')].filter(s => s.dataset.group===group.selection_group_id);
      const values=fields.map(s=>s.value);
      if(values.length!==Number(group.required_selection_count) || values.some(v=>!v)) throw Error('اختار كل مكونات الباقة أولًا');
      if(!group.allow_duplicate_items && new Set(values).size!==values.length) throw Error('اختر منتجات مختلفة لهذه المجموعة');
      values.forEach(value => {
        const item=group.items.find(i=>i.item_id===value);
        if(!item || !(item.is_infinite || item.quantity>0)) throw Error('أحد الاختيارات غير متاح');
        const existing=selections.find(s=>s.id===value && s.selection_group_id===group.selection_group_id);
        if(existing) existing.quantity++;
        else selections.push({id:value,quantity:1,selection_group_id:group.selection_group_id,name:item.name});
      });
    });
    return selections;
  }
  const rawGetCart=CartManager.getCart;
  CartManager.getCart=function() {
    return rawGetCart.call(this).map(item => {
      const p=noteProductsCatalog.find(p=>p.id===(item.product_id || item.id) || p.slug===item.id || ZID_PRODUCT_MAP[item.id]===p.id);
      return p ? {...item,product_id:p.id,title:p.title,price:p.price,old_price:p.old_price,img:p.img,size:(item.sub_items?.map(s=>(s.quantity>1 ? s.quantity+' × ' : '')+s.name).join('، ')) || p.size,available:p.in_stock} : {...item,available:false};
    });
  };
  CartManager.addItem=function(id,quantity=1,selections) {
    const p=noteProductsCatalog.find(p=>p.id===id);
    if(!p || !liveCatalogReady) {this.showToast('انتظر تحميل المنتجات من زد');return false;}
    if(!p.in_stock) {this.showToast('هذا المنتج غير متاح حاليًا');return false;}
    if(p.has_options || p.has_fields) {this.showToast('يرجى اختيار تفاصيل المنتج من صفحته الأصلية');location.href='/products/'+encodeURIComponent(p.slug)+'?native=1';return false;}
    if(p.product_class==='dynamic_bundle' && !selections) {NoteRouter.navigate('/products/'+p.slug);return false;}
    const sub=selections || [], sorted=sub.slice().sort((a,b)=>(a.selection_group_id+a.id).localeCompare(b.selection_group_id+b.id));
    const key=p.id+(sorted.length ? '-'+encodeURIComponent(JSON.stringify(sorted.map(({id,quantity,selection_group_id})=>({id,quantity,selection_group_id})))) : '');
    const cart=this.getCart(),existing=cart.find(i=>i.id===key);
    if(existing) existing.quantity+=quantity;
    else cart.push({id:key,product_id:p.id,title:p.title,price:p.price,old_price:p.old_price,img:p.img,size:sub.map(s=>(s.quantity>1 ? s.quantity+' × ' : '')+s.name).join('، ') || p.size,quantity,sub_items:sub});
    this.saveCart(cart);this.showToast('تمت إضافة '+escapeHTML(p.title)+' إلى سلتك');this.openDrawer();return true;
  };
  addToCartCurrentProduct=function() {try {return currentProduct && CartManager.addItem(currentProduct.id,pdpQuantity,collectBundleSelections(currentProduct));} catch(e) {CartManager.showToast(e.message);return false;}};
  buyNowCurrentProduct=function() {if(addToCartCurrentProduct()) {CartManager.closeDrawer();NoteRouter.navigate('/cart');}};
  let recAnimation;
  function compactRecommendations(cart,target,section) {
    const grid=document.getElementById(target),box=document.getElementById(section); if(!grid || !box) return;
    const inCart=new Set(cart.map(i=>i.product_id || i.id));
    const recs=noteProductsCatalog.filter(p=>p.in_stock && !inCart.has(p.id)).slice(0,10);
    box.classList.toggle('hidden',!cart.length || !recs.length);grid.className='note-compact-recs';grid.dir='ltr';
    grid.innerHTML=recs.map(p=>'<article dir="rtl" class="note-mini-card"><a href="/products/'+encodeURIComponent(p.slug)+'"><img src="'+escapeHTML(p.img)+'" alt="'+escapeHTML(p.title)+'"><span>'+escapeHTML(p.title)+'</span><strong>'+p.price+' ر.س</strong></a><button type="button" data-product="'+p.id+'">'+(p.product_class==='dynamic_bundle' ? 'اختار الباقة' : 'أضف')+'</button></article>').join('');
    grid.querySelectorAll('button').forEach(b=>b.onclick=()=>CartManager.addItem(b.dataset.product));
    grid.dataset.pause='';let direction=1;
    grid.onmouseenter=()=>grid.dataset.pause='1';grid.onmouseleave=()=>grid.dataset.pause='';grid.onfocusin=()=>grid.dataset.pause='1';grid.onfocusout=()=>grid.dataset.pause='';grid.onpointerdown=()=>grid.dataset.pause='1';grid.onpointerup=()=>grid.dataset.pause='';
    if(target==='cart-page-recs-grid') {
      clearInterval(recAnimation);
      recAnimation=setInterval(()=>{if(!grid.isConnected){clearInterval(recAnimation);return;}if(grid.dataset.pause || document.hidden || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const max=grid.scrollWidth-grid.clientWidth;if(max<=0)return;
        if(grid.scrollLeft>=max-1)direction=-1;if(grid.scrollLeft<=0)direction=1;grid.scrollLeft+=direction;
      },35);
    }
  }
  renderCartPageRecommendations=cart=>compactRecommendations(cart,'cart-page-recs-grid','cart-page-recommendations-section');
  updateCheckoutUpsell=function() {document.getElementById('checkout-upsell-card')?.classList.add('hidden');};
  const originalDrawer=CartManager.renderDrawer;
  CartManager.renderDrawer=function() {originalDrawer.call(this);compactRecommendations(this.getCart(),'cart-drawer-recs-list','cart-drawer-recommendations');};
  // Refresh on return to the tab and every minute, including name/image changes.
  document.addEventListener('visibilitychange',()=>{if(!document.hidden && Date.now()-(ZidSyncManager.lastSuccess || 0)>30000) ZidSyncManager.fetchLiveCatalog().then(()=>ZidSyncManager.refreshDomPrices());});
  setInterval(()=>{if(!document.hidden) ZidSyncManager.fetchLiveCatalog().then(()=>ZidSyncManager.refreshDomPrices());},60000);
  function assertCartResponse(response) {
    if(response?.status==='error' || response?.status==='failed' || response?.success===false || response?.data?.status==='error') throw Error(response?.message || response?.data?.message || 'تعذر تحديث السلة في زد');
    return response;
  }
  function nativeCartItems(response) {
    assertCartResponse(response);
    const data=response?.data || response;
    const items=data?.cart?.products || data?.cart?.items || data?.products || data?.items;
    if(!Array.isArray(items)) throw Error('تعذر قراءة السلة من زد. أعد المحاولة.');
    return items;
  }
  let checkoutBusy=false;
  proceedToCheckout=async function() {
    if(checkoutBusy) return;
    checkoutBusy=true;
    try {
      const refreshed=await ZidSyncManager.fetchLiveCatalog();
      if(!refreshed) throw Error('تعذر التحقق من الأسعار الحالية. حاول مرة أخرى.');
      const cart=CartManager.getCart();
      if(!cart.length) throw Error('السلة فارغة');
      const api=window.zid?.cart;
      if(!api?.addProduct || !api?.get || !api?.updateProduct) throw Error('خدمة سلة زد غير جاهزة. حدّث الصفحة وحاول مجددًا.');
      let native=nativeCartItems(await api.get());
      for(const item of cart) {
        const p=noteProductsCatalog.find(p=>p.id===item.product_id);
        if(!p || !p.in_stock || item.quantity>p.stock) throw Error('راجع توفر وكمية '+item.title);
        if(p.product_class==='dynamic_bundle' && !item.sub_items?.length) throw Error('اختار مكونات '+p.title+' من صفحة المنتج');
        // A saved cart-line ID makes retries update quantity instead of duplicating additions.
        let line=item.native_line_id && native.find(n=>String(n.id)===String(item.native_line_id));
        if(!line && !item.sub_items?.length) line=native.find(n=>(n.product_id || n.product?.id)===p.id && !n.sub_items?.length);
        if(line) assertCartResponse(await api.updateProduct({product_id:line.id,quantity:item.quantity}));
        else {
          const before=new Set(native.map(n=>String(n.id)));
          const response=assertCartResponse(await api.addProduct({product_id:p.id,quantity:item.quantity,...(item.sub_items?.length ? {sub_items:item.sub_items.map(({id,quantity,selection_group_id})=>({id,quantity,selection_group_id}))} : {})}));
          native=nativeCartItems(await api.get());
          line=native.find(n=>!before.has(String(n.id)) && (n.product_id || n.product?.id)===p.id) || native.find(n=>String(n.id)===String(response?.data?.item?.id || response?.item?.id));
          if(!line) throw Error('تم تحديث زد؛ تعذر تأكيد سطر المنتج. راجع السلة قبل إعادة المحاولة.');
        }
        item.native_line_id=line.id;
        CartManager.saveCart(cart);
      }
      location.href='/checkout';
    } catch(error) {CartManager.showToast(escapeHTML(error.message));}
    finally {checkoutBusy=false;}
  };
  const originalRemove=CartManager.removeItem, originalUpdateQuantity=CartManager.updateQuantity;
  CartManager.removeItem=async function(key) {
    const item=this.getCart().find(i=>i.id===key);
    try {
      if(item?.native_line_id) assertCartResponse(await window.zid.cart.removeProduct({product_id:item.native_line_id}));
      originalRemove.call(this,key);
    } catch(e) {this.showToast('تعذر حذف المنتج من زد. حاول مجددًا.');}
  };
  CartManager.updateQuantity=async function(key,delta) {
    const item=this.getCart().find(i=>i.id===key);if(!item)return;
    if(item.quantity+delta<=0) return this.removeItem(key);
    const p=noteProductsCatalog.find(p=>p.id===item.product_id);
    if(delta>0 && (!p?.in_stock || item.quantity+delta>p.stock)) {this.showToast('الكمية المطلوبة غير متاحة');return;}
    try {
      if(item.native_line_id) assertCartResponse(await window.zid.cart.updateProduct({product_id:item.native_line_id,quantity:item.quantity+delta}));
      originalUpdateQuantity.call(this,key,delta);
    } catch(e) {this.showToast('تعذر تعديل الكمية في زد. حاول مجددًا.');}
  };
