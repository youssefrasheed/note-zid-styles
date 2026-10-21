#!/usr/bin/env python3
import os
import re
import json

ASSET_HOST = "https://youssefrasheed.github.io/note-zid-styles"

SRC_HTML = "/Users/yousefsoom/.gemini/antigravity/scratch/zid-store-preview/index.html"
SRC_PRODUCTS = "/Users/yousefsoom/.gemini/antigravity/scratch/zid-store-preview/products-data.js"
OUT_JS = "/Users/yousefsoom/note-zid-styles/note-app.js"
OUT_CSS = "/Users/yousefsoom/note-zid-styles/note.css"

with open(SRC_HTML, "r", encoding="utf-8") as f:
    html = f.read()

with open(SRC_PRODUCTS, "r", encoding="utf-8") as f:
    products_code = f.read()

# 1. Extract Fonts CSS
fonts_css = ""
for m in re.finditer(r"<style>(.*?)</style>", html, re.DOTALL):
    fonts_css += m.group(1).strip() + "\n"

# 2. Extract HTML markup
header_pos = html.find("<!-- ================= 1. HEADER / NAVIGATION")
script_pos = html.find("<!-- ================= 12. STORE JAVASCRIPT ================= -->")
drawer_pos = html.find("<!-- ================= UNIVERSAL SLIDE-OUT CART DRAWER ================= -->")
drawer_end = html.rfind('<script src="/products-data.js')

main_body = html[header_pos:script_pos].strip()
drawer_part = html[drawer_pos:drawer_end].strip()

total_markup = main_body + "\n" + drawer_part

# URL replacements
url_replacements = [
    (r'<footer class="w-full pt-16', '<footer id="note-store-footer" class="w-full pt-16'),
    (r'src="/assets/', f'src="{ASSET_HOST}/assets/'),
    (r'srcset="/assets/', f'srcset="{ASSET_HOST}/assets/'),
    (r'src="/products/', f'src="{ASSET_HOST}/products/'),
    (r'srcset="/products/', f'srcset="{ASSET_HOST}/products/'),
    (r'src="/logo_white_crisp.png"', f'src="{ASSET_HOST}/logo_white_crisp.png"'),
    (r'src="/logo_dark_crisp.png"', f'src="{ASSET_HOST}/logo_dark_crisp.png"'),
    # Official Category URLs on Zid
    (r'href="/category\.html\?cat=all"', 'href="/categories"'),
    (r'href="/category\.html\?cat=perfumes"', 'href="/categories/1748533/perfumes"'),
    (r'href="/category\.html\?cat=niche"', 'href="/categories/1500261/عطور-النيش"'),
    (r'href="/category\.html\?cat=bestsellers"', 'href="/categories/1697258/الأكثر-مبيعا"'),
    (r'href="/category\.html\?cat=new"', 'href="/categories/1327929/newest-products"'),
    (r'href="/category\.html\?cat=travel"', 'href="/categories/1310036/30ml-perfumes"'),
    (r'href="/category\.html\?cat=all-over"', 'href="/categories/1688838/all-over-spray"'),
    (r'href="/category\.html\?cat=packages"', 'href="/categories/1752110/packages"'),
    (r'href="/category\.html\?cat=linen"', 'href="/categories/1310037/معطرات-جو-وجسم"'),
    (r'href="/category\.html\?cat=tollah"', 'href="/categories/1421002/tollah"'),
    (r'href="/category\.html\?cat=bodycare"', 'href="/categories/1750048/body-care-products"'),
    (r'href="/cart\.html"', 'href="/cart"'),
]

for pattern, repl in url_replacements:
    total_markup = re.sub(pattern, repl, total_markup)

# 3. Extract productsData from index.html
pdata_match = re.search(r'const productsData = \[(.*?)\];\s*// Helper to generate', html, re.DOTALL)
if pdata_match:
    products_data_json_str = '[' + pdata_match.group(1).strip() + ']'
else:
    raise ValueError("Could not extract productsData")

# Also extract full catalog from products-data.js
catalog_match = re.search(r'const noteProductsCatalog = \[(.*?)\];', products_code, re.DOTALL)
if catalog_match:
    full_catalog_str = '[' + catalog_match.group(1).strip() + ']'
else:
    raise ValueError("Could not extract noteProductsCatalog")

# Suppression CSS
suppression_css = """
/* ==========================================================================
   NOTE PERFUMES - 100% LAVERNE LUXURY CLONE THEME FOR ZID
   ========================================================================== */
section[section-id],
footer[section-id],
header[section-id],
header:not(#site-header),
footer:not(#note-store-footer),
header.header-nav, 
header.bg-header-transparent,
.tp-bar-header,
.tp-footer-area,
.tp-footer-top,
.tp-footer-bottom,
.tp-brands,
.tp-slider-banners,
.tp-product-card,
.tp-banners,
.tp-title-section,
.padding-t-b,
.tp-home > *:not(#note-luxury-storefront),
.main.app-content > *:not(#note-luxury-storefront):not(.tp-home) {
  display: none !important;
}

.main.app-content, .tp-home {
  padding: 0 !important;
  margin: 0 !important;
  max-width: 100% !important;
  width: 100% !important;
  overflow: visible !important;
  background: #ffffff !important;
}

body {
  margin: 0 !important;
  padding: 0 !important;
  background: #ffffff !important;
  font-family: 'Laverne', sans-serif !important;
  overflow-x: hidden !important;
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
"""

# Update note.css with fonts + suppression
with open(OUT_CSS, "w", encoding="utf-8") as f:
    f.write(fonts_css + "\n" + suppression_css)
print(f"Updated {OUT_CSS} ({os.path.getsize(OUT_CSS)} bytes)")

# 4. Construct note-app.js
markup_escaped = json.dumps(total_markup, ensure_ascii=False)

app_js_content = f"""/**
 * NOTE Perfumes Official Storefront Engine for Zid
 * Version: 3.0.0 - Approved Client Master Edition (100% Matching refine-paperbacks-based-nat.trycloudflare.com)
 * Hosted via GitHub Pages CDN: https://youssefrasheed.github.io/note-zid-styles/
 */
(function() {{
  "use strict";
  console.log("NOTE Perfumes Master Engine v3.0.0 Starting...");

  const ASSET_HOST = "{ASSET_HOST}";

  // Zid Official Product Slug Mapping
  const zidSlugMap = {{
    'roayal-tobacco': 'roayal-tobacco',
    'note-for-him': 'note-for-him',
    'oud-rosewood': 'oud-rosewood',
    'note-phantom': 'note-phantom',
    'note-gold': 'نوت-قولد-الطلب-المسبق',
    'note-musk': 'مسك',
    'niche-blue': 'niche-blue',
    'niche-amber': 'niche-amber',
    'niche-oud': 'niche-oud',
    'niche-royal-leather': 'niche-amber-1',
    'aura': 'aura',
    'powderose': 'powderose',
    'attraction': 'attraction',
    'bn': 'bn',
    'musk-bukhor': 'مسك-بخور',
    'royal-powder': 'رويال-باودر'
  }};

  // 1. Inject Tailwind CDN if not loaded
  if (!window.tailwind) {{
    const twScript = document.createElement("script");
    twScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(twScript);
  }}

  // 2. Configure Tailwind
  if (!window.tailwindConfigApplied) {{
    window.tailwindConfigApplied = true;
    window.tailwind = window.tailwind || {{}};
    window.tailwind.config = {{
      theme: {{
        extend: {{
          fontFamily: {{
            sans: ['Laverne', 'system-ui', 'sans-serif'],
          }},
          colors: {{
            brand: {{
              black: '#000000',
              dark: '#111111',
              gray: '#737373',
              light: '#f5f5f5',
            }}
          }}
        }}
      }}
    }};
  }}

  // 3. Inject Suppression & Font Styles
  if (!document.getElementById("note-master-inline-css")) {{
    const s = document.createElement("style");
    s.id = "note-master-inline-css";
    s.textContent = `{suppression_css}`;
    document.head.appendChild(s);
  }}

  // 4. Products Data
  const productsData = {products_data_json_str};
  const noteProductsCatalog = {full_catalog_str};

  // 5. Cart Manager (Global localStorage Architecture)
  const CartManager = {{
    getCart: function() {{
      try {{
        return JSON.parse(localStorage.getItem('note_cart')) || [];
      }} catch(e) {{
        return [];
      }}
    }},
    saveCart: function(cart) {{
      localStorage.setItem('note_cart', JSON.stringify(cart));
      this.updateBadge();
      this.renderDrawer();
    }},
    addItem: function(productId, quantity = 1) {{
      const product = productsData.find(p => p.id === productId) || noteProductsCatalog.find(p => p.id === productId);
      if (!product) return;
      let cart = this.getCart();
      const existing = cart.find(item => item.id === productId);
      if (existing) {{
        existing.quantity += quantity;
      }} else {{
        const rawPrice = typeof product.price === 'string' ? parseInt(product.price.replace(/[^0-9]/g, '')) : product.price;
        const rawOldPrice = product.old_price ? (typeof product.old_price === 'string' ? parseInt(product.old_price.replace(/[^0-9]/g, '')) : product.old_price) : null;
        const imgUrl = (product.img.startsWith('http') ? '' : ASSET_HOST) + product.img;
        cart.push({{
          id: product.id,
          title: product.title,
          title_en: product.title_en || '',
          price: rawPrice || 189,
          old_price: rawOldPrice,
          img: imgUrl,
          size: product.size || '100 مل',
          quantity: quantity
        }});
      }}
      this.saveCart(cart);
      this.showToast('تمت إضافة ' + product.title + ' إلى سلتك');
      this.openDrawer();
    }},
    removeItem: function(productId) {{
      let cart = this.getCart().filter(item => item.id !== productId);
      this.saveCart(cart);
    }},
    updateQuantity: function(productId, delta) {{
      let cart = this.getCart();
      const item = cart.find(i => i.id === productId);
      if (item) {{
        item.quantity += delta;
        if (item.quantity <= 0) {{
          cart = cart.filter(i => i.id !== productId);
        }}
      }}
      this.saveCart(cart);
    }},
    getTotal: function() {{
      return this.getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }},
    getCount: function() {{
      return this.getCart().reduce((count, item) => count + item.quantity, 0);
    }},
    updateBadge: function() {{
      const count = this.getCount();
      const badges = document.querySelectorAll('.cart-badge-count, #cart-counter-badge');
      badges.forEach(b => {{
        b.textContent = count;
      }});
    }},
    showToast: function(msg) {{
      let toast = document.getElementById('global-toast');
      if (!toast) {{
        toast = document.createElement('div');
        toast.id = 'global-toast';
        toast.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-[100] transform -translate-y-24 opacity-0 transition-all duration-300 pointer-events-none px-6 py-3.5 rounded-full shadow-2xl text-xs font-bold flex items-center gap-3 bg-black text-white';
        document.body.appendChild(toast);
      }}
      toast.innerHTML = '<i class="sicon-check-circle text-emerald-400 text-sm"></i><span>' + msg + '</span>';
      toast.classList.remove('-translate-y-24', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
      setTimeout(() => {{
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('-translate-y-24', 'opacity-0');
      }}, 2800);
    }},
    openDrawer: function() {{
      const drawer = document.getElementById('cart-drawer');
      const overlay = document.getElementById('cart-drawer-overlay');
      if (drawer && overlay) {{
        drawer.classList.remove('hidden');
        overlay.classList.remove('hidden');
        setTimeout(() => {{
          overlay.classList.add('opacity-100');
          drawer.classList.remove('-translate-x-full');
          drawer.classList.add('translate-x-0');
        }}, 20);
        document.body.style.overflow = 'hidden';
        this.renderDrawer();
      }}
    }},
    closeDrawer: function() {{
      const drawer = document.getElementById('cart-drawer');
      const overlay = document.getElementById('cart-drawer-overlay');
      if (drawer && overlay) {{
        drawer.classList.remove('translate-x-0');
        drawer.classList.add('-translate-x-full');
        overlay.classList.remove('opacity-100');
        setTimeout(() => {{
          overlay.classList.add('hidden');
          drawer.classList.add('hidden');
        }}, 300);
        document.body.style.overflow = '';
      }}
    }},
    renderDrawer: function() {{
      const itemsContainer = document.getElementById('cart-drawer-items');
      const subtotalEl = document.getElementById('cart-drawer-subtotal');
      const totalEl = document.getElementById('cart-drawer-total');
      const shippingProgress = document.getElementById('cart-free-shipping-progress');
      const shippingText = document.getElementById('cart-free-shipping-text');
      const emptyState = document.getElementById('cart-drawer-empty');
      const footerEl = document.getElementById('cart-drawer-footer');
      
      if (!itemsContainer) return;
      
      const cart = this.getCart();
      const total = this.getTotal();
      const freeShippingThreshold = 300;
      
      if (cart.length === 0) {{
        itemsContainer.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        if (footerEl) footerEl.classList.add('hidden');
        if (shippingProgress) shippingProgress.style.width = '0%';
        if (shippingText) shippingText.textContent = 'أضف منتجات بقيمة 300 ر.س لتحصل على شحن مجاني';
        return;
      }}
      
      if (emptyState) emptyState.classList.add('hidden');
      if (footerEl) footerEl.classList.remove('hidden');
      
      if (shippingProgress && shippingText) {{
        const percentage = Math.min(100, Math.round((total / freeShippingThreshold) * 100));
        shippingProgress.style.width = percentage + '%';
        if (total >= freeShippingThreshold) {{
          shippingText.innerHTML = '<span class="text-emerald-600 font-bold">🎉 تهانينا! لقد حصلت على شحن مجاني لكافة مدن المملكة</span>';
        }} else {{
          const remaining = freeShippingThreshold - total;
          shippingText.innerHTML = 'متبقي <strong class="text-black font-extrabold">' + remaining + ' ر.س</strong> للحصول على <span class="font-bold text-emerald-600">شحن مجاني</span>';
        }}
      }}
      
      if (subtotalEl) subtotalEl.textContent = total + ' ر.س';
      if (totalEl) totalEl.textContent = total + ' ر.س';
      
      itemsContainer.innerHTML = cart.map(item => {{
        const zidSlug = zidSlugMap[item.id] || item.id;
        const imgUrl = (item.img.startsWith('http') ? '' : ASSET_HOST) + item.img;
        return `
          <div class="flex items-center gap-3 py-3 border-b border-stone-100 last:border-b-0 text-right">
            <a href="/products/${{zidSlug}}" class="w-16 h-16 rounded-xl bg-stone-50 p-1 flex-shrink-0 flex items-center justify-center border border-stone-100 block">
              <img src="${{imgUrl}}" alt="${{item.title}}" class="w-full h-full object-contain">
            </a>
            <div class="flex-grow">
              <a href="/products/${{zidSlug}}" class="hover:underline">
                <h4 class="text-xs font-bold text-black line-clamp-1">${{item.title}}</h4>
              </a>
              <span class="text-[10px] text-stone-400 block">${{item.size || '100 مل'}}</span>
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center border border-stone-200 rounded-full h-7 px-2 gap-2 text-xs font-bold">
                  <button onclick="CartManager.updateQuantity('${{item.id}}', -1)" class="text-stone-500 hover:text-black w-4 text-center">-</button>
                  <span class="min-w-[14px] text-center">${{item.quantity}}</span>
                  <button onclick="CartManager.updateQuantity('${{item.id}}', 1)" class="text-stone-500 hover:text-black w-4 text-center">+</button>
                </div>
                <span class="text-xs font-extrabold text-black">${{item.price * item.quantity}} ر.س</span>
              </div>
            </div>
            <button onclick="CartManager.removeItem('${{item.id}}')" class="text-stone-400 hover:text-rose-500 p-1 transition" title="حذف">
              <i class="sicon-trash text-sm"></i>
            </button>
          </div>
        `;
      }}).join('');
    }}
  }};

  // 6. Product Card Rendering
  function renderProductCard(p, index) {{
    const zidSlug = zidSlugMap[p.id] || p.id;
    const imgUrl = (p.img.startsWith('http') ? '' : ASSET_HOST) + p.img;
    return `
      <div class="min-w-[175px] sm:min-w-[270px] max-w-[185px] sm:max-w-[280px] shrink-0 p-1 flex flex-col justify-between text-center group cursor-pointer bg-transparent" style="scroll-snap-align: start;" onclick="window.location.href='/products/${{zidSlug}}'">
        <div>
          <!-- Frameless Image Container with Clean Shadow/Scale -->
          <div class="relative bg-transparent aspect-square flex items-center justify-center mb-2 p-2 sm:p-4 overflow-hidden">
            ${{p.tag ? `<span class="absolute top-2.5 right-2.5 z-10 text-[9px] sm:text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-black text-white whitespace-nowrap shadow-sm"> ${{p.tag}} </span>` : ''}}
            <img src="${{imgUrl}}" alt="${{p.title}}" loading="lazy" decoding="async" class="w-full h-full object-contain group-hover:scale-106 transition-transform duration-500 ease-out">
          </div>

          <!-- Product Typography (Clean Laverne Centered Sans-Serif) -->
          <div class="pt-1 pb-1 text-center space-y-1">
            <h4 class="text-xs sm:text-sm md:text-base font-bold text-black group-hover:text-stone-600 transition line-clamp-1">${{p.title}}</h4>
            <p class="text-[11px] sm:text-xs text-stone-400 font-normal line-clamp-1">${{p.notes}}</p>
            
            <!-- Clean Price Row -->
            <div class="flex items-center justify-center gap-2 pt-1">
              <span class="text-rose-600 font-extrabold text-sm sm:text-base">${{p.price}}</span>
              <span class="text-stone-400 line-through text-[11px] sm:text-xs font-normal">${{p.old_price}}</span>
            </div>
          </div>
        </div>

        <!-- Minimalist Rounded Pill Button -->
        <button onclick="event.stopPropagation(); CartManager.addItem('${{p.id}}')" class="w-full mt-3 py-2 sm:py-2.5 px-4 rounded-full bg-black text-white hover:bg-stone-800 active:scale-95 transition flex items-center justify-center gap-2 font-bold text-xs shadow-sm" title="إضافة للسلة">
          <span>إضافة للسلة</span>
          <i class="sicon-shopping-bag text-sm"></i>
        </button>
      </div>
    `;
  }}

  // 7. Sliders Initialization
  function initSliders() {{
    const bestTrack = document.getElementById('slider-bestsellers');
    if (bestTrack) {{
      bestTrack.innerHTML = productsData.slice(0, 6).map((p, i) => renderProductCard(p, i)).join('');
    }}

    const nicheTrack = document.getElementById('slider-niche');
    if (nicheTrack) {{
      nicheTrack.innerHTML = productsData.slice(6, 10).map((p, i) => renderProductCard(p, i + 6)).join('');
    }}

    const newTrack = document.getElementById('slider-new');
    if (newTrack) {{
      newTrack.innerHTML = productsData.slice(10, 16).map((p, i) => renderProductCard(p, i + 10)).join('');
    }}
  }}

  function scrollSlider(id, direction) {{
    const slider = document.getElementById(id);
    if (!slider) return;
    const scrollAmount = slider.clientWidth * 0.75;
    if (direction === 'prev') {{
      slider.scrollBy({{ left: -scrollAmount, behavior: 'smooth' }});
    }} else {{
      slider.scrollBy({{ left: scrollAmount, behavior: 'smooth' }});
    }}
  }}

  // 8. Header Scroll Glassmorphism
  function handleHeaderScroll() {{
    const header = document.getElementById('site-header');
    const storeLogo = document.getElementById('store-logo');
    const hero = document.getElementById('section-hero-video');
    if (!header) return;

    const scrollY = window.scrollY || 0;
    const heroHeight = hero ? hero.offsetHeight : 800;

    if (scrollY > 20) {{
      if (scrollY >= (heroHeight - 90)) {{
        header.className = 'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 text-black shadow-sm border-b border-stone-200/50 backdrop-blur-xl bg-white/70';
        if (storeLogo) storeLogo.src = ASSET_HOST + '/logo_dark_crisp.png';
      }} else {{
        header.className = 'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 text-white shadow-sm border-b border-white/10 backdrop-blur-xl bg-black/25';
        if (storeLogo) storeLogo.src = ASSET_HOST + '/logo_white_crisp.png';
      }}
    }} else {{
      header.className = 'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 bg-transparent text-white border-b border-white/10';
      if (storeLogo) storeLogo.src = ASSET_HOST + '/logo_white_crisp.png';
    }}
  }}

  // 9. Quick View Modal
  function openQuickView(idx) {{
    const p = productsData[idx];
    if (!p) return;
    const imgUrl = (p.img.startsWith('http') ? '' : ASSET_HOST) + p.img;
    const modalImg = document.getElementById('modal-img');
    if (modalImg) modalImg.src = imgUrl;
    const modalTitle = document.getElementById('modal-title');
    if (modalTitle) modalTitle.textContent = p.title;
    const modalCat = document.getElementById('modal-cat');
    if (modalCat) modalCat.textContent = p.cat;
    const modalSlogan = document.getElementById('modal-slogan');
    if (modalSlogan) modalSlogan.textContent = p.slogan || '';
    const modalTop = document.getElementById('modal-top');
    if (modalTop) modalTop.innerHTML = '<strong>القمة:</strong> ' + (p.top || '');
    const modalHeart = document.getElementById('modal-heart');
    if (modalHeart) modalHeart.innerHTML = '<strong>القلب:</strong> ' + (p.heart || '');
    const modalBase = document.getElementById('modal-base');
    if (modalBase) modalBase.innerHTML = '<strong>القاعدة:</strong> ' + (p.base || '');
    const modalPrice = document.getElementById('modal-price');
    if (modalPrice) modalPrice.textContent = p.price;

    const buyBtn = document.getElementById('modal-buy-btn');
    if (buyBtn) {{
      buyBtn.onclick = () => {{
        CartManager.addItem(p.id);
        closeQuickView();
      }};
    }}

    const modal = document.getElementById('quickview-modal');
    if (modal) {{
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }}
  }}

  function closeQuickView() {{
    const modal = document.getElementById('quickview-modal');
    if (modal) {{
      modal.classList.remove('flex');
      modal.classList.add('hidden');
    }}
  }}

  // 10. Search & Mobile Drawer
  function openSearchModal() {{
    const m = document.getElementById('search-modal');
    if (!m) return;
    m.classList.remove('hidden');
    setTimeout(() => {{
      m.classList.remove('opacity-0');
      m.querySelector('div').classList.remove('scale-95');
      document.getElementById('search-input')?.focus();
    }}, 10);
  }}

  function closeSearchModal() {{
    const m = document.getElementById('search-modal');
    if (!m) return;
    m.classList.add('opacity-0');
    m.querySelector('div').classList.add('scale-95');
    setTimeout(() => {{
      m.classList.add('hidden');
    }}, 300);
  }}

  function openMobileMenu() {{
    const m = document.getElementById('mobile-menu-drawer');
    if (!m) return;
    m.classList.remove('hidden');
    setTimeout(() => {{
      m.classList.remove('opacity-0');
      m.querySelector('div').classList.remove('translate-x-full');
    }}, 10);
  }}

  function closeMobileMenu() {{
    const m = document.getElementById('mobile-menu-drawer');
    if (!m) return;
    m.classList.add('opacity-0');
    m.querySelector('div').classList.add('translate-x-full');
    setTimeout(() => {{
      m.classList.add('hidden');
    }}, 300);
  }}

  // 11. Hero Auto-Rotating Carousel
  let currentHeroIndex = 0;
  let heroTimer = null;
  const HERO_DURATION = 5000;

  function goToHeroSlide(idx) {{
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    if (!slides.length) return;
    
    currentHeroIndex = (idx + slides.length) % slides.length;
    
    slides.forEach((slide, i) => {{
      if (i === currentHeroIndex) {{
        slide.classList.remove('opacity-0', 'pointer-events-none', 'z-0');
        slide.classList.add('opacity-100', 'pointer-events-auto', 'z-10');
      }} else {{
        slide.classList.remove('opacity-100', 'pointer-events-auto', 'z-10');
        slide.classList.add('opacity-0', 'pointer-events-none', 'z-0');
      }}
    }});

    dots.forEach((dot, i) => {{
      if (i === currentHeroIndex) {{
        dot.className = 'hero-dot w-6 h-1 rounded-full bg-white transition-all duration-300 cursor-pointer';
      }} else {{
        dot.className = 'hero-dot w-2 h-1 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300 cursor-pointer';
      }}
    }});

    restartHeroTimer();
  }}

  function nextHeroSlide() {{ goToHeroSlide(currentHeroIndex + 1); }}
  function prevHeroSlide() {{ goToHeroSlide(currentHeroIndex - 1); }}

  function startHeroTimer() {{
    if (!heroTimer) {{
      heroTimer = setInterval(nextHeroSlide, HERO_DURATION);
    }}
  }}

  function stopHeroTimer() {{
    if (heroTimer) {{
      clearInterval(heroTimer);
      heroTimer = null;
    }}
  }}

  function restartHeroTimer() {{
    stopHeroTimer();
    startHeroTimer();
  }}

  function initHeroCarousel() {{
    const heroSection = document.getElementById('section-hero-video');
    if (!heroSection) return;

    heroSection.addEventListener('mouseenter', stopHeroTimer);
    heroSection.addEventListener('mouseleave', startHeroTimer);

    let startX = 0, startY = 0;
    heroSection.addEventListener('touchstart', (e) => {{
      startX = e.changedTouches[0].clientX;
      startY = e.changedTouches[0].clientY;
      stopHeroTimer();
    }}, {{ passive: true }});

    heroSection.addEventListener('touchend', (e) => {{
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = endX - startX;
      const diffY = endY - startY;

      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {{
        if (diffX > 0) prevHeroSlide();
        else nextHeroSlide();
      }}
      startHeroTimer();
    }}, {{ passive: true }});

    startHeroTimer();
  }}

  // 12. Offers Auto-Rotating Carousel (3s Interval)
  let currentOfferIndex = 0;
  let offerTimer = null;
  const OFFER_DURATION = 3000;

  function goToOfferSlide(index, event) {{
    if (event) {{
      event.preventDefault();
      event.stopPropagation();
    }}
    const slides = document.querySelectorAll('.offer-slide');
    const dots = document.querySelectorAll('.offer-dot');
    if (!slides.length) return;

    if (index >= slides.length) currentOfferIndex = 0;
    else if (index < 0) currentOfferIndex = slides.length - 1;
    else currentOfferIndex = index;

    slides.forEach((slide, i) => {{
      if (i === currentOfferIndex) {{
        slide.classList.remove('opacity-0', 'pointer-events-none', 'z-0');
        slide.classList.add('opacity-100', 'z-10');
      }} else {{
        slide.classList.remove('opacity-100', 'z-10');
        slide.classList.add('opacity-0', 'pointer-events-none', 'z-0');
      }}
    }});

    dots.forEach((dot, i) => {{
      if (i === currentOfferIndex) {{
        dot.className = 'offer-dot w-6 h-1 sm:h-1.5 rounded-full bg-white transition-all duration-300 cursor-pointer shadow-sm';
      }} else {{
        dot.className = 'offer-dot w-2 h-1 sm:h-1.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-sm';
      }}
    }});

    restartOfferTimer();
  }}

  function nextOfferSlide(event) {{ goToOfferSlide(currentOfferIndex + 1, event); }}
  function prevOfferSlide(event) {{ goToOfferSlide(currentOfferIndex - 1, event); }}

  function startOfferTimer() {{
    if (!offerTimer) {{
      offerTimer = setInterval(() => nextOfferSlide(), OFFER_DURATION);
    }}
  }}

  function stopOfferTimer() {{
    if (offerTimer) {{
      clearInterval(offerTimer);
      offerTimer = null;
    }}
  }}

  function restartOfferTimer() {{
    stopOfferTimer();
    startOfferTimer();
  }}

  function initOffersCarousel() {{
    const carousel = document.getElementById('offers-carousel');
    if (!carousel) return;

    carousel.addEventListener('mouseenter', stopOfferTimer);
    carousel.addEventListener('mouseleave', startOfferTimer);

    let startX = 0;
    carousel.addEventListener('touchstart', (e) => {{
      startX = e.changedTouches[0].clientX;
      stopOfferTimer();
    }}, {{ passive: true }});

    carousel.addEventListener('touchend', (e) => {{
      const diffX = e.changedTouches[0].clientX - startX;
      if (Math.abs(diffX) > 40) {{
        if (diffX > 0) prevOfferSlide();
        else nextOfferSlide();
      }}
      startOfferTimer();
    }}, {{ passive: true }});

    startOfferTimer();
  }}

  // 13. Mount & Initialize Master Storefront
  function mountStorefront() {{
    const mainEl = document.querySelector('.tp-home') || 
                   document.querySelector('.main.app-content') || 
                   document.querySelector('.app-content') || 
                   document.querySelector('main') || 
                   document.body;

    if (!mainEl) {{
      setTimeout(mountStorefront, 50);
      return;
    }}

    // Remove Rozia default footers, headers and native sections completely
    document.querySelectorAll('[section-id], footer:not(#note-store-footer), .tp-footer-area, .tp-bar-header, header.header-nav').forEach(el => {{
      el.remove();
    }});

    // Completely replace mainEl content with our luxury storefront
    mainEl.innerHTML = '';

    const storefrontContainer = document.createElement('div');
    storefrontContainer.id = 'note-luxury-storefront';
    storefrontContainer.className = 'w-full bg-white text-black antialiased selection:bg-black selection:text-white';
    storefrontContainer.innerHTML = {markup_escaped};

    mainEl.appendChild(storefrontContainer);

    // Keep removing any late-injected Rozia blocks
    const cleanupInterval = setInterval(() => {{
      document.querySelectorAll('[section-id], footer:not(#note-store-footer), .tp-footer-area, .tp-bar-header, header.header-nav').forEach(el => el.remove());
      Array.from(mainEl.children).forEach(child => {{
        if (child !== storefrontContainer && child.id !== 'note-luxury-storefront') {{
          child.remove();
        }}
      }});
    }}, 300);
    setTimeout(() => clearInterval(cleanupInterval), 3000);

    // Initialize all components
    initSliders();
    handleHeaderScroll();
    initHeroCarousel();
    initOffersCarousel();
    CartManager.updateBadge();

    window.addEventListener('scroll', handleHeaderScroll, {{ passive: true }});
    console.log("NOTE Perfumes Master Storefront Mounted Successfully!");
  }}

  // Global Exports for Interactive Event Handlers
  window.productsData = productsData;
  window.noteProductsCatalog = noteProductsCatalog;
  window.CartManager = CartManager;
  window.renderProductCard = renderProductCard;
  window.initSliders = initSliders;
  window.scrollSlider = scrollSlider;
  window.handleHeaderScroll = handleHeaderScroll;
  window.openQuickView = openQuickView;
  window.closeQuickView = closeQuickView;
  window.openSearchModal = openSearchModal;
  window.closeSearchModal = closeSearchModal;
  window.openMobileMenu = openMobileMenu;
  window.closeMobileMenu = closeMobileMenu;
  window.goToHeroSlide = goToHeroSlide;
  window.nextHeroSlide = nextHeroSlide;
  window.prevHeroSlide = prevHeroSlide;
  window.goToOfferSlide = goToOfferSlide;
  window.nextOfferSlide = nextOfferSlide;
  window.prevOfferSlide = prevOfferSlide;

  if (document.readyState === 'loading') {{
    document.addEventListener('DOMContentLoaded', mountStorefront);
  }} else {{
    mountStorefront();
  }}
}})();
"""

with open(OUT_JS, "w", encoding="utf-8") as f:
    f.write(app_js_content)
print(f"Generated {OUT_JS} ({os.path.getsize(OUT_JS)} bytes)")
