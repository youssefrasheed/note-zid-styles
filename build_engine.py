#!/usr/bin/env python3
import os
import re
import json

ASSET_HOST = "https://youssefrasheed.github.io/note-zid-styles"
PREVIEW_DIR = "/Users/yousefsoom/.gemini/antigravity/scratch/zid-store-preview"

OUT_JS = "/Users/yousefsoom/note-zid-styles/note-app.js"
OUT_CSS = "/Users/yousefsoom/note-zid-styles/note.css"

def read_preview(fname):
    with open(os.path.join(PREVIEW_DIR, fname), "r", encoding="utf-8") as f:
        return f.read()

index_html = read_preview("index.html")
product_html = read_preview("product.html")
category_html = read_preview("category.html")
cart_html = read_preview("cart.html")
faqs_html = read_preview("faqs.html")
contact_html = read_preview("contact.html")
privacy_html = read_preview("privacy.html")
terms_html = read_preview("terms.html")
refund_html = read_preview("refund-policy.html")
products_data_js = read_preview("products-data.js")

# 1. Extract Fonts CSS
fonts_css = ""
for m in re.finditer(r"<style>(.*?)</style>", index_html, re.DOTALL):
    fonts_css += m.group(1).strip() + "\n"

# 2. Extract Components from index.html
header_match = re.search(r'(<!-- ================= 1\. HEADER / NAVIGATION.*?)(<!-- ================= 2\. CINEMATIC HERO)', index_html, re.DOTALL)
header_html = header_match.group(1).strip() if header_match else ""

home_match = re.search(r'(<!-- ================= 2\. CINEMATIC HERO.*?)(<!-- ================= 10\. STORE FOOTER)', index_html, re.DOTALL)
home_html = home_match.group(1).strip() if home_match else ""

footer_match = re.search(r'(<!-- ================= 10\. STORE FOOTER.*?)(<!-- ================= 11\. QUICK VIEW MODAL)', index_html, re.DOTALL)
footer_html = footer_match.group(1).strip() if footer_match else ""
footer_html = footer_html.replace('<footer class="w-full pt-16', '<footer id="note-store-footer" class="w-full pt-16')

quickview_match = re.search(r'(<!-- ================= 11\. QUICK VIEW MODAL.*?)(<!-- ================= 12\. STORE JAVASCRIPT)', index_html, re.DOTALL)
shared_modals_html = quickview_match.group(1).strip() if quickview_match else ""

drawer_match = re.search(r'(<!-- ================= UNIVERSAL SLIDE-OUT CART DRAWER.*?)(<script src="/products-data\.js)', index_html, re.DOTALL)
cart_drawer_html = drawer_match.group(1).strip() if drawer_match else ""

# 3. Extract Main Bodies from Subpages
def get_main_body(html_str):
    m = re.search(r'<main.*?>(.*?)</main>', html_str, re.DOTALL)
    if not m:
        raise ValueError("Could not find <main> tag")
    tag_m = re.search(r'<main([^>]*)>', html_str)
    attrs = tag_m.group(1) if tag_m else ''
    return f'<main id="page-main-wrapper" {attrs}>{m.group(1)}</main>'

product_template = get_main_body(product_html)
category_template = get_main_body(category_html)
cart_template = get_main_body(cart_html)
faqs_template = get_main_body(faqs_html)
contact_template = get_main_body(contact_html)
privacy_template = get_main_body(privacy_html)
terms_template = get_main_body(terms_html)
refund_template = get_main_body(refund_html)

# Add checkout modal to cart template
checkout_modal_match = re.search(r'(<!-- Checkout Success Modal.*?</div>\s*</div>)', cart_html, re.DOTALL)
if checkout_modal_match:
    cart_template += "\n" + checkout_modal_match.group(1).strip()

# 4. Normalize URLs across all templates
def normalize_urls(markup):
    replacements = [
        (r'src="/assets/', f'src="{ASSET_HOST}/assets/'),
        (r'srcset="/assets/', f'srcset="{ASSET_HOST}/assets/'),
        (r'src="/products/', f'src="{ASSET_HOST}/products/'),
        (r'srcset="/products/', f'srcset="{ASSET_HOST}/products/'),
        (r'src="/fonts/', f'src="{ASSET_HOST}/fonts/'),
        (r'src="/logo_white_crisp.png"', f'src="{ASSET_HOST}/logo_white_crisp.png"'),
        (r'src="/logo_dark_crisp.png"', f'src="{ASSET_HOST}/logo_dark_crisp.png"'),
        # Map Category links to native Zid URLs
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
        (r'href="/category\.html\?cat=body-care"', 'href="/categories/1750048/body-care-products"'),
        (r'href="/cart\.html"', 'href="/cart"'),
    ]
    for pattern, repl in replacements:
        markup = re.sub(pattern, repl, markup)
    return markup

header_html = normalize_urls(header_html)
home_html = normalize_urls(home_html)
footer_html = normalize_urls(footer_html)
shared_modals_html = normalize_urls(shared_modals_html)
cart_drawer_html = normalize_urls(cart_drawer_html)

product_template = normalize_urls(product_template)
category_template = normalize_urls(category_template)
cart_template = normalize_urls(cart_template)
faqs_template = normalize_urls(faqs_template)
contact_template = normalize_urls(contact_template)
privacy_template = normalize_urls(privacy_template)
terms_template = normalize_urls(terms_template)
refund_template = normalize_urls(refund_template)

# 5. Extract Products Datasets
pdata_match = re.search(r'const productsData = \[(.*?)\];\s*// Helper to generate', index_html, re.DOTALL)
if pdata_match:
    products_data_json_str = '[' + pdata_match.group(1).strip() + ']'
else:
    raise ValueError("Could not extract productsData")

catalog_match = re.search(r'const noteProductsCatalog = \[(.*?)\];', products_data_js, re.DOTALL)
if catalog_match:
    full_catalog_str = '[' + catalog_match.group(1).strip() + ']'
else:
    raise ValueError("Could not extract noteProductsCatalog")

# 6. Suppression & Calibration CSS
suppression_css = f"""
/* ==========================================================================
   NOTE PERFUMES - 100% LAVERNE MASTER EDITION FOR ZID
   Host: {ASSET_HOST}
   ========================================================================== */

/* Enforce EXACT 16px Root Calibration (Matches Preview Link 100%) */
html, :root {{
  font-size: 16px !important;
  background-color: #000000 !important;
  -webkit-text-size-adjust: 100% !important;
  -moz-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
}}

body {{
  margin: 0 !important;
  padding: 0 !important;
  background: #000000 !important;
  font-family: 'Laverne', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  font-size: 16px !important;
  overflow-x: hidden !important;
}}

* {{
  font-family: 'Laverne', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
}}

/* Eradicate Rozia Native Headers, Footers, and Blocks */
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
.whatsapp-icon,
.footer {{
  display: none !important;
}}

/* Eradicate Rozia's 50% olive background pseudo-element on footer */
footer::after,
footer::before,
#note-store-footer::after,
#note-store-footer::before {{
  display: none !important;
  content: none !important;
  height: 0 !important;
  width: 0 !important;
  background: transparent !important;
  opacity: 0 !important;
}}

.main.app-content, .tp-home {{
  padding: 0 !important;
  margin: 0 !important;
  max-width: 100% !important;
  width: 100% !important;
  overflow: visible !important;
  background: #ffffff !important;
}}

#note-luxury-storefront {{
  background: #ffffff !important;
  min-height: 100vh !important;
  width: 100% !important;
}}

#note-store-footer {{
  background: #000000 !important;
}}

/* Helper Classes */
.scrollbar-none::-webkit-scrollbar {{
  display: none;
}}
.scrollbar-none {{
  -ms-overflow-style: none;
  scrollbar-width: none;
}}

.cat-pill-active {{
  background-color: #000000 !important;
  color: #ffffff !important;
  border-color: #000000 !important;
}}

.thumb-active {{
  border-color: #000000 !important;
  opacity: 1 !important;
}}
"""

with open(OUT_CSS, "w", encoding="utf-8") as f:
    f.write(fonts_css + "\n" + suppression_css)
print(f"Updated {OUT_CSS} ({os.path.getsize(OUT_CSS)} bytes)")

# 7. Build note-app.js
t_header = json.dumps(header_html, ensure_ascii=False)
t_home = json.dumps(home_html, ensure_ascii=False)
t_footer = json.dumps(footer_html, ensure_ascii=False)
t_modals = json.dumps(shared_modals_html, ensure_ascii=False)
t_drawer = json.dumps(cart_drawer_html, ensure_ascii=False)

t_prod = json.dumps(product_template, ensure_ascii=False)
t_cat = json.dumps(category_template, ensure_ascii=False)
t_cart = json.dumps(cart_template, ensure_ascii=False)
t_faqs = json.dumps(faqs_template, ensure_ascii=False)
t_contact = json.dumps(contact_template, ensure_ascii=False)
t_priv = json.dumps(privacy_template, ensure_ascii=False)
t_terms = json.dumps(terms_template, ensure_ascii=False)
t_refund = json.dumps(refund_template, ensure_ascii=False)

app_js_code = f"""/**
 * NOTE Perfumes Official Storefront Engine for Zid
 * Version: 4.1.0 - Full Multi-Page SPA Client Master Edition
 * 100% Parity with refine-paperbacks-based-nat.trycloudflare.com
 * Hosted via GitHub Pages CDN: {ASSET_HOST}/
 */
(function() {{
  "use strict";
  console.log("NOTE Perfumes Master Engine v4.1.0 Starting...");

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

  const catUrlMap = {{
    'all': '/categories',
    'perfumes': '/categories/1748533/perfumes',
    'niche': '/categories/1500261/عطور-النيش',
    'bestsellers': '/categories/1697258/الأكثر-مبيعا',
    'new': '/categories/1327929/newest-products',
    'travel': '/categories/1310036/30ml-perfumes',
    'all-over': '/categories/1688838/all-over-spray',
    'packages': '/categories/1752110/packages',
    'linen': '/categories/1310037/معطرات-جو-وجسم',
    'tollah': '/categories/1421002/tollah',
    'body-care': '/categories/1750048/body-care-products'
  }};

  // 1. Inject Salla Icons CSS if not loaded
  if (!document.getElementById("salla-icons-css")) {{
    const sallaLink = document.createElement("link");
    sallaLink.id = "salla-icons-css";
    sallaLink.rel = "stylesheet";
    sallaLink.href = "https://assets.salla.cloud/fonts/sallaicons.css";
    document.head.appendChild(sallaLink);
  }}

  // 2. Inject Tailwind CDN if not loaded
  if (!window.tailwind) {{
    const twScript = document.createElement("script");
    twScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(twScript);
  }}

  // 3. Configure Tailwind
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

  // 4. Inject Suppression & 16px Font Calibration Styles
  if (!document.getElementById("note-master-inline-css")) {{
    const s = document.createElement("style");
    s.id = "note-master-inline-css";
    s.textContent = `{suppression_css}`;
    document.head.appendChild(s);
  }}

  // Enforce root 16px immediately
  try {{
    document.documentElement.style.setProperty('font-size', '16px', 'important');
    if (document.body) document.body.style.setProperty('font-size', '16px', 'important');
  }} catch(e) {{}}

  // 5. Products Data
  const productsData = {products_data_json_str};
  const noteProductsCatalog = {full_catalog_str};

  // 6. Templates
  const T = {{
    header: {t_header},
    home: {t_home},
    footer: {t_footer},
    modals: {t_modals},
    drawer: {t_drawer},
    product: {t_prod},
    category: {t_cat},
    cart: {t_cart},
    faqs: {t_faqs},
    contact: {t_contact},
    privacy: {t_priv},
    terms: {t_terms},
    refund: {t_refund}
  }};

  // 7. Cart Manager (Global localStorage Architecture)
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
      if (typeof window.renderCartPage === 'function' && document.getElementById('cart-page-items')) {{
        window.renderCartPage();
      }}
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
          shippingText.innerHTML = `متبقي <strong class="text-black font-extrabold">${{remaining}} ر.س</strong> للحصول على <span class="font-bold text-emerald-600">شحن مجاني</span>`;
        }}
      }}
      
      if (subtotalEl) subtotalEl.textContent = total + ' ر.س';
      if (totalEl) totalEl.textContent = total + ' ر.س';
      
      itemsContainer.innerHTML = cart.map(item => {{
        const zidSlug = zidSlugMap[item.id] || item.id;
        const imgUrl = (item.img.startsWith('http') ? '' : ASSET_HOST) + item.img;
        return `
          <div class="flex items-center gap-3 py-3 border-b border-stone-100 last:border-b-0 text-right">
            <a href="/products/${{zidSlug}}" onclick="NoteRouter.navigate('/products/${{zidSlug}}'); CartManager.closeDrawer();" class="w-16 h-16 rounded-xl bg-stone-50 p-1 flex-shrink-0 flex items-center justify-center border border-stone-100 block">
              <img src="${{imgUrl}}" alt="${{item.title}}" class="w-full h-full object-contain">
            </a>
            <div class="flex-grow">
              <a href="/products/${{zidSlug}}" onclick="NoteRouter.navigate('/products/${{zidSlug}}'); CartManager.closeDrawer();" class="hover:underline">
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

  // 8. Product Card Rendering
  function renderProductCard(p, index) {{
    const zidSlug = zidSlugMap[p.id] || p.id;
    const imgUrl = (p.img.startsWith('http') ? '' : ASSET_HOST) + p.img;
    return `
      <div class="min-w-[175px] sm:min-w-[270px] max-w-[185px] sm:max-w-[280px] shrink-0 p-1 flex flex-col justify-between text-center group cursor-pointer bg-transparent" style="scroll-snap-align: start;" onclick="NoteRouter.navigate('/products/${{zidSlug}}')">
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

  // 9. Sliders Initialization
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

  // 10. Header Scroll Glassmorphism
  function handleHeaderScroll() {{
    const header = document.getElementById('site-header');
    const storeLogo = document.getElementById('store-logo');
    const hero = document.getElementById('section-hero-video');
    if (!header) return;

    const scrollY = window.scrollY || 0;
    
    // If not on homepage (no hero), keep solid frosted white
    if (!hero) {{
      header.className = 'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 text-black shadow-sm border-b border-stone-200/50 backdrop-blur-xl bg-white/85';
      if (storeLogo) storeLogo.src = ASSET_HOST + '/logo_dark_crisp.png';
      return;
    }}

    const heroHeight = hero.offsetHeight || 800;

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

  // 11. Quick View Modal
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

  // 12. Search & Mobile Drawer
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

  // 13. Hero Auto-Rotating Carousel
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

  // 14. Offers Auto-Rotating Carousel (3s Interval)
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

  // 15. PDP (Product Detail Page) Controller
  let currentProduct = null;
  let pdpQuantity = 1;

  function initPDP(prodId) {{
    pdpQuantity = 1;
    currentProduct = noteProductsCatalog.find(p => p.id === prodId) || 
                     noteProductsCatalog.find(p => zidSlugMap[p.id] === prodId) || 
                     noteProductsCatalog.find(p => p.id === zidSlugMap[prodId]) || 
                     noteProductsCatalog[0];

    document.title = `${{currentProduct.title}} | دار نوت للعطور NOTE Perfumes`;

    const breadCat = document.getElementById('pdp-breadcrumb-cat');
    if (breadCat) {{
      const catUrl = catUrlMap[currentProduct.cat] || `/categories`;
      breadCat.textContent = currentProduct.cat_ar || 'العطور';
      breadCat.setAttribute('href', catUrl);
      breadCat.onclick = (e) => {{
        e.preventDefault();
        NoteRouter.navigate(catUrl);
      }};
    }}
    const breadTitle = document.getElementById('pdp-breadcrumb-title');
    if (breadTitle) breadTitle.textContent = currentProduct.title;

    const catName = document.getElementById('pdp-category-name');
    if (catName) catName.textContent = `${{currentProduct.cat_ar || 'العطور الفاخرة'}} • ${{currentProduct.concentration ? currentProduct.concentration.toUpperCase() : 'EXTRAIT DE PARFUM'}}`;

    const titleEl = document.getElementById('pdp-title');
    if (titleEl) titleEl.textContent = currentProduct.title;

    const titleEn = document.getElementById('pdp-title-en');
    if (titleEn) titleEn.textContent = currentProduct.title_en || '';

    const ratingNum = document.getElementById('pdp-rating-num');
    if (ratingNum) ratingNum.textContent = currentProduct.rating || '4.91';

    const ratingCount = document.getElementById('pdp-rating-count');
    if (ratingCount) ratingCount.textContent = `(${{currentProduct.reviews_count || 170}} تقييم موثق)`;

    const tagBadge = document.getElementById('pdp-tag-badge');
    if (tagBadge) {{
      if (currentProduct.tag) {{
        tagBadge.textContent = currentProduct.tag;
        tagBadge.classList.remove('hidden');
      }} else {{
        tagBadge.classList.add('hidden');
      }}
    }}

    const priceEl = document.getElementById('pdp-price');
    if (priceEl) priceEl.textContent = `${{currentProduct.price}} ر.س`;

    const oldPriceEl = document.getElementById('pdp-old-price');
    if (oldPriceEl) oldPriceEl.textContent = `${{currentProduct.old_price}} ر.س`;

    const discountBadge = document.getElementById('pdp-discount-badge');
    if (discountBadge) discountBadge.textContent = `وفر ${{currentProduct.discount || '45%'}}`;

    const tabbyPrice = (currentProduct.price / 4).toFixed(2);
    const tabbyEl = document.getElementById('pdp-tabby-price');
    if (tabbyEl) tabbyEl.textContent = `${{tabbyPrice}} ر.س`;

    const mainImg = document.getElementById('pdp-main-image');
    const mainImgUrl = (currentProduct.img.startsWith('http') ? '' : ASSET_HOST) + currentProduct.img;
    if (mainImg) {{
      mainImg.src = mainImgUrl;
      mainImg.alt = currentProduct.title;
    }}

    // Thumbnails
    const thumbsContainer = document.getElementById('pdp-thumbnails');
    if (thumbsContainer) {{
      thumbsContainer.innerHTML = '';
      const images = [currentProduct.img];
      if (currentProduct.img_box && currentProduct.img_box !== currentProduct.img) {{
        images.push(currentProduct.img_box);
      }}

      images.forEach((img, idx) => {{
        const fullUrl = (img.startsWith('http') ? '' : ASSET_HOST) + img;
        const btn = document.createElement('button');
        btn.className = `w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 p-1 bg-stone-50 transition-all flex items-center justify-center ${{idx === 0 ? 'thumb-active border-black' : 'border-stone-200 opacity-60 hover:opacity-100'}}`;
        btn.onclick = () => {{
          if (mainImg) mainImg.src = fullUrl;
          document.querySelectorAll('#pdp-thumbnails button').forEach(b => {{
            b.classList.remove('thumb-active', 'border-black');
            b.classList.add('border-stone-200', 'opacity-60');
          }});
          btn.classList.add('thumb-active', 'border-black');
          btn.classList.remove('border-stone-200', 'opacity-60');
        }};
        btn.innerHTML = `<img src="${{fullUrl}}" alt="${{currentProduct.title}}" class="w-full h-full object-contain">`;
        thumbsContainer.appendChild(btn);
      }});
    }}

    const sloganEl = document.getElementById('pdp-slogan');
    if (sloganEl) sloganEl.textContent = currentProduct.slogan || '';

    const notesSummary = document.getElementById('pdp-notes-summary');
    if (notesSummary) notesSummary.textContent = currentProduct.notes || '';

    const link30 = document.getElementById('pdp-30ml-link');
    if (link30) {{
      const travelVersion = noteProductsCatalog.find(p => p.id === `${{currentProduct.id}}-30ml` || (p.title.includes(currentProduct.title.replace('عطر ', '')) && p.cat === 'travel'));
      if (travelVersion) {{
        const travelSlug = zidSlugMap[travelVersion.id] || travelVersion.id;
        link30.setAttribute('href', `/products/${{travelSlug}}`);
        link30.onclick = (e) => {{
          e.preventDefault();
          NoteRouter.navigate(`/products/${{travelSlug}}`);
        }};
        link30.classList.remove('hidden');
      }} else {{
        link30.classList.add('hidden');
      }}
    }}

    const pyrTop = document.getElementById('pdp-pyramid-top');
    if (pyrTop) pyrTop.textContent = currentProduct.top || currentProduct.notes || '';

    const pyrHeart = document.getElementById('pdp-pyramid-heart');
    if (pyrHeart) pyrHeart.textContent = currentProduct.heart || currentProduct.slogan || '';

    const pyrBase = document.getElementById('pdp-pyramid-base');
    if (pyrBase) pyrBase.textContent = currentProduct.base || 'المسك الأبيض وخشب الصندل والعنبر';

    const fullDesc = document.getElementById('pdp-full-description');
    if (fullDesc) fullDesc.innerHTML = `<p>${{currentProduct.description || ''}}</p>`;

    renderRelatedProducts();
  }}

  function changePDPQuantity(delta) {{
    pdpQuantity += delta;
    if (pdpQuantity < 1) pdpQuantity = 1;
    const qtyVal = document.getElementById('pdp-qty-val');
    if (qtyVal) qtyVal.textContent = pdpQuantity;
  }}

  function addToCartCurrentProduct() {{
    if (!currentProduct) return;
    CartManager.addItem(currentProduct.id, pdpQuantity);
  }}

  function buyNowCurrentProduct() {{
    if (!currentProduct) return;
    CartManager.addItem(currentProduct.id, pdpQuantity);
    NoteRouter.navigate('/cart');
  }}

  function renderRelatedProducts() {{
    const container = document.getElementById('pdp-related-grid');
    if (!container || !currentProduct) return;

    let related = noteProductsCatalog.filter(p => p.id !== currentProduct.id && (p.cat === currentProduct.cat || p.bestseller)).slice(0, 4);
    if (related.length < 4) {{
      related = noteProductsCatalog.filter(p => p.id !== currentProduct.id).slice(0, 4);
    }}

    container.innerHTML = related.map(p => {{
      const zidSlug = zidSlugMap[p.id] || p.id;
      const imgUrl = (p.img.startsWith('http') ? '' : ASSET_HOST) + p.img;
      return `
        <div class="p-2 sm:p-3 flex flex-col justify-between text-center group cursor-pointer bg-transparent border border-stone-100 rounded-2xl hover:border-black/20 hover:shadow-lg transition duration-300" onclick="NoteRouter.navigate('/products/${{zidSlug}}')">
          <div>
            <div class="relative bg-transparent aspect-square flex items-center justify-center mb-2 p-2 overflow-hidden">
              ${{p.tag ? `<span class="absolute top-2 right-2 z-10 text-[9px] font-medium px-2 py-0.5 rounded-full bg-black text-white whitespace-nowrap shadow-sm">${{p.tag}}</span>` : ''}}
              <img src="${{imgUrl}}" alt="${{p.title}}" loading="lazy" decoding="async" class="w-full h-full object-contain group-hover:scale-106 transition-transform duration-500 ease-out">
            </div>

            <div class="pt-1 pb-1 text-center space-y-1">
              <h4 class="text-xs sm:text-sm font-bold text-black group-hover:text-stone-600 transition line-clamp-1">${{p.title}}</h4>
              <p class="text-[10px] sm:text-[11px] text-stone-400 font-normal line-clamp-1">${{p.notes}}</p>
              
              <div class="flex items-center justify-center gap-2 pt-1">
                <span class="text-black font-extrabold text-xs sm:text-sm">${{p.price}} ر.س</span>
                <span class="text-stone-400 line-through text-[10px] sm:text-xs font-normal">${{p.old_price}} ر.س</span>
              </div>
            </div>
          </div>

          <button onclick="event.stopPropagation(); CartManager.addItem('${{p.id}}')" class="w-full mt-2.5 py-2 px-3 rounded-full bg-black text-white hover:bg-stone-800 active:scale-95 transition flex items-center justify-center gap-2 font-bold text-[11px] shadow-sm">
            <span>إضافة للسلة</span>
            <i class="sicon-shopping-bag text-xs"></i>
          </button>
        </div>
      `;
    }}).join('');
  }}

  // 16. Category Controller
  let activeCategory = 'all';
  let categorySearchQuery = '';
  let categorySort = 'popular';

  const categoryMeta = {{
    'all': {{
      title: 'جميع المنتجات',
      desc: 'تصفح المجموعة الكاملة من أروع إبداعات دار نوت للعطور، توليفات نيش استثنائية وباقات حصرية صُممت لتناسب ذوقك الرفيع.'
    }},
    'perfumes': {{
      title: 'العطور الفاخرة (100 مل)',
      desc: 'مجموعة العطور الأساسية بتركيز Extrait de Parfum وثبات يتجاوز 24 ساعة بمكونات نادرة مستخلصة بعناية.'
    }},
    'niche': {{
      title: 'عطور النيش الملكية',
      desc: 'أفخم ما أبدعته دار نوت العطرية، توليفات خاصة جداً تحاكي الترف والندرة بثبات وفوحان لا يُضاهى.'
    }},
    'bestsellers': {{
      title: 'الأكثر مبيعاً',
      desc: 'العطور الأكثر طلباً وشهرة لدى عملاء NOTE في المملكة والخليج، اختيارات مجربة ومحبوبة بإجماع الذواقة.'
    }},
    'new': {{
      title: 'أحدث المنتجات والإصدارات',
      desc: 'أحدث ابتكارات دار نوت للموسم الحالي، روائح عصرية مبتكرة تمنحك إطلالة فريدة ومتميزة.'
    }},
    'travel': {{
      title: 'عطور بيبي (30 مل)',
      desc: 'نفس تركيز العطور الأصلية الفاخرة بحجم مدمج 30 مل مثالي للحقيبة، السفر، السيارة والهدية الراقية.'
    }},
    'all-over': {{
      title: 'معطر للجسم بالكامل (All-Over Spray)',
      desc: 'رذاذ فاخر شامل للجسم والشعر يغمرك بانتعاش فوري خفيف وعبق آسر يدوم طوال اليوم.'
    }},
    'linen': {{
      title: 'معطرات الجو والمفارش',
      desc: 'تركيبات حصرية تملأ أرجاء منزلك ومفارشك بنفحات ملكية تدوم طويلاً وتضفي لمسة من البهجة والفخامة.'
    }},
    'body-care': {{
      title: 'منتجات العناية بالبشرة والجسم',
      desc: 'لوشنات وزيوت ترطيب فاخرة غنية بخلاصات العطور النقية لترطيب عميق ورائحة آسرة.'
    }},
    'tollah': {{
      title: 'تولات مِسك ودهن عود نقي',
      desc: 'أدهان نقية فاخرة ومسك مخلط بتركيز صافٍ لمحبي التميز والأصالة الشرقية الأصيلة.'
    }},
    'packages': {{
      title: 'مجموعات نوت والباقات الفاخرة',
      desc: 'باقات متكاملة ومجموعات هدايا راقية تجمع بين أجمل عطور الدار بأسعار استثنائية وتغليف ملوكي.'
    }}
  }};

  function selectCategory(cat, updateURL = true) {{
    activeCategory = cat || 'all';
    if (updateURL) {{
      const newUrl = catUrlMap[activeCategory] || `/categories`;
      window.history.pushState({{ path: newUrl }}, '', newUrl);
    }}

    // Update Pills
    document.querySelectorAll('.cat-pill').forEach(btn => {{
      btn.classList.remove('cat-pill-active', 'bg-black', 'text-white', 'border-black');
      btn.classList.add('border-stone-200', 'text-stone-700');
    }});
    const activeBtn = document.getElementById(`pill-${{activeCategory}}`);
    if (activeBtn) {{
      activeBtn.classList.add('cat-pill-active', 'bg-black', 'text-white', 'border-black');
      activeBtn.classList.remove('border-stone-200', 'text-stone-700');
    }}

    // Update Header Text
    const meta = categoryMeta[activeCategory] || categoryMeta['all'];
    const catTitle = document.getElementById('cat-title');
    if (catTitle) catTitle.textContent = meta.title;
    const catDesc = document.getElementById('cat-desc');
    if (catDesc) catDesc.textContent = meta.desc;
    document.title = `${{meta.title}} | دار نوت للعطور NOTE Perfumes`;

    renderCatalog();
  }}

  function handleCategorySearch(val) {{
    categorySearchQuery = (val || '').trim().toLowerCase();
    renderCatalog();
  }}

  function handleCategorySort(val) {{
    categorySort = val;
    renderCatalog();
  }}

  function resetCategoryFilters() {{
    categorySearchQuery = '';
    const searchInp = document.getElementById('cat-search-input');
    if (searchInp) searchInp.value = '';
    categorySort = 'popular';
    const sortSelect = document.getElementById('cat-sort-select');
    if (sortSelect) sortSelect.value = 'popular';
    selectCategory('all');
  }}

  function renderCatalog() {{
    const container = document.getElementById('catalog-products-grid');
    const noProducts = document.getElementById('cat-no-products');
    const countEl = document.getElementById('cat-products-count');
    if (!container) return;

    let filtered = [...noteProductsCatalog];

    // Filter by category
    if (activeCategory === 'bestsellers') {{
      filtered = filtered.filter(p => p.bestseller || (p.tag && p.tag.includes('مبيعاً')) || (p.tag && p.tag.includes('طلباً')));
    }} else if (activeCategory === 'new') {{
      filtered = filtered.filter(p => (p.tag && p.tag.includes('جديد')) || (p.tag && p.tag.includes('حصري')) || p.id.includes('niche'));
    }} else if (activeCategory !== 'all') {{
      filtered = filtered.filter(p => p.cat === activeCategory);
    }}

    // Filter by search
    if (categorySearchQuery) {{
      filtered = filtered.filter(p => 
        (p.title && p.title.toLowerCase().includes(categorySearchQuery)) ||
        (p.title_en && p.title_en.toLowerCase().includes(categorySearchQuery)) ||
        (p.notes && p.notes.toLowerCase().includes(categorySearchQuery)) ||
        (p.slogan && p.slogan.toLowerCase().includes(categorySearchQuery)) ||
        (p.description && p.description.toLowerCase().includes(categorySearchQuery))
      );
    }}

    // Sort
    if (categorySort === 'price-asc') {{
      filtered.sort((a, b) => a.price - b.price);
    }} else if (categorySort === 'price-desc') {{
      filtered.sort((a, b) => b.price - a.price);
    }} else if (categorySort === 'rating') {{
      filtered.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    }} else if (categorySort === 'newest') {{
      filtered.reverse();
    }}

    if (countEl) {{
      countEl.textContent = `عرض ${{filtered.length}} من ${{noteProductsCatalog.length}} منتج`;
    }}

    if (filtered.length === 0) {{
      container.innerHTML = '';
      if (noProducts) noProducts.classList.remove('hidden');
      return;
    }}

    if (noProducts) noProducts.classList.add('hidden');

    container.innerHTML = filtered.map(p => {{
      const zidSlug = zidSlugMap[p.id] || p.id;
      const imgUrl = (p.img.startsWith('http') ? '' : ASSET_HOST) + p.img;
      return `
        <div class="p-2 sm:p-3 flex flex-col justify-between text-center group cursor-pointer bg-transparent border border-stone-100 rounded-2xl hover:border-black/20 hover:shadow-lg transition duration-300" onclick="NoteRouter.navigate('/products/${{zidSlug}}')">
          <div>
            <div class="relative bg-transparent aspect-square flex items-center justify-center mb-2 p-2 sm:p-4 overflow-hidden">
              ${{p.tag ? `<span class="absolute top-2 right-2 z-10 text-[9px] sm:text-[10px] font-medium px-2 py-0.5 rounded-full bg-black text-white whitespace-nowrap shadow-sm">${{p.tag}}</span>` : ''}}
              <img src="${{imgUrl}}" alt="${{p.title}}" loading="lazy" decoding="async" class="w-full h-full object-contain group-hover:scale-106 transition-transform duration-500 ease-out">
            </div>

            <div class="pt-1 pb-1 text-center space-y-1">
              <h4 class="text-xs sm:text-sm font-bold text-black group-hover:text-stone-600 transition line-clamp-1">${{p.title}}</h4>
              <p class="text-[10px] sm:text-[11px] text-stone-400 font-normal line-clamp-1">${{p.notes}}</p>
              
              <div class="flex items-center justify-center gap-2 pt-1">
                <span class="text-black font-extrabold text-xs sm:text-sm">${{p.price}} ر.س</span>
                <span class="text-stone-400 line-through text-[10px] sm:text-xs font-normal">${{p.old_price}} ر.س</span>
              </div>
            </div>
          </div>

          <button onclick="event.stopPropagation(); CartManager.addItem('${{p.id}}')" class="w-full mt-2.5 py-2 px-3 rounded-full bg-black text-white hover:bg-stone-800 active:scale-95 transition flex items-center justify-center gap-2 font-bold text-[11px] sm:text-xs shadow-sm">
            <span>إضافة للسلة</span>
            <i class="sicon-shopping-bag text-xs"></i>
          </button>
        </div>
      `;
    }}).join('');
  }}

  // 17. Cart Page Controller
  let cartDiscountRate = 0;

  function renderCartPage() {{
    document.title = 'سلة المشتريات | دار نوت للعطور NOTE Perfumes';
    const itemsContainer = document.getElementById('cart-page-items');
    const emptyState = document.getElementById('cart-page-empty');
    const summaryWrapper = document.getElementById('cart-page-summary-wrapper');
    const freeShippingText = document.getElementById('page-free-shipping-text');
    const freeShippingBar = document.getElementById('page-free-shipping-bar');

    if (!itemsContainer) return;

    const cart = CartManager.getCart();
    const total = CartManager.getTotal();
    const freeShippingThreshold = 300;

    if (cart.length === 0) {{
      itemsContainer.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      if (summaryWrapper) summaryWrapper.classList.add('hidden');
      if (freeShippingBar) freeShippingBar.style.width = '0%';
      if (freeShippingText) freeShippingText.textContent = 'أضف منتجات بقيمة 300 ر.س لتحصل على شحن مجاني';
      return;
    }}

    if (emptyState) emptyState.classList.add('hidden');
    if (summaryWrapper) summaryWrapper.classList.remove('hidden');

    if (freeShippingBar && freeShippingText) {{
      const percentage = Math.min(100, Math.round((total / freeShippingThreshold) * 100));
      freeShippingBar.style.width = percentage + '%';
      if (total >= freeShippingThreshold) {{
        freeShippingText.innerHTML = '<span class="text-emerald-600 font-bold">🎉 تهانينا! لقد حصلت على شحن مجاني لكافة مدن المملكة</span>';
      }} else {{
        const remaining = freeShippingThreshold - total;
        freeShippingText.innerHTML = `متبقي <strong class="text-black font-extrabold">${{remaining}} ر.س</strong> للحصول على <span class="font-bold text-emerald-600">شحن مجاني</span>`;
      }}
    }}

    itemsContainer.innerHTML = cart.map(item => {{
      const zidSlug = zidSlugMap[item.id] || item.id;
      const imgUrl = (item.img.startsWith('http') ? '' : ASSET_HOST) + item.img;
      return `
        <div class="py-4 sm:py-6 flex items-center justify-between gap-4 text-right">
          <div class="flex items-center gap-3 sm:gap-4 flex-grow">
            <a href="/products/${{zidSlug}}" onclick="NoteRouter.navigate('/products/${{zidSlug}}')" class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-stone-50 p-2 flex-shrink-0 flex items-center justify-center border border-stone-200/80 block">
              <img src="${{imgUrl}}" alt="${{item.title}}" class="w-full h-full object-contain">
            </a>
            <div class="space-y-1">
              <a href="/products/${{zidSlug}}" onclick="NoteRouter.navigate('/products/${{zidSlug}}')" class="hover:underline">
                <h4 class="text-xs sm:text-sm font-bold text-black">${{item.title}}</h4>
              </a>
              <span class="text-[11px] text-stone-400 block">${{item.size || '100 مل'}}</span>
              <span class="text-xs font-bold text-black sm:hidden block">${{item.price}} ر.س</span>
            </div>
          </div>

          <!-- Quantity Stepper -->
          <div class="flex items-center border border-stone-200 rounded-full h-8 px-2 sm:px-3 gap-2 sm:gap-3 text-xs font-bold bg-white">
            <button onclick="CartManager.updateQuantity('${{item.id}}', -1); renderCartPage();" class="text-stone-500 hover:text-black w-4 text-center">-</button>
            <span class="min-w-[16px] text-center">${{item.quantity}}</span>
            <button onclick="CartManager.updateQuantity('${{item.id}}', 1); renderCartPage();" class="text-stone-500 hover:text-black w-4 text-center">+</button>
          </div>

          <!-- Total for line -->
          <div class="hidden sm:block text-left min-w-[80px]">
            <span class="text-sm font-extrabold text-black">${{item.price * item.quantity}} ر.س</span>
          </div>

          <!-- Delete -->
          <button onclick="CartManager.removeItem('${{item.id}}'); renderCartPage();" class="text-stone-400 hover:text-rose-600 transition p-1" title="حذف">
            <i class="sicon-trash text-base"></i>
          </button>
        </div>
      `;
    }}).join('');

    updateCartFinancials(total);
  }}

  function applyCartCoupon() {{
    const inp = document.getElementById('coupon-code-input');
    const msg = document.getElementById('coupon-msg');
    if (!inp || !msg) return;
    const code = inp.value.trim().toUpperCase();
    if (code === 'NOTE10' || code === 'GOLD' || code === 'NOTE2026') {{
      cartDiscountRate = 0.10;
      msg.textContent = 'تم تطبيق خصم 10% بنجاح!';
      msg.className = 'text-[11px] font-bold text-emerald-600 block';
    }} else {{
      cartDiscountRate = 0;
      msg.textContent = 'رمز الكوبون غير صالح أو منتهي الصلاحية';
      msg.className = 'text-[11px] font-bold text-rose-600 block';
    }}
    updateCartFinancials(CartManager.getTotal());
  }}

  function updateCartFinancials(subtotal) {{
    const subtotalEl = document.getElementById('page-subtotal');
    const discountRow = document.getElementById('discount-row');
    const discountEl = document.getElementById('page-discount');
    const shippingEl = document.getElementById('page-shipping');
    const grandTotalEl = document.getElementById('page-grand-total');

    if (subtotalEl) subtotalEl.textContent = `${{subtotal}} ر.س`;

    let discountAmount = 0;
    if (cartDiscountRate > 0) {{
      discountAmount = Math.round(subtotal * cartDiscountRate);
      if (discountRow) discountRow.classList.remove('hidden');
      if (discountEl) discountEl.textContent = `- ${{discountAmount}} ر.س`;
    }} else {{
      if (discountRow) discountRow.classList.add('hidden');
    }}

    let shippingCost = 0;
    if (subtotal < 300 && subtotal > 0) {{
      shippingCost = 25;
      if (shippingEl) shippingEl.textContent = '25 ر.س';
    }} else {{
      if (shippingEl) shippingEl.textContent = 'مجاني';
    }}

    const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);
    if (grandTotalEl) grandTotalEl.textContent = `${{grandTotal}} ر.س`;
  }}

  function proceedToCheckout() {{
    const modal = document.getElementById('checkout-modal');
    if (modal) {{
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }}
  }}

  // 18. Contact Form Handler
  function handleContactSubmit(e) {{
    e.preventDefault();
    const successEl = document.getElementById('contact-success-msg');
    if (successEl) successEl.classList.remove('hidden');
    e.target.reset();
    setTimeout(() => {{
      if (successEl) successEl.classList.add('hidden');
    }}, 5000);
  }}

  // 19. Router Engine
  const NoteRouter = {{
    resolveProductId: function(path, params) {{
      if (params.get('id')) return params.get('id');
      const decoded = decodeURIComponent(path).toLowerCase();
      for (const p of noteProductsCatalog) {{
        if (decoded.includes(p.id)) return p.id;
      }}
      for (const k in zidSlugMap) {{
        if (decoded.includes(zidSlugMap[k])) return k;
      }}
      for (const p of noteProductsCatalog) {{
        const cleanTitle = p.title.replace('عطر ', '').trim().toLowerCase();
        if (decoded.includes(cleanTitle)) return p.id;
      }}
      return 'roayal-tobacco';
    }},

    resolveCategory: function(path, params) {{
      if (params.get('cat')) return params.get('cat');
      const decoded = decodeURIComponent(path).toLowerCase();
      if (decoded.includes('perfumes')) return 'perfumes';
      if (decoded.includes('نيش') || decoded.includes('niche')) return 'niche';
      if (decoded.includes('مبيعا') || decoded.includes('bestseller')) return 'bestsellers';
      if (decoded.includes('new')) return 'new';
      if (decoded.includes('30ml') || decoded.includes('travel')) return 'travel';
      if (decoded.includes('all-over') || decoded.includes('جسم')) return 'all-over';
      if (decoded.includes('package') || decoded.includes('مجموعات')) return 'packages';
      if (decoded.includes('linen') || decoded.includes('معطرات')) return 'linen';
      if (decoded.includes('tollah') || decoded.includes('تول')) return 'tollah';
      if (decoded.includes('body') || decoded.includes('عناية')) return 'body-care';
      return 'all';
    }},

    detectRoute: function() {{
      const path = decodeURIComponent(window.location.pathname).toLowerCase();
      const params = new URLSearchParams(window.location.search);

      if (path.includes('/product') || params.has('id')) {{
        return {{ route: 'product', id: this.resolveProductId(path, params) }};
      }}
      if (path.includes('/categor') || params.has('cat')) {{
        return {{ route: 'category', cat: this.resolveCategory(path, params) }};
      }}
      if (path.includes('/cart')) {{
        return {{ route: 'cart' }};
      }}
      if (path.includes('/faq')) {{
        return {{ route: 'faqs' }};
      }}
      if (path.includes('/contact')) {{
        return {{ route: 'contact' }};
      }}
      if (path.includes('/privacy')) {{
        return {{ route: 'privacy' }};
      }}
      if (path.includes('/terms')) {{
        return {{ route: 'terms' }};
      }}
      if (path.includes('/refund')) {{
        return {{ route: 'refund' }};
      }}
      return {{ route: 'home' }};
    }},

    navigate: function(url) {{
      if (!url) return;
      if (url.startsWith('http') && !url.includes(window.location.hostname)) {{
        window.location.href = url;
        return;
      }}
      window.history.pushState({{ path: url }}, '', url);
      this.route();
      window.scrollTo({{ top: 0, behavior: 'instant' }});
    }},

    route: function() {{
      const target = this.detectRoute();
      console.log("NOTE Router Target:", target);

      const contentEl = document.getElementById('page-content');
      if (!contentEl) {{
        console.warn("page-content container missing, re-mounting shell...");
        mountShell();
        return;
      }}

      // Reset scroll listeners
      window.removeEventListener('scroll', handleHeaderScroll);

      if (target.route === 'home') {{
        document.title = "NOTE Perfumes | دار نوت للعطور الفاخرة";
        contentEl.innerHTML = T.home;
        initSliders();
        initHeroCarousel();
        initOffersCarousel();
        handleHeaderScroll();
        window.addEventListener('scroll', handleHeaderScroll, {{ passive: true }});
      }} else if (target.route === 'product') {{
        contentEl.innerHTML = T.product;
        initPDP(target.id);
        handleHeaderScroll();
      }} else if (target.route === 'category') {{
        contentEl.innerHTML = T.category;
        selectCategory(target.cat, false);
        handleHeaderScroll();
      }} else if (target.route === 'cart') {{
        contentEl.innerHTML = T.cart;
        renderCartPage();
        handleHeaderScroll();
      }} else if (target.route === 'faqs') {{
        document.title = "الأسئلة الشائعة ومركز المساعدة | NOTE Perfumes";
        contentEl.innerHTML = T.faqs;
        handleHeaderScroll();
      }} else if (target.route === 'contact') {{
        document.title = "تواصل معنا | دار نوت للعطور NOTE Perfumes";
        contentEl.innerHTML = T.contact;
        handleHeaderScroll();
      }} else if (target.route === 'privacy') {{
        document.title = "سياسة الخصوصية | دار نوت للعطور NOTE Perfumes";
        contentEl.innerHTML = T.privacy;
        handleHeaderScroll();
      }} else if (target.route === 'terms') {{
        document.title = "الشروط والأحكام | دار نوت للعطور NOTE Perfumes";
        contentEl.innerHTML = T.terms;
        handleHeaderScroll();
      }} else if (target.route === 'refund') {{
        document.title = "سياسة الاستبدال والاسترجاع والضمان الذهبي | NOTE Perfumes";
        contentEl.innerHTML = T.refund;
        handleHeaderScroll();
      }}

      CartManager.updateBadge();
    }}
  }};

  // 20. Shell Mounter
  function mountShell() {{
    const mainEl = document.querySelector('.tp-home') || 
                   document.querySelector('.main.app-content') || 
                   document.querySelector('.app-content') || 
                   document.querySelector('main') || 
                   document.body;

    if (!mainEl) {{
      setTimeout(mountShell, 50);
      return;
    }}

    // Remove Rozia footers, headers and native sections
    document.querySelectorAll('[section-id], footer:not(#note-store-footer), .tp-footer-area, .tp-bar-header, header.header-nav, .whatsapp-icon, .footer').forEach(el => {{
      el.remove();
    }});

    // Check if storefront shell already mounted
    let shell = document.getElementById('note-luxury-storefront');
    if (!shell) {{
      mainEl.innerHTML = '';
      shell = document.createElement('div');
      shell.id = 'note-luxury-storefront';
      shell.className = 'w-full bg-white text-black antialiased selection:bg-black selection:text-white min-h-screen flex flex-col justify-between';
      
      shell.innerHTML = `
        ${{T.header}}
        <div id="page-content" class="w-full flex-grow"></div>
        ${{T.footer}}
        ${{T.modals}}
        ${{T.drawer}}
      `;

      mainEl.appendChild(shell);

      // Clean up duplicate native Rozia injections
      const cleanupInterval = setInterval(() => {{
        document.querySelectorAll('[section-id], footer:not(#note-store-footer), .tp-footer-area, .tp-bar-header, header.header-nav, .whatsapp-icon, .footer').forEach(el => el.remove());
        Array.from(mainEl.children).forEach(child => {{
          if (child !== shell && child.id !== 'note-luxury-storefront') {{
            child.remove();
          }}
        }});
      }}, 300);
      setTimeout(() => clearInterval(cleanupInterval), 3000);
    }}

    // Route to current page
    NoteRouter.route();
  }}

  // 21. Global Link Interception for Instant SPA Navigation
  document.addEventListener('click', function(e) {{
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;

    if (href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:') || href.includes('wa.me')) {{
      return;
    }}
    if (a.getAttribute('target') === '_blank') {{
      return;
    }}

    if (href.startsWith('/') || href.startsWith('./') || href.includes(window.location.hostname)) {{
      e.preventDefault();
      closeMobileMenu();
      closeSearchModal();
      CartManager.closeDrawer();
      NoteRouter.navigate(href);
    }}
  }});

  // Handle browser back/forward
  window.addEventListener('popstate', function() {{
    NoteRouter.route();
  }});

  // Global Exports for Inlined HTML Handlers
  window.productsData = productsData;
  window.noteProductsCatalog = noteProductsCatalog;
  window.CartManager = CartManager;
  window.NoteRouter = NoteRouter;
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

  // PDP Handlers
  window.changePDPQuantity = changePDPQuantity;
  window.addToCartCurrentProduct = addToCartCurrentProduct;
  window.buyNowCurrentProduct = buyNowCurrentProduct;

  // Category Handlers & Aliases
  window.selectCategory = selectCategory;
  window.handleCategorySearch = handleCategorySearch;
  window.handleCategorySort = handleCategorySort;
  window.resetCategoryFilters = resetCategoryFilters;
  window.handleSearch = handleCategorySearch;
  window.handleSort = handleCategorySort;
  window.resetFilters = resetCategoryFilters;
  window.focusSearchInput = function() {{
    const el = document.getElementById('cat-search-input');
    if (el) el.focus();
  }};

  // Cart Page Handlers & Aliases
  window.renderCartPage = renderCartPage;
  window.applyCartCoupon = applyCartCoupon;
  window.applyCoupon = applyCartCoupon;
  window.updateCartItemQty = function(id, delta) {{
    CartManager.updateQuantity(id, delta);
    renderCartPage();
  }};
  window.removeCartItem = function(id) {{
    CartManager.removeItem(id);
    renderCartPage();
  }};
  window.clearAndGoHome = function() {{
    localStorage.removeItem('note_cart');
    NoteRouter.navigate('/');
  }};
  window.proceedToCheckout = proceedToCheckout;
  window.handleContactSubmit = handleContactSubmit;

  if (document.readyState === 'loading') {{
    document.addEventListener('DOMContentLoaded', mountShell);
  }} else {{
    mountShell();
  }}
}})();
"""

with open(OUT_JS, "w", encoding="utf-8") as f:
    f.write(app_js_code)
print(f"Generated {OUT_JS} ({os.path.getsize(OUT_JS)} bytes)")

