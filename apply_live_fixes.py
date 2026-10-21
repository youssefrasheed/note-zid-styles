from pathlib import Path
import re

def apply_live_fixes(base):
    base=base.replace('4.1.0','4.2.0')
    # Native checkout, account and optional native product configuration retain Zid's UI.
    base=base.replace('  "use strict";','  "use strict";\n  if (/^\\/(checkout|auth|account)(\\/|$)/.test(location.pathname) || new URLSearchParams(location.search).get("native")==="1") return;')
    base=base.replace('  ZidSyncManager.loadCachedData();','  // Fresh catalog is loaded after the integration is initialized.')
    base=base.replace('fetchLiveCatalog(5000)','fetchLiveCatalog(15000)')
    base=base.replace("if (path.includes('/product') || params.has('id'))", "if (/\\/products?\\//.test(path) || params.has('id'))")
    base=base.replace("if (path.includes('/categor') || params.has('cat'))", "if (path === '/products' || path.includes('/categor') || params.has('cat'))")
    base=base.replace("const zidSlug = zidSlugMap[item.id] || item.id;", "const zidSlug = zidSlugMap[item.product_id || item.id] || item.product_id || item.id;")
    trash='<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/></svg><span>حذف</span>'
    base=re.sub(r'<i class="sicon-trash[^\"]*"></i>',trash,base)
    base=base.replace('title="حذف"','aria-label="حذف المنتج من السلة" title="حذف" style="display:inline-flex;align-items:center;gap:4px;min-width:44px;min-height:44px;font-size:11px"')
    for obj in ['p','item','currentProduct']:
        base=base.replace('${'+obj+'.title}', '${escapeHTML('+obj+'.title)}')
    # Keep raw zero prices valid and omit absent crossed-out prices.
    base=base.replace('${p.old_price}', '${p.old_price ?? ""}')
    base=base.replace("filtered = filtered.filter(p => p.bestseller || (p.tag && p.tag.includes('مبيعاً')) || (p.tag && p.tag.includes('طلباً')));", "filtered = filtered.filter(p => p.bestseller).sort((a,b) => b.sold_count-a.sold_count);")
    base=base.replace("filtered = filtered.filter(p => (p.tag && p.tag.includes('جديد')) || (p.tag && p.tag.includes('حصري')) || p.id.includes('niche'));", "filtered = filtered.filter(p => p.category_ids?.includes('1759041'));")
    base=base.replace("      const href = a.getAttribute('href');", "      const href = a.getAttribute('href');")
    base=base.replace("    if (!href) return;", "    if (!href) return;\n    if (/^\\/(checkout|auth|account)(\\/|\\?|$)/.test(href) || href.includes('native=1')) return;")
    fix=(Path(__file__).parent/'storefront-live.js').read_text()
    base=base.replace('  // Global Exports for Inlined HTML Handlers',fix+'\n  // Global Exports for Inlined HTML Handlers')
    return base
