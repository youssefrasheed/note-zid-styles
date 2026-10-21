  const integrationStyles=document.createElement("style");integrationStyles.id="note-live-styles";integrationStyles.textContent="/* NOTE 4.3: High-Visibility Cart Items, Micro-Compact Recommendations & Seamless Zid Loader */\n#cart-drawer{display:flex!important;flex-direction:column!important;height:100vh!important;height:100dvh!important;max-height:100dvh!important;overflow:hidden!important}\n#cart-drawer-items{flex:1 1 auto!important;overflow-y:auto!important;min-height:160px!important;max-height:calc(100dvh - 280px)!important;padding:12px 16px!important;overscroll-behavior:contain!important;-webkit-overflow-scrolling:touch!important}\n.note-cart-item{display:flex!important;align-items:center!important;gap:12px!important;padding:10px 12px!important;margin-bottom:8px!important;background:#ffffff!important;border:1px solid #f0eee9!important;border-radius:14px!important;box-shadow:0 1px 3px rgba(0,0,0,0.03)!important;text-align:right!important}\n#cart-drawer-recommendations{padding:4px 14px 6px!important;margin:0!important;background:#fafaf9!important;border-top:1px solid #f0eee9!important;border-bottom:1px solid #f0eee9!important;flex-shrink:0!important}\n#cart-drawer-recommendations h3,#cart-drawer-recommendations h2,#cart-drawer-recommendations .flex>span:last-child{display:none!important}#cart-drawer-recommendations .note-recs-title{font-size:10px!important;font-weight:700!important;color:#57534e!important;margin-bottom:4px!important}\n.note-compact-recs{display:flex!important;gap:8px!important;overflow-x:auto!important;scrollbar-width:none!important;scroll-snap-type:none!important;padding:2px 0 4px!important;width:100%!important;max-width:100%!important;overscroll-behavior-x:contain!important;-webkit-overflow-scrolling:touch!important}\n.note-compact-recs::-webkit-scrollbar{display:none!important}\n.note-mini-card{flex:0 0 auto!important;width:auto!important;max-width:175px!important;min-width:135px!important;height:38px!important;display:inline-flex!important;align-items:center!important;justify-content:space-between!important;gap:6px!important;padding:3px 6px 3px 4px!important;background:#ffffff!important;border:1px solid #e7e5e4!important;border-radius:9999px!important;box-sizing:border-box!important;box-shadow:0 1px 2px rgba(0,0,0,0.02)!important;color:#111!important;text-align:right!important}\n.note-mini-card a{display:inline-flex!important;align-items:center!important;gap:6px!important;text-decoration:none!important;color:inherit!important;min-width:0!important;flex:1 1 auto!important}\n.note-mini-card img{width:28px!important;height:28px!important;object-fit:contain!important;border-radius:9999px!important;background:#fafaf9!important;flex-shrink:0!important}\n.note-mini-card .note-mini-info{display:flex!important;flex-direction:column!important;min-width:0!important;line-height:1.15!important}\n.note-mini-card .note-mini-title{font-size:9.5px!important;font-weight:700!important;color:#111!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;max-width:65px!important;display:block!important}\n.note-mini-card .note-mini-price{font-size:9.5px!important;font-weight:800!important;color:#a58b52!important;white-space:nowrap!important;display:block!important}\n.note-mini-card button{flex-shrink:0!important;width:auto!important;min-width:32px!important;height:24px!important;padding:0 7px!important;font-size:9.5px!important;font-weight:700!important;border-radius:9999px!important;background:#111111!important;color:#ffffff!important;margin:0!important;border:none!important;cursor:pointer!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;transition:background 0.15s,transform 0.15s!important}\n.note-mini-card button:hover{background:#333333!important}\n.note-mini-card button:active{transform:scale(0.92)!important}\n#cart-drawer-footer{padding:12px 16px 14px!important;border-top:1px solid #f0eee9!important;background:#ffffff!important;flex-shrink:0!important}\n#cart-page-recommendations-section{margin-top:20px!important;padding:14px!important;border-radius:16px!important}\n#cart-page-recommendations-section h3,#cart-page-recommendations-section h2{font-size:13px!important;margin-bottom:8px!important}\n.note-bundle-options{margin:18px 0;padding:16px;border:1px solid #d6d3d1;border-radius:14px;clear:both;width:100%;font-size:13px}\n.note-bundle-options h3{font-weight:700;margin-bottom:12px}\n.note-bundle-options fieldset{margin:12px 0;border:0;padding:0}\n.note-bundle-options legend{font-weight:700;margin-bottom:6px}\n.note-bundle-options label{display:block;font-size:12px;margin:6px 0}\n.note-bundle-options select{display:block;width:100%;min-height:44px;background:white;color:#111;border:1px solid #a8a29e;border-radius:8px;padding:9px;margin-top:4px}\n.note-bundle-options select:focus-visible,.note-mini-card button:focus-visible{outline:2px solid #a58b52;outline-offset:3px}\n.note-empty-products{padding:16px;font-size:13px;color:#78716c}\nbutton:disabled{opacity:.5;cursor:not-allowed}\n@media(prefers-reduced-motion:reduce){.note-compact-recs{scroll-behavior:auto!important}}\nbutton[aria-label=\"حذف المنتج من السلة\"]{color:#78716c!important;transition:color 0.15s ease!important}\nbutton[aria-label=\"حذف المنتج من السلة\"]:hover{color:#be123c!important}\n#loader-container{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;z-index:9999999!important;background:#ffffff!important;display:flex!important;align-items:center!important;justify-content:center!important;transition:opacity 0.4s ease-out,visibility 0.4s ease-out!important}\n#loader-container.note-loader-dismissed{opacity:0!important;visibility:hidden!important;pointer-events:none!important}\nbody:not(.note-ready) section[section-id],body:not(.note-ready) .tp-home,body:not(.note-ready) .tp-bar-header,body:not(.note-ready) header.header-nav,body:not(.note-ready) footer:not(#note-store-footer){display:none!important;visibility:hidden!important}\n";document.head.append(integrationStyles);

  // Zid Loader Preservation & Seamless Dismissal
  const zidLoader=document.getElementById('loader-container');
  if(zidLoader){
    zidLoader._origRemove=zidLoader.remove;
    zidLoader.remove=function(){};
  }
  function dismissZidLoader(){
    const loader=document.getElementById('loader-container');
    if(!loader)return;
    loader.classList.add('note-loader-dismissed');
    loader.style.transition='opacity 0.4s ease-out';
    loader.style.opacity='0';
    loader.style.pointerEvents='none';
    setTimeout(()=>{
      try{
        if(loader._origRemove)loader._origRemove.call(loader);
        else if(loader.parentElement)loader.parentElement.removeChild(loader);
        else loader.remove();
      }catch(e){}
    },450);
  }
  window.dismissZidLoader=dismissZidLoader;
  setTimeout(dismissZidLoader,2500);

  // Live storefront integration. Kept separately so rebuilding templates preserves fixes.
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const liveImage = image => image?.image?.large || image?.image?.full_size || image?.image?.thumbnail || '';
  const liveMoney = value => value === null || value === undefined || value === '' ? null : (Number.isFinite(Number(value)) ? Number(value) : null);
  let liveCatalogReady = true;
  const originalCatalog = noteProductsCatalog.slice();
  ZidSyncManager.CACHE_KEY = 'note_zid_catalog_v6';
  ZidSyncManager.CACHE_TIME_KEY = 'note_zid_catalog_time_v6';
  ZidSyncManager.loadCachedData = function() {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length) {
          this.applyToCatalog(parsed);
          return true;
        }
      }
    } catch(e) {}
    return false;
  };
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
        img:liveImage(z.images?.[0]) || prior.img || '', img_box:liveImage(z.images?.[1]) || prior.img_box || null,
        cat:category, cat_ar:categories.find(c => String(c.id) === catUrlMap[category]?.split('/')[2])?.name || categories[0]?.name || prior.cat_ar || '',
        category_ids:categories.map(c => String(c.id)),
        bestseller:sold > 0, sold_count:sold, tag:old ? 'خصم' : (prior.tag || ''),
        rating:Number(z.rating?.average) || prior.rating || 0, reviews_count:Number(z.rating?.total_count) || prior.reviews_count || 0,
        in_stock:z.in_stock !== false && (z.is_infinite === true || Number(z.quantity) > 0), stock:z.is_infinite ? Infinity : Number(z.quantity),
        product_class:z.product_class, has_options:z.has_options, has_fields:z.has_fields,
        description:String(z.description || z.short_description || '').replace(/<[^>]*>/g,'') || prior.description || '', size:prior.size || '100 مل', concentration:prior.concentration || '', notes:prior.notes || '', slogan:'',
        created_at:z.created_at || ''};
      zidSlugMap[entry.id] = slug;
      return entry;
    });
    noteProductsCatalog.splice(0, noteProductsCatalog.length, ...next);
    productsData.splice(0, productsData.length, ...next);
    liveCatalogReady = true;
    try { localStorage.setItem(this.CACHE_KEY, JSON.stringify(results)); } catch(e) {}
  };
  ZidSyncManager.loadCachedData();
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
        if (!liveCatalogReady && !noteProductsCatalog.length) {
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
              if(item.variants?.length || item.options?.length) return;
              const option=new Option(item.name,item.item_id);
              option.disabled=!(item.is_infinite || item.quantity>0);
              if(option.disabled) option.textContent+=' — نفدت الكمية';
              select.add(option);
            });
            if(group.items.length===1 && Number(group.required_selection_count)===1 && !select.options[1]?.disabled) select.value=group.items[0].item_id;
            const priorChoice=savedChoices.filter(c=>c.group===group.selection_group_id)[slot]?.value;
            if(priorChoice && [...select.options].some(o=>o.value===priorChoice && !o.disabled)) select.value=priorChoice;
            selects.push(select);
            fieldset.append(label,select);
          }
          if(!group.allow_duplicate_items && selects.length>1) {
            const syncOptions=()=>{
              const chosen=new Set(selects.map(s=>s.value).filter(Boolean));
              selects.forEach(s=>{
                [...s.options].forEach(o=>{
                  if(!o.value) return;
                  const item=group.items.find(i=>i.item_id===o.value);
                  const outOfStock=!(item?.is_infinite || item?.quantity>0);
                  o.disabled=outOfStock || (chosen.has(o.value) && s.value!==o.value);
                  o.textContent=item?.name ? item.name + (outOfStock ? ' — نفدت الكمية' : chosen.has(o.value) && s.value!==o.value ? ' — تم اختياره' : '') : o.textContent;
                });
              });
            };
            selects.forEach(s=>s.addEventListener('change',syncOptions));
            syncOptions();
          }
          box.append(fieldset);
        });
      }).catch(()=>{if(box.isConnected) box.textContent='تعذر تحميل اختيارات الباقة. أعد المحاولة بعد قليل.';});
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
  CartManager.updateBadge=function() {
    const count=String(this.getCount ? this.getCount() : (this.getCart().reduce((sum, item) => sum + (item.quantity || 1), 0)));
    const badges=document.querySelectorAll('.cart-badge, .cart-badge-count, #cart-counter-badge, [class*="cart-badge"], .cart-sm .cart-badge, .cart-btn .cart-badge');
    badges.forEach(b => {
      if (b.textContent !== count) {
        b.textContent = count;
      }
      if (count !== '0') {
        b.style.display = 'inline-flex';
      }
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
    let targetItem;
    if(existing) {
      existing.quantity+=quantity;
      targetItem=existing;
    } else {
      targetItem={id:key,product_id:p.id,title:p.title,price:p.price,old_price:p.old_price,img:p.img,size:sub.map(s=>(s.quantity>1 ? s.quantity+' × ' : '')+s.name).join('، ') || p.size,quantity,sub_items:sub};
      cart.push(targetItem);
    }
    this.saveCart(cart);
    this.updateBadge();
    const badge=document.getElementById('cart-counter-badge');
    if(badge) {
      badge.classList.remove('scale-125');
      void badge.offsetWidth;
      badge.classList.add('scale-125');
      setTimeout(()=>badge.classList.remove('scale-125'), 250);
    }
    this.showToast('تمت إضافة '+escapeHTML(p.title)+' إلى سلتك');

    // Background live sync with Zid's native cart API
    if (typeof window !== 'undefined' && window.zid?.cart?.addProduct) {
      (async () => {
        try {
          const payload = {
            product_id: p.id,
            quantity: quantity,
            ...(sub.length ? { sub_items: sub.map(({id, quantity, selection_group_id}) => ({id, quantity, selection_group_id})) } : {})
          };
          const res = await window.zid.cart.addProduct(payload);
          const lineId = res?.data?.item?.id || res?.item?.id;
          if (lineId) {
            const currentCart = CartManager.getCart();
            const it = currentCart.find(i => i.id === key);
            if (it) {
              it.native_line_id = lineId;
              CartManager.saveCart(currentCart);
            }
          }
        } catch(e) {
          console.warn('NOTE: background Zid cart sync note:', e?.message || e);
        }
      })();
    }
    return true;
  };
  const originalShowToast = CartManager.showToast;
  CartManager.showToast = function(msg) {
    if (typeof originalShowToast === 'function') {
      try { originalShowToast.call(this, msg); } catch(e) {}
    }
    const toast = document.getElementById('global-toast') || document.getElementById('cart-toast');
    if (toast && toast.classList) {
      toast.classList.remove('-translate-y-24', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    }
  };
  addToCartCurrentProduct=function() {try {return currentProduct && CartManager.addItem(currentProduct.id,pdpQuantity,collectBundleSelections(currentProduct));} catch(e) {CartManager.showToast(e.message);return false;}};
  buyNowCurrentProduct=function() {if(addToCartCurrentProduct()) {CartManager.closeDrawer();NoteRouter.navigate('/cart');}};
  let recAnimation;
  function compactRecommendations(cart,target,section) {
    const grid=document.getElementById(target),box=document.getElementById(section); if(!grid || !box) return;
    const inCart=new Set(cart.map(i=>i.product_id || i.id));
    const recs=noteProductsCatalog.filter(p=>p.in_stock && !inCart.has(p.id)).slice(0,10);
    box.classList.toggle('hidden',!cart.length || !recs.length);
    grid.className='note-compact-recs';
    grid.dir='ltr';
    grid.innerHTML=recs.map(p=>`
      <article dir="rtl" class="note-mini-card">
        <a href="/products/${encodeURIComponent(p.slug)}" onclick="NoteRouter.navigate('/products/${encodeURIComponent(p.slug)}'); CartManager.closeDrawer();">
          <img src="${escapeHTML(p.img)}" alt="${escapeHTML(p.title)}" loading="lazy">
          <div class="note-mini-info">
            <span class="note-mini-title">${escapeHTML(p.title)}</span>
            <strong class="note-mini-price">${p.price} ر.س</strong>
          </div>
        </a>
        <button type="button" data-product="${p.id}" aria-label="أضف ${escapeHTML(p.title)} للسلة">${p.product_class==='dynamic_bundle' ? 'اختار' : 'أضف'}</button>
      </article>
    `).join('');
    grid.querySelectorAll('button').forEach(b=>b.onclick=(e)=>{
      e.stopPropagation();
      CartManager.addItem(b.dataset.product);
    });
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

  if (typeof document !== 'undefined') {
    document.addEventListener('click', function(e) {
      const btn = e.target?.closest?.('.cart-sm a, .cart-btn a, a[href*="/cart/view"], a[href="/cart"], [data-action="open-cart"]');
      if (btn && !btn.getAttribute?.('href')?.includes('/checkout')) {
        e.preventDefault?.();
        e.stopPropagation?.();
        CartManager.openDrawer();
      }
    }, true);

    CartManager.updateBadge();
    if (typeof MutationObserver !== 'undefined' && document.body) {
      const badgeObserver = new MutationObserver(() => {
        CartManager.updateBadge();
      });
      badgeObserver.observe(document.body, { childList: true, subtree: true });
    }
    if (typeof setInterval !== 'undefined') {
      setInterval(() => {
        CartManager.updateBadge();
      }, 1200);
    }

    const getNavCategory = function(link) {
      if (!link) return null;
      if (link.dataset && link.dataset.cat) return link.dataset.cat;
      const text = (link.textContent || '').trim();
      const href = link.getAttribute('href') || '';
      if (text === 'الرئيسية' || href === '/' || href === '') return 'home';
      if (text.includes('جميع المنتجات') || href === '/categories' || href === '/products' || href.includes('cat=all')) return 'all';
      if (text.includes('النيش') || href.includes('1500261') || href.includes('1759040') || href.includes('niche')) return 'niche';
      if (text.includes('الأكثر مبيع') || text.includes('الأكثر مبيعا') || href.includes('1697258') || href.includes('bestseller')) return 'bestsellers';
      if (text.includes('أحدث المنتجات') || text.includes('جديد') || href.includes('1327929') || href.includes('1759041') || href.includes('new')) return 'new';
      if (text.includes('العطور') || href.includes('1748533') || href.includes('perfumes')) return 'perfumes';
      if (text.includes('30') || href.includes('1310036') || href.includes('1759043') || href.includes('travel')) return 'travel';
      if (text.includes('جسم') || href.includes('1688838') || href.includes('1759042') || href.includes('all-over')) return 'all-over';
      if (text.includes('باقات') || text.includes('مجموعات') || href.includes('1752110') || href.includes('1759047') || href.includes('packages')) return 'packages';
      if (text.includes('مفارش') || href.includes('1310037') || href.includes('1759044') || href.includes('linen')) return 'linen';
      if (text.includes('تول') || href.includes('1421002') || href.includes('tollah')) return 'tollah';
      if (text.includes('عناية') || href.includes('1750048') || href.includes('1759046') || href.includes('body')) return 'body-care';
      return null;
    };

    const syncActiveNavLine = function(targetKey) {
      let key = targetKey;
      if (!key && typeof NoteRouter !== 'undefined' && NoteRouter.detectRoute) {
        const d = NoteRouter.detectRoute();
        key = d.route === 'home' ? 'home' : (d.route === 'category' ? (d.cat || 'all') : null);
      }
      const navLinks = document.querySelectorAll('#nav-links a, header nav a');
      navLinks.forEach(link => {
        const lCat = getNavCategory(link);
        const isMatch = key && (lCat === key);
        if (isMatch) {
          link.classList.add('border-b-2', 'border-current', 'active-link');
          link.style.borderBottom = '2px solid currentColor';
        } else {
          link.classList.remove('border-b-2', 'border-current', 'active-link');
          link.style.borderBottom = '2px solid transparent';
        }
      });
    };

    document.addEventListener('click', function(e) {
      const link = e.target?.closest?.('#nav-links a, header nav a');
      if (link) {
        const cat = getNavCategory(link);
        if (cat) {
          syncActiveNavLine(cat);
        }
      }
    }, true);

    if (typeof selectCategory === 'function') {
      const originalSelectCat = selectCategory;
      selectCategory = function(cat, updateURL) {
        originalSelectCat(cat, updateURL);
        syncActiveNavLine(cat || 'all');
      };
    }
  }
