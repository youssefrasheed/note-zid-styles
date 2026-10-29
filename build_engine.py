#!/usr/bin/env python3
import os
import re
import json
from apply_live_fixes import apply_live_fixes
from patch_startup import fix_startup, fix_startup_css

ASSET_HOST = "https://youssefrasheed.github.io/note-zid-styles"
PREVIEW_DIR = os.path.dirname(os.path.abspath(__file__))

OUT_JS = os.path.join(PREVIEW_DIR, "note-app.js")
OUT_CSS = os.path.join(PREVIEW_DIR, "note.css")

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
cart_drawer_html = cart_drawer_html.replace('<div class="px-5 py-3 bg-stone-50 border-b border-stone-100">', '<div hidden class="px-5 py-3 bg-stone-50 border-b border-stone-100">')
cart_drawer_html = re.sub(r'<div([^>]*id="cart-free-shipping[^>]*)(>)', r'<div hidden \1\2', cart_drawer_html)

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
cart_template = cart_template.replace('الإجمالي النهائي:', 'إجمالي المنتجات قبل الشحن والخصومات:')
cart_template = cart_template.replace('خصم الكوبون (10%):', 'خصم الكوبون:')
cart_template = re.sub(r'<!-- Free Shipping Meter -->.*?(?=<div class="grid grid-cols-1 lg:grid-cols-12)', '', cart_template, flags=re.S)

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

/* Category Filter Pills Container - Sticky Responsive Smooth Scroll */
.cat-pills-container,
#category-pills-bar {{
  display: flex !important;
  justify-content: flex-start !important;
  align-items: center !important;
  gap: 8px !important;
  overflow-x: auto !important;
  overflow-y: hidden !important;
  -webkit-overflow-scrolling: touch !important;
  white-space: nowrap !important;
  scroll-behavior: smooth !important;
}}

.cat-pills-break {{
  display: none !important;
}}

@media (min-width: 768px) {{
  .cat-pills-container,
  #category-pills-bar {{
    flex-wrap: wrap !important;
    justify-content: center !important;
    overflow: visible !important;
    white-space: normal !important;
  }}
  .cat-pills-break {{
    display: block !important;
    flex-basis: 100% !important;
    width: 100% !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }}
}}

.cat-pill {{
  white-space: nowrap !important;
  flex-shrink: 0 !important;
}}

/* Active Nav Links Underline (100% Reference Parity) */
#nav-links a.border-b-2,
header nav a.border-b-2,
#nav-links a.active-link,
header nav a.active-link {{
  border-bottom: 2px solid currentColor !important;
  padding-bottom: 2px !important;
  opacity: 1 !important;
}}

#nav-links a:not(.active-link),
header nav a:not(.active-link) {{
  border-bottom: 2px solid transparent !important;
  padding-bottom: 2px !important;
}}

/* Bottom Navigation Bar Cart Badge Perfect Centering */
.cart-badge,
.header-sm .cart-badge,
.cart-sm .cart-badge,
.cart-btn .cart-badge {{
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  line-height: 1 !important;
  direction: ltr !important;
  min-width: 18px !important;
  height: 18px !important;
  padding: 0 2px !important;
  margin: 0 !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
  font-feature-settings: "tnum" !important;
  font-variant-numeric: tabular-nums !important;
  font-size: 11px !important;
  font-weight: 800 !important;
  border-radius: 9999px !important;
  box-sizing: border-box !important;
  position: absolute !important;
  top: -5px !important;
  left: -2px !important;
  background-color: #f44336 !important;
  color: #ffffff !important;
}}

/* Product Badge / Discount Tag (Transparent Luxury Pill with Crisp Dark Text) */
.note-product-badge:not(.note-out-of-stock-sticker):not(.out-of-stock),
#pdp-tag-badge,
#pdp-discount-badge {{
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Tajawal", Arial, sans-serif !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  line-height: 1.2 !important;
  padding: 3px 8.5px !important;
  min-height: 22px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 4px !important;
  direction: rtl !important;
  white-space: nowrap !important;
  box-sizing: border-box !important;
  background: rgba(255, 255, 255, 0.78) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  border: 1px solid rgba(0, 0, 0, 0.18) !important;
  border-radius: 9999px !important;
  color: #111111 !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
}}

.note-product-badge:not(.note-out-of-stock-sticker):not(.out-of-stock) bdi,
#pdp-tag-badge bdi,
#pdp-discount-badge bdi,
.note-vat-rate,
.note-percent-val,
#cart-page-summary-wrapper bdi,
#cart-drawer-footer bdi {{
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Tajawal", Arial, sans-serif !important;
  font-weight: 700 !important;
  direction: ltr !important;
  unicode-bidi: isolate !important;
  display: inline-block !important;
}}

@media (max-width: 639px) {{
  .note-product-badge:not(.note-out-of-stock-sticker):not(.out-of-stock),
  #pdp-tag-badge,
  #pdp-discount-badge {{
    font-size: 10px !important;
    padding: 2.5px 7px !important;
    min-height: 20px !important;
  }}
}}

/* Out of Stock ("غير متاح") Luxury Sticker & State */
.note-out-of-stock-sticker,
.out-of-stock,
.tp-product-image .out-of-stock {{
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) rotate(-18deg) !important;
  z-index: 25 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: max-content !important;
  height: max-content !important;
  background: rgba(225, 29, 72, 0.82) !important;
  backdrop-filter: blur(4px) !important;
  -webkit-backdrop-filter: blur(4px) !important;
  color: #ffffff !important;
  font-family: inherit !important;
  font-size: 11px !important;
  font-weight: 800 !important;
  letter-spacing: 0.5px !important;
  padding: 4px 14px !important;
  border-radius: 9999px !important;
  border: 1.5px solid rgba(255, 255, 255, 0.85) !important;
  box-shadow: 0 4px 14px rgba(225, 29, 72, 0.25) !important;
  pointer-events: none !important;
  white-space: nowrap !important;
}}

@media (min-width: 640px) {{
  .note-out-of-stock-sticker,
  .out-of-stock,
  .tp-product-image .out-of-stock {{
    font-size: 12px !important;
    padding: 5px 16px !important;
  }}
}}

.note-out-of-stock-sticker.pdp-sticker {{
  font-size: 14px !important;
  padding: 6px 22px !important;
  border-width: 2px !important;
  box-shadow: 0 6px 20px rgba(225, 29, 72, 0.4) !important;
}}

@media (min-width: 640px) {{
  .note-out-of-stock-sticker.pdp-sticker {{
    font-size: 16px !important;
    padding: 8px 26px !important;
  }}
}}

.is-out-of-stock img,
.product-item-out-of-stock img,
#pdp-main-image-container.is-out-of-stock #pdp-main-image {{
  filter: grayscale(0.55) opacity(0.85) !important;
  transition: filter 0.3s ease !important;
}}

/* Recommended Products Modern Desktop & Mobile Scroll */
.note-compact-recs {{
  display: flex !important;
  gap: 8px !important;
  overflow-x: auto !important;
  scrollbar-width: thin !important;
  scrollbar-color: #d6d3d1 transparent !important;
  scroll-snap-type: none !important;
  padding: 4px 2px 6px !important;
  width: 100% !important;
  max-width: 100% !important;
  overscroll-behavior-x: contain !important;
  -webkit-overflow-scrolling: touch !important;
  cursor: grab !important;
  user-select: none !important;
}}
.note-compact-recs:active {{
  cursor: grabbing !important;
}}
.note-compact-recs::-webkit-scrollbar {{
  display: block !important;
  height: 4px !important;
}}
.note-compact-recs::-webkit-scrollbar-track {{
  background: #f5f5f4 !important;
  border-radius: 9999px !important;
}}
.note-compact-recs::-webkit-scrollbar-thumb {{
  background: #d6d3d1 !important;
  border-radius: 9999px !important;
}}
.note-compact-recs::-webkit-scrollbar-thumb:hover {{
  background: #78716c !important;
}}

.note-recs-nav {{
  display: inline-flex !important;
  align-items: center !important;
  gap: 4px !important;
}}
.note-recs-btn {{
  width: 22px !important;
  height: 22px !important;
  border-radius: 9999px !important;
  border: 1px solid #e7e5e4 !important;
  background: #ffffff !important;
  color: #1c1917 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.15s ease !important;
  padding: 0 !important;
  flex-shrink: 0 !important;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04) !important;
}}
.note-recs-btn:hover {{
  background: #000000 !important;
  color: #ffffff !important;
  border-color: #000000 !important;
}}
.note-recs-btn:active {{
  transform: scale(0.92) !important;
}}

/* Floating WhatsApp Button - Elevated above Mobile Bottom Navigation */
#floating-whatsapp-container {{
  bottom: calc(90px + env(safe-area-inset-bottom, 0px)) !important;
  left: 16px !important;
  margin-bottom: 0 !important;
}}

@media (min-width: 640px) {{
  #floating-whatsapp-container {{
    bottom: 24px !important;
    left: 24px !important;
    margin-bottom: 0 !important;
  }}
}}

/* Continuous Luxury Brand Loader - Active from frame 0 until .note-ready is added */
body:not(.note-ready)::before {{
  content: "" !important;
  position: fixed !important;
  inset: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  height: 100dvh !important;
  background-color: #ffffff !important;
  background-image: url('{ASSET_HOST}/logo_dark_crisp.png') !important;
  background-repeat: no-repeat !important;
  background-position: center calc(50% - 25px) !important;
  background-size: 130px auto !important;
  z-index: 99999999 !important;
  pointer-events: all !important;
  opacity: 1 !important;
  visibility: visible !important;
  animation: noteLoaderPulse 2s ease-in-out infinite !important;
  transition: opacity 0.4s ease-out, visibility 0.4s ease-out !important;
}}

body:not(.note-ready)::after {{
  content: "" !important;
  position: fixed !important;
  top: calc(50% + 40px) !important;
  left: 50% !important;
  margin-left: -13px !important;
  width: 26px !important;
  height: 26px !important;
  border: 2.5px solid #eceae5 !important;
  border-top-color: #121212 !important;
  border-radius: 50% !important;
  z-index: 999999999 !important;
  animation: noteSpinRing 0.75s linear infinite !important;
  pointer-events: none !important;
  opacity: 1 !important;
  visibility: visible !important;
  transition: opacity 0.4s ease-out, visibility 0.4s ease-out !important;
}}

body.note-ready::before,
body.note-ready::after {{
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}}

@keyframes noteLoaderPulse {{
  0%, 100% {{
    transform: scale(1);
    opacity: 1;
  }}
  50% {{
    transform: scale(0.96);
    opacity: 0.75;
  }}
}}

@keyframes noteSpinRing {{
  to {{ transform: rotate(360deg); }}
}}

body[class*="checkout"]::before,
body[class*="checkout"]::after,
body[class*="auth"]::before,
body[class*="auth"]::after,
body[class*="account"]::before,
body[class*="account"]::after {{
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
}}

#loader-container {{
  display: none !important;
}}

body:not(.note-ready) section[section-id],
body:not(.note-ready) .tp-home,
body:not(.note-ready) .tp-bar-header,
body:not(.note-ready) header.header-nav,
body:not(.note-ready) footer:not(#note-store-footer) {{
  display: none !important;
  visibility: hidden !important;
}}

/* Slide-out Cart Drawer Architecture */
#cart-drawer {{
  display: flex !important;
  flex-direction: column !important;
  height: 100vh !important;
  height: 100dvh !important;
  max-height: 100dvh !important;
  overflow: hidden !important;
}}
#cart-drawer-items {{
  flex: 1 1 auto !important;
  overflow-y: auto !important;
  min-height: 160px !important;
  max-height: calc(100dvh - 280px) !important;
  padding: 12px 16px !important;
  overscroll-behavior: contain !important;
  -webkit-overflow-scrolling: touch !important;
}}
.note-cart-item {{
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 10px 12px !important;
  margin-bottom: 8px !important;
  background: #ffffff !important;
  border: 1px solid #f0eee9 !important;
  border-radius: 14px !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.03) !important;
  text-align: right !important;
}}
#cart-drawer-recommendations {{
  padding: 6px 14px !important;
  margin: 0 !important;
  background: #fafaf9 !important;
  border-top: 1px solid #f0eee9 !important;
  border-bottom: 1px solid #f0eee9 !important;
  flex-shrink: 0 !important;
}}
#cart-drawer-footer {{
  padding: 12px 16px 14px !important;
  border-top: 1px solid #f0eee9 !important;
  background: #ffffff !important;
  flex-shrink: 0 !important;
}}
"""

suppression_css = fix_startup_css(suppression_css)

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
 * Authentic NOTE Perfumes Storefront Engine
 * Hosted via GitHub Pages CDN: {ASSET_HOST}/
 */
(function() {{
  "use strict";
  // Hook and preserve Zid's native loader animation until the storefront is fully stabilized
  const zidLoaderEl = document.getElementById('loader-container');
  if (zidLoaderEl) {{
    zidLoaderEl._origRemove = zidLoaderEl.remove;
    zidLoaderEl.remove = function() {{
      // Intercept Rozia early deletion
    }};
  }}
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
    'royal-powder': 'رويال-باودر',
    'pkg-linen-collection': 'مجموعة-معطرات-الجو-و-المفارش',
    'مجموعة-معطرات-الجو-و-المفارش': 'مجموعة-معطرات-الجو-و-المفارش'
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

  // Universal Price Formatter: Guarantees consistent 'X ر.س' with zero duplication
  function formatPrice(val) {{
    if (val === null || val === undefined || val === '' || val === 'null' || val === 'undefined') return '';
    const clean = String(val).replace(/ر\.س/g, '').replace(/SAR/gi, '').trim();
    return clean ? `${{clean}} ر.س` : '';
  }}

  // 5. Products Data
  const productsData = {products_data_json_str};
  const noteProductsCatalog = {full_catalog_str};

  // Official Zid Product UUID Mapping (All 39 Storefront Items)
  const ZID_PRODUCT_MAP = {{
    'roayal-tobacco': '764d587d-7cba-46b3-8d34-265ee4bc4b6a',
    'royal-tobacco': '764d587d-7cba-46b3-8d34-265ee4bc4b6a',
    'oud-rosewood': '7a28376c-3973-4822-b6b2-b3a6a4e7013e',
    'musk': '9ba63129-20bc-4a0f-b49f-17d06e130ad9',
    'note-musk': '9ba63129-20bc-4a0f-b49f-17d06e130ad9',
    'مسك': '9ba63129-20bc-4a0f-b49f-17d06e130ad9',
    'aura': '54805f9b-53c4-4e4c-a75a-5173eda716c8',
    'bn': '9be5ff2f-3d33-4402-b511-e099805c681d',
    'powderose': 'b99d66f3-c201-4de6-af2d-4e991f483a6b',
    'note-gold': '5d98daa5-1b6b-4196-a0d8-f51631cb1f51',
    'نوت-قولد-الطلب-المسبق': '5d98daa5-1b6b-4196-a0d8-f51631cb1f51',
    'musk-bukhor': '4251cc74-23ba-45b0-9268-03b740df88bd',
    'مسك-بخور': '4251cc74-23ba-45b0-9268-03b740df88bd',
    'note-phantom': '08874f48-8caf-441f-876b-de578508105a',
    'note-for-him': 'cc5e1bb2-bebc-4ef7-9e1b-af52362bc852',
    'note-for-her': '21b12ed7-3415-44d5-b135-4782b295d4b7',
    'for-her': '21b12ed7-3415-44d5-b135-4782b295d4b7',
    'royal-powder': '1c6e8d65-9c1e-42d8-a9c3-265e7daa1a81',
    'رويال-باودر': '1c6e8d65-9c1e-42d8-a9c3-265e7daa1a81',
    'attraction': 'fe61d38b-6088-46d8-a88c-f44e64e5991a',
    'niche-oud': '809c89af-6e6f-44fa-99a2-ac1f13418e0a',
    'niche-royal-leather': '620ef67b-39ba-41f0-a4f2-f9ce56cf3b1c',
    'niche-blue': 'c6380d1f-f89b-4914-a194-3d82f56af915',
    'niche-amber': '8c331e9f-18cf-46d8-81e1-94a80ed45224',
    'choconilla': '7a9286bf-4d38-447a-9b9f-fcd006e35e9b',
    'all-over-choconilla': '7a9286bf-4d38-447a-9b9f-fcd006e35e9b',
    'bahr': '7de839f3-86a9-4fac-ba15-fad102696e73',
    'بحر': '7de839f3-86a9-4fac-ba15-fad102696e73',
    'all-over-bahr': '7de839f3-86a9-4fac-ba15-fad102696e73',
    'asal': 'fe2daa2f-28ca-4342-8c7e-2b8e8dbbc95a',
    'عسل': 'fe2daa2f-28ca-4342-8c7e-2b8e8dbbc95a',
    'بحر-1': 'fe2daa2f-28ca-4342-8c7e-2b8e8dbbc95a',
    'all-over-asal': 'fe2daa2f-28ca-4342-8c7e-2b8e8dbbc95a',
    'powderose-all-over-soray': '8bdd1101-df55-4f0e-8645-f6c669932b69',
    'all-over-powderose': '8bdd1101-df55-4f0e-8645-f6c669932b69',
    'powderose-spray': '8bdd1101-df55-4f0e-8645-f6c669932b69',
    'all-over-spray-tuffi': '5ab145fc-2c1c-4a17-9e1e-926c863b0934',
    'all-over-note-tuffi': '5ab145fc-2c1c-4a17-9e1e-926c863b0934',
    'عطر-نوت-توفي': '5ab145fc-2c1c-4a17-9e1e-926c863b0934',
    'tuffi-spray': '5ab145fc-2c1c-4a17-9e1e-926c863b0934',
    'all-over-spray-royal-tobacco': '5d373011-9e95-472c-bec6-51fd8ed457dc',
    'all-over-royal-tobacco': '5d373011-9e95-472c-bec6-51fd8ed457dc',
    'royal-tobacco-spray': '5d373011-9e95-472c-bec6-51fd8ed457dc',
    'baby-for-him': 'b842b800-4943-437a-914c-5150b2b7e119',
    'for-him-30ml': 'b842b800-4943-437a-914c-5150b2b7e119',
    'baby-for-her': 'b6a05619-9007-4453-9c5b-f53b56f37613',
    'for-her-30ml': 'b6a05619-9007-4453-9c5b-f53b56f37613',
    'baby-powderose': 'a8b86b67-4c55-447a-8645-83bdd50ded3b',
    'powderose-30ml': 'a8b86b67-4c55-447a-8645-83bdd50ded3b',
    'baby-royal-tobacco': '8f727798-26e3-44ac-af64-473b55971ad3',
    'royal-tobacco-30ml': '8f727798-26e3-44ac-af64-473b55971ad3',
    'baby-oud-rosewood': 'ad7d2b47-8ca2-447a-8d9e-ab32bf379425',
    'oud-rosewood-30ml': 'ad7d2b47-8ca2-447a-8d9e-ab32bf379425',
    'tollah-musk-tuffi': '95f09483-d32f-44f5-a91d-16fb85567e65',
    'note-toffe': '95f09483-d32f-44f5-a91d-16fb85567e65',
    'musk-toffee-oil': '95f09483-d32f-44f5-a91d-16fb85567e65',
    'tollah-sugar-oud': 'dcea75e0-ac06-424d-a0ac-0bd94848b9c6',
    'sugar-oud': 'dcea75e0-ac06-424d-a0ac-0bd94848b9c6',
    'tollah-lady-rose': '0dda8a6b-c912-4d29-8f97-cf4cfe072409',
    'lady-rose': '0dda8a6b-c912-4d29-8f97-cf4cfe072409',
    'tollah-amber-musk': 'f0206dc9-332b-44e1-b05e-827ffa61ba40',
    'amber-musk-oil': 'f0206dc9-332b-44e1-b05e-827ffa61ba40',
    'tollah-pure-tuffi': '1f091171-fc32-4414-b1fc-35694f8008f3',
    'pure-tuffi': '1f091171-fc32-4414-b1fc-35694f8008f3',
    'معطر-الجو-و-المفارش-رويال-توباكو': 'd9779e9f-411a-43c7-8142-09e882baacee',
    'linen-royal-tobacco': 'd9779e9f-411a-43c7-8142-09e882baacee',
    'معطر-الجو-و-المفارش-باودر-روز': '3bc8e5e4-a805-40f7-9bb1-fb0038fb3c37',
    'linen-powderose': '3bc8e5e4-a805-40f7-9bb1-fb0038fb3c37',
    'معطر-الجو-و-المفارش-عود-روز-وود': '8a62dee7-ea33-4c54-a39a-ca25096701b9',
    'linen-oud-rosewood': '8a62dee7-ea33-4c54-a39a-ca25096701b9',
    'مجموعة-معطرات-الجو-و-المفارش': '83561f07-7f51-43a4-a632-2030d6b71bc1',
    'pkg-linen-collection': '83561f07-7f51-43a4-a632-2030d6b71bc1',
    'linen-collection': '83561f07-7f51-43a4-a632-2030d6b71bc1',
    'مرطب-و-شور-جل': '0fc4a4f6-5c93-41a4-b727-d950bfcb6e30',
    'shower-gel': '0fc4a4f6-5c93-41a4-b727-d950bfcb6e30',
    'hyaluronic-moisturizer': '0fc4a4f6-5c93-41a4-b727-d950bfcb6e30',
    '3-معطر-للجسم-بالكامل': '4e22b431-43a0-4cd8-9e45-f6a671f2620c',
    'pkg-all-over-collection': '4e22b431-43a0-4cd8-9e45-f6a671f2620c'
  }};

  // 5.1 Zid Live Sync Manager (Fail-Safe Stale-While-Revalidate Engine)
  const ZidSyncManager = {{
    CACHE_KEY: 'note_zid_catalog_v5',
    CACHE_TIME_KEY: 'note_zid_catalog_time_v5',
    TTL_MS: 5 * 60 * 1000,

    loadCachedData: function() {{
      try {{
        const cached = localStorage.getItem(this.CACHE_KEY);
        if (cached) {{
          const items = JSON.parse(cached);
          if (Array.isArray(items) && items.length > 0) {{
            this.applyToCatalog(items);
            return true;
          }}
        }}
      }} catch (e) {{}}
      return false;
    }},

    fetchLiveCatalog: async function(timeoutMs = 750) {{
      try {{
        const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        let timer = null;
        if (controller) {{
          timer = setTimeout(() => controller.abort(), timeoutMs);
        }}

        const res = await fetch('/api/v1/products?page_size=100', {{
          signal: controller ? controller.signal : undefined,
          headers: {{ 'Accept': 'application/json' }}
        }});
        if (timer) clearTimeout(timer);

        if (!res.ok) return null;
        const data = await res.json();
        const results = data.results || [];
        if (results.length > 0) {{
          try {{
            localStorage.setItem(this.CACHE_KEY, JSON.stringify(results));
            localStorage.setItem(this.CACHE_TIME_KEY, Date.now().toString());
          }} catch(e) {{}}
          this.applyToCatalog(results);
          return results;
        }}
      }} catch (err) {{
        // Fail-safe silent catch
      }}
      return null;
    }},

    applyToCatalog: function(zidResults) {{
      if (!Array.isArray(zidResults)) return;

      zidResults.forEach(zp => {{
        const zId = zp.id;
        const zSlug = (zp.slug || '').toLowerCase();
        const zName = (zp.name || '').trim();
        const zPrice = zp.sale_price || zp.price;
        const zOldPrice = zp.sale_price ? zp.price : null;
        const inStock = zp.in_stock !== false && (zp.is_infinite || zp.quantity > 0);

        let matched = null;

        // 1. Match by ZID_PRODUCT_MAP
        for (const localKey in ZID_PRODUCT_MAP) {{
          if (ZID_PRODUCT_MAP[localKey] === zId) {{
            matched = noteProductsCatalog.find(p => p.id.toLowerCase() === localKey.toLowerCase());
            if (matched) break;
          }}
        }}

        // 2. Match by zidSlugMap
        if (!matched && typeof zidSlugMap !== 'undefined') {{
          for (const localKey in zidSlugMap) {{
            if (zidSlugMap[localKey].toLowerCase() === zSlug) {{
              matched = noteProductsCatalog.find(p => p.id.toLowerCase() === localKey.toLowerCase());
              if (matched) break;
            }}
          }}
        }}

        // 3. Match by direct slug or ID
        if (!matched) {{
          matched = noteProductsCatalog.find(p => {{
            const pid = p.id.toLowerCase();
            return pid === zSlug || zSlug.includes(pid) || pid.includes(zSlug);
          }});
        }}

        // 4. Match by title
        if (!matched) {{
          const cleanZName = zName.replace('عطر ', '').trim().toLowerCase();
          matched = noteProductsCatalog.find(p => {{
            const cleanTitle = (p.title || '').replace('عطر ', '').trim().toLowerCase();
            return cleanTitle === cleanZName || (p.title_en && p.title_en.toLowerCase() === zName.toLowerCase());
          }});
        }}

        if (matched) {{
          if (zPrice && !isNaN(zPrice)) {{
            matched.price = Math.round(Number(zPrice));
          }}
          if (zOldPrice && !isNaN(zOldPrice)) {{
            matched.old_price = Math.round(Number(zOldPrice));
            const disc = Math.round(((zOldPrice - zPrice) / zOldPrice) * 100);
            matched.discount = disc + '%';
          }} else if (!zp.sale_price) {{
            matched.old_price = null;
            matched.discount = null;
          }}
          matched.in_stock = inStock;

          // If the title changed in Zid Dashboard, keep title updated
          if (zName && !zName.includes('BABY') && !zName.includes('All OVER') && !zName.includes('Tollah')) {{
            matched.zid_title = zName;
          }}
        }} else if (zPrice && !isNaN(zPrice)) {{
          // Dynamically register newly added products from Zid Dashboard
          const firstImg = (zp.images && zp.images[0] && zp.images[0].image && (zp.images[0].image.large || zp.images[0].image.full_size)) || '';
          const secondImg = (zp.images && zp.images[1] && zp.images[1].image && (zp.images[1].image.large || zp.images[1].image.full_size)) || '';

          let catSlug = 'perfumes';
          let catAr = 'العطور';
          if (zp.categories && zp.categories[0]) {{
            catSlug = zp.categories[0].slug || 'perfumes';
            catAr = zp.categories[0].name || 'العطور';
          }}

          const newProductEntry = {{
            id: zSlug || zId,
            zid_id: zId,
            title: zName,
            title_en: zp.name_en || zName,
            cat: catSlug,
            cat_ar: catAr,
            size: '100 مل',
            concentration: 'Eau de Parfum',
            tag: 'جديد',
            bestseller: false,
            price: Math.round(Number(zPrice)),
            old_price: zOldPrice ? Math.round(Number(zOldPrice)) : null,
            discount: zOldPrice ? Math.round(((zOldPrice - zPrice) / zOldPrice) * 100) + '%' : null,
            rating: 4.9,
            reviews_count: 12,
            in_stock: inStock,
            img: firstImg || '/products/NOTE_Royal_Tobacco_Flat_Lay.webp',
            img_box: secondImg || firstImg || null,
            notes: '',
            slogan: zName,
            description: (zp.description || zName).replace(/<[^>]*>/g, '').trim(),
            top: '',
            heart: '',
            base: ''
          }};
          noteProductsCatalog.push(newProductEntry);
        }}
      }});

      // Synchronize bestsellers list (productsData)
      if (typeof productsData !== 'undefined' && Array.isArray(productsData)) {{
        productsData.forEach(bp => {{
          const full = noteProductsCatalog.find(p => p.id === bp.id);
          if (full) {{
            bp.price = full.price;
            bp.old_price = full.old_price;
            bp.discount = full.discount;
            bp.in_stock = full.in_stock;
          }}
        }});
      }}
    }},

    refreshDomPrices: function() {{
      try {{
        // Update PDP if currently active
        if (typeof currentProduct !== 'undefined' && currentProduct) {{
          const live = noteProductsCatalog.find(p => p.id === currentProduct.id);
          if (live) {{
            currentProduct.price = live.price;
            currentProduct.old_price = live.old_price;
            currentProduct.discount = live.discount;
            currentProduct.in_stock = live.in_stock;

            const pEl = document.getElementById('pdp-price');
            if (pEl && live.price) pEl.textContent = formatPrice(live.price);

            const opEl = document.getElementById('pdp-old-price');
            if (opEl) {{
              if (live.old_price && formatPrice(live.old_price)) {{
                opEl.textContent = formatPrice(live.old_price);
                opEl.classList.remove('hidden');
              }} else {{
                opEl.classList.add('hidden');
              }}
            }}
          }}
        }}

        // Update Cart Drawer if open
        if (typeof CartManager !== 'undefined' && CartManager.renderDrawer) {{
          CartManager.renderDrawer();
        }}

        // Update Catalog Grid if on catalog / category page
        if (typeof renderCatalog === 'function' && document.getElementById('catalog-products-grid')) {{
          renderCatalog();
    updateActiveNav({{ route: 'category', cat: activeCategory }});
        }}
      }} catch(e) {{}}
    }}
  }};

  // Load existing cached prices immediately (0ms)
  ZidSyncManager.loadCachedData();

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
      if (product.in_stock === false || product.stock === 0) {{
        this.showToast('عذراً، هذا المنتج غير متاح حالياً');
        return;
      }}
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
      if (typeof this.updateBadge === 'function') this.updateBadge();
      const badge = document.getElementById('cart-counter-badge');
      if (badge) {{
        badge.classList.remove('scale-125');
        void badge.offsetWidth;
        badge.classList.add('scale-125');
        setTimeout(() => badge.classList.remove('scale-125'), 250);
      }}
      this.showToast('تمت إضافة ' + product.title + ' إلى سلتك');
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
      const badges = document.querySelectorAll('.cart-badge, .cart-badge-count, #cart-counter-badge, [class*="cart-badge"], .cart-sm .cart-badge');
      badges.forEach(b => {{
        b.textContent = count;
      }});
    }},
    showToast: function(msg) {{
      let toast = document.getElementById('global-toast');
      if (!toast) {{
        toast = document.createElement('div');
        toast.id = 'global-toast';
        toast.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-[100] transform -translate-y-24 opacity-0 transition-all duration-300 pointer-events-auto px-5 py-3 rounded-full shadow-2xl text-xs font-bold flex items-center gap-3 bg-stone-900/95 backdrop-blur-md text-white border border-white/10';
        if (document.body) document.body.appendChild(toast);
      }}
      toast.innerHTML = '<i class="sicon-check-circle text-emerald-400 text-sm"></i><span class="truncate max-w-[200px] sm:max-w-none">' + msg + '</span><button type="button" onclick="CartManager.openDrawer()" class="mr-1 px-3 py-1 bg-white/20 hover:bg-white/30 active:scale-95 rounded-full text-[11px] font-semibold text-white transition whitespace-nowrap">عرض السلة</button>';
      if (toast.classList) {{
        toast.classList.remove('-translate-y-24', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => {{
          toast.classList.remove('translate-y-0', 'opacity-100');
          toast.classList.add('-translate-y-24', 'opacity-0');
        }}, 3200);
      }}
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
        const recsContainer = document.getElementById('cart-drawer-recommendations');
        if (recsContainer) recsContainer.classList.add('hidden');
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
      
      if (subtotalEl) subtotalEl.textContent = formatPrice(total);
      if (totalEl) totalEl.textContent = formatPrice(total);
      
      itemsContainer.innerHTML = cart.map(item => {{
        const zidSlug = zidSlugMap[item.id] || item.id;
        const imgUrl = (item.img.startsWith('http') ? '' : ASSET_HOST) + item.img;
        return `
          <div class="note-cart-item group relative flex items-center gap-3 p-3 mb-2.5 rounded-2xl bg-stone-50/70 hover:bg-stone-50 border border-stone-200/80 transition-all text-right">
            <a href="/products/${{zidSlug}}" onclick="NoteRouter.navigate('/products/${{zidSlug}}'); CartManager.closeDrawer();" class="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-white p-1.5 flex-shrink-0 flex items-center justify-center border border-stone-200/80 shadow-2xs block overflow-hidden">
              <img src="${{imgUrl}}" alt="${{item.title}}" class="w-full h-full object-contain transition-transform group-hover:scale-105">
            </a>
            <div class="flex-grow min-w-0 pr-1">
              <a href="/products/${{zidSlug}}" onclick="NoteRouter.navigate('/products/${{zidSlug}}'); CartManager.closeDrawer();" class="block hover:text-stone-700 transition">
                <h4 class="text-xs sm:text-sm font-extrabold text-stone-900 line-clamp-1 leading-snug">${{item.title}}</h4>
              </a>
              <span class="text-[11px] text-stone-500 font-medium block mt-0.5">${{item.size || '100 مل'}}</span>
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center bg-white border border-stone-300 rounded-full h-7 px-1.5 gap-2 text-xs font-bold shadow-2xs">
                  <button onclick="CartManager.updateQuantity('${{item.id}}', -1)" class="w-5 h-5 rounded-full flex items-center justify-center text-stone-600 hover:text-black hover:bg-stone-100 transition" aria-label="تقليل الكمية">-</button>
                  <span class="min-w-[16px] text-center font-extrabold text-stone-900">${{item.quantity}}</span>
                  <button onclick="CartManager.updateQuantity('${{item.id}}', 1)" class="w-5 h-5 rounded-full flex items-center justify-center text-stone-600 hover:text-black hover:bg-stone-100 transition" aria-label="زيادة الكمية">+</button>
                </div>
                <span class="text-xs sm:text-sm font-black text-stone-900">${{formatPrice(item.price * item.quantity)}}</span>
              </div>
            </div>
            <button onclick="CartManager.removeItem('${{item.id}}')" class="text-stone-400 hover:text-rose-600 p-2 transition flex items-center justify-center rounded-lg hover:bg-rose-50" aria-label="حذف المنتج من السلة" title="حذف">
              <i class="sicon-trash text-sm"></i>
            </button>
          </div>
        `;
      }}).join('');

      // Render Drawer Recommendations
      const recsContainer = document.getElementById('cart-drawer-recommendations');
      const recsList = document.getElementById('cart-drawer-recs-list');
      if (recsContainer && recsList) {{
        const inCartIds = new Set(cart.map(i => i.id));
        const pool = [
          'for-him-30ml',
          'for-her-30ml',
          'powderose-30ml',
          'musk-toffee-oil',
          'all-over-royal-tobacco',
          'all-over-choconilla',
          'linen-royal-tobacco',
          'linen-oud-rosewood',
          'roayal-tobacco',
          'note-for-him',
          'oud-rosewood',
          'musk'
        ];
        const recs = pool
          .filter(id => !inCartIds.has(id))
          .map(id => noteProductsCatalog.find(p => p.id === id))
          .filter(p => p && p.in_stock !== false && p.stock !== 0)
          .slice(0, 1);

        if (recs.length > 0) {{
          recsContainer.classList.remove('hidden');
          recsList.innerHTML = recs.map(p => {{
            const imgUrl = (p.img.startsWith('http') ? '' : ASSET_HOST) + p.img;
            return `
              <div class="flex items-center justify-between gap-2.5 p-2 bg-white rounded-xl border border-stone-200/70 shadow-xs">
                <div class="flex items-center gap-2 min-w-0">
                  <div class="w-9 h-9 rounded-lg bg-stone-50 p-0.5 border border-stone-100 shrink-0 flex items-center justify-center">
                    <img src="${{imgUrl}}" alt="${{p.title}}" class="w-full h-full object-contain">
                  </div>
                  <div class="min-w-0">
                    <h5 class="text-[11px] font-bold text-black truncate">${{p.title}}</h5>
                    <div class="flex items-center gap-1.5 mt-0.5">
                      <span class="text-[11px] font-extrabold text-black">${{formatPrice(p.price)}}</span>
                      ${{p.old_price && formatPrice(p.old_price) ? `<span class="text-[9px] text-stone-400 line-through">${{formatPrice(p.old_price)}}</span>` : ''}}
                    </div>
                  </div>
                </div>
                <button onclick="CartManager.addItem('${{p.id}}', 1)" class="px-2.5 py-1 rounded-lg bg-black hover:bg-stone-800 text-white text-[10px] font-bold shrink-0 transition flex items-center gap-1 active:scale-95 shadow-xs" title="إضافة سريعة">
                  <i class="sicon-plus text-[9px]"></i>
                  <span>أضف</span>
                </button>
              </div>
            `;
          }}).join('');
        }} else {{
          recsContainer.classList.add('hidden');
        }}
      }}
    }}
  }};

  // 8. Product Card Rendering
  function renderProductCard(p, index) {{
    const zidSlug = zidSlugMap[p.id] || p.id;
    const imgUrl = (p.img.startsWith('http') ? '' : ASSET_HOST) + p.img;
    const isOutOfStock = p.in_stock === false || p.stock === 0;
    return `
      <div class="min-w-[175px] sm:min-w-[270px] max-w-[185px] sm:max-w-[280px] shrink-0 p-1 flex flex-col justify-between text-center group cursor-pointer bg-transparent ${{isOutOfStock ? 'is-out-of-stock product-item-out-of-stock' : ''}}" style="scroll-snap-align: start;" onclick="NoteRouter.navigate('/products/${{zidSlug}}')">
        <div>
          <!-- Frameless Image Container with Clean Shadow/Scale -->
          <div class="relative bg-transparent aspect-square flex items-center justify-center mb-2 p-2 sm:p-4 overflow-hidden">
            ${{isOutOfStock ? `<span class="note-product-badge note-out-of-stock-sticker out-of-stock">غير متاح</span>${{p.discount ? `<span class="note-product-badge absolute top-2.5 right-2.5 z-10 whitespace-nowrap"><span>خصم</span> <bdi dir="ltr">${{p.discount}}</bdi></span>` : ''}}` : (p.discount ? `<span class="note-product-badge absolute top-2.5 right-2.5 z-10 whitespace-nowrap"><span>خصم</span> <bdi dir="ltr">${{p.discount}}</bdi></span>` : (p.tag ? `<span class="note-product-badge absolute top-2.5 right-2.5 z-10 whitespace-nowrap">${{escapeHTML(p.tag)}}</span>` : ''))}}
            <img src="${{imgUrl}}" alt="${{p.title}}" loading="lazy" decoding="async" class="w-full h-full object-contain group-hover:scale-106 transition-transform duration-500 ease-out">
          </div>

          <!-- Product Typography (Clean Laverne Centered Sans-Serif) -->
          <div class="pt-1 pb-1 text-center space-y-1">
            <h4 class="text-xs sm:text-sm md:text-base font-bold text-black group-hover:text-stone-600 transition line-clamp-1">${{p.title}}</h4>
            <p class="text-[11px] sm:text-xs text-stone-400 font-normal line-clamp-1">${{p.notes}}</p>
            
            <!-- Clean Price Row -->
            <div class="flex items-center justify-center gap-2 pt-1">
              <span class="text-rose-600 font-extrabold text-sm sm:text-base">${{formatPrice(p.price)}}</span>
              ${{p.old_price && formatPrice(p.old_price) ? `<span class="text-stone-400 line-through text-[11px] sm:text-xs font-normal">${{formatPrice(p.old_price)}}</span>` : ''}}
            </div>
          </div>
        </div>

        <!-- Minimalist Rounded Pill Button -->
        ${{isOutOfStock ? `
        <button disabled class="w-full mt-3 py-2 sm:py-2.5 px-4 rounded-full bg-stone-200 text-stone-500 cursor-not-allowed flex items-center justify-center gap-2 font-bold text-xs shadow-none" title="غير متاح">
          <span>غير متاح</span>
        </button>
        ` : `
        <button onclick="event.stopPropagation(); CartManager.addItem('${{p.id}}')" class="w-full mt-3 py-2 sm:py-2.5 px-4 rounded-full bg-black text-white hover:bg-stone-800 active:scale-95 transition flex items-center justify-center gap-2 font-bold text-xs shadow-sm" title="إضافة للسلة">
          <span>إضافة للسلة</span>
          <i class="sicon-shopping-bag text-sm"></i>
        </button>
        `}}
      </div>
    `;
  }}

  // 9. Sliders Initialization
  function initSliders() {{
    const bestTrack = document.getElementById('slider-bestsellers');
    if (bestTrack) {{
      bestTrack.innerHTML = productsData.slice(0, 6).map((p, i) => renderProductCard(p, i)).join('');
      enableSliderDragAndWheel(bestTrack);
    }}

    const nicheTrack = document.getElementById('slider-niche');
    if (nicheTrack) {{
      nicheTrack.innerHTML = productsData.slice(6, 10).map((p, i) => renderProductCard(p, i + 6)).join('');
      enableSliderDragAndWheel(nicheTrack);
    }}

    const newTrack = document.getElementById('slider-new');
    if (newTrack) {{
      newTrack.innerHTML = productsData.slice(10, 16).map((p, i) => renderProductCard(p, i + 10)).join('');
      enableSliderDragAndWheel(newTrack);
    }}
  }}

  function scrollSlider(id, direction) {{
    const slider = document.getElementById(id);
    if (!slider) return;
    const card = slider.firstElementChild;
    const cardWidth = card ? (card.offsetWidth + 20) : 260;
    const scrollAmount = Math.max(slider.clientWidth * 0.75, cardWidth);
    
    // In RTL, moving left into next items requires a negative scrollLeft delta
    let delta = 0;
    if (direction === 'left' || direction === 'next') {{
      delta = -scrollAmount;
    }} else {{
      delta = scrollAmount;
    }}
    slider.scrollBy({{ left: delta, behavior: 'smooth' }});
  }}

  function enableSliderDragAndWheel(slider) {{
    if (!slider || slider._wheelDragAttached || typeof slider.addEventListener !== 'function') return;
    slider._wheelDragAttached = true;
    
    // Mouse Wheel -> Smooth horizontal card scroll on desktop
    let wheelTimer = null;
    let wheelDelta = 0;
    slider.addEventListener('wheel', (e) => {{
      if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {{
        if (slider.scrollWidth > slider.clientWidth) {{
          e.preventDefault();
          wheelDelta += e.deltaY;
          clearTimeout(wheelTimer);
          wheelTimer = setTimeout(() => {{
            const dir = wheelDelta > 0 ? 'left' : 'right';
            scrollSlider(slider.id, dir);
            wheelDelta = 0;
          }}, 30);
        }}
      }}
    }}, {{ passive: false }});

    // Mouse Drag-to-Scroll (Desktop Grab & Drag)
    let isDown = false, startX = 0, scrollStart = 0, hasMoved = false;
    slider.style.cursor = 'grab';

    slider.addEventListener('mousedown', (e) => {{
      if (e.button !== 0) return;
      isDown = true;
      hasMoved = false;
      startX = e.pageX;
      scrollStart = slider.scrollLeft;
      slider.style.cursor = 'grabbing';
      slider.style.scrollBehavior = 'auto';
      slider.style.scrollSnapType = 'none';
    }});

    const stopDrag = () => {{
      if (!isDown) return;
      isDown = false;
      slider.style.cursor = 'grab';
      slider.style.scrollBehavior = '';
      slider.style.scrollSnapType = '';
      setTimeout(() => {{ hasMoved = false; }}, 60);
    }};

    if (typeof window !== 'undefined' && window.addEventListener) {{
      window.addEventListener('mouseup', stopDrag);
    }}
    slider.addEventListener('mouseleave', stopDrag);

    slider.addEventListener('mousemove', (e) => {{
      if (!isDown) return;
      const diff = e.pageX - startX;
      if (Math.abs(diff) > 4) {{
        hasMoved = true;
        e.preventDefault();
        slider.scrollLeft = scrollStart - diff;
      }}
    }});

    slider.addEventListener('click', (e) => {{
      if (hasMoved) {{
        e.preventDefault();
        e.stopPropagation();
      }}
    }}, true);
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
    if (modalPrice) modalPrice.textContent = formatPrice(p.price);

    const isOutOfStock = p.in_stock === false || p.stock === 0;
    const buyBtn = document.getElementById('modal-buy-btn');
    if (buyBtn) {{
      if (isOutOfStock) {{
        buyBtn.disabled = true;
        buyBtn.className = 'w-full py-3.5 px-6 rounded-full bg-stone-200 text-stone-500 cursor-not-allowed font-bold text-sm shadow-none flex items-center justify-center gap-2';
        buyBtn.innerHTML = '<span>غير متاح</span>';
        buyBtn.onclick = null;
      }} else {{
        buyBtn.disabled = false;
        buyBtn.className = 'w-full py-3.5 px-6 rounded-full bg-black hover:bg-stone-800 text-white font-bold text-sm shadow-sm transition active:scale-98 flex items-center justify-center gap-2';
        buyBtn.innerHTML = '<span>إضافة للسلة</span><i class="sicon-shopping-bag"></i>';
        buyBtn.onclick = () => {{
          CartManager.addItem(p.id);
          closeQuickView();
        }};
      }}
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

  // Arabic Text Normalization (Removes Tashkeel, Normalizes Alef/Yeh/Teh)
  function normalizeArabic(text) {{
    if (!text) return '';
    return text
      .toString()
      .toLowerCase()
      .replace(/[ً-ٰٟ]/g, '')
      .replace(/[أإآٱ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      .trim();
  }}

  // 12. Search & Mobile Drawer
  function openSearchModal() {{
    const m = document.getElementById('search-modal');
    if (!m) return;
    m.classList.remove('hidden');
    setTimeout(() => {{
      m.classList.remove('opacity-0');
      const inner = m.querySelector('div');
      if (inner) inner.classList.remove('scale-95');
      const input = document.getElementById('search-input');
      if (input) {{
        input.focus();
        if (input.value) handleLiveSearch(input.value);
      }}
    }}, 10);
  }}

  function closeSearchModal() {{
    const m = document.getElementById('search-modal');
    if (!m) return;
    m.classList.add('opacity-0');
    const inner = m.querySelector('div');
    if (inner) inner.classList.add('scale-95');
    setTimeout(() => {{
      m.classList.add('hidden');
    }}, 300);
  }}

  function handleLiveSearch(query) {{
    const rawTrimmed = (query || '').trim();
    const normalized = normalizeArabic(rawTrimmed);
    const resultsContainer = document.getElementById('search-results');
    const quickTags = document.getElementById('search-quick-tags');
    const footer = document.getElementById('search-modal-footer');
    const countEl = document.getElementById('search-results-count');
    const viewAllLink = document.getElementById('search-view-all-link');

    if (!resultsContainer) return;

    if (!rawTrimmed) {{
      resultsContainer.innerHTML = '';
      if (quickTags) quickTags.classList.remove('hidden');
      if (footer) footer.classList.add('hidden');
      return;
    }}

    if (quickTags) quickTags.classList.add('hidden');

    const matches = noteProductsCatalog.filter(p => {{
      const title = normalizeArabic(p.title);
      const titleEn = (p.title_en || '').toLowerCase();
      const notes = normalizeArabic(p.notes);
      const desc = normalizeArabic(p.description);
      const cat = normalizeArabic(p.cat_ar);
      return title.includes(normalized) || 
             titleEn.includes(rawTrimmed.toLowerCase()) || 
             notes.includes(normalized) || 
             desc.includes(normalized) || 
             cat.includes(normalized);
    }});

    if (footer) footer.classList.remove('hidden');
    if (countEl) countEl.textContent = `تم العثور على ${{matches.length}} عطر`;
    if (viewAllLink) viewAllLink.href = `/categories?cat=all&search=${{encodeURIComponent(rawTrimmed)}}`;

    if (matches.length === 0) {{
      resultsContainer.innerHTML = `
        <div class="py-10 text-center text-stone-400">
          <i class="sicon-search text-3xl mb-2 block opacity-40"></i>
          <p class="text-sm font-bold text-black mb-1">لم نجد أي نتائج تطابق "${{rawTrimmed}}"</p>
          <p class="text-xs text-stone-400">جرب البحث بكلمات أخرى مثل: مسك، توباكو، عود، عنبر، باودر</p>
        </div>
      `;
      return;
    }}

    resultsContainer.innerHTML = matches.slice(0, 8).map(p => {{
      const zidSlug = zidSlugMap[p.id] || p.id;
      const imgUrl = (p.img.startsWith('http') ? '' : ASSET_HOST) + p.img;
      const isOutOfStock = p.in_stock === false || p.stock === 0;
      return `
        <div class="py-3 flex items-center justify-between gap-4 hover:bg-stone-50 px-2.5 rounded-xl transition cursor-pointer ${{isOutOfStock ? 'opacity-80' : ''}}" onclick="closeSearchModal(); NoteRouter.navigate('/products/${{zidSlug}}')">
          <div class="flex items-center gap-3 min-w-0">
            <div class="relative w-14 h-14 rounded-xl bg-stone-50 p-1 shrink-0 flex items-center justify-center border border-stone-100 overflow-hidden">
              <img src="${{imgUrl}}" alt="${{p.title}}" class="w-full h-full object-contain ${{isOutOfStock ? 'grayscale opacity-80' : ''}}">
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <h4 class="text-xs sm:text-sm font-bold text-black truncate">${{p.title}}</h4>
                ${{isOutOfStock ? '<span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 shrink-0">غير متاح</span>' : ''}}
              </div>
              <p class="text-[10px] sm:text-[11px] text-stone-400 font-normal truncate">${{p.notes || p.cat_ar || ''}}</p>
              <span class="text-xs font-extrabold text-black block mt-0.5">${{formatPrice(p.price)}}</span>
            </div>
          </div>
          ${{isOutOfStock ? `
          <button disabled class="shrink-0 px-3.5 py-1.5 rounded-full bg-stone-200 text-stone-500 cursor-not-allowed text-[11px] font-bold shadow-none flex items-center gap-1.5">
            <span>غير متاح</span>
          </button>
          ` : `
          <button onclick="event.stopPropagation(); CartManager.addItem('${{p.id}}'); closeSearchModal();" class="shrink-0 px-3.5 py-1.5 rounded-full bg-black text-white hover:bg-stone-800 text-[11px] font-bold shadow-sm transition active:scale-95 flex items-center gap-1.5">
            <span>أضف للسلة</span>
            <i class="sicon-shopping-bag text-xs"></i>
          </button>
          `}}
        </div>
      `;
    }}).join('');
  }}

  function fillAndSearch(keyword) {{
    const inp = document.getElementById('search-input');
    if (inp) {{
      inp.value = keyword;
      inp.focus();
      handleLiveSearch(keyword);
    }}
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
    if (priceEl && currentProduct.price) priceEl.textContent = formatPrice(currentProduct.price);

    const oldPriceEl = document.getElementById('pdp-old-price');
    if (oldPriceEl) {{
      if (currentProduct.old_price && formatPrice(currentProduct.old_price)) {{
        oldPriceEl.textContent = formatPrice(currentProduct.old_price);
        oldPriceEl.classList.remove('hidden');
      }} else {{
        oldPriceEl.classList.add('hidden');
      }}
    }}

    const discountBadge = document.getElementById('pdp-discount-badge');
    if (discountBadge) discountBadge.innerHTML = `<span>وفر</span> <bdi dir="ltr">${{currentProduct.discount || '45%'}}</bdi>`;

    const numPrice = Number(String(currentProduct.price).replace(/[^0-9.]/g, '')) || 0;
    const tabbyPrice = (numPrice / 4).toFixed(2);
    const tabbyEl = document.getElementById('pdp-tabby-price');
    if (tabbyEl) tabbyEl.textContent = formatPrice(tabbyPrice);

    const mainImg = document.getElementById('pdp-main-image');
    const mainImgUrl = (currentProduct.img.startsWith('http') ? '' : ASSET_HOST) + currentProduct.img;
    if (mainImg) {{
      mainImg.src = mainImgUrl;
      mainImg.alt = currentProduct.title;
      mainImg.className = 'w-full h-full object-contain p-4 sm:p-6 transition-transform duration-700 ease-out group-hover:scale-105';
    }}

    // Thumbnails
    const thumbsContainer = document.getElementById('pdp-thumbnails');
    if (thumbsContainer) {{
      thumbsContainer.innerHTML = '';
      const images = [currentProduct.img];
      if (currentProduct.img_box && currentProduct.img_box !== currentProduct.img) {{
        images.push(currentProduct.img_box);
      }}
      thumbsContainer.style.display = images.length > 1 ? 'flex' : 'none';

      images.forEach((img, idx) => {{
        const fullUrl = (img.startsWith('http') ? '' : ASSET_HOST) + img;
        const btn = document.createElement('button');
        btn.className = `w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 p-1 bg-stone-50 transition-all flex items-center justify-center overflow-hidden ${{idx === 0 ? 'thumb-active border-black' : 'border-stone-200 opacity-60 hover:opacity-100'}}`;
        btn.onclick = () => {{
          if (mainImg) {{
            mainImg.src = fullUrl;
            if (idx === 0) {{
              mainImg.className = 'w-full h-full object-contain p-4 sm:p-6 transition-transform duration-700 ease-out group-hover:scale-105';
            }} else {{
              mainImg.className = 'w-full h-full object-cover p-0 transition-transform duration-700 ease-out group-hover:scale-105';
            }}
          }}
          document.querySelectorAll('#pdp-thumbnails button').forEach(b => {{
            b.classList.remove('thumb-active', 'border-black');
            b.classList.add('border-stone-200', 'opacity-60');
          }});
          btn.classList.add('thumb-active', 'border-black');
          btn.classList.remove('border-stone-200', 'opacity-60');
        }};
        btn.innerHTML = `<img src="${{fullUrl}}" alt="${{currentProduct.title}}" class="w-full h-full ${{idx === 0 ? 'object-contain' : 'object-cover'}} rounded-lg">`;
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

    const isOutOfStock = currentProduct.in_stock === false || currentProduct.stock === 0;
    const imgContainer = document.getElementById('pdp-main-image-container');
    let stickerEl = document.getElementById('pdp-out-of-stock-sticker');
    if (isOutOfStock) {{
      if (imgContainer) {{
        imgContainer.classList.add('is-out-of-stock');
        if (!stickerEl) {{
          stickerEl = document.createElement('span');
          stickerEl.id = 'pdp-out-of-stock-sticker';
          stickerEl.className = 'note-out-of-stock-sticker pdp-sticker out-of-stock';
          stickerEl.textContent = 'غير متاح';
          imgContainer.appendChild(stickerEl);
        }}
      }}
      document.querySelectorAll('button[onclick*="addToCartCurrentProduct"],button[onclick*="buyNowCurrentProduct"]').forEach(b => {{
        b.disabled = true;
        b.classList.add('bg-stone-200', 'text-stone-500', 'cursor-not-allowed', 'border-stone-200');
        b.classList.remove('bg-black', 'text-white', 'hover:bg-stone-800', 'hover:bg-stone-50', 'text-black', 'border-black');
        b.innerHTML = '<span>غير متاح</span>';
      }});
    }} else {{
      if (imgContainer) {{
        imgContainer.classList.remove('is-out-of-stock');
        if (stickerEl) stickerEl.remove();
      }}
      const addBtn = document.getElementById('pdp-add-cart-btn') || document.querySelector('button[onclick*="addToCartCurrentProduct"]');
      if (addBtn) {{
        addBtn.disabled = false;
        addBtn.className = 'flex-grow h-12 rounded-full bg-black hover:bg-stone-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-300 shadow-md active:scale-98';
        addBtn.innerHTML = '<i class="sicon-shopping-bag text-base"></i><span>إضافة إلى السلة</span>';
      }}
      const buyBtn = document.querySelector('button[onclick*="buyNowCurrentProduct"]');
      if (buyBtn) {{
        buyBtn.disabled = false;
        buyBtn.className = 'w-full h-12 rounded-full border border-black hover:bg-stone-50 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-300 active:scale-98';
        buyBtn.innerHTML = '<i class="sicon-apple-pay text-xl"></i><span>شراء فوري عبر Apple Pay / مدى</span>';
      }}
    }}

    renderRelatedProducts();
  }}

  function changePDPQuantity(delta) {{
    pdpQuantity += delta;
    if (pdpQuantity < 1) pdpQuantity = 1;
    const qtyVal = document.getElementById('pdp-qty-val');
    if (qtyVal) qtyVal.textContent = pdpQuantity;
  }}

  function addToCartCurrentProduct() {{
    if (!currentProduct || currentProduct.in_stock === false || currentProduct.stock === 0) return;
    CartManager.addItem(currentProduct.id, pdpQuantity);
  }}

  function buyNowCurrentProduct() {{
    if (!currentProduct || currentProduct.in_stock === false || currentProduct.stock === 0) return;
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
      const isOutOfStock = p.in_stock === false || p.stock === 0;
      return `
        <div class="p-2 sm:p-3 flex flex-col justify-between text-center group cursor-pointer bg-transparent border border-stone-100 rounded-2xl hover:border-black/20 hover:shadow-lg transition duration-300 ${{isOutOfStock ? 'is-out-of-stock product-item-out-of-stock' : ''}}" onclick="NoteRouter.navigate('/products/${{zidSlug}}')">
          <div>
            <div class="relative bg-transparent aspect-square flex items-center justify-center mb-2 p-2 overflow-hidden">
              ${{isOutOfStock ? `<span class="note-product-badge note-out-of-stock-sticker out-of-stock">غير متاح</span>${{p.discount ? `<span class="note-product-badge absolute top-2.5 right-2.5 z-10 whitespace-nowrap"><span>خصم</span> <bdi dir="ltr">${{p.discount}}</bdi></span>` : ''}}` : (p.discount ? `<span class="note-product-badge absolute top-2.5 right-2.5 z-10 whitespace-nowrap"><span>خصم</span> <bdi dir="ltr">${{p.discount}}</bdi></span>` : (p.tag ? `<span class="note-product-badge absolute top-2.5 right-2.5 z-10 whitespace-nowrap">${{escapeHTML(p.tag)}}</span>` : ''))}}
              <img src="${{imgUrl}}" alt="${{p.title}}" loading="lazy" decoding="async" class="w-full h-full object-contain group-hover:scale-106 transition-transform duration-500 ease-out">
            </div>

            <div class="pt-1 pb-1 text-center space-y-1">
              <h4 class="text-xs sm:text-sm font-bold text-black group-hover:text-stone-600 transition line-clamp-1">${{p.title}}</h4>
              <p class="text-[10px] sm:text-[11px] text-stone-400 font-normal line-clamp-1">${{p.notes}}</p>
              
              <div class="flex items-center justify-center gap-2 pt-1">
                <span class="text-black font-extrabold text-xs sm:text-sm">${{formatPrice(p.price)}}</span>
                ${{p.old_price && formatPrice(p.old_price) ? `<span class="text-stone-400 line-through text-[10px] sm:text-xs font-normal">${{formatPrice(p.old_price)}}</span>` : ''}}
              </div>
            </div>
          </div>

          ${{isOutOfStock ? `
          <button disabled class="w-full mt-2.5 py-2 px-3 rounded-full bg-stone-200 text-stone-500 cursor-not-allowed flex items-center justify-center gap-2 font-bold text-[11px] shadow-none">
            <span>غير متاح</span>
          </button>
          ` : `
          <button onclick="event.stopPropagation(); CartManager.addItem('${{p.id}}')" class="w-full mt-2.5 py-2 px-3 rounded-full bg-black text-white hover:bg-stone-800 active:scale-95 transition flex items-center justify-center gap-2 font-bold text-[11px] shadow-sm">
            <span>إضافة للسلة</span>
            <i class="sicon-shopping-bag text-xs"></i>
          </button>
          `}}
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
      activeBtn.scrollIntoView({{ behavior: 'smooth', inline: 'center', block: 'nearest' }});
    }}

    // Update Header Text
    const meta = categoryMeta[activeCategory] || categoryMeta['all'];
    const catTitle = document.getElementById('cat-title');
    if (catTitle) catTitle.textContent = meta.title;
    const catDesc = document.getElementById('cat-desc');
    if (catDesc) catDesc.textContent = meta.desc;
    document.title = `${{meta.title}} | دار نوت للعطور NOTE Perfumes`;

    renderCatalog();
    updateActiveNav({{ route: 'category', cat: activeCategory }});

    // Scroll smoothly to top of catalog if user scrolled down
    if (updateURL) {{
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollY > 120) {{
        window.scrollTo({{ top: 0, behavior: 'smooth' }});
      }}
    }}
  }}

  function handleCategorySearch(val) {{
    categorySearchQuery = (val || '').trim().toLowerCase();
    const clearBtn = document.getElementById('cat-search-clear');
    if (clearBtn) {{
      if (categorySearchQuery.length > 0) clearBtn.classList.remove('hidden');
      else clearBtn.classList.add('hidden');
    }}
    renderCatalog();
    updateActiveNav({{ route: 'category', cat: activeCategory }});
  }}

  function clearCatSearch() {{
    const inp = document.getElementById('cat-search-input');
    if (inp) {{
      inp.value = '';
      handleCategorySearch('');
      inp.focus();
    }}
    const clearBtn = document.getElementById('cat-search-clear');
    if (clearBtn) clearBtn.classList.add('hidden');
  }}

  function handleCategorySort(val) {{
    categorySort = val;
    renderCatalog();
    updateActiveNav({{ route: 'category', cat: activeCategory }});
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

    refreshCategoryUI();
    let filtered = categoryProducts(activeCategory);
    const categoryTotal=filtered.length;

    // Filter by search (searches whole catalog with Arabic normalization)
    if (categorySearchQuery) {{
      const normQuery = normalizeArabic(categorySearchQuery);
      filtered = filtered.filter(p => {{
        const title = normalizeArabic(p.title);
        const titleEn = (p.title_en || '').toLowerCase();
        const notes = normalizeArabic(p.notes);
        const desc = normalizeArabic(p.description);
        const cat = normalizeArabic(p.cat_ar);
        return title.includes(normQuery) || 
               titleEn.includes(categorySearchQuery.toLowerCase()) || 
               notes.includes(normQuery) || 
               desc.includes(normQuery) || 
               cat.includes(normQuery);
      }});
    }}

    // Sort
    if (categorySort === 'price-asc') {{
      filtered.sort((a, b) => a.price - b.price);
    }} else if (categorySort === 'price-desc') {{
      filtered.sort((a, b) => b.price - a.price);
    }} else if (categorySort === 'rating') {{
      filtered.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    }} else if (categorySort === 'newest') {{
      filtered.sort((a,b)=>String(b.created_at).localeCompare(String(a.created_at)));
    }}

    if (countEl) {{
      countEl.textContent = `عرض ${{filtered.length}} من ${{categoryTotal}} منتج`;
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
      const isOutOfStock = p.in_stock === false || p.stock === 0;
      return `
        <div class="p-2 sm:p-3 flex flex-col justify-between text-center group cursor-pointer bg-transparent border border-stone-100 rounded-2xl hover:border-black/20 hover:shadow-lg transition duration-300 ${{isOutOfStock ? 'is-out-of-stock product-item-out-of-stock' : ''}}" onclick="NoteRouter.navigate('/products/${{zidSlug}}')">
          <div>
            <div class="relative bg-transparent aspect-square flex items-center justify-center mb-2 p-2 sm:p-4 overflow-hidden">
              ${{isOutOfStock ? `<span class="note-product-badge note-out-of-stock-sticker out-of-stock">غير متاح</span>${{p.discount ? `<span class="note-product-badge absolute top-2.5 right-2.5 z-10 whitespace-nowrap"><span>خصم</span> <bdi dir="ltr">${{p.discount}}</bdi></span>` : ''}}` : (p.discount ? `<span class="note-product-badge absolute top-2.5 right-2.5 z-10 whitespace-nowrap"><span>خصم</span> <bdi dir="ltr">${{p.discount}}</bdi></span>` : (p.tag ? `<span class="note-product-badge absolute top-2.5 right-2.5 z-10 whitespace-nowrap">${{escapeHTML(p.tag)}}</span>` : ''))}}
              <img src="${{imgUrl}}" alt="${{p.title}}" loading="lazy" decoding="async" class="w-full h-full object-contain group-hover:scale-106 transition-transform duration-500 ease-out">
            </div>

            <div class="pt-1 pb-1 text-center space-y-1">
              <h4 class="text-xs sm:text-sm font-bold text-black group-hover:text-stone-600 transition line-clamp-1">${{p.title}}</h4>
              <p class="text-[10px] sm:text-[11px] text-stone-400 font-normal line-clamp-1">${{p.notes}}</p>
              
              <div class="flex items-center justify-center gap-2 pt-1">
                <span class="text-black font-extrabold text-xs sm:text-sm">${{formatPrice(p.price)}}</span>
                ${{p.old_price && formatPrice(p.old_price) ? `<span class="text-stone-400 line-through text-[10px] sm:text-xs font-normal">${{formatPrice(p.old_price)}}</span>` : ''}}
              </div>
            </div>
          </div>

          ${{isOutOfStock ? `
          <button disabled class="w-full mt-2.5 py-2 px-3 rounded-full bg-stone-200 text-stone-500 cursor-not-allowed flex items-center justify-center gap-2 font-bold text-[11px] sm:text-xs shadow-none">
            <span>غير متاح</span>
          </button>
          ` : `
          <button onclick="event.stopPropagation(); CartManager.addItem('${{p.id}}')" class="w-full mt-2.5 py-2 px-3 rounded-full bg-black text-white hover:bg-stone-800 active:scale-95 transition flex items-center justify-center gap-2 font-bold text-[11px] sm:text-xs shadow-sm">
            <span>إضافة للسلة</span>
            <i class="sicon-shopping-bag text-xs"></i>
          </button>
          `}}
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
        <div class="note-cart-page-item py-4 sm:py-6 flex items-center justify-between gap-4 text-right">
          <div class="flex items-center gap-3 sm:gap-4 flex-grow">
            <a href="/products/${{zidSlug}}" onclick="NoteRouter.navigate('/products/${{zidSlug}}')" class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-stone-50 p-2 flex-shrink-0 flex items-center justify-center border border-stone-200/80 block">
              <img src="${{imgUrl}}" alt="${{item.title}}" class="w-full h-full object-contain">
            </a>
            <div class="space-y-1">
              <a href="/products/${{zidSlug}}" onclick="NoteRouter.navigate('/products/${{zidSlug}}')" class="hover:underline">
                <h4 class="text-xs sm:text-sm font-bold text-black">${{item.title}}</h4>
              </a>
              <span class="text-[11px] text-stone-400 block">${{item.size || '100 مل'}}</span>
              <span class="text-xs font-bold text-black sm:hidden block">${{formatPrice(item.price)}}</span>
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
            <span class="text-sm font-extrabold text-black">${{formatPrice(item.price * item.quantity)}}</span>
          </div>

          <!-- Delete -->
          <button onclick="CartManager.removeItem('${{item.id}}'); renderCartPage();" class="text-stone-400 hover:text-rose-600 transition p-1" title="حذف">
            <i class="sicon-trash text-base"></i>
          </button>
        </div>
      `;
    }}).join('');

    updateCartFinancials(total);
    updateCheckoutUpsell(cart);
    renderCartPageRecommendations(cart);
    restoreSavedCartCoupon();
  }}

  function updateCheckoutUpsell(cart) {{
    const upsellCard = document.getElementById('checkout-upsell-card');
    if (!upsellCard) return;

    const inCartIds = new Set(cart.map(i => i.id));
    const upsellPool = [
      {{ id: 'for-her-30ml', title: 'عطر نوت فور هير (30 مل)', price: 89, old_price: 199, img: '/products/NOTE_For_Her_30ml_v02.webp' }},
      {{ id: 'for-him-30ml', title: 'عطر نوت فور هِم (30 مل)', price: 89, old_price: 199, img: '/products/NOTE_For_Him_30ml_v02.webp' }},
      {{ id: 'powderose-30ml', title: 'عطر باودر روز (30 مل)', price: 89, old_price: 199, img: '/products/NOTE_Powderose_30ml_v01.webp' }},
      {{ id: 'musk-toffee-oil', title: 'تولة مسك توفي نقي', price: 69, old_price: 140, img: '/products/NOTE_Musk_Toffee_v01.webp' }},
      {{ id: 'all-over-royal-tobacco', title: 'معطر الجسم رويال توباكو', price: 99, old_price: 180, img: '/products/NOTE_Royal_Tobacco_All_Over_v01.webp' }}
    ];

    const item = upsellPool.find(u => !inCartIds.has(u.id));
    if (!item || cart.length === 0) {{
      upsellCard.classList.add('hidden');
      return;
    }}

    upsellCard.classList.remove('hidden');
    const imgUrl = (item.img.startsWith('http') ? '' : ASSET_HOST) + item.img;
    const imgEl = document.getElementById('upsell-img');
    if (imgEl) imgEl.src = imgUrl;
    const titleEl = document.getElementById('upsell-title');
    if (titleEl) titleEl.textContent = item.title;
    const priceEl = document.getElementById('upsell-price');
    if (priceEl) priceEl.textContent = formatPrice(item.price);
    const oldPriceEl = document.getElementById('upsell-old-price');
    if (oldPriceEl) oldPriceEl.textContent = formatPrice(item.old_price);
    
    const btn = document.getElementById('upsell-add-btn');
    if (btn) {{
      btn.onclick = function() {{
        CartManager.addItem(item.id, 1);
        renderCartPage();
        CartManager.showToast('تمت إضافة ' + item.title + ' لطلبك بنجاح');
      }};
    }}
  }}

  function renderCartPageRecommendations(cart) {{
    const recsGrid = document.getElementById('cart-page-recs-grid');
    const recsSec = document.getElementById('cart-page-recommendations-section');
    if (!recsGrid || !recsSec) return;

    if (cart.length === 0) {{
      recsSec.classList.add('hidden');
      return;
    }}
    recsSec.classList.remove('hidden');

    const inCartIds = new Set(cart.map(i => i.id));
    const pool = [
      'for-him-30ml',
      'for-her-30ml',
      'powderose-30ml',
      'musk-toffee-oil',
      'all-over-royal-tobacco',
      'all-over-choconilla',
      'linen-royal-tobacco',
      'linen-oud-rosewood',
      'roayal-tobacco',
      'note-for-him',
      'oud-rosewood',
      'musk',
      'aura'
    ];

    const recs = pool
      .filter(id => !inCartIds.has(id))
      .map(id => noteProductsCatalog.find(p => p.id === id))
      .filter(p => p && p.in_stock !== false && p.stock !== 0)
      .slice(0, 4);

    recsGrid.innerHTML = recs.map(p => {{
      const imgUrl = (p.img.startsWith('http') ? '' : ASSET_HOST) + p.img;
      const zidSlug = zidSlugMap[p.id] || p.id;
      return `
        <div class="p-3 rounded-2xl bg-stone-50 border border-stone-200/70 flex flex-col justify-between text-center group hover:border-black transition">
          <div>
            <div class="relative aspect-square mb-2 p-2 flex items-center justify-center bg-white rounded-xl border border-stone-100 overflow-hidden cursor-pointer" onclick="NoteRouter.navigate('/products/${{zidSlug}}')">
              <img src="${{imgUrl}}" alt="${{p.title}}" class="w-full h-full object-contain group-hover:scale-105 transition duration-300">
            </div>
            <h5 class="text-xs font-bold text-black line-clamp-1 mb-1 cursor-pointer hover:underline" onclick="NoteRouter.navigate('/products/${{zidSlug}}')">${{p.title}}</h5>
            <p class="text-[10px] text-stone-400 line-clamp-1 mb-2">${{p.size || '100 مل'}}</p>
          </div>
          <div>
            <div class="flex items-center justify-center gap-1.5 mb-2">
              <span class="text-xs font-extrabold text-black">${{formatPrice(p.price)}}</span>
              ${{p.old_price && formatPrice(p.old_price) ? `<span class="text-[10px] text-stone-400 line-through">${{formatPrice(p.old_price)}}</span>` : ''}}
            </div>
            <button onclick="CartManager.addItem('${{p.id}}', 1); renderCartPage();" class="w-full py-2 rounded-full bg-black hover:bg-stone-800 text-white text-[11px] font-bold transition flex items-center justify-center gap-1 active:scale-95 shadow-xs">
              <i class="sicon-plus text-[10px]"></i>
              <span>أضف للسلة</span>
            </button>
          </div>
        </div>
      `;
    }}).join('');
  }}

  async function applyCartCoupon() {{
    const input = document.getElementById('coupon-code-input');
    const msg = document.getElementById('coupon-msg');
    const tag = document.getElementById('coupon-applied-tag');
    const clearBtn = document.getElementById('coupon-clear-btn');
    const applyBtn = document.getElementById('coupon-apply-btn');
    const btnText = document.getElementById('coupon-btn-text');

    if (!input || !msg) return;

    const code = input.value.trim().toUpperCase();
    if (!code) {{
      msg.textContent = 'يرجى إدخال كود الخصم أولاً.';
      msg.className = 'text-[11px] font-bold text-rose-600 block';
      input.focus();
      return;
    }}

    if (applyBtn) applyBtn.disabled = true;
    if (btnText) btnText.innerHTML = '<svg class="animate-spin h-3.5 w-3.5 text-white inline-block" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>';

    try {{
      let applied = false;
      let zidError = null;

      if (window.zid && window.zid.cart && typeof window.zid.cart.applyCoupon === 'function') {{
        try {{
          const res = await window.zid.cart.applyCoupon({{ coupon_code: code }});
          if (res && (res.status === 'success' || res.data || res.message)) {{
            applied = true;
          }}
        }} catch (err) {{
          zidError = err?.message || 'كود الخصم غير صالح أو منتهي الصلاحية';
        }}
      }} else {{
        applied = true;
      }}

      if (zidError) {{
        msg.textContent = zidError;
        msg.className = 'text-[11px] font-bold text-rose-600 block';
        if (tag) tag.classList.add('hidden');
        if (clearBtn) clearBtn.classList.add('hidden');
        localStorage.removeItem('note_applied_coupon');
      }} else if (applied) {{
        localStorage.setItem('note_applied_coupon', code);
        msg.textContent = `تم تفعيل كود الخصم (${{code}}) بنجاح! سيتم تطبيقه لطلبك عند الدفع.`;
        msg.className = 'text-[11px] font-bold text-emerald-600 block';
        if (tag) tag.classList.remove('hidden');
        if (clearBtn) clearBtn.classList.remove('hidden');
      }}
    }} catch (e) {{
      msg.textContent = 'حدث خطأ أثناء تطبيق الكود. يرجى المحاولة مجدداً.';
      msg.className = 'text-[11px] font-bold text-rose-600 block';
    }} finally {{
      if (applyBtn) applyBtn.disabled = false;
      if (btnText) btnText.textContent = 'تطبيق';
    }}
  }}

  function clearCartCoupon() {{
    localStorage.removeItem('note_applied_coupon');
    const input = document.getElementById('coupon-code-input');
    const msg = document.getElementById('coupon-msg');
    const tag = document.getElementById('coupon-applied-tag');
    const clearBtn = document.getElementById('coupon-clear-btn');

    if (input) input.value = '';
    if (tag) tag.classList.add('hidden');
    if (clearBtn) clearBtn.classList.add('hidden');
    if (msg) {{
      msg.textContent = 'تمت إزالة كود الخصم.';
      msg.className = 'text-[11px] font-bold text-stone-500 block';
      setTimeout(() => {{ if (msg && msg.textContent === 'تمت إزالة كود الخصم.') msg.classList.add('hidden'); }}, 2500);
    }}

    if (window.zid && window.zid.cart && typeof window.zid.cart.removeCoupons === 'function') {{
      window.zid.cart.removeCoupons().catch(() => null);
    }}
  }}

  function restoreSavedCartCoupon() {{
    const saved = localStorage.getItem('note_applied_coupon');
    if (!saved) return;
    const input = document.getElementById('coupon-code-input');
    const tag = document.getElementById('coupon-applied-tag');
    const clearBtn = document.getElementById('coupon-clear-btn');
    const msg = document.getElementById('coupon-msg');

    if (input && !input.value) input.value = saved;
    if (tag) tag.classList.remove('hidden');
    if (clearBtn) clearBtn.classList.remove('hidden');
    if (msg && msg.classList.contains('hidden')) {{
      msg.textContent = `كود الخصم (${{saved}}) مفعّل لطلبك.`;
      msg.className = 'text-[11px] font-bold text-emerald-600 block';
    }}
  }}

  function updateCartFinancials(subtotal) {{
    const amount=Number.isFinite(Number(subtotal)) ? Number(subtotal) : 0;
    for(const id of ['page-subtotal','page-grand-total']) {{
      const el=document.getElementById(id);
      if(el) el.textContent=amount.toLocaleString('en-US',{{maximumFractionDigits:2}})+' ر.س';
    }}
    document.getElementById('discount-row')?.classList.add('hidden');
    const shipping=document.getElementById('page-shipping');
    if(shipping) shipping.textContent='يُحسب عند الدفع';

    const summary = document.getElementById('cart-page-summary-wrapper');
    if (summary) {{
      const spans = summary.querySelectorAll('span');
      for (let i = 0; i < spans.length; i++) {{
        const el = spans[i];
        if (el.children.length === 0 && el.textContent.includes('ضريبة القيمة المضافة') && !el.querySelector?.('.note-vat-rate')) {{
          el.innerHTML = el.textContent.replace(/ضريبة القيمة المضافة(\s*\([^)]*\))?/g, 'ضريبة القيمة المضافة (<bdi class="note-vat-rate" dir="ltr">15%</bdi>):');
        }}
      }}
    }}
  }}

  async function proceedToCheckout() {{
    const cart = CartManager.getCart();
    if (!cart || cart.length === 0) {{
      alert('السلة فارغة حالياً!');
      return;
    }}

    const btns = document.querySelectorAll('button[onclick*="proceedToCheckout"], a[onclick*="proceedToCheckout"], #cart-checkout-btn');
    btns.forEach(b => {{
      b.innerHTML = '<span class="inline-flex items-center gap-2"><svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg> <span>جاري الانتقال للدفع الآمن...</span></span>';
      b.style.pointerEvents = 'none';
      b.style.opacity = '0.85';
    }});

    try {{
      const appliedCoupon = localStorage.getItem('note_applied_coupon');
      if (appliedCoupon && window.zid && window.zid.cart && typeof window.zid.cart.applyCoupon === 'function') {{
        try {{
          await window.zid.cart.applyCoupon({{ coupon_code: appliedCoupon }});
        }} catch (e) {{
          console.warn('NOTE coupon sync warning:', e);
        }}
      }}

      if (window.zid && window.zid.cart && typeof window.zid.cart.addProduct === 'function') {{
        for (const item of cart) {{
          const zidUuid = ZID_PRODUCT_MAP[item.id] || item.id;
          try {{
            await window.zid.cart.addProduct({{
              product_id: zidUuid,
              quantity: item.quantity || 1
            }});
          }} catch (e) {{
            console.warn('Sync notice:', item.id, e);
          }}
        }}
        window.location.href = '/checkout';
        return;
      }}
    }} catch (err) {{
      console.error('Zid sync error:', err);
    }}

    window.location.href = 'https://note-sa.com/checkout';
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
        const searchParam = new URLSearchParams(window.location.search).get('search');
        if (searchParam) {{
          setTimeout(() => {{
            const inp = document.getElementById('cat-search-input');
            if (inp) inp.value = searchParam;
            handleCategorySearch(searchParam);
          }}, 30);
        }}
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
      updateActiveNav(target);
    }}
  }};

  function getLinkCategory(link) {{
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
  }}

  function updateActiveNav(target) {{
    const navLinks = document.querySelectorAll('#nav-links a, header nav a');
    if (!navLinks || navLinks.length === 0) return;
    
    let activeKey = 'home';
    if (target) {{
      if (target.route === 'home') activeKey = 'home';
      else if (target.route === 'category') activeKey = target.cat || 'all';
      else activeKey = null;
    }} else if (typeof NoteRouter !== 'undefined' && NoteRouter.detectRoute) {{
      const detected = NoteRouter.detectRoute();
      if (detected.route === 'home') activeKey = 'home';
      else if (detected.route === 'category') activeKey = detected.cat || 'all';
      else activeKey = null;
    }}
    
    const navAliases = {{'zid-1748533':'perfumes','zid-1759040':'niche','zid-1697258':'bestsellers','zid-1327929':'new'}};
    activeKey = navAliases[activeKey] || activeKey;
    navLinks.forEach(link => {{
      const linkCat = getLinkCategory(link);
      const isMatch = activeKey && (linkCat === activeKey);
      
      if (isMatch) {{
        link.classList.add('border-b-2', 'border-current', 'active-link');
        link.style.borderBottom = '2px solid currentColor';
      }} else {{
        link.classList.remove('border-b-2', 'border-current', 'active-link');
        link.style.borderBottom = '2px solid transparent';
      }}
    }});
  }}

  // 19.5 Native Zid Loader Preservation & Dismissal
  function dismissZidLoader() {{
    const loader = document.getElementById('loader-container');
    if (!loader) return;
    loader.classList.add('note-loader-dismissed');
    loader.style.transition = 'opacity 0.4s ease-out';
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    setTimeout(() => {{
      try {{
        if (loader._origRemove) loader._origRemove.call(loader);
        else if (loader.parentElement) loader.parentElement.removeChild(loader);
        else loader.remove();
      }} catch(e) {{}}
    }}, 450);
  }}

  // 20. Shell Mounter (Instant Zero-Delay Synchronous Execution)
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

    // Route to current page immediately (0ms)
    NoteRouter.route();
    document.body.classList.add('note-ready');

    // Smoothly dismiss Zid's native entrance loader
    requestAnimationFrame(() => {{
      setTimeout(dismissZidLoader, 160);
    }});
    setTimeout(dismissZidLoader, 2500);

    // Background Live Sync with Zid (Completely non-blocking, zero layout shift)
    setTimeout(() => {{
      ZidSyncManager.fetchLiveCatalog(5000).then(() => {{
        ZidSyncManager.refreshDomPrices();
      }});
    }}, 200);
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

  // Global Escape key listener to close modals
  document.addEventListener('keydown', function(e) {{
    if (e.key === 'Escape') {{
      closeSearchModal();
      closeMobileMenu();
      CartManager.closeDrawer();
      closeQuickView();
    }}
  }});

  // Global Exports for Inlined HTML Handlers
  window.formatPrice = formatPrice;
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
  window.handleLiveSearch = handleLiveSearch;
  window.fillAndSearch = fillAndSearch;
  window.normalizeArabic = normalizeArabic;
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
  window.clearCatSearch = clearCatSearch;
  window.focusSearchInput = function() {{
    const el = document.getElementById('cat-search-input');
    if (el) el.focus();
  }};

  // Cart Page Handlers & Aliases
  window.renderCartPage = renderCartPage;
  window.applyCartCoupon = applyCartCoupon;
  window.applyCoupon = applyCartCoupon;
  window.clearCartCoupon = clearCartCoupon;
  window.restoreSavedCartCoupon = restoreSavedCartCoupon;
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

app_js_code = fix_startup(apply_live_fixes(app_js_code))
app_js_code += "\n" + read_preview("welcome-popup.js")

with open(OUT_JS, "w", encoding="utf-8") as f:
    f.write(app_js_code)
print(f"Generated {OUT_JS} ({os.path.getsize(OUT_JS)} bytes)")

