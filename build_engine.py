#!/usr/bin/env python3
import os
import re
import json
import time
from pathlib import Path
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
cart_drawer_html = re.sub(r'<div class="px-5 py-3 bg-stone-50 border-b border-stone-100[^"]*"', r'<div hidden \g<0>', cart_drawer_html)
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
        (r'poster="/assets/', f'poster="{ASSET_HOST}/assets/'),
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
        (r'href="/category\.html\?cat=bodycare"', 'href="/categories/1759046/body-care-products"'),
        (r'href="/category\.html\?cat=body-care"', 'href="/categories/1759046/body-care-products"'),
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

/* All Product Card Image Containers - Luxury Smooth Rounded Corners */
.aspect-square,
[class*="aspect-square"],
.tp-product-image,
.tp-product-item .aspect-square {{
  border-radius: 20px !important;
  overflow: hidden !important;
}}

.aspect-square img,
[class*="aspect-square"] img,
.tp-product-image img {{
  border-radius: 18px !important;
}}

/* Product Badge / Discount Tag (Transparent Luxury Pill with Crisp Dark Text) */
.note-product-badge:not(.note-out-of-stock-sticker):not(.out-of-stock),
#pdp-tag-badge {{
  position: absolute !important;
  top: 14px !important;
  right: 14px !important;
  z-index: 10 !important;
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
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12) !important;
}}

.note-discount-badge,
.note-product-badge:not(.note-out-of-stock-sticker):not(.out-of-stock):has(bdi),
#pdp-discount-badge {{
  position: absolute !important;
  top: 14px !important;
  right: 14px !important;
  z-index: 10 !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Tajawal", Arial, sans-serif !important;
  font-size: 11px !important;
  font-weight: 800 !important;
  line-height: 1.2 !important;
  padding: 3.5px 9px !important;
  min-height: 22px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 4px !important;
  direction: rtl !important;
  white-space: nowrap !important;
  box-sizing: border-box !important;
  background: linear-gradient(135deg, #f5e9c9 0%, #dfc485 100%) !important;
  border: 1px solid rgba(195, 160, 85, 0.45) !important;
  border-radius: 9999px !important;
  color: #111111 !important;
  box-shadow: 0 3px 8px rgba(180, 145, 75, 0.25) !important;
}}

.note-discount-badge bdi,
.note-discount-badge span,
.note-product-badge:has(bdi) bdi,
.note-product-badge:has(bdi) span,
#pdp-discount-badge bdi,
#pdp-discount-badge span {{
  color: #111111 !important;
  font-weight: 800 !important;
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
  .aspect-square,
  [class*="aspect-square"],
  .tp-product-image,
  .tp-product-item .aspect-square {{
    border-radius: 16px !important;
  }}
  .aspect-square img,
  [class*="aspect-square"] img,
  .tp-product-image img {{
    border-radius: 14px !important;
  }}
  .note-product-badge:not(.note-out-of-stock-sticker):not(.out-of-stock),
  #pdp-tag-badge {{
    top: 10px !important;
    right: 10px !important;
    font-size: 10px !important;
    padding: 2.5px 7px !important;
    min-height: 20px !important;
  }}
  .note-discount-badge,
  .note-product-badge:not(.note-out-of-stock-sticker):not(.out-of-stock):has(bdi),
  #pdp-discount-badge {{
    top: 10px !important;
    right: 10px !important;
    font-size: 10px !important;
    padding: 2.5px 7.5px !important;
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

#pdp-main-image-container {{
  background-color: #ffffff !important;
  background: #ffffff !important;
  border: none !important;
  border-width: 0 !important;
  box-shadow: none !important;
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

#note-luxury-storefront .note-cart-pending-status {{
  position: sticky;
  top: 110px;
}}
/* Cart updates use a single calm status while native pricing is pending. */
#note-luxury-storefront #bundle-discount-row,
#note-luxury-storefront #drawer-bundle-discount-row {{
  display: none !important;
}}
#note-luxury-storefront .note-cart-loading {{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 16px;
  margin-bottom: 12px;
  border: 1px solid #e8e1d4;
  border-radius: 14px;
  background: #faf8f3;
  color: #574c38;
  font-size: 13px;
  font-weight: 600;
}}
#note-luxury-storefront .note-cart-loading[hidden] {{
  display: none !important;
}}
.note-cart-loading-spinner {{
  display: inline-block;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  border: 2px solid #e7dfcf;
  border-top-color: #a58b52;
  border-radius: 50%;
  animation: noteSpinRing 0.8s linear infinite;
}}
@media (prefers-reduced-motion: reduce) {{
  .note-cart-loading-spinner {{ animation: none; }}
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

/* Universal Rozia native cart & header suppression */
.cart-view,
.breadcrumb-subtitle,
.section-cart-products,
.cart-totals,
.cart-products-with-totals,
.cart-flex,
.tp-bar-header,
header.header-nav,
.header-wrapper,
.header-container,
.tp-footer-area,
.whatsapp-icon {{
  display: none !important;
  visibility: hidden !important;
}}

body:not(.note-ready) section[section-id],
body:not(.note-ready) .tp-home,
body:not(.note-ready) .tp-bar-header,
body:not(.note-ready) header.header-nav,
body:not(.note-ready) footer:not(#note-store-footer) {{
  display: none !important;
  visibility: hidden !important;
}}

/* Slide-out Cart Drawer Architecture (Laverne Parity) */
#cart-drawer-overlay {{
  z-index: 9998 !important;
}}
#cart-drawer {{
  display: flex !important;
  flex-direction: column !important;
  height: 100vh !important;
  height: 100dvh !important;
  max-height: 100dvh !important;
  overflow: hidden !important;
  z-index: 9999 !important;
}}
#cart-drawer-scroll-area {{
  flex: 1 1 auto !important;
  overflow-y: auto !important;
  overscroll-behavior: contain !important;
  -webkit-overflow-scrolling: touch !important;
  min-height: 0 !important;
}}
#cart-drawer-items {{
  min-height: 0 !important;
  max-height: none !important;
  overflow: visible !important;
  padding: 0 !important;
}}
/* Laverne-Parity Cart Item Card (Drawer & Page) */
.note-cart-item {{
  display: block !important;
  background: #ffffff !important;
  border: 1px solid #e7e5e4 !important;
  border-radius: 18px !important;
  padding: 14px 16px !important;
  margin-bottom: 12px !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02) !important;
  text-align: right !important;
  direction: rtl !important;
  box-sizing: border-box !important;
  position: relative !important;
}}
@media (min-width: 640px) {{
  .note-cart-item {{
    padding: 18px 20px !important;
    margin-bottom: 14px !important;
    border-radius: 20px !important;
  }}
}}

.note-cart-item-top {{
  display: flex !important;
  flex-direction: row !important;
  align-items: flex-start !important;
  justify-content: space-between !important;
  gap: 12px !important;
  width: 100% !important;
  box-sizing: border-box !important;
}}

.note-cart-item-start {{
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 12px !important;
  min-width: 0 !important;
  flex: 1 1 auto !important;
}}

.note-cart-item .cart-drawer-thumb,
.note-cart-item-thumb {{
  width: 82px !important;
  height: 82px !important;
  min-width: 82px !important;
  min-height: 82px !important;
  max-width: 82px !important;
  max-height: 82px !important;
  border-radius: 14px !important;
  background: #ffffff !important;
  border: 1px solid #f0eee9 !important;
  padding: 4px !important;
  flex-shrink: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
}}
@media (min-width: 640px) {{
  .note-cart-item .cart-drawer-thumb,
  .note-cart-item-thumb {{
    width: 96px !important;
    height: 96px !important;
    min-width: 96px !important;
    min-height: 96px !important;
    max-width: 96px !important;
    max-height: 96px !important;
    border-radius: 16px !important;
  }}
}}

.note-cart-item-thumb img,
.note-cart-item .cart-drawer-thumb img {{
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: contain !important;
}}

.note-cart-item-info {{
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  gap: 4px !important;
  min-width: 0 !important;
  flex: 1 1 auto !important;
  text-align: right !important;
}}

.note-cart-item-title-link {{
  text-decoration: none !important;
  color: inherit !important;
  display: block !important;
}}

.note-cart-item h4,
.note-cart-item-title {{
  font-size: 15px !important;
  font-weight: 700 !important;
  color: #1c1917 !important;
  line-height: 1.35 !important;
  margin: 0 !important;
  text-decoration: none !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
}}
@media (min-width: 640px) {{
  .note-cart-item h4,
  .note-cart-item-title {{
    font-size: 17px !important;
  }}
}}

.note-cart-item-prices {{
  display: flex !important;
  flex-direction: row !important;
  align-items: baseline !important;
  gap: 8px !important;
  margin-top: 2px !important;
}}

.note-cart-item-old-price {{
  font-size: 13px !important;
  font-weight: 500 !important;
  color: #a8a29e !important;
  text-decoration: line-through !important;
}}

.note-cart-item-sale-price {{
  font-size: 15px !important;
  font-weight: 800 !important;
  color: #ef4444 !important;
}}
@media (min-width: 640px) {{
  .note-cart-item-old-price {{ font-size: 14px !important; }}
  .note-cart-item-sale-price {{ font-size: 17px !important; }}
}}

.note-cart-item-del-btn {{
  width: 28px !important;
  height: 28px !important;
  min-width: 28px !important;
  min-height: 28px !important;
  max-width: 28px !important;
  max-height: 28px !important;
  border-radius: 9999px !important;
  background-color: #f87171 !important;
  background: #f87171 !important;
  border: none !important;
  outline: none !important;
  color: #ffffff !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  cursor: pointer !important;
  flex-shrink: 0 !important;
  box-shadow: 0 1px 3px rgba(248, 113, 113, 0.35) !important;
  transition: background-color 0.15s ease, transform 0.15s ease !important;
  appearance: none !important;
  -webkit-appearance: none !important;
}}
.note-cart-item-del-btn:hover {{
  background-color: #ef4444 !important;
  background: #ef4444 !important;
}}
.note-cart-item-del-btn:active {{
  transform: scale(0.92) !important;
}}
.note-cart-item-del-btn svg {{
  width: 11px !important;
  height: 11px !important;
  stroke: #ffffff !important;
  stroke-width: 2.5 !important;
  display: block !important;
  margin: auto !important;
}}

.note-cart-item-divider {{
  width: 100% !important;
  height: 1px !important;
  min-height: 1px !important;
  max-height: 1px !important;
  background-color: #f0eee9 !important;
  border: none !important;
  margin: 12px 0 !important;
  padding: 0 !important;
  display: block !important;
}}

.note-cart-item-bottom {{
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
  box-sizing: border-box !important;
}}

.note-cart-item-stepper {{
  display: inline-flex !important;
  flex-direction: row !important;
  align-items: center !important;
  height: 38px !important;
  width: 126px !important;
  min-width: 126px !important;
  border: 1px solid #e7e5e4 !important;
  border-radius: 11px !important;
  background: #ffffff !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02) !important;
}}
@media (min-width: 640px) {{
  .note-cart-item-stepper {{
    height: 40px !important;
    width: 136px !important;
  }}
}}

.note-cart-item-stepper-btn {{
  width: 38px !important;
  height: 100% !important;
  min-width: 38px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: transparent !important;
  border: none !important;
  color: #57534e !important;
  font-size: 17px !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  padding: 0 !important;
  transition: background-color 0.15s ease, color 0.15s ease !important;
  appearance: none !important;
  -webkit-appearance: none !important;
}}
@media (min-width: 640px) {{
  .note-cart-item-stepper-btn {{
    width: 42px !important;
    min-width: 42px !important;
    font-size: 18px !important;
  }}
}}
.note-cart-item-stepper-btn:hover {{
  background: #f5f5f4 !important;
  color: #000000 !important;
}}
.note-cart-item-stepper-btn:active {{
  background: #e7e5e4 !important;
}}

.note-cart-item-stepper-val {{
  flex: 1 1 auto !important;
  height: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-left: 1px solid #e7e5e4 !important;
  border-right: 1px solid #e7e5e4 !important;
  background: #fafaf9 !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  color: #1c1917 !important;
  user-select: none !important;
  box-sizing: border-box !important;
}}
@media (min-width: 640px) {{
  .note-cart-item-stepper-val {{
    font-size: 15px !important;
  }}
}}

.note-cart-item-total {{
  display: flex !important;
  flex-direction: row !important;
  align-items: baseline !important;
  gap: 5px !important;
  text-align: left !important;
}}

.note-cart-item-total-label {{
  font-size: 13px !important;
  font-weight: 500 !important;
  color: #78716c !important;
}}
@media (min-width: 640px) {{
  .note-cart-item-total-label {{
    font-size: 14px !important;
  }}
}}

.note-cart-item-total-val {{
  font-size: 16px !important;
  font-weight: 800 !important;
  color: #1c1917 !important;
}}
@media (min-width: 640px) {{
  .note-cart-item-total-val {{
    font-size: 18px !important;
  }}
}}
#cart-drawer-coupon-box {{
  flex-shrink: 0 !important;
  margin-top: 4px !important;
  margin-bottom: 4px !important;
}}
#cart-drawer-recommendations {{
  padding: 8px 0 !important;
  margin: 0 !important;
  background: transparent !important;
  border: none !important;
  flex-shrink: 0 !important;
}}
#cart-drawer-footer {{
  padding: 14px 16px 16px !important;
  border-top: 1px solid #f0eee9 !important;
  background: #ffffff !important;
  flex-shrink: 0 !important;
  position: relative !important;
  z-index: 10 !important;
}}

/* WhatsApp button suppression when cart drawer is active so it never overlaps checkout button */
body.cart-drawer-open #whatsapp-floating-btn,
body.cart-drawer-open .whatsapp-btn,
body.cart-drawer-open [class*="whatsapp"],
body.cart-drawer-open [id*="whatsapp"],
body:has(#cart-drawer:not(.hidden)) #whatsapp-floating-btn,
body:has(#cart-drawer:not(.hidden)) .whatsapp-btn,
body:has(#cart-drawer:not(.hidden)) [class*="whatsapp"],
#cart-drawer:not(.hidden) ~ #whatsapp-floating-btn,
#cart-drawer:not(.hidden) ~ [class*="whatsapp"] {{
  display: none !important;
  opacity: 0 !important;
  pointer-events: none !important;
  visibility: hidden !important;
}}

/* Laverne-Grade Luxury Cart Page Items */
.note-cart-page-item {{
  display: block !important;
  background: #ffffff !important;
  border: 1px solid #e7e5e4 !important;
  border-radius: 16px !important;
  padding: 14px 16px !important;
  margin-bottom: 12px !important;
  text-align: right !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02) !important;
}}
@media (min-width: 640px) {{
  .note-cart-page-item {{
    padding: 18px 22px !important;
  }}
}}
.note-cart-page-item .cart-thumb-box {{
  width: 76px !important;
  height: 76px !important;
  border-radius: 12px !important;
  background: #fafaf9 !important;
  border: 1px solid #e7e5e4 !important;
  padding: 4px !important;
  flex-shrink: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}}
@media (min-width: 640px) {{
  .note-cart-page-item .cart-thumb-box {{
    width: 84px !important;
    height: 84px !important;
  }}
}}
.note-cart-page-item h4 {{
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: 1.4 !important;
  color: #111111 !important;
}}
.note-cart-page-item .text-\\[11px\\] {{
  font-size: 11.5px !important;
  color: #78716c !important;
}}

/* ==========================================================================
   NOTE LUXURY ADD-TO-CART BUTTON MICRO-INTERACTION & ANIMATION
   ========================================================================== */
@keyframes noteBtnPop {{
  0% {{ transform: scale(1); }}
  25% {{ transform: scale(0.92); }}
  60% {{ transform: scale(1.05); }}
  100% {{ transform: scale(1); }}
}}

@keyframes noteCheckPop {{
  0% {{ transform: scale(0) rotate(-30deg); opacity: 0; }}
  60% {{ transform: scale(1.25) rotate(6deg); opacity: 1; }}
  100% {{ transform: scale(1) rotate(0deg); opacity: 1; }}
}}

@keyframes notePulseGlow {{
  0% {{
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7), 0 2px 10px rgba(0, 0, 0, 0.2);
  }}
  60% {{
    box-shadow: 0 0 0 12px rgba(16, 185, 129, 0), 0 4px 16px rgba(16, 185, 129, 0.25);
  }}
  100% {{
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0), 0 2px 6px rgba(0, 0, 0, 0.1);
  }}
}}

@keyframes noteHeaderCartShake {{
  0% {{ transform: scale(1) rotate(0deg); }}
  20% {{ transform: scale(1.2) rotate(-10deg); }}
  40% {{ transform: scale(1.2) rotate(10deg); }}
  60% {{ transform: scale(1.1) rotate(-5deg); }}
  80% {{ transform: scale(1.05) rotate(5deg); }}
  100% {{ transform: scale(1) rotate(0deg); }}
}}

.note-cart-shake {{
  animation: noteHeaderCartShake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both !important;
}}

.note-btn-added {{
  animation: noteBtnPop 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), notePulseGlow 0.8s ease-out !important;
  background-color: #000000 !important;
  color: #ffffff !important;
  border-color: #10b981 !important;
  pointer-events: none !important;
  transform-origin: center center !important;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
}}

.note-btn-added .note-check-icon {{
  display: inline-flex !important;
  vertical-align: middle !important;
  animation: noteCheckPop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards !important;
}}

/* ==========================================================================
   Offers Promotional Carousel (Responsive Aspect Ratio: 9:16 Mobile, 2:1 Desktop)
   ========================================================================== */
#offers-carousel {{
  aspect-ratio: 9 / 16 !important;
  width: 100%;
}}

@media (min-width: 768px) {{
  #offers-carousel {{
    aspect-ratio: 2 / 1 !important;
  }}
}}

#offers-carousel .offer-slide {{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}}

#offers-carousel picture {{
  display: block;
  width: 100%;
  height: 100%;
}}

#offers-carousel picture img {{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}}

/* ==========================================================================
   NOTE LUXURY COUPON APPLICATION ANIMATIONS & CELEBRATION
   ========================================================================== */
@keyframes noteCouponAppliedPulse {{
  0% {{
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6);
  }}
  35% {{
    transform: scale(1.025);
    border-color: #10b981 !important;
    box-shadow: 0 0 0 10px rgba(16, 185, 129, 0.18), 0 6px 20px rgba(16, 185, 129, 0.15);
  }}
  70% {{
    transform: scale(0.995);
    border-color: #10b981 !important;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.08);
  }}
  100% {{
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }}
}}

.note-coupon-applied-anim {{
  animation: noteCouponAppliedPulse 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275) both !important;
}}

@keyframes noteCouponTagPop {{
  0% {{
    transform: scale(0) rotate(-15deg);
    opacity: 0;
  }}
  60% {{
    transform: scale(1.22) rotate(4deg);
    opacity: 1;
  }}
  80% {{
    transform: scale(0.95) rotate(-2deg);
  }}
  100% {{
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }}
}}

.note-coupon-tag-anim {{
  animation: noteCouponTagPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both !important;
}}

@keyframes noteConfettiBurst {{
  0% {{
    transform: translate(0, 0) scale(1) rotate(0deg);
    opacity: 1;
  }}
  75% {{
    opacity: 1;
  }}
  100% {{
    transform: translate(var(--dx), var(--dy)) scale(0.4) rotate(var(--rot));
    opacity: 0;
  }}
}}

.note-confetti-piece {{
  position: absolute;
  pointer-events: none;
  z-index: 50;
  animation: noteConfettiBurst 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}}

@keyframes notePriceDrop {{
  0% {{
    transform: scale(1);
    color: #10b981 !important;
  }}
  45% {{
    transform: scale(1.18);
    color: #059669 !important;
    text-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
  }}
  100% {{
    transform: scale(1);
  }}
}}

.note-price-drop-anim {{
  display: inline-block !important;
  animation: notePriceDrop 0.8s ease-out both !important;
}}

@keyframes noteMsgSlideDown {{
  0% {{
    opacity: 0;
    transform: translateY(-8px);
  }}
  100% {{
    opacity: 1;
    transform: translateY(0);
  }}
}}

.note-msg-anim {{
  animation: noteMsgSlideDown 0.35s ease-out both !important;
}}

/* Coupon "تطبيق" (Apply Coupon) Button - Default Premium Black */
#drawer-coupon-btn,
#coupon-apply-btn {{
  background: #111111 !important;
  color: #ffffff !important;
  border: 1px solid #111111 !important;
  font-weight: 800 !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15) !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  cursor: pointer !important;
}}

#drawer-coupon-btn:hover,
#coupon-apply-btn:hover {{
  background: #262626 !important;
  border-color: #262626 !important;
  color: #ffffff !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25) !important;
  transform: translateY(-1px);
}}

#drawer-coupon-btn:active,
#coupon-apply-btn:active {{
  transform: translateY(0);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
}}

#drawer-coupon-btn:disabled,
#coupon-apply-btn:disabled {{
  opacity: 0.65 !important;
  cursor: not-allowed !important;
  transform: none !important;
}}

#drawer-coupon-btn span,
#coupon-apply-btn span,
#drawer-coupon-btn bdi,
#coupon-apply-btn bdi {{
  color: #ffffff !important;
  font-weight: 800 !important;
}}

/* Luxury Radiant Gold ONLY when coupon discount is active / applied */
#drawer-coupon-btn.note-btn-gold,
#coupon-apply-btn.note-btn-gold {{
  background: linear-gradient(135deg, #faefd4 0%, #dfc485 50%, #c9a85c 100%) !important;
  color: #111111 !important;
  border: 1px solid rgba(195, 160, 85, 0.6) !important;
  box-shadow: 0 2px 10px rgba(223, 196, 133, 0.4) !important;
}}

#drawer-coupon-btn.note-btn-gold:hover,
#coupon-apply-btn.note-btn-gold:hover {{
  background: linear-gradient(135deg, #fdf5e2 0%, #e6cd90 50%, #d8b76c 100%) !important;
  box-shadow: 0 4px 14px rgba(223, 196, 133, 0.5) !important;
  transform: translateY(-1px);
}}

#drawer-coupon-btn.note-btn-gold span,
#coupon-apply-btn.note-btn-gold span,
#drawer-coupon-btn.note-btn-gold bdi,
#coupon-apply-btn.note-btn-gold bdi {{
  color: #111111 !important;
  font-weight: 800 !important;
}}

#drawer-coupon-btn.note-btn-gold svg,
#coupon-apply-btn.note-btn-gold svg {{
  stroke: #111111 !important;
  color: #111111 !important;
}}

/* Grouped Offer Bundle Cards in /cart Page */
.note-bundle-group-card {{
  background: #ffffff !important;
  border: 1px solid #e7e5e4 !important;
  border-radius: 20px !important;
  padding: 16px 18px !important;
  margin-bottom: 16px !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02) !important;
  position: relative !important;
}}
@media (min-width: 640px) {{
  .note-bundle-group-card {{
    padding: 20px 22px !important;
    border-radius: 22px !important;
  }}
}}
.note-bundle-group-header {{
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding-bottom: 12px !important;
  border-bottom: 1px solid #f0eee9 !important;
  margin-bottom: 14px !important;
  flex-wrap: wrap !important;
  gap: 8px !important;
}}
.note-bundle-badge {{
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  background: #fff8eb !important;
  color: #855900 !important;
  border: 1px solid #fce7b2 !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  padding: 4px 12px !important;
  border-radius: 9999px !important;
}}
.note-bundle-savings {{
  font-size: 11px !important;
  font-weight: 800 !important;
  color: #059669 !important;
  background: #ecfdf5 !important;
  padding: 3px 10px !important;
  border-radius: 9999px !important;
  border: 1px solid #a7f3d0 !important;
}}
.note-bundle-sub-item {{
  border-radius: 16px !important;
  border: 1px solid #f0eee9 !important;
  background: #ffffff !important;
  padding: 12px 14px !important;
  margin-bottom: 10px !important;
}}
.note-bundle-sub-item:last-child {{
  margin-bottom: 0 !important;
}}
.note-bundle-sub-item-discounted {{
  background: #fafaf7 !important;
  border-color: #dfc485 !important;
  box-shadow: 0 0 0 1px rgba(223, 196, 133, 0.25) !important;
}}

/* Header Bar Seamless Integration - No Bottom Line & Responsive Blur */
#site-header {{
  border: none !important;
  border-bottom: none !important;
}}
#site-header.border-none,
#site-header.hero-light-top,
#site-header.hero-dark-top {{
  border: none !important;
  border-bottom: none !important;
  box-shadow: none !important;
}}
#site-header.backdrop-blur-none {{
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}}

/* Zero Layout Shift Guarantee for Hero Cinematic Video */
#section-hero-video {{
  position: relative !important;
  width: 100% !important;
  min-height: 720px !important;
  overflow: hidden !important;
  background-color: #000000 !important;
  contain: layout paint !important;
}}
#section-hero-video video,
#hero-background-video {{
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
}}

/* Hero Offer Announcement Gold Pill - Radiant & High Contrast */
.hero-offer-badge {{
  display: inline-block !important;
  padding: 5px 14px !important;
  border-radius: 9999px !important;
  background: rgba(212, 175, 55, 0.22) !important;
  border: 1px solid rgba(245, 215, 110, 0.75) !important;
  color: #ffd777 !important;
  font-size: 11px !important;
  font-weight: 800 !important;
  letter-spacing: 0.5px !important;
  margin-bottom: 8px !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.45) !important;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7) !important;
}}

/* White Friday Offer Luxury Dialog Modal (Identical Shape & Size to Welcome Popup) */
@keyframes noteWhiteFridayArrive {{
  from {{ opacity: 0; transform: translateY(15px) scale(.94); }}
  to {{ opacity: 1; transform: none; }}
}}
#white-friday-popup {{
  position: fixed !important;
  inset: 0 !important;
  margin: auto !important;
  width: min(420px, calc(100vw - 40px)) !important;
  max-height: calc(100dvh - 32px) !important;
  overflow: auto !important;
  font-family: NoteWelcome, Dahab, Tahoma, sans-serif !important;
  color: #302b25 !important;
  padding: 30px 24px 22px !important;
  text-align: center !important;
  background: #fffdf8 !important;
  border: 1px solid #fff7e7 !important;
  border-radius: 26px !important;
  box-shadow: 0 24px 90px rgba(0, 0, 0, 0.25) !important;
  animation: noteWhiteFridayArrive .45s ease-out !important;
  direction: rtl !important;
  z-index: 100000 !important;
  box-sizing: border-box !important;
}}
#white-friday-popup * {{ box-sizing: border-box !important; }}
#white-friday-popup::backdrop {{
  background: rgba(23, 23, 16, 0.55) !important;
  backdrop-filter: blur(4px) !important;
  -webkit-backdrop-filter: blur(4px) !important;
}}
#white-friday-popup .close {{
  position: absolute !important;
  left: 14px !important;
  top: 12px !important;
  border: 0 !important;
  background: transparent !important;
  color: #8c8579 !important;
  font-size: 25px !important;
  width: 36px !important;
  height: 36px !important;
  cursor: pointer !important;
  outline: none !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  line-height: 1 !important;
}}
#white-friday-popup .close:hover {{ color: #302b25 !important; }}
#white-friday-popup .brand {{
  font-family: Georgia, serif !important;
  letter-spacing: 7px !important;
  font-size: 13px !important;
  color: #8c7e64 !important;
  direction: ltr !important;
}}
#white-friday-popup .gift {{
  margin: 16px auto 12px !important;
  width: 64px !important;
  height: 64px !important;
  border-radius: 50% !important;
  display: grid !important;
  place-items: center !important;
  background: #f6eddb !important;
  color: #9c7841 !important;
}}
#white-friday-popup .gift svg {{
  width: 34px !important;
  height: 34px !important;
}}
#white-friday-popup h1 {{
  font-size: 24px !important;
  margin: 0 0 6px !important;
  font-weight: 700 !important;
  color: #302b25 !important;
}}
#white-friday-popup .desc {{
  font-size: 13.5px !important;
  color: #82786b !important;
  line-height: 1.6 !important;
  margin: 0 0 16px !important;
}}
#white-friday-popup .offer-box {{
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  border: 1px dashed #d9c49c !important;
  border-radius: 14px !important;
  padding: 12px 14px !important;
  margin: 10px 0 !important;
  background: #faf5eb !important;
  width: 100% !important;
  cursor: pointer !important;
  text-align: right !important;
  transition: all 0.2s ease !important;
  color: #7a613e !important;
}}
#white-friday-popup .offer-box:hover {{
  background: #f7eedd !important;
  border-color: #c4a974 !important;
  transform: translateY(-1px) !important;
}}
#white-friday-popup .offer-info {{
  display: flex !important;
  flex-direction: column !important;
  gap: 2px !important;
  text-align: right !important;
}}
#white-friday-popup .offer-pill {{
  display: inline-flex !important;
  align-items: center !important;
  width: fit-content !important;
  background: #fdf6e9 !important;
  border: 1px solid #ebd9b8 !important;
  border-radius: 9999px !important;
  padding: 2px 8px !important;
  color: #835f28 !important;
  font-size: 10px !important;
  font-weight: 700 !important;
  margin-bottom: 2px !important;
}}
#white-friday-popup .offer-pill.tolah {{
  background: #f5f0e6 !important;
  border-color: #dfd5c2 !important;
  color: #6d614e !important;
}}
#white-friday-popup .offer-head {{
  font-size: 15px !important;
  font-weight: 700 !important;
  color: #3f3528 !important;
}}
#white-friday-popup .offer-sub {{
  font-size: 11.5px !important;
  color: #7d7264 !important;
  line-height: 1.4 !important;
}}
#white-friday-popup .offer-price {{
  font-size: 13px !important;
  font-weight: 700 !important;
  color: #835f28 !important;
  background: #fff !important;
  border: 1px solid #ebd9b8 !important;
  border-radius: 8px !important;
  padding: 4px 8px !important;
  white-space: nowrap !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
}}
#white-friday-popup .primary {{
  display: block !important;
  width: 100% !important;
  padding: 14px !important;
  background: #302d25 !important;
  border: 0 !important;
  color: white !important;
  border-radius: 12px !important;
  font-family: inherit !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  text-decoration: none !important;
  margin-top: 14px !important;
  transition: opacity 0.2s !important;
}}
#white-friday-popup .primary:hover {{ opacity: 0.9 !important; }}
#white-friday-popup .later {{
  border: 0 !important;
  background: none !important;
  color: #918879 !important;
  font-family: inherit !important;
  font-size: 12px !important;
  margin-top: 14px !important;
  cursor: pointer !important;
  display: block !important;
  width: 100% !important;
}}
#white-friday-popup .later:hover {{ color: #5a5347 !important; }}

/* Unified Luxury Gold Offer Category Buttons */
.note-offer-btn {{
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  padding: 13px 14px !important;
  background: linear-gradient(135deg, #faefd4 0%, #dfc485 50%, #c9a85c 100%) !important;
  color: #111111 !important;
  font-weight: 800 !important;
  font-size: 13.5px !important;
  border: 1px solid rgba(195, 160, 85, 0.6) !important;
  border-radius: 14px !important;
  box-shadow: 0 2px 8px rgba(223, 196, 133, 0.3) !important;
  transition: all 0.25s ease !important;
  text-decoration: none !important;
  min-height: 48px !important;
  box-sizing: border-box !important;
}}
.note-offer-btn:hover, .note-offer-btn:focus-visible {{
  background: linear-gradient(135deg, #fdf5e2 0%, #e6cd90 50%, #d8b76c 100%) !important;
  box-shadow: 0 4px 14px rgba(223, 196, 133, 0.5) !important;
  transform: translateY(-1px) !important;
}}
.note-offer-btn:active {{
  transform: scale(0.97) !important;
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
    'niche': '/categories/1759040/عطور-النيش-1',
    'bestsellers': '/categories/1697258/الأكثر-مبيعا',
    'new': '/categories/1327929/newest-products',
    'travel': '/categories/1759043/عطور-30-مل',
    'all-over': '/categories/1759042/معطر-للجسم-بالكامل',
    'packages': '/categories/1752110/packages',
    'linen': '/categories/1759044/معطرات-جو-وجسم-1',
    'tollah': '/categories/1421002/tollah',
    'body-care': '/categories/1759046/منتجات-العناية'
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

  // Universal Price Formatter: Guarantees consistent 'X ر.س' with zero duplication & clean rounding
  function formatPrice(val) {{
    if (val === null || val === undefined || val === '' || val === 'null' || val === 'undefined') return '';
    const num = Number(String(val).replace(/ر\.س/g, '').replace(/SAR/gi, '').trim());
    if (Number.isFinite(num)) {{
      const rounded = Math.round(num * 100) / 100;
      const formatted = (rounded % 1 === 0) 
        ? rounded.toLocaleString('en-US') 
        : rounded.toLocaleString('en-US', {{ minimumFractionDigits: 2, maximumFractionDigits: 2 }});
      return `${{formatted}} ر.س`;
    }}
    const clean = String(val).replace(/ر\.س/g, '').replace(/SAR/gi, '').trim();
    return clean ? `${{clean}} ر.س` : '';
  }}

  function escapeHTML(value) {{
    return String(value ?? '').replace(/[&<>"']/g, c => ({{ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }}[c]));
  }}

  function resolveImgUrl(img) {{
    const s = String(img || '').trim();
    if (!s || s === 'undefined' || s === 'null') return 'https://youssefrasheed.github.io/note-zid-styles/products/09_Linen_Room_Spray_Brand_Box.webp';
    return (s.startsWith('http') ? '' : ASSET_HOST) + s;
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
    'رويال بودر': '940195dc-fc3b-4180-b062-c1cd85809564',
    'رويال-بودر': '940195dc-fc3b-4180-b062-c1cd85809564',
    'all-over-royal-powder': '940195dc-fc3b-4180-b062-c1cd85809564',
    'royal-powder-spray': '940195dc-fc3b-4180-b062-c1cd85809564',
    'attraction': 'fe61d38b-6088-46d8-a88c-f44e64e5991a',
    'niche-oud': '809c89af-6e6f-44fa-99a2-ac1f13418e0a',
    'niche-royal-leather': '620ef67b-39ba-41f0-a4f2-f9ce56cf3b1c',
    'niche-blue': 'c6380d1f-f89b-4914-a194-3d82f56af915',
    'niche-amber': '8c331e9f-18cf-46d8-81e1-94a80ed45224',
    'choconilla': '7a9286bf-4d38-447a-9b9f-fcd006e35e9b',
    'all-over-choconilla': '7a9286bf-4d38-447a-9b9f-fcd006e35e9b',
    'شيكونيلا': '7a9286bf-4d38-447a-9b9f-fcd006e35e9b',
    'شوكونيلا': '7a9286bf-4d38-447a-9b9f-fcd006e35e9b',
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
    'بودر روز': '8bdd1101-df55-4f0e-8645-f6c669932b69',
    'باودر روز': '8bdd1101-df55-4f0e-8645-f6c669932b69',
    'باودروز': '8bdd1101-df55-4f0e-8645-f6c669932b69',
    'all-over-spray-tuffi': '5ab145fc-2c1c-4a17-9e1e-926c863b0934',
    'all-over-note-tuffi': '5ab145fc-2c1c-4a17-9e1e-926c863b0934',
    'عطر-نوت-توفي': '5ab145fc-2c1c-4a17-9e1e-926c863b0934',
    'نوت توفي': '5ab145fc-2c1c-4a17-9e1e-926c863b0934',
    'نوت-توفي': '5ab145fc-2c1c-4a17-9e1e-926c863b0934',
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
    'hyaluronic-moisturizer': 'a0ee1fce-8576-4f1c-b90a-7c1c6fb37ea3',
    'لوشن-مرطب-الجسم-بالهيالورونيك': 'a0ee1fce-8576-4f1c-b90a-7c1c6fb37ea3',
    '3-معطر-للجسم-بالكامل': '4e22b431-43a0-4cd8-9e45-f6a671f2620c',
    'pkg-all-over-collection': '4e22b431-43a0-4cd8-9e45-f6a671f2620c',
    'pkg-summer-escape': '4dd1ba69-3aa9-47ca-ac3a-3c1a3401d91f',
    'باقة-سمر-إسكيب': '4dd1ba69-3aa9-47ca-ac3a-3c1a3401d91f',
    'pkg-her-signature': '2495afd3-c781-4b99-8546-e26ce3b8dfb3',
    'باقة-هير-سفنتشر': '2495afd3-c781-4b99-8546-e26ce3b8dfb3',
    'pkg-mens-signature': '0d94199e-e69d-4f8e-92b9-b1248a657fec',
    'باقة-منز-سفنتشر': '0d94199e-e69d-4f8e-92b9-b1248a657fec',
    'pkg-night-signature': 'cbb0eb0c-cb7b-4e5c-a2b2-f554912fc2b7',
    'باقة-نايت-سفنتشر': 'cbb0eb0c-cb7b-4e5c-a2b2-f554912fc2b7',
    'pkg-powderose': '86360ff5-5e4e-49fd-873a-aa46f1747b4d',
    'باقة-باودروز': '86360ff5-5e4e-49fd-873a-aa46f1747b4d',
    'pkg-royal-tobacco': '86088322-3d9d-4767-88a5-73f4ef896abf',
    'باقة-رويال-توباكو': '86088322-3d9d-4767-88a5-73f4ef896abf',
    'pkg-tolah-collection': 'a1ef6ad8-d3e1-45f1-bd3e-2d554826533e',
    'مجموعة-التولات-الخاصة-اختر-3': 'a1ef6ad8-d3e1-45f1-bd3e-2d554826533e'
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
          matched.zid_id = zId;
          if (zPrice && !isNaN(zPrice)) {{
            matched.price = Math.round(Number(zPrice));
          }}
          if (zOldPrice && !isNaN(zOldPrice)) {{
            matched.old_price = Math.round(Number(zOldPrice));
            const disc = Math.round(((zOldPrice - zPrice) / zOldPrice) * 100);
            matched.discount = disc + '%';
          }} else if (matched.id === 'pkg-all-over-collection' || zId === '4e22b431-43a0-4cd8-9e45-f6a671f2620c' || (zName && zName.includes('3 سبراي'))) {{
            matched.old_price = 447;
            matched.discount = '44.3%';
            matched.tag = 'خصم 44.3%';
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
            img_box: null,
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

  function confirmedCartRows(cart) {{
    const quote = window._noteVerifiedCart;
    return quote && quote.snapshot === window.noteCartPricingKey?.(cart) ? quote.products || [] : [];
  }}

  function confirmedItemPrice(cart, item, rewardOnly) {{
    const normalize = value => String(value || '').replace(/-/g, '').toLowerCase();
    const idOf = entry => {{
      const product = CartManager._findCatalogProduct(entry);
      return normalize(product?.zid_id || product?.id || entry.product_id || entry.id);
    }};
    const id = idOf(item);
    if (!id || cart.filter(entry => idOf(entry) === id).length !== 1) return '';
    let rows = confirmedCartRows(cart).filter(row => normalize(row.product_id) === id);
    if (!rows.length || rows.some(row => row.price == null || !Number.isFinite(Number(row.price)))) return '';
    if (rows.reduce((sum, row) => sum + Number(row.quantity), 0) !== Number(item.quantity)) return '';
    if (rewardOnly !== undefined) rows = rows.filter(row => Boolean(row.is_discounted && row.meta?.bundle_offer) === rewardOnly);
    if (!rows.length) return '';
    if (rows.every(row => Number(row.price) === Number(rows[0].price))) return formatPrice(Number(rows[0].price));
    return rows.map(row => `${{Number(row.quantity)}} × ${{formatPrice(Number(row.price))}}`).join('، ');
  }}

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
        window.renderCartPage(typeof window.noteConfirmCartPricing === 'function');
      }}
    }},
    findTriggerButton: function(id, explicitBtn) {{
      if (explicitBtn && explicitBtn.nodeType === 1) return explicitBtn;
      if (typeof window !== 'undefined' && window.event) {{
        const target = window.event.target;
        const btn = target?.closest ? target.closest('button, [role="button"]') : null;
        if (btn) return btn;
      }}
      if (typeof document !== 'undefined') {{
        if (document.activeElement && document.activeElement.tagName === 'BUTTON') {{
          return document.activeElement;
        }}
        if (typeof currentProduct !== 'undefined' && currentProduct && currentProduct.id === id) {{
          const pdpBtn = typeof document.getElementById === 'function' ? document.getElementById('pdp-add-cart-btn') : null;
          if (pdpBtn) return pdpBtn;
        }}
        const quickViewBtn = typeof document.getElementById === 'function' ? document.getElementById('modal-buy-btn') : null;
        if (quickViewBtn && quickViewBtn.offsetParent !== null) return quickViewBtn;
        if (typeof document.querySelector === 'function') {{
          const recBtn = document.querySelector('.note-mini-card button[data-product="' + id + '"]');
          if (recBtn) return recBtn;
          const cardBtn = document.querySelector('button[onclick*="' + id + '"]');
          if (cardBtn) return cardBtn;
        }}
      }}
      return null;
    }},
    animateButton: function(btn) {{
      if (!btn || btn.nodeType !== 1) return;
      if (btn.classList && typeof btn.classList.contains === 'function' && btn.classList.contains('note-btn-added')) return;
      const originalHTML = btn.innerHTML;
      const originalWidth = btn.offsetWidth;
      const isPdp = btn.id === 'pdp-add-cart-btn';
      if (originalWidth > 0 && btn.style) {{
        btn.style.width = originalWidth + 'px';
      }}
      if (btn.classList && typeof btn.classList.add === 'function') {{
        btn.classList.add('note-btn-added');
      }}
      const checkIcon = '<svg class="note-check-icon" width="' + (isPdp ? '18' : '15') + '" height="' + (isPdp ? '18' : '15') + '" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-left:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      const labelText = isPdp ? 'تمت الإضافة للسلة بنجاح' : 'تمت الإضافة';
      btn.innerHTML = checkIcon + '<span style="display:inline-block;vertical-align:middle;font-weight:700;">' + labelText + '</span>';
      const headerCartIcons = typeof document !== 'undefined' && typeof document.querySelectorAll === 'function' ? document.querySelectorAll('#site-header .sicon-shopping-bag, .cart-box, #cart-counter-badge, .cart-btn') : [];
      headerCartIcons.forEach(icon => {{
        if (icon.classList) {{
          icon.classList.remove('note-cart-shake');
          void icon.offsetWidth;
          icon.classList.add('note-cart-shake');
          setTimeout(() => icon.classList.remove('note-cart-shake'), 650);
        }}
      }});
      setTimeout(() => {{
        if (btn.classList && typeof btn.classList.remove === 'function') {{
          btn.classList.remove('note-btn-added');
        }}
        btn.innerHTML = originalHTML;
        if (btn.style) btn.style.width = '';
      }}, 1100);
    }},
    addItem: function(productId, quantity = 1, selections = null, triggerBtn = null) {{
      const product = productsData.find(p => p.id === productId) || noteProductsCatalog.find(p => p.id === productId);
      if (!product) return;
      if (product.in_stock === false || product.stock === 0) {{
        this.showToast('عذراً، هذا المنتج غير متاح حالياً');
        return;
      }}
      const targetBtn = this.findTriggerButton ? this.findTriggerButton(productId, triggerBtn) : triggerBtn;
      if (targetBtn && this.animateButton) {{
        this.animateButton(targetBtn);
      }}
      let cart = this.getCart();
      const existing = cart.find(item => item.id === productId);
      if (existing) {{
        existing.quantity += quantity;
      }} else {{
        const rawPrice = typeof product.price === 'string' ? parseInt(product.price.replace(/[^0-9]/g, '')) : product.price;
        const rawOldPrice = product.old_price ? (typeof product.old_price === 'string' ? parseInt(product.old_price.replace(/[^0-9]/g, '')) : product.old_price) : null;
        const imgUrl = resolveImgUrl(product.img);
        cart.push({{
          id: product.id,
          product_id: product.id,
          zid_id: product.zid_id,
          title: product.title,
          title_en: product.title_en || '',
          price: rawPrice || 189,
          old_price: rawOldPrice,
          img: imgUrl,
          cat: product.cat,
          category: product.category,
          category_ids: product.category_ids,
          size: product.size || (product.cat === 'tollah' ? 'ربع تولة' : (product.cat === 'travel' ? '30 مل' : (product.cat === 'all-over' ? '250 مل' : '100 مل'))),
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
      let cart = this.getCart().filter(item => !this._itemMatches(item, productId));
      this.saveCart(cart);
    }},
    updateQuantity: function(productId, delta) {{
      let cart = this.getCart();
      const item = cart.find(i => this._itemMatches(i, productId));
      if (item) {{
        item.quantity += delta;
        if (item.quantity <= 0) {{
          cart = cart.filter(i => !this._itemMatches(i, productId));
        }}
      }}
      this.saveCart(cart);
    }},
    getTotal: function() {{
      return this.getCart().reduce((sum, item) => {{
        const rawPrice = item && (item.price ?? item.sale_price ?? 0);
        const numPrice = typeof rawPrice === 'number' ? rawPrice : (Number(String(rawPrice).replace(/[^\d.]/g, '')) || 0);
        const qty = Math.max(1, parseInt(item && item.quantity, 10) || 1);
        return sum + (numPrice * qty);
      }}, 0);
    }},
    getCount: function() {{
      return this.getCart().reduce((count, item) => count + item.quantity, 0);
    }},
    getLiveCartState: function() {{
      return (typeof window !== 'undefined' && window._noteLiveCartState) ? window._noteLiveCartState : null;
    }},
    _itemMatches: function(item, key) {{
      if (!item || !key) return false;
      const k = String(key).trim().toLowerCase();
      const kClean = k.replace(/-/g, '');
      const itemId = String(item.id || '').trim().toLowerCase();
      const itemProdId = String(item.product_id || '').trim().toLowerCase();
      const itemZidId = String(item.zid_id || '').trim().toLowerCase();
      
      if (itemId === k || itemProdId === k || itemZidId === k) return true;
      if (kClean && (
        itemId.replace(/-/g, '') === kClean ||
        itemProdId.replace(/-/g, '') === kClean ||
        itemZidId.replace(/-/g, '') === kClean
      )) return true;

      if (typeof ZID_PRODUCT_MAP !== 'undefined') {{
        for (const [slugKey, zidVal] of Object.entries(ZID_PRODUCT_MAP)) {{
          const cleanVal = String(zidVal || '').replace(/-/g, '').toLowerCase();
          const cleanSlug = String(slugKey || '').trim().toLowerCase();
          const isKeyMatch = (k === cleanSlug || kClean === cleanVal);
          const isItemMatch = (itemId === cleanSlug || itemId.replace(/-/g, '') === cleanVal || itemProdId === cleanSlug || itemProdId.replace(/-/g, '') === cleanVal);
          if (isKeyMatch && isItemMatch) return true;
        }}
      }}

      const catProduct = (typeof this._findCatalogProduct === 'function') ? this._findCatalogProduct(item) : null;
      const keyProduct = (typeof this._findCatalogProduct === 'function') ? this._findCatalogProduct({{ id: key, product_id: key }}) : null;
      if (catProduct && keyProduct && catProduct.id === keyProduct.id) return true;
      if (catProduct && (
        catProduct.id.toLowerCase() === k ||
        (catProduct.zid_id && catProduct.zid_id.replace(/-/g, '').toLowerCase() === kClean)
      )) return true;
      if (keyProduct && (
        itemId === keyProduct.id.toLowerCase() ||
        (itemProdId && itemProdId.replace(/-/g, '') === String(keyProduct.zid_id || '').replace(/-/g, '').toLowerCase()) ||
        (itemZidId && itemZidId.replace(/-/g, '') === String(keyProduct.zid_id || '').replace(/-/g, '').toLowerCase())
      )) return true;

      return false;
    }},
    _findCatalogProduct: function(item) {{
      if (!item) return null;
      const rawId = String(item.product_id || item.id || '').trim().toLowerCase();
      if (!rawId) return null;
      const rawClean = rawId.replace(/-/g, '');
      const itemId = item.id ? String(item.id).trim().toLowerCase() : null;
      const itemProdId = item.product_id ? String(item.product_id).trim().toLowerCase() : null;
      const itemZidId = item.zid_id ? String(item.zid_id).trim().toLowerCase() : null;

      let mappedSlug = null;
      if (typeof ZID_PRODUCT_MAP !== 'undefined') {{
        for (const [slugKey, zidVal] of Object.entries(ZID_PRODUCT_MAP)) {{
          const cleanVal = String(zidVal || '').replace(/-/g, '').toLowerCase();
          const cleanSlug = String(slugKey || '').trim().toLowerCase();
          if (rawClean === cleanVal || (itemId && itemId.replace(/-/g, '') === cleanVal) || (itemProdId && itemProdId.replace(/-/g, '') === cleanVal)) {{
            mappedSlug = cleanSlug;
            break;
          }}
          if (rawId === cleanSlug || itemId === cleanSlug || itemProdId === cleanSlug) {{
            mappedSlug = cleanSlug;
            break;
          }}
        }}
      }}

      const catList = (typeof noteProductsCatalog !== 'undefined' && Array.isArray(noteProductsCatalog) && noteProductsCatalog.length > 0)
        ? noteProductsCatalog
        : ((typeof originalCatalog !== 'undefined' && Array.isArray(originalCatalog) && originalCatalog.length > 0)
          ? originalCatalog
          : (typeof window !== 'undefined' && Array.isArray(window.noteProductsCatalog) && window.noteProductsCatalog.length > 0 ? window.noteProductsCatalog : []));

      const found = catList.find(cp => {{
        if (!cp) return false;
        const cpId = cp.id ? String(cp.id).trim().toLowerCase() : null;
        const cpZidId = cp.zid_id ? String(cp.zid_id).trim().toLowerCase() : null;
        const cpZidClean = cpZidId ? cpZidId.replace(/-/g, '') : null;

        if (mappedSlug && cpId === mappedSlug) return true;
        if (cpId && (cpId === rawId || (itemId && cpId === itemId) || (itemProdId && cpId === itemProdId))) return true;
        if (cpZidId && (cpZidId === rawId || (itemId && cpZidId === itemId) || (itemProdId && cpZidId === itemProdId) || (itemZidId && cpZidId === itemZidId))) return true;
        if (cpZidClean && rawClean && (cpZidClean === rawClean || (itemId && itemId.replace(/-/g, '') === cpZidClean) || (itemProdId && itemProdId.replace(/-/g, '') === cpZidClean))) return true;

        return false;
      }});

      if (found) return found;

      if (mappedSlug) {{
        return {{ id: mappedSlug, title: item.title || item.name || mappedSlug }};
      }}

      return null;
    }},
    _isQualifying100mlPerfume: function(item) {{
      if (!item) return false;
      const p = this._findCatalogProduct ? this._findCatalogProduct(item) : null;
      const rawId = String(item.product_id || item.id || '').toLowerCase();
      
      const id = String((p && p.id) || rawId).toLowerCase();
      const zidId = String((p && p.zid_id) || item.zid_id || (typeof ZID_PRODUCT_MAP !== 'undefined' && ZID_PRODUCT_MAP[id]) || '').toLowerCase();
      const title = String((p && p.title) || item.title || item.name || '').toLowerCase();
      const cat = String((p && p.cat) || item.cat || item.category || '').toLowerCase();
      const catAr = String((p && p.cat_ar) || item.cat_ar || '').toLowerCase();
      const catIds = Array.isArray(p?.category_ids) ? p.category_ids.map(String) : (Array.isArray(item.category_ids) ? item.category_ids.map(String) : []);

      // 1. Strictly exclude Niche Perfumes (Category 1759040) from offers entirely
      if (catIds.includes('1759040') || cat === 'niche' || catAr.includes('نيش') || title.includes('نيش') || id.startsWith('niche-') || id === 'note-musk' || id === 'musk') return false;

      // 2. Strictly exclude non-perfumes: All-Over Sprays (1759042), Travel (1759043), Linen (1759044), Tolas (1421002), Packages (1752110), Body Care (1759046)
      if (catIds.includes('1759042') || cat === 'all-over' || cat.includes('spray') || cat.includes('body')) return false;
      if (catIds.includes('1759043') || cat === 'travel' || title.includes('30 مل') || title.includes('30مل') || (item.size && String(item.size).includes('30'))) return false;
      if (catIds.includes('1759044') || cat === 'linen' || title.includes('مفارش')) return false;
      if (catIds.includes('1421002') || cat === 'tollah' || title.includes('تولة') || title.includes('توله')) return false;
      if (catIds.includes('1752110') || cat === 'packages' || id.startsWith('pkg-') || id.includes('bundle') || id.includes('gift') || title.includes('باقة') || title.includes('مجموعة') || title.includes('طقم') || title.includes('بكج') || title.includes('بوكس')) return false;
      if (catIds.includes('1759046') || cat === 'body-care' || title.includes('لوشن') || title.includes('جل') || title.includes('شاور')) return false;

      // Explicitly reject known non-perfume products like Royal Powder All-Over Spray
      if (id === '940195dc-fc3b-4180-b062-c1cd85809564' || zidId === '940195dc-fc3b-4180-b062-c1cd85809564' || title === 'رويال بودر') return false;

      // 3. Strict Qualification: Must belong to Zid's official 100ml Perfume category (1748533)
      if (catIds.includes('1748533')) return true;

      const QUALIFIED_PERFUMES = [
        '9ba63129-20bc-4a0f-b49f-17d06e130ad9', '764d587d-7cba-46b3-8d34-265ee4bc4b6a', '7a28376c-3973-4822-b6b2-b3a6a4e7013e',
        '9be5ff2f-3d33-4402-b511-e099805c681d', '5d98daa5-9e6e-473d-9d41-3310cb2f3ca7', '4251cc74-23ba-45b0-9268-03b740df88bd',
        '54805f9b-53c4-4e4c-a75a-5173eda716c8', '08874f48-a894-4b53-aaeb-8b010d8e285d', 'cc5e1bb2-e928-4efd-b94f-0158ec53ba49',
        'b99d66f3-f6c6-4354-94cb-fa225e0bc08e', '21b12ed7-e9a6-4a49-8ef2-dc18d6e326c9', '1c6e8d65-9c1e-42d8-a9c3-265e7daa1a81',
        'fe61d38b-aa5a-493d-9db2-7f7ea4cb72e7', '809c89af-801a-464a-a035-7c093ca5165a', '620ef67b-39ba-41f0-a4f2-f9ce56cf3b1c',
        'c6380d1f-8255-4d3a-b5e5-f5b2b2b1a1c9', '8c331e9f-9721-4f11-9a70-761e0bb4dc0b',
        'roayal-tobacco', 'royal-tobacco', 'oud-rosewood', 'aura', 'bn', 'gold',
        'musk-bakhur', 'phantom', 'note-for-him', 'powderose', 'note-for-her', 'royal-powder', 'attraction'
      ];
      if (QUALIFIED_PERFUMES.includes(id) || QUALIFIED_PERFUMES.includes(zidId)) return true;

      return cat === 'perfumes' && Number(item.price) >= 165;
    }},
    _isQualifyingTola: function(item) {{
      if (!item) return false;
      const p = this._findCatalogProduct ? this._findCatalogProduct(item) : null;
      const rawId = String(item.product_id || item.id || '').toLowerCase();

      const id = String((p && p.id) || rawId).toLowerCase();
      const zidId = String((p && p.zid_id) || item.zid_id || (typeof ZID_PRODUCT_MAP !== 'undefined' && ZID_PRODUCT_MAP[id]) || '').toLowerCase();
      const title = String((p && p.title) || item.title || item.name || '').toLowerCase();
      const cat = String((p && p.cat) || item.cat || item.category || '').toLowerCase();
      const catIds = Array.isArray(p?.category_ids) ? p.category_ids.map(String) : (Array.isArray(item.category_ids) ? item.category_ids.map(String) : []);

      if (catIds.includes('1752110') || cat === 'packages' || id.startsWith('pkg-') || title.includes('باقة') || title.includes('مجموعة') || title.includes('طقم')) return false;
      if (catIds.includes('1759042') || cat === 'all-over' || catIds.includes('1759044') || cat === 'linen') return false;

      if (catIds.includes('1421002') || cat === 'tollah') return true;

      const QUALIFIED_TOLAS = [
        '95f09483-36aa-43e6-a2bc-3e4070fb1f2c', 'dcea75e0-fa65-4f7f-aa4e-73a7aa99c9d4',
        '0dda8a6b-bfdc-4a37-b452-f1d93b320708', 'f0206dc9-440d-400a-b2fa-4cb2996ee866',
        '1f091171-4602-452f-90d2-9750587285f5',
        'tollah-musk-toffee', 'sugar-oud', 'lady-rose', 'amber-musk', 'pure-toffee', 'tollah'
      ];
      if (QUALIFIED_TOLAS.includes(id) || QUALIFIED_TOLAS.includes(zidId)) return true;

      return (title.includes('تولة') || title.includes('توله')) && Number(item.price) <= 120 && Number(item.price) >= 40;
    }},
    _isQualifyingBodySpray: function(item) {{
      if (!item) return false;
      const p = this._findCatalogProduct ? this._findCatalogProduct(item) : null;
      const rawId = String(item.product_id || item.id || '').toLowerCase();

      const id = String((p && p.id) || rawId).toLowerCase();
      const zidId = String((p && p.zid_id) || item.zid_id || (typeof ZID_PRODUCT_MAP !== 'undefined' && ZID_PRODUCT_MAP[id]) || '').toLowerCase();
      const title = String((p && p.title) || item.title || item.name || '').toLowerCase();
      const cat = String((p && p.cat) || item.cat || item.category || '').toLowerCase();
      const catIds = Array.isArray(p?.category_ids) ? p.category_ids.map(String) : (Array.isArray(item.category_ids) ? item.category_ids.map(String) : []);

      if (catIds.includes('1752110') || cat === 'packages' || id.startsWith('pkg-') || title.includes('باقة') || title.includes('مجموعة') || title.includes('طقم')) return false;
      if (catIds.includes('1759044') || cat === 'linen' || title.includes('مفارش')) return false;

      if (catIds.includes('1759042') || cat === 'all-over') return true;

      const QUALIFIED_BODY_SPRAYS = [
        '940195dc-fc3b-4180-b062-c1cd85809564', '7de839f3-86a9-4fac-ba15-fad102696e73',
        '7a9286bf-4d38-447a-9b9f-fcd006e35e9b', '5d373011-9e95-472c-bec6-51fd8ed457dc',
        '5ab145fc-2c1c-4a17-9e1e-926c863b0934', '8bdd1101-df55-4f0e-8645-f6c669932b69',
        'fe2daa2f-28ca-4342-8c7e-2b8e8dbbc95a',
        'all-over-royal-tobacco', 'all-over-choconilla', 'all-over-asal', 'all-over-bahr', 'all-over-note-tuffi', 'all-over-powderose',
        'all-over-royal-powder', 'royal-powder-spray', 'asal', 'choconilla', 'bahr', 'note-tuffi', 'tuffi', 'toffee'
      ];
      if (QUALIFIED_BODY_SPRAYS.includes(id) || QUALIFIED_BODY_SPRAYS.includes(zidId)) return true;

      return (title.includes('معطر') && title.includes('جسم')) || title === 'رويال بودر' || title.includes('عسل');
    }},
    partitionCart: function(customCart = null) {{
      const cart = customCart || this.getCart() || [];
      const units = [];
      for (let ci = 0; ci < cart.length; ci++) {{
        const item = cart[ci];
        const qty = Math.max(1, parseInt(item && item.quantity, 10) || 1);
        const p = Number(item.price ?? item.sale_price ?? 0) || 0;
        const isPerfume = this._isQualifying100mlPerfume(item);
        const isSpray = this._isQualifyingBodySpray ? this._isQualifyingBodySpray(item) : false;
        const isTola = this._isQualifyingTola(item);
        for (let q = 0; q < qty; q++) {{
          units.push({{
            item,
            unitIndex: q,
            price: p,
            isPerfume,
            isSpray,
            isTola,
            consumed: false
          }});
        }}
      }}

      const groups = {{
        tier1_spray_bundles: [],
        tier2_trios: [],
        tier3_pairs: [],
        tier4_standalone: []
      }};

      // The 249 SAR bundle is an explicit product with selections, never
      // inferred from three independently chosen body sprays.

      // TIER 2: Groups of 3 from remaining perfumes + remaining sprays
      // Customer pays 2 highest + 1 SAR for 3rd (cheapest, matching Zid engine)
      const trioEligible = units.filter(u => (u.isPerfume || u.isSpray) && !u.consumed);
      const unitKey = u => String(u.item.product_id || u.item.id || '');
      trioEligible.sort((a, b) => b.price - a.price || unitKey(a).localeCompare(unitKey(b)));
      const trioCount = Math.floor(trioEligible.length / 3);
      for (let t = 0; t < trioCount; t++) {{
        const available = trioEligible.filter(u => !u.consumed);
        const item1 = available[0];
        const item2 = available[1];
        const item3 = available[available.length - 1];
        item1.consumed = true;
        item2.consumed = true;
        item3.consumed = true;
        const discount = Math.max(0, item3.price - 1);
        groups.tier2_trios.push({{
          type: 'trio_offer',
          name: 'عطرك بـ 1 ريال (2+1)',
          units: [item1, item2, item3],
          discountedUnit: item3,
          price: item1.price + item2.price + 1,
          discount: discount
        }});
      }}

      // TIER 3: Remaining perfumes/sprays paired with qualifying tolas
      const pairBases = trioEligible.filter(u => !u.consumed);
      const tolaUnits = units.filter(u => u.isTola && !u.consumed);
      tolaUnits.sort((a, b) => b.price - a.price || unitKey(a).localeCompare(unitKey(b)));
      const pairCount = Math.min(pairBases.length, tolaUnits.length);
      for (let p = 0; p < pairCount; p++) {{
        const base = pairBases[p];
        const tola = tolaUnits[p];
        base.consumed = true;
        tola.consumed = true;
        const discount = Math.max(0, tola.price - 1);
        groups.tier3_pairs.push({{
          type: 'pair_offer',
          name: 'تولة بـ 1 ريال (1+تولة)',
          baseUnit: base,
          tolaUnit: tola,
          price: base.price + 1,
          discount: discount
        }});
      }}

      // TIER 4: Standalone items
      groups.tier4_standalone = units.filter(u => !u.consumed);

      const totalDiscount =
        groups.tier1_spray_bundles.reduce((s, b) => s + b.discount, 0) +
        groups.tier2_trios.reduce((s, t) => s + t.discount, 0) +
        groups.tier3_pairs.reduce((s, p) => s + p.discount, 0);

      const activeOffers = [];
      if (groups.tier1_spray_bundles.length > 0) {{
        activeOffers.push({{
          id: 'tier1-body-spray-bundle',
          name: 'باقة معطرات الجسم الثلاثية',
          usage_count: groups.tier1_spray_bundles.length,
          discount_total: groups.tier1_spray_bundles.reduce((s, b) => s + b.discount, 0)
        }});
      }}
      if (groups.tier2_trios.length > 0) {{
        activeOffers.push({{
          id: 'a31fcdea-5aac-447f-a220-0ef1d60bb0a6',
          name: 'عطرك بـ 1 ريال (2+1)',
          usage_count: groups.tier2_trios.length,
          discount_total: groups.tier2_trios.reduce((s, t) => s + t.discount, 0)
        }});
      }}
      if (groups.tier3_pairs.length > 0) {{
        activeOffers.push({{
          id: 'a31e7108-b61d-4611-a968-9cdf0eca636f',
          name: 'تولة بـ 1 ريال (1+تولة)',
          usage_count: groups.tier3_pairs.length,
          discount_total: groups.tier3_pairs.reduce((s, p) => s + p.discount, 0)
        }});
      }}

      return {{
        groups,
        totalDiscount: Math.round(totalDiscount * 100) / 100,
        activeOffers
      }};
    }},
    buildZidPayloads: function(customCart = null) {{
      const cart = customCart || this.getCart() || [];
      const isUuid = (s) => typeof s === 'string' && /^[0-9a-f]{{8}}-[0-9a-f]{{4}}-[0-9a-f]{{4}}-[0-9a-f]{{4}}-[0-9a-f]{{12}}$/i.test(s);
      const resolveId = (item) => {{
        if (!item) return null;
        const rawKey = item.id || item.product_id;
        const p = (typeof noteProductsCatalog !== 'undefined') ? noteProductsCatalog.find(cp => cp.id === rawKey || cp.id === item.product_id || cp.slug === rawKey || (typeof ZID_PRODUCT_MAP !== 'undefined' && ZID_PRODUCT_MAP[rawKey] === cp.id)) : null;
        if (p && isUuid(p.zid_id)) return p.zid_id;
        if (typeof ZID_PRODUCT_MAP !== 'undefined') {{
          if (ZID_PRODUCT_MAP[rawKey]) return ZID_PRODUCT_MAP[rawKey];
          if (p && ZID_PRODUCT_MAP[p.id]) return ZID_PRODUCT_MAP[p.id];
        }}
        if (isUuid(item.product_id)) return item.product_id;
        if (isUuid(item.id)) return item.id;
        if (p && isUuid(p.id)) return p.id;
        return (p && p.zid_id) || item.product_id || item.id;
      }};

      // Preserve the customer's insertion order. Zid alone allocates offers.
      return cart.map(item => ({{
        product_id: resolveId(item),
        quantity: Math.max(1, parseInt(item.quantity, 10) || 1),
        ...(item.sub_items?.length ? {{sub_items:item.sub_items.map(({{id,product_id,quantity,selection_group_id,name,product_name}}) => ({{
          id:id || product_id, product_id:product_id || id,
          product_name:product_name || name || '', quantity:Number(quantity) || 1, selection_group_id
        }}))}} : {{}})
      }}));
    }},
    getLiveBundleOffers: function() {{
      const state = this.getLiveCartState();
      const localTotal = this.getTotal();
      if (state && Array.isArray(state.bundle_offers) && Array.isArray(state.totals)) {{
        const subObj = state.totals.find(t => t.code === 'sub_totals');
        const serverSub = (subObj && Number.isFinite(Number(subObj.value))) ? Number(subObj.value) : null;
        if (serverSub !== null && Math.abs(serverSub - localTotal) <= 1) {{
          const activeZid = state.bundle_offers.filter(b => b.usage_count > 0 || Number(b.discount_total) > 0);
          if (activeZid.length > 0) return activeZid;
        }}
      }}
      const partition = this.partitionCart();
      return partition.activeOffers;
    }},
    hasConflictingBundleUsage: function(state = this.getLiveCartState()) {{
      const offers = state?.bundle_offers;
      if (!Array.isArray(offers)) return false;
      let bundleUnitsNeeded = 0;
      let tolasNeeded = 0;
      for (const offer of offers) {{
        const count = Number(offer.usage_count) || 0;
        const name = String(offer.name || '');
        if (/تولة|توله/.test(name)) {{
          bundleUnitsNeeded += count;
          tolasNeeded += count;
        }} else if (/معطر/.test(name)) {{
          bundleUnitsNeeded += 2 * count;
        }} else if (/بريال|بـ 1 ريال/.test(name)) {{
          bundleUnitsNeeded += 3 * count;
        }}
      }}
      const cart = this.getCart();
      const available = predicate => predicate ? cart.reduce((count, item) =>
        count + (predicate.call(this, item) ? Number(item.quantity) || 0 : 0), 0) : 0;
      const totalEligible = available(this._isQualifying100mlPerfume) + available(this._isQualifyingBodySpray);
      return bundleUnitsNeeded > totalEligible || tolasNeeded > available(this._isQualifyingTola);
    }},
    getLiveBundleDiscount: function() {{
      const partition = this.partitionCart();
      return partition.totalDiscount;
    }},
    syncLiveCart: async function() {{
      if (typeof window === 'undefined' || typeof fetch !== 'function') return null;
      if (this._syncingLiveCart) return this._syncingLiveCart;
      this._syncingLiveCart = (async () => {{
        try {{
          const res = await fetch('/api/v1/cart', {{
            cache: 'no-store',
            headers: {{ 'Accept': 'application/json' }}
          }});
          if (res.ok) {{
            const data = await res.json();
            window._noteLiveCartState = data;
            if (document.getElementById('cart-page-items')) {{
              if (typeof updateCartFinancials === 'function') {{
                updateCartFinancials(this.getTotal());
              }}
              if (typeof renderCartPage === 'function' && !this._reRenderingFromSync) {{
                this._reRenderingFromSync = true;
                try {{
                  renderCartPage(true);
                }} finally {{
                  this._reRenderingFromSync = false;
                }}
              }}
            }}
          }}
        }} catch (e) {{
          console.warn('NOTE live cart sync notice:', e);
        }} finally {{
          this._syncingLiveCart = null;
        }}
      }})();
      return this._syncingLiveCart;
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
        document.body.classList.add('cart-drawer-open');
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
        document.body.classList.remove('cart-drawer-open');
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
      const emptyState = document.getElementById('cart-drawer-empty');
      const footerEl = document.getElementById('cart-drawer-footer');
      const scrollArea = document.getElementById('cart-drawer-scroll-area');
      const couponBox = document.getElementById('cart-drawer-coupon-box');
      const recsContainer = document.getElementById('cart-drawer-recommendations');
      
      if (!itemsContainer) return;
      window.noteRenderCartLoading?.();
      
      const cart = this.getCart();
      const total = this.getTotal();
      
      if (cart.length === 0) {{
        if (window.noteReplaceCartItems) window.noteReplaceCartItems(itemsContainer, '');
        else itemsContainer.innerHTML = '';
        if (scrollArea) scrollArea.classList.add('hidden');
        if (emptyState) emptyState.classList.remove('hidden');
        if (footerEl) footerEl.classList.add('hidden');
        if (recsContainer) recsContainer.classList.add('hidden');
        if (couponBox) couponBox.classList.add('hidden');
        return;
      }}
      
      if (scrollArea) scrollArea.classList.remove('hidden');
      if (emptyState) emptyState.classList.add('hidden');
      if (footerEl) footerEl.classList.remove('hidden');
      if (couponBox) couponBox.classList.remove('hidden');
      

      

      // Sync bundle offers in drawer from live Zid state
      const nativePricing = typeof window.noteConfirmCartPricing === 'function';
      const verified = window._noteVerifiedCart;
      const totals = verified && verified.snapshot === window.noteCartPricingKey?.(cart) ? verified.totals : null;
      const discount = totals?.find(line => line.code === 'products_discount')?.value;
      const bundleDiscount = Math.abs(Number(discount) || 0);
      const drawerBundleRow = document.getElementById('drawer-bundle-discount-row');
      const drawerBundleTitle = document.getElementById('drawer-bundle-discount-title');
      const drawerBundleVal = document.getElementById('drawer-bundle-discount-val');
      if (drawerBundleRow) {{
        if (bundleDiscount > 0) {{
          drawerBundleRow.classList.remove('hidden');
          if (drawerBundleTitle) drawerBundleTitle.textContent = 'خصم المنتجات';
          if (drawerBundleVal) drawerBundleVal.textContent = `-${{bundleDiscount.toLocaleString('en-US', {{maximumFractionDigits: 2}})}} ر.س`;
        }} else {{
          drawerBundleRow.classList.add('hidden');
        }}
      }}

      const savedCoupon = totals ? verified.couponCode : null;
      const confirmed = totals?.find(line => line.code === 'total')?.value;
      const hasConfirmedTotal = confirmed != null && Number.isFinite(Number(confirmed));
      if (totalEl) {{
        totalEl.textContent = hasConfirmedTotal ? formatPrice(Number(confirmed)) : 'جاري تحديث السعر…';
        if (hasConfirmedTotal) totalEl.setAttribute('data-note-total', Number(confirmed).toFixed(2));
        else totalEl.removeAttribute('data-note-total');
      }}
      const subtotal = totals?.find(line => line.code === 'sub_totals' || line.code === 'sub_totals_before_vat')?.value;
      if (subtotalEl) subtotalEl.textContent = hasConfirmedTotal && subtotal != null && Number.isFinite(Number(subtotal)) ? formatPrice(Number(subtotal)) : '—';

      const drawerCouponInput = document.getElementById('drawer-coupon-input');
      const drawerCouponTag = document.getElementById('drawer-coupon-applied-tag');
      const drawerCouponMsg = document.getElementById('drawer-coupon-msg');
      const drawerCouponBtn = document.getElementById('drawer-coupon-btn');
      if (drawerCouponInput && savedCoupon) {{
        if (!drawerCouponInput.value) drawerCouponInput.value = savedCoupon;
        if (drawerCouponBtn) {{
          drawerCouponBtn.classList.add('note-btn-gold');
          setCouponButtonActive(drawerCouponBtn, true);
        }}
        if (drawerCouponTag) drawerCouponTag.classList.remove('hidden');
        if (drawerCouponMsg) {{
          drawerCouponMsg.textContent = `كود الخصم (${{savedCoupon}}) مفعّل لطلبك.`;
          drawerCouponMsg.className = 'text-[11px] font-bold text-emerald-600 block mt-1.5';
          drawerCouponMsg.classList.remove('hidden');
        }}
      }} else if (drawerCouponBtn && !savedCoupon) {{
        setCouponButtonActive(drawerCouponBtn, false);
        if (drawerCouponTag) drawerCouponTag.classList.add('hidden');
        if (drawerCouponMsg?.classList.contains('text-emerald-600')) drawerCouponMsg.classList.add('hidden');
      }}

      if (drawerCouponInput && !drawerCouponInput._hasNoteInputListener) {{
        drawerCouponInput._hasNoteInputListener = true;
        drawerCouponInput.addEventListener('input', () => {{
          const currentVal = drawerCouponInput.value.trim().toUpperCase();
          const saved = (typeof localStorage !== 'undefined') ? localStorage.getItem('note_applied_coupon') : null;
          if (saved && currentVal !== saved) {{
            if (drawerCouponBtn) setCouponButtonActive(drawerCouponBtn, false);
            if (drawerCouponTag) drawerCouponTag.classList.add('hidden');
            if (!currentVal) {{
              if (window.noteChangeCartCoupon) {{
                window.noteChangeCartCoupon(null).catch(() => {{
                  CartManager.renderDrawer();
                  CartManager.showToast('تعذّر إزالة كود الخصم. حاول مرة أخرى.');
                }});
                return;
              }}
              localStorage.removeItem('note_applied_coupon');
              if (drawerCouponMsg) drawerCouponMsg.classList.add('hidden');
              if (typeof CartManager !== 'undefined' && CartManager.renderDrawer) CartManager.renderDrawer();
            }}
          }} else if (!saved) {{
            if (drawerCouponBtn) setCouponButtonActive(drawerCouponBtn, false);
          }}
        }});
      }}

      // Keep item rows and their prices together until the same Zid quote is ready.
      if (nativePricing && !totals && window._noteFailedCartPricing !== window.noteCartPricingKey?.(cart)) {{
        const pendingMarkup = '<div role="status" class="note-cart-pending-status rounded-2xl border border-stone-200 bg-stone-50 p-6 text-center text-sm text-stone-700">جارٍ تحديث منتجات سلتك…</div>';
        if (window.noteReplaceCartItems) window.noteReplaceCartItems(itemsContainer, pendingMarkup, true);
        else itemsContainer.innerHTML = pendingMarkup;
        return;
      }}

      // Render Laverne-style 2-tier item cards
      const itemsMarkup = cart.map(item => {{
        const zidSlug = zidSlugMap[item.id] || item.id;
        const imgUrl = resolveImgUrl(item.img);
        const itemPrice = confirmedItemPrice(cart, item);
        return `
          <div class="note-cart-item rounded-2xl border border-stone-200/90 bg-white p-4 sm:p-5 mb-3.5 transition-all shadow-2xs text-right" data-cart-id="${{item.id}}" style="display:block!important;background:#ffffff!important;border:1px solid #e7e5e4!important;border-radius:18px!important;padding:14px 16px!important;margin-bottom:12px!important;box-shadow:0 1px 3px rgba(0,0,0,0.02)!important;box-sizing:border-box!important;text-align:right!important;direction:rtl!important;position:relative!important;">
            <!-- Top Row: Thumbnail + Info (Title & Red Sale Price) + Coral Red ✕ Delete Button -->
            <div class="note-cart-item-top" style="display:flex!important;flex-direction:row!important;align-items:flex-start!important;justify-content:space-between!important;gap:12px!important;width:100%!important;box-sizing:border-box!important;">
              <div class="note-cart-item-start" style="display:flex!important;flex-direction:row!important;align-items:center!important;gap:12px!important;min-width:0!important;flex:1 1 auto!important;">
                <a href="/products/${{zidSlug}}" onclick="NoteRouter.navigate('/products/${{zidSlug}}'); CartManager.closeDrawer();" class="note-cart-item-thumb cart-drawer-thumb" style="width:82px!important;height:82px!important;min-width:82px!important;min-height:82px!important;max-width:82px!important;max-height:82px!important;border-radius:14px!important;background:#ffffff!important;border:1px solid #f0eee9!important;padding:4px!important;flex-shrink:0!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important;box-sizing:border-box!important;">
                  <img src="${{imgUrl}}" alt="${{item.title}}" style="width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;">
                </a>
                <div class="note-cart-item-info" style="display:flex!important;flex-direction:column!important;justify-content:center!important;gap:4px!important;min-width:0!important;flex:1 1 auto!important;text-align:right!important;">
                  <a href="/products/${{zidSlug}}" onclick="NoteRouter.navigate('/products/${{zidSlug}}'); CartManager.closeDrawer();" class="note-cart-item-title-link" style="text-decoration:none!important;color:inherit!important;display:block!important;">
                    <h4 class="note-cart-item-title" style="font-size:15px!important;font-weight:700!important;color:#1c1917!important;line-height:1.35!important;margin:0!important;">${{item.title}}</h4>
                  </a>
                  <div class="note-cart-item-prices" style="display:flex!important;flex-direction:row!important;align-items:baseline!important;gap:8px!important;margin-top:2px!important;">
                    <span class="note-cart-item-sale-price" style="font-size:15px!important;font-weight:800!important;color:#ef4444!important;">${{itemPrice}}</span>
                  </div>
                </div>
              </div>
              <button type="button" onclick="CartManager.removeItem('${{item.id}}')" class="note-cart-item-del-btn" aria-label="حذف المنتج من السلة" title="حذف" style="width:28px!important;height:28px!important;min-width:28px!important;min-height:28px!important;max-width:28px!important;max-height:28px!important;border-radius:9999px!important;background-color:#f87171!important;background:#f87171!important;border:none!important;outline:none!important;color:#ffffff!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;cursor:pointer!important;flex-shrink:0!important;box-shadow:0 1px 3px rgba(248,113,113,0.35)!important;appearance:none!important;-webkit-appearance:none!important;">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" style="width:11px!important;height:11px!important;stroke:#ffffff!important;display:block!important;margin:auto!important;"><path d="M1 1l10 10M11 1L1 11"/></svg>
              </button>
            </div>

            <!-- Crisp Horizontal Divider -->
            <div class="note-cart-item-divider" style="width:100%!important;height:1px!important;min-height:1px!important;max-height:1px!important;background-color:#f0eee9!important;border:none!important;margin:12px 0!important;padding:0!important;display:block!important;"></div>

            <!-- Bottom Row: Segmented Stepper -->
            <div class="note-cart-item-bottom" style="display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;width:100%!important;box-sizing:border-box!important;">
              <div class="note-cart-item-stepper" style="display:inline-flex!important;flex-direction:row!important;align-items:center!important;height:38px!important;width:126px!important;min-width:126px!important;border:1px solid #e7e5e4!important;border-radius:11px!important;background:#ffffff!important;overflow:hidden!important;box-sizing:border-box!important;box-shadow:0 1px 2px rgba(0,0,0,0.02)!important;">
                <button type="button" onclick="CartManager.updateQuantity('${{item.id}}', 1)" class="note-cart-item-stepper-btn" aria-label="زيادة الكمية" style="width:38px!important;height:100%!important;min-width:38px!important;display:flex!important;align-items:center!important;justify-content:center!important;background:transparent!important;border:none!important;color:#57534e!important;font-size:17px!important;font-weight:700!important;cursor:pointer!important;padding:0!important;appearance:none!important;-webkit-appearance:none!important;">+</button>
                <span class="note-cart-item-stepper-val" style="flex:1 1 auto!important;height:100%!important;display:flex!important;align-items:center!important;justify-content:center!important;border-left:1px solid #e7e5e4!important;border-right:1px solid #e7e5e4!important;background:#fafaf9!important;font-size:14px!important;font-weight:700!important;color:#1c1917!important;user-select:none!important;box-sizing:border-box!important;">${{item.quantity}}</span>
                <button type="button" onclick="CartManager.updateQuantity('${{item.id}}', -1)" class="note-cart-item-stepper-btn" aria-label="تقليل الكمية" style="width:38px!important;height:100%!important;min-width:38px!important;display:flex!important;align-items:center!important;justify-content:center!important;background:transparent!important;border:none!important;color:#57534e!important;font-size:17px!important;font-weight:700!important;cursor:pointer!important;padding:0!important;appearance:none!important;-webkit-appearance:none!important;">−</button>
              </div>
            </div>
          </div>
        `;
      }}).join('');
      if (window.noteReplaceCartItems) window.noteReplaceCartItems(itemsContainer, itemsMarkup);
      else itemsContainer.innerHTML = itemsMarkup;

      // Render Drawer Recommendations
      const recsList = document.getElementById('cart-drawer-recs-list');
      if (!nativePricing && recsContainer && recsList) {{
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
          .slice(0, 2);

        if (recs.length > 0) {{
          recsContainer.classList.remove('hidden');
          recsList.innerHTML = recs.map(p => {{
            const imgUrl = resolveImgUrl(p.img);
            return `
              <div class="flex items-center justify-between gap-2.5 p-2.5 bg-stone-50 rounded-xl border border-stone-200/70 shadow-2xs">
                <div class="flex items-center gap-2.5 min-w-0">
                  <div class="w-10 h-10 rounded-lg bg-white p-0.5 border border-stone-200/60 shrink-0 flex items-center justify-center">
                    <img src="${{imgUrl}}" alt="${{p.title}}" class="w-full h-full object-contain">
                  </div>
                  <div class="min-w-0">
                    <h5 class="text-xs font-bold text-black truncate">${{p.title}}</h5>
                    <div class="flex items-center gap-1.5 mt-0.5">
                      <span class="text-xs font-extrabold text-black">${{formatPrice(p.price)}}</span>
                      ${{p.old_price && formatPrice(p.old_price) ? `<span class="text-[10px] text-stone-400 line-through">${{formatPrice(p.old_price)}}</span>` : ''}}
                    </div>
                  </div>
                </div>
                <button onclick="CartManager.addItem('${{p.id}}', 1)" class="px-3 py-1.5 rounded-lg bg-black hover:bg-stone-800 text-white text-xs font-bold shrink-0 transition flex items-center gap-1 active:scale-95 shadow-xs" title="إضافة سريعة">
                  <i class="sicon-plus text-[10px]"></i>
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

  // Set Coupon Button UI state:
  // When active: Luxury Radiant Gold with SVG checkmark and 'مفعّل'
  // When inactive: Default solid black #111111 with plain 'تطبيق' (NO checkmark, NO 'مفعّل')
  function setCouponButtonActive(btn, isActive) {{
    if (!btn) return;
    btn.style.backgroundColor = '';
    btn.style.borderColor = '';
    const textId = (btn.id === 'coupon-apply-btn') ? 'coupon-btn-text' : 'drawer-coupon-btn-text';
    if (isActive) {{
      btn.classList.add('note-btn-gold');
      btn.innerHTML = '<span id="' + textId + '" class="inline-flex items-center gap-1 font-bold text-stone-900"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>مفعّل</span></span>';
    }} else {{
      btn.classList.remove('note-btn-gold');
      btn.innerHTML = '<span id="' + textId + '">تطبيق</span>';
    }}
  }}

  // Celebratory Coupon Animation & Micro-Confetti Burst
  function triggerCouponCelebration(container, tag, btn, totalEl) {{
    try {{
      // 1. Confetti Burst
      if (container && typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {{
        container.style.position = 'relative';
        const confettiWrapper = document.createElement('div');
        confettiWrapper.className = 'note-coupon-confetti-wrapper';
        confettiWrapper.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:40;overflow:visible;';

        const colors = ['#10b981', '#34d399', '#f59e0b', '#fbbf24', '#dfc485', '#111111'];
        const rect = container.getBoundingClientRect();
        const startX = rect.width ? (rect.width / 2) : 150;
        const startY = 18;

        for (let i = 0; i < 22; i++) {{
          const piece = document.createElement('i');
          piece.className = 'note-confetti-piece';
          const angle = (Math.PI * 2 * i) / 22 + (Math.random() * 0.4 - 0.2);
          const distance = 35 + Math.random() * 65;
          const dx = Math.cos(angle) * distance;
          const dy = -Math.abs(Math.sin(angle) * distance) - (15 + Math.random() * 45);
          const rot = (Math.random() * 720 - 360) + 'deg';
          const size = (4 + Math.random() * 4) + 'px';
          const color = colors[i % colors.length];

          piece.style.cssText = 'position:absolute;left:' + startX + 'px;top:' + startY + 'px;width:' + size + ';height:' + size + ';background-color:' + color + ';border-radius:' + (i % 3 === 0 ? '50%' : '2px') + ';pointer-events:none;--dx:' + dx.toFixed(1) + 'px;--dy:' + dy.toFixed(1) + 'px;--rot:' + rot + ';';
          confettiWrapper.appendChild(piece);
        }}
        container.appendChild(confettiWrapper);
        setTimeout(() => confettiWrapper.remove(), 1500);
      }}

      // 2. Pulse container
      if (container) {{
        container.classList.remove('note-coupon-applied-anim');
        void container.offsetWidth;
        container.classList.add('note-coupon-applied-anim');
        setTimeout(() => container.classList.remove('note-coupon-applied-anim'), 1200);
      }}

      // 3. Tag bounce
      if (tag) {{
        tag.classList.remove('note-coupon-tag-anim');
        void tag.offsetWidth;
        tag.classList.add('note-coupon-tag-anim');
      }}

      // 4. Button success feedback: Permanently active Luxury Gold with checkmark
      if (btn) {{
        setCouponButtonActive(btn, true);
        btn.classList.add('note-coupon-tag-anim');
        setTimeout(() => btn.classList.remove('note-coupon-tag-anim'), 1200);
      }}

      // 5. Total Price highlight
      const newPriceEl = document.querySelector('.note-drawer-total-new, .note-cart-total-new') || totalEl;
      if (newPriceEl) {{
        newPriceEl.classList.remove('note-price-drop-anim');
        void newPriceEl.offsetWidth;
        newPriceEl.classList.add('note-price-drop-anim');
        setTimeout(() => newPriceEl.classList.remove('note-price-drop-anim'), 1200);
      }}
    }} catch (_) {{}}
  }}

  // Drawer Coupon Application Handler
  window.applyDrawerCoupon = async function() {{
    const input = document.getElementById('drawer-coupon-input');
    const msg = document.getElementById('drawer-coupon-msg');
    const tag = document.getElementById('drawer-coupon-applied-tag');
    const btn = document.getElementById('drawer-coupon-btn');

    if (!input || !msg) return;

    const code = input.value.trim().toUpperCase();
    if (!code) {{
      msg.textContent = 'يرجى إدخال كود الخصم أولاً.';
      msg.className = 'text-[11px] font-bold text-rose-600 block mt-1.5';
      msg.classList.remove('hidden');
      input.focus();
      return;
    }}

    const cartItems = (typeof CartManager !== 'undefined' && CartManager.getCart) ? CartManager.getCart() : [];
    if (!cartItems || cartItems.length === 0) {{
      msg.textContent = 'يرجى إضافة منتجات إلى السلة أولاً لتطبيق كود الخصم.';
      msg.className = 'text-[11px] font-bold text-rose-600 block mt-1.5';
      msg.classList.remove('hidden');
      return;
    }}



    if (btn) {{
      btn.disabled = true;
      btn.innerHTML = '<span class="inline-block animate-spin">⟳</span>';
    }}

    let applied = false;
    let alreadyApplied = false;
    let zidError = null;

    try {{

      if (!window.zid || !window.zid.cart) {{
        try {{
          const mod = await import('https://static.zid.store/sdk/v3.30.4/theme-service/vitrin-theme-service.es.js');
          window.zid = mod.default || mod;
        }} catch (_) {{}}
      }}

      if (typeof window.noteChangeCartCoupon === 'function') {{
        try {{
          await window.noteChangeCartCoupon(code);
          applied = true;
        }} catch (_) {{
          zidError = 'تعذّر تطبيق كود الخصم. تأكد من الكود وحاول مرة أخرى.';
        }}
      }} else if (window.zid && window.zid.cart && typeof window.zid.cart.applyCoupon === 'function') {{
        try {{
          if (typeof CartManager !== 'undefined' && CartManager._nativeQueue) {{
            try {{ await CartManager._nativeQueue; }} catch (_) {{}}
          }}
          // Clear any previous coupon from Zid session so the new coupon can be applied cleanly
          try {{ await window.zid.cart.removeCoupons(); }} catch (_) {{}}
          const res = await window.zid.cart.applyCoupon({{ coupon_code: code }});
          if (res && res.status === 'error') {{
            zidError = res.message?.description || (typeof res.message === 'string' ? res.message : '') || 'كود الخصم غير صحيح أو غير متاح لهذا الطلب.';
          }} else {{
            applied = true;
          }}
        }} catch (err) {{
          try {{
            let data = err?.responseData || err?.data || err?.response?.data || null;
            if (!data && err?.response && typeof err.response.clone === 'function') {{
              try {{ data = await err.response.clone().json(); }} catch (_) {{}}
            }}
            if (!data && err?.response && typeof err.response.json === 'function') {{
              try {{ data = await err.response.json(); }} catch (_) {{}}
            }}
            if (!data && typeof fetch === 'function') {{
              try {{
                const rawRes = await fetch('/api/v1/cart/coupons?coupon_code=' + encodeURIComponent(code), {{
                  method: 'POST',
                  headers: {{ 'Accept': 'application/json' }}
                }});
                data = await rawRes.json();
              }} catch (_) {{}}
            }}

            if (data) {{
              const codeName = data?.message?.code || data?.code || '';
              const desc = data?.message?.description || (typeof data?.message === 'string' ? data.message : '') || data?.detail || '';
              if (typeof desc === 'string' && (desc.includes('طُبّق') || desc.includes('مسبق') || desc.includes('مطبق'))) {{
                applied = true;
                alreadyApplied = true;
              }} else if (codeName === 'ERROR_CART_PRODUCTS_NOT_FOUND' || (typeof desc === 'string' && desc.includes('لم يُضف'))) {{
                applied = true;
              }} else if (typeof desc === 'string' && desc.trim()) {{
                zidError = desc.trim();
              }}
            }}
          }} catch (_) {{}}

          if (!applied && !zidError) {{
            zidError = 'كود الخصم غير صحيح أو غير متاح لهذا الطلب.';
          }}
        }}
      }} else {{
        zidError = 'تعذر الاتصال بخادم المتجر للتحقق من الكوبون.';
      }}

      if (zidError) {{
        msg.textContent = zidError;
        msg.className = 'text-[11px] font-bold text-rose-600 block mt-1.5';
        msg.classList.remove('hidden');
        if (tag) tag.classList.add('hidden');
        if (!window.noteChangeCartCoupon) localStorage.removeItem('note_applied_coupon');
        if (typeof CartManager !== 'undefined' && CartManager.renderDrawer) CartManager.renderDrawer();
      }} else if (applied) {{
        if (!window.noteChangeCartCoupon) localStorage.setItem('note_applied_coupon', code);
        if (typeof CartManager !== 'undefined' && CartManager.renderDrawer) CartManager.renderDrawer();

        if (tag) tag.classList.remove('hidden');
        if (btn) setCouponButtonActive(btn, true);
        msg.textContent = alreadyApplied
          ? `كود الخصم (${{code}}) مفعّل بالفعل لطلبك! 🎉`
          : `تم تفعيل كود الخصم (${{code}}) بنجاح! سيتم احتسابه عند الدفع.`;
        msg.className = 'text-[11px] font-bold text-emerald-600 block mt-1.5 note-msg-anim';

        const container = input.closest('.rounded-2xl') || input.parentElement?.parentElement || document.getElementById('cart-drawer-coupon-box');
        const totalEl = document.getElementById('cart-drawer-total');
        triggerCouponCelebration(container, tag, btn, totalEl);
        msg.classList.remove('hidden');
      }}
    }} catch (e) {{
      msg.textContent = 'حدث خطأ أثناء تطبيق الكود. يرجى المحاولة مجدداً.';
      msg.className = 'text-[11px] font-bold text-rose-600 block mt-1.5';
      msg.classList.remove('hidden');
      if (btn) setCouponButtonActive(btn, false);
    }} finally {{
      if (btn) {{
        btn.disabled = false;
        if (!applied) setCouponButtonActive(btn, false);
      }}
    }}
  }};

  // 8. Product Card Rendering
  function renderProductCard(p, index) {{
    const zidSlug = zidSlugMap[p.id] || p.id;
    const imgUrl = resolveImgUrl(p.img);
    const isOutOfStock = p.in_stock === false || p.stock === 0;
    return `
      <div class="min-w-[175px] sm:min-w-[270px] max-w-[185px] sm:max-w-[280px] shrink-0 p-1 flex flex-col justify-between text-center group cursor-pointer bg-transparent ${{isOutOfStock ? 'is-out-of-stock product-item-out-of-stock' : ''}}" style="scroll-snap-align: start;" onclick="NoteRouter.navigate('/products/${{zidSlug}}')">
        <div>
          <!-- Frameless Image Container with Clean Shadow/Scale -->
          <div class="relative bg-transparent aspect-square flex items-center justify-center mb-2 p-2 sm:p-4 overflow-hidden rounded-2xl" style="border-radius: 20px !important; overflow: hidden !important;">
            ${{isOutOfStock ? `<span class="note-product-badge note-out-of-stock-sticker out-of-stock">غير متاح</span>${{p.discount ? `<span class="note-product-badge note-discount-badge absolute top-3.5 right-3.5 z-10 whitespace-nowrap"><span>خصم</span> <bdi dir="ltr">${{p.discount}}</bdi></span>` : ''}}` : (p.discount ? `<span class="note-product-badge note-discount-badge absolute top-3.5 right-3.5 z-10 whitespace-nowrap"><span>خصم</span> <bdi dir="ltr">${{p.discount}}</bdi></span>` : (p.tag ? `<span class="note-product-badge absolute top-3.5 right-3.5 z-10 whitespace-nowrap">${{escapeHTML(p.tag)}}</span>` : ''))}}
            <img src="${{imgUrl}}" alt="${{p.title}}" loading="lazy" decoding="async" class="w-full h-full object-contain rounded-2xl group-hover:scale-106 transition-transform duration-500 ease-out" style="border-radius: 18px !important;">
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
        <button onclick="event.stopPropagation(); CartManager.addItem('${{p.id}}', 1, null, this)" class="w-full mt-3 py-2 sm:py-2.5 px-4 rounded-full bg-black text-white hover:bg-stone-800 active:scale-95 transition flex items-center justify-center gap-2 font-bold text-xs shadow-sm" title="إضافة للسلة">
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

  // 10. Header Dynamic Theme Adaptation & Glassmorphism
  let currentHeroTheme = 'light';
  let lastHeaderState = null;

  function handleHeaderScroll() {{
    const header = document.getElementById('site-header');
    const storeLogo = document.getElementById('store-logo');
    const hero = document.getElementById('section-hero-video');
    if (!header) return;

    const scrollY = window.pageYOffset || window.scrollY || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop) || 0;
    const heroHeight = hero ? hero.offsetHeight : 800;

    if (!hero || scrollY >= (heroHeight - 90)) {{
      // Scrolled past hero: solid frosted white glass, black text, dark logo (NO BORDER)
      if (lastHeaderState !== 'scrolled-solid') {{
        lastHeaderState = 'scrolled-solid';
        header.className = 'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 text-black shadow-xs backdrop-blur-xl bg-white/85 border-none';
        if (storeLogo && !storeLogo.src.endsWith('/logo_dark_crisp.png')) {{
          storeLogo.src = ASSET_HOST + '/logo_dark_crisp.png';
        }}
      }}
    }} else {{
      // Over hero banner: dynamic theme matching active slide
      if (currentHeroTheme === 'light') {{
        const state = scrollY > 20 ? 'hero-light-scrolled' : 'hero-light-top';
        if (lastHeaderState !== state) {{
          lastHeaderState = state;
          if (scrollY > 20) {{
            header.className = 'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 text-black backdrop-blur-md bg-white/70 shadow-xs border-none';
          }} else {{
            header.className = 'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 text-black bg-transparent border-none shadow-none backdrop-blur-none';
          }}
          if (storeLogo && !storeLogo.src.endsWith('/logo_dark_crisp.png')) {{
            storeLogo.src = ASSET_HOST + '/logo_dark_crisp.png';
          }}
        }}
      }} else {{
        const state = scrollY > 20 ? 'hero-dark-scrolled' : 'hero-dark-top';
        if (lastHeaderState !== state) {{
          lastHeaderState = state;
          if (scrollY > 20) {{
            header.className = 'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 text-white backdrop-blur-md bg-black/40 shadow-xs border-none';
          }} else {{
            header.className = 'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 text-white bg-transparent border-none shadow-none backdrop-blur-none';
          }}
          if (storeLogo && !storeLogo.src.endsWith('/logo_white_crisp.png')) {{
            storeLogo.src = ASSET_HOST + '/logo_white_crisp.png';
          }}
        }}
      }}
    }}
  }}

  // 11. Quick View Modal
  function openQuickView(idx) {{
    const p = productsData[idx];
    if (!p) return;
    const imgUrl = resolveImgUrl(p.img);
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
          CartManager.addItem(p.id, 1, null, buyBtn);
          setTimeout(() => closeQuickView(), 400);
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

  // White Friday Offer Announcement Popup Dialog
  function openOfferPopup() {{
    const p = document.getElementById('white-friday-popup');
    if (!p) return;
    if (typeof p.showModal === 'function') {{
      if (!p.open) p.showModal();
    }} else {{
      p.classList.remove('hidden');
      p.style.display = 'block';
    }}
  }}

  function closeOfferPopup() {{
    const p = document.getElementById('white-friday-popup');
    if (!p) return;
    if (typeof p.close === 'function') {{
      if (p.open) p.close();
    }} else {{
      p.classList.add('hidden');
      p.style.display = 'none';
    }}
    try {{
      sessionStorage.setItem('note_white_friday_popup_dismissed', '1');
    }} catch (_) {{}}
  }}

  function acceptOfferPopup() {{
    closeOfferPopup();
    const el = document.getElementById('bestsellers');
    if (el) {{
      el.scrollIntoView({{ behavior: 'smooth' }});
    }} else if (window.NoteRouter) {{
      window.NoteRouter.navigate('/');
      setTimeout(() => {{
        const b = document.getElementById('bestsellers');
        if (b) b.scrollIntoView({{ behavior: 'smooth' }});
      }}, 300);
    }} else {{
      window.location.href = '/#bestsellers';
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
          <p class="text-sm font-bold text-black mb-1">لم نجد أي نتائج تطابق "${{escapeHTML(rawTrimmed)}}"</p>
          <p class="text-xs text-stone-400">جرب البحث بكلمات أخرى مثل: مسك، توباكو، عود، عنبر، باودر</p>
        </div>
      `;
      return;
    }}

    resultsContainer.innerHTML = matches.slice(0, 8).map(p => {{
      const zidSlug = zidSlugMap[p.id] || p.id;
      const imgUrl = resolveImgUrl(p.img);
      const isOutOfStock = p.in_stock === false || p.stock === 0;
      return `
        <div class="py-3 flex items-center justify-between gap-4 hover:bg-stone-50 px-2.5 rounded-xl transition cursor-pointer ${{isOutOfStock ? 'opacity-80' : ''}}" onclick="closeSearchModal(); NoteRouter.navigate('/products/${{zidSlug}}')">
          <div class="flex items-center gap-3 min-w-0">
            <div class="relative w-14 h-14 rounded-xl bg-stone-50 p-1 shrink-0 flex items-center justify-center border border-stone-100 overflow-hidden">
              <img src="${{imgUrl}}" alt="${{p.title}}" class="w-full h-full object-contain ${{isOutOfStock ? 'grayscale opacity-80' : ''}}">
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <h4 class="text-xs sm:text-sm font-bold text-black truncate">${{escapeHTML(p.title)}}</h4>
                ${{isOutOfStock ? '<span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 shrink-0">غير متاح</span>' : ''}}
              </div>
              <p class="text-[10px] sm:text-[11px] text-stone-400 font-normal truncate">${{escapeHTML(p.notes || p.cat_ar || '')}}</p>
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

    const activeSlide = slides[currentHeroIndex];
    if (activeSlide) {{
      currentHeroTheme = activeSlide.getAttribute('data-theme') || 'dark';
      lastHeaderState = null;
      handleHeaderScroll();
    }}

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

  // 11.11 Countdown Timer Engine (Fixed at 24:00:00 before midnight, counts down 2026-11-11 00:00:00 to 23:59:59 Riyadh Time)
  let cdTimer = null;
  function init11Countdown() {{
    if (cdTimer) clearInterval(cdTimer);
    const startTime = new Date(Date.UTC(2026, 10, 10, 21, 0, 0)).getTime();
    const endTime = new Date(Date.UTC(2026, 10, 11, 20, 59, 59)).getTime();
    function pad(n) {{ return String(Math.max(0, n)).padStart(2, '0'); }}
    function update() {{
      const now = Date.now();
      if (now > endTime) {{
        document.querySelectorAll('.cd-11-wrapper').forEach(el => el.classList.add('hidden'));
        if (cdTimer) clearInterval(cdTimer);
        return;
      }}
      document.querySelectorAll('.cd-11-wrapper').forEach(el => el.classList.remove('hidden'));
      if (now < startTime) {{
        document.querySelectorAll('.cd-hours').forEach(el => el.textContent = '24');
        document.querySelectorAll('.cd-minutes').forEach(el => el.textContent = '00');
        document.querySelectorAll('.cd-seconds').forEach(el => el.textContent = '00');
        return;
      }}
      const diff = endTime - now;
      const totalSec = Math.floor(diff / 1000);
      const hours = Math.floor(totalSec / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;
      document.querySelectorAll('.cd-hours').forEach(el => el.textContent = pad(hours));
      document.querySelectorAll('.cd-minutes').forEach(el => el.textContent = pad(minutes));
      document.querySelectorAll('.cd-seconds').forEach(el => el.textContent = pad(seconds));
    }}
    update();
    cdTimer = setInterval(update, 1000);
  }}
  window.init11Countdown = init11Countdown;

  function initHeroCarousel() {{
    init11Countdown();
    const heroSection = document.getElementById('section-hero-video');
    if (!heroSection) return;

    const heroVideo = document.getElementById('hero-background-video');
    if (heroVideo) {{
      heroVideo.muted = true;
      heroVideo.addEventListener('timeupdate', () => {{
        if (heroVideo.currentTime >= 12.8) {{
          heroVideo.currentTime = 0;
          heroVideo.play().catch(() => {{}});
        }}
      }});
      const playPromise = heroVideo.play();
      if (playPromise !== undefined) {{
        playPromise.catch(() => {{}});
      }}
    }}

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

    goToHeroSlide(0);
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

    let startX = 0, startY = 0;
    carousel.addEventListener('touchstart', (e) => {{
      startX = e.changedTouches[0].clientX;
      startY = e.changedTouches[0].clientY;
      stopOfferTimer();
    }}, {{ passive: true }});

    carousel.addEventListener('touchend', (e) => {{
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = endX - startX;
      const diffY = endY - startY;
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {{
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
    const mainImgUrl = resolveImgUrl(currentProduct.img);
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
      if (images.length > 1) {{
        thumbsContainer.style.display = 'flex';
        images.forEach((img, idx) => {{
          const fullUrl = resolveImgUrl(img);
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
      }} else {{
        thumbsContainer.style.display = 'none';
        thumbsContainer.innerHTML = '';
      }}
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
      const imgUrl = resolveImgUrl(p.img);
      const isOutOfStock = p.in_stock === false || p.stock === 0;
      return `
        <div class="p-2 sm:p-3 flex flex-col justify-between text-center group cursor-pointer bg-transparent border-0 shadow-none transition duration-300 ${{isOutOfStock ? 'is-out-of-stock product-item-out-of-stock' : ''}}" onclick="NoteRouter.navigate('/products/${{zidSlug}}')">
          <div>
            <div class="relative bg-transparent aspect-square flex items-center justify-center mb-2 p-2 overflow-hidden rounded-2xl" style="border-radius: 20px !important; overflow: hidden !important;">
              ${{isOutOfStock ? `<span class="note-product-badge note-out-of-stock-sticker out-of-stock">غير متاح</span>${{p.discount ? `<span class="note-product-badge note-discount-badge absolute top-3.5 right-3.5 z-10 whitespace-nowrap"><span>خصم</span> <bdi dir="ltr">${{p.discount}}</bdi></span>` : ''}}` : (p.discount ? `<span class="note-product-badge note-discount-badge absolute top-3.5 right-3.5 z-10 whitespace-nowrap"><span>خصم</span> <bdi dir="ltr">${{p.discount}}</bdi></span>` : (p.tag ? `<span class="note-product-badge absolute top-3.5 right-3.5 z-10 whitespace-nowrap">${{escapeHTML(p.tag)}}</span>` : ''))}}
              <img src="${{imgUrl}}" alt="${{p.title}}" loading="lazy" decoding="async" class="w-full h-full object-contain rounded-2xl group-hover:scale-106 transition-transform duration-500 ease-out" style="border-radius: 18px !important;">
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
      title: 'تولات',
      desc: 'تولات وزيوت عطرية مركزة بتوليفات متنوعة ونقية تأسر الحواس بثبات استثنائي.'
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
      const imgUrl = resolveImgUrl(p.img);
      const isOutOfStock = p.in_stock === false || p.stock === 0;
      return `
        <div class="p-2 sm:p-3 flex flex-col justify-between text-center group cursor-pointer bg-transparent border-0 shadow-none transition duration-300 ${{isOutOfStock ? 'is-out-of-stock product-item-out-of-stock' : ''}}" onclick="NoteRouter.navigate('/products/${{zidSlug}}')">
          <div>
            <div class="relative bg-transparent aspect-square flex items-center justify-center mb-2 p-2 sm:p-4 overflow-hidden rounded-2xl" style="border-radius: 20px !important; overflow: hidden !important;">
              ${{isOutOfStock ? `<span class="note-product-badge note-out-of-stock-sticker out-of-stock">غير متاح</span>${{p.discount ? `<span class="note-product-badge note-discount-badge absolute top-3.5 right-3.5 z-10 whitespace-nowrap"><span>خصم</span> <bdi dir="ltr">${{p.discount}}</bdi></span>` : ''}}` : (p.discount ? `<span class="note-product-badge note-discount-badge absolute top-3.5 right-3.5 z-10 whitespace-nowrap"><span>خصم</span> <bdi dir="ltr">${{p.discount}}</bdi></span>` : (p.tag ? `<span class="note-product-badge absolute top-3.5 right-3.5 z-10 whitespace-nowrap">${{escapeHTML(p.tag)}}</span>` : ''))}}
              <img src="${{imgUrl}}" alt="${{p.title}}" loading="lazy" decoding="async" class="w-full h-full object-contain rounded-2xl group-hover:scale-106 transition-transform duration-500 ease-out" style="border-radius: 18px !important;">
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

  function renderCartPage(skipSync) {{
    document.title = 'سلة المشتريات | دار نوت للعطور NOTE Perfumes';
    const itemsContainer = document.getElementById('cart-page-items');
    const emptyState = document.getElementById('cart-page-empty');
    const summaryWrapper = document.getElementById('cart-page-summary-wrapper');

    if (!itemsContainer) return;
    window.noteRenderCartLoading?.();

    const cart = CartManager.getCart();
    const total = CartManager.getTotal();

    if (cart.length === 0) {{
      if (window.noteReplaceCartItems) window.noteReplaceCartItems(itemsContainer, '');
      else itemsContainer.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      if (summaryWrapper) summaryWrapper.classList.add('hidden');
      return;
    }}

    if (emptyState) emptyState.classList.add('hidden');
    if (summaryWrapper) summaryWrapper.classList.remove('hidden');

    const nativePricing = typeof window.noteConfirmCartPricing === 'function';

    const renderItem = (item, showStepper = true, overridePrice = null, badgeText = null, quantity = item.quantity, confirmedRow = null) => {{
        const zidSlug = zidSlugMap[item.id] || item.id;
        const imgUrl = resolveImgUrl(item.img);
        const crossedPrice = confirmedRow?.price_before;
        const shownPrice = confirmedRow ? formatPrice(Number(confirmedRow.price)) : confirmedItemPrice(cart, item, overridePrice !== null);
        return `
          <div class="note-cart-item note-cart-page-item rounded-2xl border border-stone-200/90 bg-white p-4 sm:p-5 mb-3 transition-all shadow-2xs text-right" data-cart-id="${{item.id}}" style="display:block!important;background:#ffffff!important;border:1px solid #e7e5e4!important;border-radius:18px!important;padding:14px 16px!important;margin-bottom:10px!important;box-shadow:0 1px 3px rgba(0,0,0,0.02)!important;box-sizing:border-box!important;text-align:right!important;direction:rtl!important;position:relative!important;">
            <div class="note-cart-item-top" style="display:flex!important;flex-direction:row!important;align-items:flex-start!important;justify-content:space-between!important;gap:12px!important;width:100%!important;box-sizing:border-box!important;">
              <div class="note-cart-item-start" style="display:flex!important;flex-direction:row!important;align-items:center!important;gap:12px!important;min-width:0!important;flex:1 1 auto!important;">
                <a href="/products/${{zidSlug}}" onclick="NoteRouter.navigate('/products/${{zidSlug}}')" class="note-cart-item-thumb cart-thumb-box" style="width:82px!important;height:82px!important;min-width:82px!important;min-height:82px!important;max-width:82px!important;max-height:82px!important;border-radius:14px!important;background:#ffffff!important;border:1px solid #f0eee9!important;padding:4px!important;flex-shrink:0!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important;box-sizing:border-box!important;">
                  <img src="${{imgUrl}}" alt="${{item.title}}" style="width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;">
                </a>
                <div class="note-cart-item-info" style="display:flex!important;flex-direction:column!important;justify-content:center!important;gap:4px!important;min-width:0!important;flex:1 1 auto!important;text-align:right!important;">
                  <a href="/products/${{zidSlug}}" onclick="NoteRouter.navigate('/products/${{zidSlug}}')" class="note-cart-item-title-link" style="text-decoration:none!important;color:inherit!important;display:block!important;">
                    <h4 class="note-cart-item-title" style="font-size:15px!important;font-weight:700!important;color:#1c1917!important;line-height:1.35!important;margin:0!important;">${{item.title}}</h4>
                  </a>
                  ${{badgeText ? `<span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200/80 w-fit" style="display:inline-block!important;padding:2px 8px!important;border-radius:9999px!important;font-size:11px!important;font-weight:700!important;background:#fef3c7!important;color:#78350f!important;border:1px solid #fde68a!important;margin-top:2px!important;">${{badgeText}}</span>` : ''}}
                  <div class="note-cart-item-prices" style="display:flex!important;flex-direction:row!important;align-items:baseline!important;gap:8px!important;margin-top:2px!important;">
                    ${{crossedPrice ? `<span class="note-cart-item-old-price" style="font-size:13px!important;font-weight:500!important;color:#a8a29e!important;text-decoration:line-through!important;">${{formatPrice(crossedPrice)}}</span>` : ''}}
                    <span class="note-cart-item-sale-price" style="font-size:15px!important;font-weight:800!important;color:#ef4444!important;">${{shownPrice}}</span>
                  </div>
                </div>
              </div>
              <button type="button" data-key="${{escapeHTML(item.id)}}" data-quantity="${{quantity}}" onclick="CartManager.removeItem(this.dataset.key);" class="note-cart-item-del-btn" aria-label="حذف المنتج من السلة" title="حذف" style="width:28px!important;height:28px!important;min-width:28px!important;min-height:28px!important;max-width:28px!important;max-height:28px!important;border-radius:9999px!important;background-color:#f87171!important;background:#f87171!important;border:none!important;outline:none!important;color:#ffffff!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;cursor:pointer!important;flex-shrink:0!important;box-shadow:0 1px 3px rgba(248,113,113,0.35)!important;appearance:none!important;-webkit-appearance:none!important;">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" style="width:11px!important;height:11px!important;stroke:#ffffff!important;display:block!important;margin:auto!important;"><path d="M1 1l10 10M11 1L1 11"/></svg>
              </button>
            </div>
            <div class="note-cart-item-divider" style="width:100%!important;height:1px!important;min-height:1px!important;max-height:1px!important;background-color:#f0eee9!important;border:none!important;margin:10px 0!important;padding:0!important;display:block!important;"></div>
            <div class="note-cart-item-bottom" style="display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;width:100%!important;box-sizing:border-box!important;">
              ${{showStepper ? `
              <div class="note-cart-item-stepper" style="display:inline-flex!important;flex-direction:row!important;align-items:center!important;height:36px!important;width:120px!important;min-width:120px!important;border:1px solid #e7e5e4!important;border-radius:10px!important;background:#ffffff!important;overflow:hidden!important;box-sizing:border-box!important;">
                <button type="button" onclick="CartManager.updateQuantity('${{item.id}}', 1); renderCartPage();" class="note-cart-item-stepper-btn" aria-label="زيادة الكمية" style="width:36px!important;height:100%!important;min-width:36px!important;display:flex!important;align-items:center!important;justify-content:center!important;background:transparent!important;border:none!important;color:#57534e!important;font-size:16px!important;font-weight:700!important;cursor:pointer!important;padding:0!important;">+</button>
                <span class="note-cart-item-stepper-val" style="flex:1 1 auto!important;height:100%!important;display:flex!important;align-items:center!important;justify-content:center!important;border-left:1px solid #e7e5e4!important;border-right:1px solid #e7e5e4!important;background:#fafaf9!important;font-size:13.5px!important;font-weight:700!important;color:#1c1917!important;user-select:none!important;">${{quantity}}</span>
                <button type="button" onclick="CartManager.updateQuantity('${{item.id}}', -1); renderCartPage();" class="note-cart-item-stepper-btn" aria-label="تقليل الكمية" style="width:36px!important;height:100%!important;min-width:36px!important;display:flex!important;align-items:center!important;justify-content:center!important;background:transparent!important;border:none!important;color:#57534e!important;font-size:16px!important;font-weight:700!important;cursor:pointer!important;padding:0!important;">−</button>
              </div>
              ` : `
              <span class="text-xs font-bold text-stone-600" style="font-size:12px!important;font-weight:700!important;color:#57534e!important;">الكمية: ${{quantity}}</span>
              `}}
            </div>
          </div>
        `;
    }};

    const rows = nativePricing ? confirmedCartRows(cart) : [];

    // If native quote is still pending verification, show loading state and trigger sync
    if (nativePricing && !rows.length && window._noteFailedCartPricing !== window.noteCartPricingKey?.(cart)) {{
      if (!skipSync) window.noteConfirmCartPricing();
      const pendingMarkup = '<div role="status" class="note-cart-pending-status rounded-2xl border border-stone-200 bg-stone-50 p-6 text-center text-sm text-stone-700">جارٍ تحديث عروض وسلة المشتريات…</div>';
      if (window.noteReplaceCartItems) window.noteReplaceCartItems(itemsContainer, pendingMarkup, true);
      else itemsContainer.innerHTML = pendingMarkup;
      updateCartFinancials(total);
      return;
    }}

    let cardsHtml = '';

    if (nativePricing && rows.length > 0) {{
      // 1. Group items dynamically by Zid server's verified bundle_offer.id
      const zidBundles = new Map();
      const zidStandalone = [];

      for (const row of rows) {{
        const offer = row.meta?.bundle_offer;
        if (offer && offer.id) {{
          if (!zidBundles.has(offer.id)) {{
            zidBundles.set(offer.id, {{
              id: offer.id,
              name: offer.name || 'عروض الجمعة',
              rows: [],
              savings: 0
            }});
          }}
          const b = zidBundles.get(offer.id);
          b.rows.push(row);
          if (row.is_discounted || Number(row.price) <= 1) {{
            const catItem = CartManager._findCatalogProduct(row);
            const orig = Number(row.price_before || catItem?.old_price || catItem?.price || 0);
            b.savings += Math.max(0, orig - Number(row.price));
          }}
        }} else {{
          zidStandalone.push(row);
        }}
      }}

      // Filter: Only keep bundles that have an active discount; move incomplete groups to standalone
      for (const [offerId, b] of Array.from(zidBundles.entries())) {{
        const hasDiscount = b.savings > 0 || b.rows.some(r => r.is_discounted || (r.price != null && Number(r.price) <= 1));
        if (!hasDiscount) {{
          zidStandalone.push(...b.rows);
          zidBundles.delete(offerId);
        }}
      }}

      // Render Verified Bundles from Zid
      for (const [offerId, b] of zidBundles.entries()) {{
        const isTola = b.name.includes('تولة') || b.name.includes('توله') || b.name.includes('1+تولة');
        const badgeText = isTola ? 'تولة بـ 1 ريال (1+تولة)' : 'عطرك بـ 1 ريال (2+1)';
        const titleText = isTola ? 'عرض التولة بـ 1 ريال' : 'عرض الثالث بـ 1 ريال';
        const savingsText = b.savings > 0
          ? `<div style="display:flex!important;align-items:baseline!important;gap:8px!important;"><span style="font-size:13px!important;font-weight:700!important;color:#047857!important;">وفّرت ${{formatPrice(b.savings)}}</span></div>`
          : '';

        cardsHtml += `
          <div class="note-bundle-group-card" style="background:#ffffff!important;border:1px solid #e7e5e4!important;border-radius:20px!important;padding:16px 18px!important;margin-bottom:16px!important;box-shadow:0 1px 4px rgba(0,0,0,0.02)!important;">
            <div class="note-bundle-group-header" style="display:flex!important;align-items:center!important;justify-content:space-between!important;padding-bottom:12px!important;border-bottom:1px solid #f0eee9!important;margin-bottom:14px!important;flex-wrap:wrap!important;gap:8px!important;">
              <div style="display:flex!important;align-items:center!important;gap:8px!important;">
                <span class="note-bundle-badge" style="display:inline-flex!important;align-items:center!important;background:#fff8eb!important;color:#855900!important;border:1px solid #fce7b2!important;font-size:12px!important;font-weight:800!important;padding:4px 12px!important;border-radius:9999px!important;">${{badgeText}}</span>
                <h3 style="font-size:15px!important;font-weight:800!important;color:#1c1917!important;margin:0!important;">${{titleText}}</h3>
              </div>
              ${{savingsText}}
            </div>
            <div class="note-bundle-group-items">
              ${{b.rows.map(row => {{
                const catalogItem = CartManager._findCatalogProduct(row);
                const matchedCartItem = cart.find(ci => CartManager._itemMatches(ci, row.product_id || row.id));
                const itemData = {{
                  id: matchedCartItem ? matchedCartItem.id : (catalogItem ? catalogItem.id : (row.product_id || row.id)),
                  title: catalogItem ? catalogItem.title : (matchedCartItem ? matchedCartItem.title : row.name),
                  img: catalogItem ? catalogItem.img : (matchedCartItem ? matchedCartItem.img : (row.images?.[0]?.origin || '/products/fallback.webp')),
                  price: Number(row.price_before || catalogItem?.price || row.price || 0),
                  old_price: catalogItem?.old_price || matchedCartItem?.old_price || null,
                  quantity: row.quantity || 1
                }};
                const isDisc = Boolean(row.is_discounted || Number(row.price) <= 1);
                const overridePrice = isDisc ? Number(row.price) : null;
                const badge = isDisc ? (isTola ? 'تولة العرض بـ 1 ريال' : 'مشمول بالعرض بـ 1 ريال') : null;
                return renderItem(itemData, false, overridePrice, badge, row.quantity || 1, row);
              }}).join('')}}
            </div>
          </div>
        `;
      }}

      // Render Verified Standalone Items from Zid
      if (zidStandalone.length > 0) {{
        const hasAnyBundles = zidBundles.size > 0;
        const standaloneTitle = hasAnyBundles ? 'منتجات إضافية' : 'المنتجات في سلتك';
        const standaloneMap = new Map();
        for (const row of zidStandalone) {{
          const catalogItem = CartManager._findCatalogProduct(row);
          const matchedCartItem = cart.find(ci => CartManager._itemMatches(ci, row.product_id || row.id));
          const id = matchedCartItem ? matchedCartItem.id : (catalogItem ? catalogItem.id : (row.product_id || row.id));
          if (!standaloneMap.has(id)) {{
            standaloneMap.set(id, {{
              item: {{
                id: id,
                title: catalogItem ? catalogItem.title : (matchedCartItem ? matchedCartItem.title : row.name),
                img: catalogItem ? catalogItem.img : (matchedCartItem ? matchedCartItem.img : (row.images?.[0]?.origin || '/products/fallback.webp')),
                price: Number(row.price || catalogItem?.price || 0),
                old_price: catalogItem?.old_price || matchedCartItem?.old_price || null,
                quantity: Number(row.quantity || 1)
              }},
              quantity: 0,
              row
            }});
          }}
          standaloneMap.get(id).quantity += Number(row.quantity || 1);
        }}
        cardsHtml += `
          <div class="note-cart-standalone-section" style="margin-top:14px!important;">
            <h3 style="font-size:14px!important;font-weight:800!important;color:#44403c!important;margin-bottom:10px!important;">${{standaloneTitle}}</h3>
            ${{[...standaloneMap.values()].map(entry => renderItem(entry.item, true, null, null, entry.quantity, entry.row)).join('')}}
          </div>
        `;
      }}
    }} else {{
      const partition = CartManager.partitionCart(cart);

      // 1. Tier 1: Body Spray Bundles (3 sprays @ 249 SAR)
      if (partition.groups.tier1_spray_bundles.length > 0) {{
        partition.groups.tier1_spray_bundles.forEach((b, bIdx) => {{
          cardsHtml += `
            <div class="note-bundle-group-card" style="background:#ffffff!important;border:1px solid #e7e5e4!important;border-radius:20px!important;padding:16px 18px!important;margin-bottom:16px!important;box-shadow:0 1px 4px rgba(0,0,0,0.02)!important;">
              <div class="note-bundle-group-header" style="display:flex!important;align-items:center!important;justify-content:space-between!important;padding-bottom:12px!important;border-bottom:1px solid #f0eee9!important;margin-bottom:14px!important;flex-wrap:wrap!important;gap:8px!important;">
                <div style="display:flex!important;align-items:center!important;gap:8px!important;">
                  <span class="note-bundle-badge" style="display:inline-flex!important;align-items:center!important;background:#fff8eb!important;color:#855900!important;border:1px solid #fce7b2!important;font-size:12px!important;font-weight:800!important;padding:4px 12px!important;border-radius:9999px!important;">عرض باقة المعطرات</span>
                  <h3 style="font-size:15px!important;font-weight:800!important;color:#1c1917!important;margin:0!important;">باقة معطرات الجسم (3 معطرات بـ 249 ر.س)</h3>
                </div>
                <div style="display:flex!important;align-items:baseline!important;gap:8px!important;">
                  <span style="font-size:13px!important;color:#a8a29e!important;text-decoration:line-through!important;">${{formatPrice(b.originalPrice)}}</span>
                  <span style="font-size:16px!important;font-weight:900!important;color:#ef4444!important;">249 ر.س</span>
                </div>
              </div>
              <div class="note-bundle-group-items">
                ${{b.units.map(u => renderItem(u.item, false, null, 'مشمول بالباقة', 1)).join('')}}
              </div>
            </div>
          `;
        }});
      }}

      // 2. Tier 2: Trio Offers (2+1 at 1 SAR)
      if (partition.groups.tier2_trios.length > 0) {{
        partition.groups.tier2_trios.forEach((t, tIdx) => {{
          cardsHtml += `
            <div class="note-bundle-group-card" style="background:#ffffff!important;border:1px solid #e7e5e4!important;border-radius:20px!important;padding:16px 18px!important;margin-bottom:16px!important;box-shadow:0 1px 4px rgba(0,0,0,0.02)!important;">
              <div class="note-bundle-group-header" style="display:flex!important;align-items:center!important;justify-content:space-between!important;padding-bottom:12px!important;border-bottom:1px solid #f0eee9!important;margin-bottom:14px!important;flex-wrap:wrap!important;gap:8px!important;">
                <div style="display:flex!important;align-items:center!important;gap:8px!important;">
                  <span class="note-bundle-badge" style="display:inline-flex!important;align-items:center!important;background:#fff8eb!important;color:#855900!important;border:1px solid #fce7b2!important;font-size:12px!important;font-weight:800!important;padding:4px 12px!important;border-radius:9999px!important;">عطرك بـ 1 ريال (2+1)</span>
                  <h3 style="font-size:15px!important;font-weight:800!important;color:#1c1917!important;margin:0!important;">عرض الثالث بـ 1 ريال</h3>
                </div>
                <div style="display:flex!important;align-items:baseline!important;gap:8px!important;">
                  <span style="font-size:13px!important;font-weight:700!important;color:#047857!important;">وفّرت ${{formatPrice(t.discount)}}</span>
                </div>
              </div>
              <div class="note-bundle-group-items">
                ${{t.units.map(u => {{
                  const isDisc = (u === t.discountedUnit);
                  return renderItem(u.item, false, isDisc ? 1 : null, isDisc ? 'مشمول بالعرض بـ 1 ريال' : null, 1);
                }}).join('')}}
              </div>
            </div>
          `;
        }});
      }}

      // 3. Tier 3: Pair Offers (1+Tola at 1 SAR)
      if (partition.groups.tier3_pairs.length > 0) {{
        partition.groups.tier3_pairs.forEach((p, pIdx) => {{
          cardsHtml += `
            <div class="note-bundle-group-card" style="background:#ffffff!important;border:1px solid #e7e5e4!important;border-radius:20px!important;padding:16px 18px!important;margin-bottom:16px!important;box-shadow:0 1px 4px rgba(0,0,0,0.02)!important;">
              <div class="note-bundle-group-header" style="display:flex!important;align-items:center!important;justify-content:space-between!important;padding-bottom:12px!important;border-bottom:1px solid #f0eee9!important;margin-bottom:14px!important;flex-wrap:wrap!important;gap:8px!important;">
                <div style="display:flex!important;align-items:center!important;gap:8px!important;">
                  <span class="note-bundle-badge" style="display:inline-flex!important;align-items:center!important;background:#fff8eb!important;color:#855900!important;border:1px solid #fce7b2!important;font-size:12px!important;font-weight:800!important;padding:4px 12px!important;border-radius:9999px!important;">تولة بـ 1 ريال (1+تولة)</span>
                  <h3 style="font-size:15px!important;font-weight:800!important;color:#1c1917!important;margin:0!important;">عرض التولة بـ 1 ريال</h3>
                </div>
                <div style="display:flex!important;align-items:baseline!important;gap:8px!important;">
                  <span style="font-size:13px!important;font-weight:700!important;color:#047857!important;">وفّرت ${{formatPrice(p.discount)}}</span>
                </div>
              </div>
              <div class="note-bundle-group-items">
                ${{renderItem(p.baseUnit.item, false, null, null, 1)}}
                ${{renderItem(p.tolaUnit.item, false, 1, 'تولة العرض بـ 1 ريال', 1)}}
              </div>
            </div>
          `;
        }});
      }}

      // 4. Standalone / Remaining items
      if (partition.groups.tier4_standalone.length > 0) {{
        const hasAnyBundles = (partition.groups.tier1_spray_bundles.length > 0 || partition.groups.tier2_trios.length > 0 || partition.groups.tier3_pairs.length > 0);
        const standaloneTitle = hasAnyBundles ? 'منتجات إضافية' : 'المنتجات في سلتك';
        const standaloneRows = new Map();
        for (const unit of partition.groups.tier4_standalone) {{
          const key = unit.item.id;
          const previous = standaloneRows.get(key);
          standaloneRows.set(key, {{ ...unit, quantity: (previous?.quantity || 0) + (unit.quantity ?? 1) }});
        }}
        cardsHtml += `
          <div class="note-cart-standalone-section" style="margin-top:14px!important;">
            <h3 style="font-size:14px!important;font-weight:800!important;color:#44403c!important;margin-bottom:10px!important;">${{standaloneTitle}}</h3>
            ${{[...standaloneRows.values()].map(u => renderItem(u.item, true, null, u.badge || null, u.quantity)).join('')}}
          </div>
        `;
      }}
    }}

    const pricingFailed = nativePricing && window._noteFailedCartPricing === window.noteCartPricingKey?.(cart);
    const retry = pricingFailed ? '<div role="status" class="rounded-2xl border border-stone-200 p-4 mb-4">تعذّر تأكيد أسعار السلة. يمكنك تعديل المنتجات أو <button type="button" class="underline" onclick="window.noteConfirmCartPricing()">إعادة المحاولة</button>.</div>' : '';
    if (window.noteReplaceCartItems) window.noteReplaceCartItems(itemsContainer, retry + cardsHtml);
    else itemsContainer.innerHTML = retry + cardsHtml;

        updateCartFinancials(total);
    updateCheckoutUpsell(cart);
    renderCartPageRecommendations(cart);
    restoreSavedCartCoupon();
    bindCartCouponInputListener();
    if (!skipSync && typeof window.noteConfirmCartPricing === 'function') window.noteConfirmCartPricing();
    else if (!skipSync && CartManager.syncLiveCart) CartManager.syncLiveCart();
  }}

  function updateCheckoutUpsell(cart) {{
    const upsellCard = document.getElementById('checkout-upsell-card');
    if (!upsellCard) return;

    const inCartIds = new Set(cart.map(i => i.id));
    const upsellPool = [
      {{ id: 'for-her-30ml', title: 'عطر نوت فور هير (30 مل)', price: 89, old_price: 199, img: '/products/NOTE_For_Her_30ml_v02.webp' }},
      {{ id: 'for-him-30ml', title: 'عطر نوت فور هِم (30 مل)', price: 89, old_price: 199, img: '/products/NOTE_For_Him_30ml_v02.webp' }},
      {{ id: 'powderose-30ml', title: 'عطر باودر روز (30 مل)', price: 89, old_price: 199, img: '/products/NOTE_Powderose_30ml_v01.webp' }},
      {{ id: 'musk-toffee-oil', title: 'تولة مِسك توفي', price: 69, old_price: 140, img: '/products/NOTE_Musk_Toffee_v01.webp' }},
      {{ id: 'all-over-royal-tobacco', title: 'معطر الجسم رويال توباكو', price: 99, old_price: 180, img: '/products/NOTE_Royal_Tobacco_All_Over_v01.webp' }}
    ];

    const item = upsellPool.find(u => !inCartIds.has(u.id));
    if (!item || cart.length === 0) {{
      upsellCard.classList.add('hidden');
      return;
    }}

    upsellCard.classList.remove('hidden');
    const imgUrl = resolveImgUrl(item.img);
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
      const imgUrl = resolveImgUrl(p.img);
      const zidSlug = zidSlugMap[p.id] || p.id;
      return `
        <div class="p-3 rounded-2xl bg-stone-50 border border-stone-200/70 flex flex-col justify-between text-center group hover:border-black transition">
          <div>
            <div class="relative aspect-square mb-2 p-2 flex items-center justify-center bg-white rounded-xl border-0 shadow-none overflow-hidden cursor-pointer" onclick="NoteRouter.navigate('/products/${{zidSlug}}')">
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
    delete input.dataset.userCleared;

    const code = input.value.trim().toUpperCase();
    if (!code) {{
      msg.textContent = 'يرجى إدخال كود الخصم أولاً.';
      msg.className = 'text-[11px] font-bold text-rose-600 block';
      input.focus();
      return;
    }}

    const cartItems = (typeof CartManager !== 'undefined' && CartManager.getCart) ? CartManager.getCart() : [];
    if (!cartItems || cartItems.length === 0) {{
      msg.textContent = 'يرجى إضافة منتجات إلى السلة أولاً لتطبيق كود الخصم.';
      msg.className = 'text-[11px] font-bold text-rose-600 block';
      return;
    }}



    if (applyBtn) applyBtn.disabled = true;
    if (btnText) btnText.innerHTML = '<svg class="animate-spin h-3.5 w-3.5 text-black inline-block" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>';

    let applied = false;
    let alreadyApplied = false;
    let zidError = null;

    try {{

      if (!window.zid || !window.zid.cart) {{
        try {{
          const mod = await import('https://static.zid.store/sdk/v3.30.4/theme-service/vitrin-theme-service.es.js');
          window.zid = mod.default || mod;
        }} catch (_) {{}}
      }}

      if (typeof window.noteChangeCartCoupon === 'function') {{
        try {{
          await window.noteChangeCartCoupon(code);
          applied = true;
        }} catch (_) {{
          zidError = 'تعذّر تطبيق كود الخصم. تأكد من الكود وحاول مرة أخرى.';
        }}
      }} else if (window.zid && window.zid.cart && typeof window.zid.cart.applyCoupon === 'function') {{
        try {{
          if (typeof CartManager !== 'undefined' && CartManager._nativeQueue) {{
            try {{ await CartManager._nativeQueue; }} catch (_) {{}}
          }}
          // Clear any previous coupon from Zid session so the new coupon can be applied cleanly
          try {{ await window.zid.cart.removeCoupons(); }} catch (_) {{}}
          const res = await window.zid.cart.applyCoupon({{ coupon_code: code }});
          if (res && res.status === 'error') {{
            zidError = res.message?.description || (typeof res.message === 'string' ? res.message : '') || 'كود الخصم غير صحيح أو غير متاح لهذا الطلب.';
          }} else {{
            applied = true;
          }}
        }} catch (err) {{
          try {{
            let data = err?.responseData || err?.data || err?.response?.data || null;
            if (!data && err?.response && typeof err.response.clone === 'function') {{
              try {{ data = await err.response.clone().json(); }} catch (_) {{}}
            }}
            if (!data && err?.response && typeof err.response.json === 'function') {{
              try {{ data = await err.response.json(); }} catch (_) {{}}
            }}
            if (!data && typeof fetch === 'function') {{
              try {{
                const rawRes = await fetch('/api/v1/cart/coupons?coupon_code=' + encodeURIComponent(code), {{
                  method: 'POST',
                  headers: {{ 'Accept': 'application/json' }}
                }});
                data = await rawRes.json();
              }} catch (_) {{}}
            }}

            if (data) {{
              const codeName = data?.message?.code || data?.code || '';
              const desc = data?.message?.description || (typeof data?.message === 'string' ? data.message : '') || data?.detail || '';
              if (typeof desc === 'string' && (desc.includes('طُبّق') || desc.includes('مسبق') || desc.includes('مطبق'))) {{
                applied = true;
                alreadyApplied = true;
              }} else if (codeName === 'ERROR_CART_PRODUCTS_NOT_FOUND' || (typeof desc === 'string' && desc.includes('لم يُضف'))) {{
                applied = true;
              }} else if (typeof desc === 'string' && desc.trim()) {{
                zidError = desc.trim();
              }}
            }}
          }} catch (_) {{}}

          if (!applied && !zidError) {{
            zidError = 'كود الخصم غير صحيح أو غير متاح لهذا الطلب.';
          }}
        }}
      }} else {{
        zidError = 'تعذر الاتصال بخادم المتجر للتحقق من الكوبون.';
      }}

      if (zidError) {{
        if (!window.noteChangeCartCoupon) localStorage.removeItem('note_applied_coupon');
        if (typeof updateCartFinancials === 'function' && typeof CartManager !== 'undefined') updateCartFinancials(CartManager.getTotal());
        msg.textContent = zidError;
        msg.className = 'text-[11px] font-bold text-rose-600 block';
        if (!localStorage.getItem('note_applied_coupon')) {{
          if (tag) tag.classList.add('hidden');
          if (clearBtn) clearBtn.classList.add('hidden');
        }}
      }} else if (applied) {{
        if (!window.noteChangeCartCoupon) localStorage.setItem('note_applied_coupon', code);
        if (applyBtn) {{
          applyBtn.classList.add('note-btn-gold');
          setCouponButtonActive(applyBtn, true);
        }}
        msg.textContent = alreadyApplied
          ? `كود الخصم (${{code}}) مفعّل بالفعل لطلبك! 🎉`
          : `تم تفعيل كود الخصم (${{code}}) بنجاح! سيتم تطبيقه لطلبك عند الدفع.`;
        msg.className = 'text-[11px] font-bold text-emerald-600 block note-msg-anim';

        const container = document.getElementById('note-cart-coupon-section') || input.closest('.rounded-2xl');
        const totalEl = document.getElementById('page-grand-total');
        triggerCouponCelebration(container, tag, applyBtn, totalEl);
        if (tag) tag.classList.remove('hidden');
        if (clearBtn) clearBtn.classList.remove('hidden');
        if (typeof updateCartFinancials === 'function' && typeof CartManager !== 'undefined') updateCartFinancials(CartManager.getTotal());
      }}
    }} catch (e) {{
      msg.textContent = 'حدث خطأ أثناء تطبيق الكود. يرجى المحاولة مجدداً.';
      msg.className = 'text-[11px] font-bold text-rose-600 block';
      if (applyBtn) {{
        applyBtn.classList.remove('note-btn-gold');
        setCouponButtonActive(applyBtn, false);
      }}
    }} finally {{
      if (applyBtn) applyBtn.disabled = false;
      if (!applied) {{
        if (applyBtn) {{
          applyBtn.classList.remove('note-btn-gold');
          setCouponButtonActive(applyBtn, false);
        }}
      }}
    }}
  }}

  async function clearCartCoupon() {{
    const input = document.getElementById('coupon-code-input');
    const msg = document.getElementById('coupon-msg');
    const tag = document.getElementById('coupon-applied-tag');
    const clearBtn = document.getElementById('coupon-clear-btn');
    const applyBtn = document.getElementById('coupon-apply-btn');

    // Instant 0ms optimistic UI reset
    if (applyBtn) {{
      applyBtn.classList.remove('note-btn-gold');
      setCouponButtonActive(applyBtn, false);
    }}
    if (input) {{
      input.value = '';
      input.dataset.userCleared = 'true';
    }}
    if (tag) tag.classList.add('hidden');
    if (clearBtn) clearBtn.classList.add('hidden');
    if (msg) {{
      msg.textContent = 'تمت إزالة كود الخصم.';
      msg.className = 'text-[11px] font-bold text-stone-500 block';
      setTimeout(() => {{ if (msg && msg.textContent === 'تمت إزالة كود الخصم.') msg.classList.add('hidden'); }}, 2500);
    }}

    localStorage.removeItem('note_applied_coupon');
    if (window._noteVerifiedCart) {{
      window._noteVerifiedCart.couponCode = null;
    }}

    if (typeof window.noteChangeCartCoupon === 'function') {{
      try {{
        await window.noteChangeCartCoupon(null);
      }} catch (_) {{
        CartManager.showToast('تعذّر إزالة كود الخصم. حاول مرة أخرى.');
        return;
      }}
    }}
    if (typeof updateCartFinancials === 'function' && typeof CartManager !== 'undefined') updateCartFinancials(CartManager.getTotal());

    if (!window.noteChangeCartCoupon && window.zid && window.zid.cart && typeof window.zid.cart.removeCoupons === 'function') {{
      window.zid.cart.removeCoupons().catch(() => null);
    }}
  }}

  function restoreSavedCartCoupon() {{
    const quote = window._noteVerifiedCart;
    const saved = quote && quote.snapshot === window.noteCartPricingKey?.() ? quote.couponCode : null;
    const applyBtn = document.getElementById('coupon-apply-btn');
    const input = document.getElementById('coupon-code-input');
    const tag = document.getElementById('coupon-applied-tag');
    const clearBtn = document.getElementById('coupon-clear-btn');
    const msg = document.getElementById('coupon-msg');

    if (!saved) {{
      if (applyBtn) {{
        applyBtn.classList.remove('note-btn-gold');
        setCouponButtonActive(applyBtn, false);
      }}
      if (tag) tag.classList.add('hidden');
      if (clearBtn && (!input || !input.value.trim())) clearBtn.classList.add('hidden');
      return;
    }}

    if (applyBtn) {{
      applyBtn.classList.add('note-btn-gold');
      setCouponButtonActive(applyBtn, true);
    }}
    if (input && !input.value && !input.dataset.userCleared && (typeof document === 'undefined' || document.activeElement !== input)) input.value = saved;
    if (tag) tag.classList.remove('hidden');
    if (clearBtn) clearBtn.classList.remove('hidden');
    if (msg && msg.classList.contains('hidden')) {{
      msg.textContent = `كود الخصم (${{saved}}) مفعّل لطلبك.`;
      msg.className = 'text-[11px] font-bold text-emerald-600 block';
    }}
    if (typeof updateCartFinancials === 'function' && typeof CartManager !== 'undefined') updateCartFinancials(CartManager.getTotal());
  }}

  function bindCartCouponInputListener() {{
    const input = document.getElementById('coupon-code-input');
    const applyBtn = document.getElementById('coupon-apply-btn');
    const clearBtn = document.getElementById('coupon-clear-btn');
    const tag = document.getElementById('coupon-applied-tag');
    const msg = document.getElementById('coupon-msg');

    if (clearBtn) {{
      clearBtn.onclick = (e) => {{
        e.preventDefault();
        e.stopPropagation();
        clearCartCoupon();
      }};
    }}

    if (applyBtn) {{
      applyBtn.onclick = (e) => {{
        e.preventDefault();
        applyCartCoupon();
      }};
    }}

    if (!input) return;

    input.oninput = () => {{
      const currentVal = input.value.trim().toUpperCase();
      const verifiedCode = window._noteVerifiedCart?.couponCode?.toUpperCase() || null;
      const savedCode = ((typeof localStorage !== 'undefined') ? localStorage.getItem('note_applied_coupon') : null)?.toUpperCase() || null;
      const activeCode = verifiedCode || savedCode;

      if (currentVal) delete input.dataset.userCleared;
      else input.dataset.userCleared = 'true';

      if (clearBtn) {{
        if (input.value.length > 0) clearBtn.classList.remove('hidden');
        else clearBtn.classList.add('hidden');
      }}

      if (!currentVal || currentVal !== activeCode) {{
        if (applyBtn) {{
          applyBtn.classList.remove('note-btn-gold');
          setCouponButtonActive(applyBtn, false);
        }}
        if (tag) tag.classList.add('hidden');
        if (msg && msg.classList.contains('text-emerald-600')) msg.classList.add('hidden');

        if (!currentVal && activeCode) {{
          if (typeof localStorage !== 'undefined') localStorage.removeItem('note_applied_coupon');
          if (typeof window !== 'undefined' && window._noteVerifiedCart) {{
            window._noteVerifiedCart.couponCode = null;
          }}
          if (window.noteChangeCartCoupon) {{
            window.noteChangeCartCoupon(null).catch(() => null);
          }}
          if (window.zid?.cart?.removeCoupons) {{
            window.zid.cart.removeCoupons().catch(() => null);
          }}
          if (typeof updateCartFinancials === 'function' && typeof CartManager !== 'undefined') {{
            updateCartFinancials(CartManager.getTotal());
          }}
        }}
      }} else if (currentVal === activeCode) {{
        if (applyBtn) {{
          applyBtn.classList.add('note-btn-gold');
          setCouponButtonActive(applyBtn, true);
        }}
        if (tag) tag.classList.remove('hidden');
      }}
    }};
  }}

  function updateCartFinancials() {{
    const verified = window._noteVerifiedCart;
    const serverTotals = verified && verified.snapshot === window.noteCartPricingKey?.() ? verified.totals : null;
    const total = serverTotals?.find(line => line.code === 'total')?.value;
    const liveTotals = total != null && Number.isFinite(Number(total)) ? serverTotals : null;
    const subtotalValue = liveTotals?.find(line => line.code === 'sub_totals' || line.code === 'sub_totals_before_vat')?.value;
    const bundleDiscount = Math.abs(Number(liveTotals?.find(line => line.code === 'products_discount')?.value) || 0);

    const bundleRow = document.getElementById('bundle-discount-row');
    const bundleTitle = document.getElementById('page-bundle-discount-title');
    const bundleVal = document.getElementById('page-bundle-discount');
    if (bundleRow) {{
      if (bundleDiscount > 0) {{
        bundleRow.classList.remove('hidden');
        if (bundleTitle) bundleTitle.textContent = 'خصم المنتجات';
        if (bundleVal) {{
          bundleVal.dir = 'ltr';
          bundleVal.textContent = `−${{bundleDiscount.toLocaleString('en-US', {{minimumFractionDigits: 2, maximumFractionDigits: 2}})}} ر.س`;
        }}
      }} else {{
        bundleRow.classList.add('hidden');
      }}
    }}

    const subtotalEl = document.getElementById('page-subtotal');
    if (subtotalEl) subtotalEl.textContent = subtotalValue != null && Number.isFinite(Number(subtotalValue)) ? formatPrice(Number(subtotalValue)) : '—';

    const appliedCoupon = liveTotals ? verified.couponCode : null;
    const couponValue = liveTotals?.find(line => line.code === 'coupon' || line.code === 'coupons')?.value;
    const couponDiscount = Number.isFinite(Number(couponValue)) ? Math.abs(Number(couponValue)) : 0;

    const couponMsgEl = document.getElementById('coupon-msg');
    const couponTagEl = document.getElementById('coupon-applied-tag');
    const couponClearBtn = document.getElementById('coupon-clear-btn');
    const applyBtn = document.getElementById('coupon-apply-btn');
    const couponInput = document.getElementById('coupon-code-input');

    const isCouponActive = !!appliedCoupon;

    if (applyBtn) {{
      if (isCouponActive) applyBtn.classList.add('note-btn-gold');
      else applyBtn.classList.remove('note-btn-gold');
      setCouponButtonActive(applyBtn, isCouponActive);
    }}

    if (couponClearBtn) {{
      if (isCouponActive || (couponInput && couponInput.value.trim().length > 0)) {{
        couponClearBtn.classList.remove('hidden');
      }} else {{
        couponClearBtn.classList.add('hidden');
      }}
    }}

    if (isCouponActive) {{
      if (couponTagEl) couponTagEl.classList.remove('hidden');
      if (couponMsgEl) {{
        couponMsgEl.textContent = `كود الخصم (${{appliedCoupon}}) مفعّل لطلبك.`;
        couponMsgEl.className = 'text-[11px] font-bold text-emerald-600 block';
        couponMsgEl.classList.remove('hidden');
      }}
    }} else {{
      if (couponTagEl) couponTagEl.classList.add('hidden');
      if (couponMsgEl && couponMsgEl.classList.contains('text-emerald-600')) couponMsgEl.classList.add('hidden');
    }}

    const discountRow = document.getElementById('discount-row');
    const discountVal = document.getElementById('page-discount');
    const discountTitle = document.getElementById('page-discount-title');
    if (discountRow) {{
      if (couponDiscount > 0) {{
        discountRow.classList.remove('hidden');
        if (discountTitle) discountTitle.textContent = appliedCoupon ? `كود الخصم (${{appliedCoupon}}):` : 'خصم الكوبون';
        if (discountVal) {{
          discountVal.dir = 'ltr';
          discountVal.textContent = `−${{couponDiscount.toLocaleString('en-US', {{minimumFractionDigits: 2, maximumFractionDigits: 2}})}} ر.س`;
        }}
      }} else {{
        discountRow.classList.add('hidden');
      }}
    }}

    const shipping = document.getElementById('page-shipping');
    if (shipping) {{
      const shippingValue = liveTotals?.find(line => line.code === 'shipping')?.value;
      shipping.textContent = shippingValue != null && Number(shippingValue) > 0
        ? formatPrice(Number(shippingValue)) : '+١٩ ريال · يتحدد عند الدفع';
    }}

    const grandEl = document.getElementById('page-grand-total');
    if (grandEl) {{
      if (liveTotals) {{
        grandEl.setAttribute('data-note-total', Number(total).toFixed(2));
        grandEl.textContent = formatPrice(Number(total));
      }} else {{
        grandEl.removeAttribute('data-note-total');
        grandEl.textContent = window._noteFailedCartPricing === window.noteCartPricingKey?.() && window._noteFailedCartPricing
          ? 'تعذّر تأكيد السعر' : 'جاري تحديث السعر…';
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
      if (!window.zidStoreRegion) window.zidStoreRegion = {{ location_selection: false }};
      if (!window.zid || !window.zid.cart) {{
        try {{
          const mod = await import('https://static.zid.store/sdk/v3.30.4/theme-service/vitrin-theme-service.es.js');
          window.zid = mod.default || mod;
        }} catch (_) {{}}
      }}
      const api = window.zid?.cart;
      if (api) {{
        try {{
          const currentZidCart = await api.get();
          const existingProds = currentZidCart?.products || currentZidCart?.data?.cart?.products || [];
          for (const ep of existingProds) {{
            if (ep && ep.id) {{
              try {{ await api.removeProduct({{ product_id: ep.id }}); }} catch (_) {{}}
            }}
          }}
        }} catch (_) {{}}
        if (typeof api.empty === 'function') {{
          try {{ await api.empty(); }} catch (_) {{}}
        }}
      }}

      const isUuid = (s) => typeof s === 'string' && /^[0-9a-f]{{8}}-[0-9a-f]{{4}}-[0-9a-f]{{4}}-[0-9a-f]{{4}}-[0-9a-f]{{12}}$/i.test(s);
      const resolveZidUuid = (item) => {{
        if (!item) return null;
        const rawKey = item.id || item.product_id;
        const p = (typeof noteProductsCatalog !== 'undefined') ? noteProductsCatalog.find(cp => cp.id === rawKey || cp.id === item.product_id || cp.slug === rawKey || (typeof ZID_PRODUCT_MAP !== 'undefined' && ZID_PRODUCT_MAP[rawKey] === cp.id)) : null;
        if (p && isUuid(p.zid_id)) return p.zid_id;
        if (typeof ZID_PRODUCT_MAP !== 'undefined') {{
          if (ZID_PRODUCT_MAP[rawKey]) return ZID_PRODUCT_MAP[rawKey];
          if (p && ZID_PRODUCT_MAP[p.id]) return ZID_PRODUCT_MAP[p.id];
        }}
        if (isUuid(item.product_id)) return item.product_id;
        if (isUuid(item.id)) return item.id;
        if (p && isUuid(p.id)) return p.id;
        return (p && p.zid_id) || item.product_id || item.id;
      }};

      const payloads = (typeof CartManager !== 'undefined' && typeof CartManager.buildZidPayloads === 'function')
        ? CartManager.buildZidPayloads(cart)
        : cart.map(item => ({{
            product_id: resolveZidUuid(item),
            quantity: item.quantity || 1,
            ...(item.sub_items?.length ? {{ sub_items: item.sub_items.map(({{id, quantity, selection_group_id}}) => ({{id, quantity, selection_group_id}})) }} : {{}})
          }}));

      if (api && typeof api.addProduct === 'function') {{
        for (const payload of payloads) {{
          try {{
            await api.addProduct(payload);
          }} catch (e) {{
            console.warn('Sync notice:', payload.product_id, e);
          }}
        }}
      }}

      const appliedCoupon = localStorage.getItem('note_applied_coupon');
      if (appliedCoupon && api && typeof api.applyCoupon === 'function') {{
        try {{
          await api.applyCoupon({{ coupon_code: appliedCoupon }});
        }} catch (e) {{
          console.warn('NOTE coupon sync warning:', e);
        }}
      }}

      let checkoutUrl = '/checkout';
      try {{
        if (api && typeof api.get === 'function') {{
          const finalRes = await api.get();
          const fc = finalRes?.data?.cart || finalRes?.cart || finalRes;
          if (fc && fc.basket_url) {{
            checkoutUrl = fc.basket_url;
          }}
        }}
      }} catch (_) {{}}

      window.location.href = checkoutUrl;
      return;
    }} catch (err) {{
      console.error('Zid sync error:', err);
    }}

    window.location.href = 'https://note-sa.com/checkout';
  }}

  // 18. Contact Form Handler
  function handleContactSubmit(e) {{
    e.preventDefault();
    const form = e.target;
    const name = (form.querySelector('[name="name"]') || form.querySelector('input[type="text"]'))?.value?.trim() || '';
    const phone = (form.querySelector('[name="phone"]') || form.querySelector('input[type="tel"]'))?.value?.trim() || '';
    const email = (form.querySelector('[name="email"]') || form.querySelector('input[type="email"]'))?.value?.trim() || '';
    const type = (form.querySelector('[name="type"]') || form.querySelector('select'))?.value || 'استفسار عام';
    const message = (form.querySelector('[name="message"]') || form.querySelector('textarea'))?.value?.trim() || '';

    const textLines = [
      '✨ *رسالة جديدة من متجر NOTE لافيرن*',
      '👤 *الاسم:* ' + name,
      '📱 *الجوال:* ' + phone,
      '✉️ *البريد:* ' + email,
      '📌 *النوع:* ' + type,
      '📝 *نص الرسالة:*',
      message
    ];
    const fullText = textLines.join(String.fromCharCode(10));
    const waUrl = 'https://wa.me/966565955420?text=' + encodeURIComponent(fullText);

    try {{
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }} catch (_) {{}}

    const successEl = document.getElementById('contact-success-msg');
    if (successEl) {{
      successEl.innerHTML = `
        <div class="space-y-2">
          <p class="font-bold text-emerald-900">✓ تم استلام رسالتك وتوجيهها مباشرة إلى خدمة عملاء NOTE عبر واتساب.</p>
          <p class="text-[11px] text-emerald-700 font-normal">إذا لم تفتح نافذة الواتساب تلقائياً، يمكنك <a href="${{waUrl}}" target="_blank" rel="noopener noreferrer" class="underline font-bold text-black hover:text-emerald-950">الضغط هنا للتواصل الفوري عبر الواتساب (+966565955420)</a> أو مراسلتنا على الإيميل: <a href="mailto:marketing.noteperf@gmail.com?subject=${{encodeURIComponent(type + ' - ' + name)}}&body=${{encodeURIComponent(fullText)}}" class="underline font-bold text-black">marketing.noteperf@gmail.com</a></p>
        </div>
      `;
      successEl.classList.remove('hidden');
    }}
    form.reset();
    setTimeout(() => {{
      if (successEl) successEl.classList.add('hidden');
    }}, 15000);
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
      if (decoded.includes('package') || decoded.includes('مجموعات') || decoded.includes('باكجات') || decoded.includes('باكدجات')) return 'packages';
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
        init11Countdown();
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
    if (text.includes('باقات') || text.includes('مجموعات') || text.includes('باكجات') || text.includes('باكدجات') || href.includes('1752110') || href.includes('1759047') || href.includes('packages')) return 'packages';
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
    document.querySelectorAll('[section-id], footer:not(#note-store-footer), .tp-footer-area, .tp-bar-header, header.header-nav, .whatsapp-icon, .footer, .cart-view, .breadcrumb-subtitle, .section-cart-products, .cart-totals, .cart-products-with-totals, .cart-flex').forEach(el => {{
      el.remove();
    }});

    // Check if storefront shell already mounted
    let shell = document.getElementById('note-luxury-storefront');
    if (!shell) {{
      mainEl.innerHTML = '';
      shell = document.createElement('div');
      shell.id = 'note-luxury-storefront';
      shell.className = 'w-full bg-white text-black antialiased selection:bg-black selection:text-white min-h-screen flex flex-col justify-between notranslate';
      shell.setAttribute('translate', 'no');
      
      shell.innerHTML = `
        ${{T.header}}
        <div id="page-content" class="w-full flex-grow"></div>
        ${{T.footer}}
        ${{T.modals}}
        ${{T.drawer}}
      `;

      mainEl.appendChild(shell);
      if (typeof syncMobileMenu === 'function') syncMobileMenu();

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
    bindCartCouponInputListener();
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
  window.openOfferPopup = openOfferPopup;
  window.closeOfferPopup = closeOfferPopup;
  window.acceptOfferPopup = acceptOfferPopup;

  // Auto-trigger White Friday Offer Popup only if discount popup is not queued/active
  setTimeout(() => {{
    try {{
      if (!sessionStorage.getItem('note_white_friday_popup_dismissed')) {{
        if (!window.location.pathname.includes('/checkout') && !window.location.pathname.includes('/cart')) {{
          const welcomeDialog = document.getElementById('note-welcome');
          const welcomeDismissed = sessionStorage.getItem('note-welcome-surprise-v2');
          if (!welcomeDismissed || welcomeDialog) return;
          openOfferPopup();
        }}
      }}
    }} catch (_) {{
      openOfferPopup();
    }}
  }}, 2500);

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
  window.setCouponButtonActive = setCouponButtonActive;
  window.bindCartCouponInputListener = bindCartCouponInputListener;
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
  window.proceedToCheckout = window.proceedToCheckout || proceedToCheckout;
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

VERSION_FILE = Path(PREVIEW_DIR) / "version.json"
version_payload = {
    "version": "4.8.1",
    "build_time": int(time.time() * 1000),
    "date": time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()),
}
VERSION_FILE.write_text(json.dumps(version_payload, indent=2), encoding="utf-8")
print(f"Generated {VERSION_FILE} (version {version_payload['version']})")

