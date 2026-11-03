const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');

const baseDir = '/Users/yousefsoom/note-zid-styles';
const appJsPath = path.join(baseDir, 'note-app.js');
const appContent = fs.readFileSync(appJsPath, 'utf8');

console.log('=== SUITE 1: CATALOG & ASSETS AUDIT ===');

// Extract noteProductsCatalog from note-app.js
const catalogMatch = appContent.match(/const noteProductsCatalog = (\[[\s\S]*?\]);/);
assert(catalogMatch, 'noteProductsCatalog must exist in note-app.js');
const catalog = eval(catalogMatch[1]);

console.log(`Found ${catalog.length} products in catalog.`);
assert(catalog.length >= 40, `Expected at least 40 products, got ${catalog.length}`);

const seenIds = new Set();
const seenSlugs = new Set();
let missingImages = 0;

catalog.forEach((prod, idx) => {
  assert(prod.id, `Product at index ${idx} missing id`);
  assert(!seenIds.has(prod.id), `Duplicate product id found: ${prod.id}`);
  seenIds.add(prod.id);

  assert(prod.title, `Product ${prod.id} missing title`);
  assert(typeof prod.price === 'number' && prod.price > 0, `Product ${prod.id} price must be > 0, got ${prod.price}`);
  
  if (prod.old_price) {
    assert(typeof prod.old_price === 'number', `Product ${prod.id} old_price must be a number`);
    assert(prod.old_price >= prod.price, `Product ${prod.id} old_price (${prod.old_price}) should be >= price (${prod.price})`);
  }

  assert(prod.cat, `Product ${prod.id} missing category`);

  // Verify image path
  if (prod.img) {
    const cleanImg = prod.img.replace(/^\//, '');
    const localImgPath = path.join(baseDir, cleanImg);
    if (!fs.existsSync(localImgPath) && !prod.img.startsWith('http')) {
      console.warn(`WARNING: Product ${prod.id} image not found locally: ${localImgPath}`);
      missingImages++;
    }
  }
});

console.log(`Missing local images: ${missingImages}`);

// Verify ZID_PRODUCT_MAP coverage for all perfumes and tolas
const mapMatch = appContent.match(/const ZID_PRODUCT_MAP = ({[\s\S]*?});/);
assert(mapMatch, 'ZID_PRODUCT_MAP must exist');
const zidMap = eval('(' + mapMatch[1] + ')');

console.log(`ZID_PRODUCT_MAP has ${Object.keys(zidMap).length} entries.`);

// Check qualifying 100ml perfumes have valid mapping
const qualifyingPerfumes = catalog.filter(p => {
  const t = (p.title || '').toLowerCase();
  const c = (p.cat || '').toLowerCase();
  const s = (p.size || '').toLowerCase();
  if (t.includes('30 مل') || t.includes('30مل') || s.includes('30') || c.includes('travel')) return false;
  if (t.includes('تولة') || t.includes('توله') || t.includes('مسك توفي') || t.includes('عنبر مِسك') || c.includes('tollah')) return false;
  if (t.includes('معطر') || t.includes('لوشن') || t.includes('جل') || t.includes('شاور') || c.includes('linen') || c.includes('body')) return false;
  return (Number(p.price) >= 150);
});

console.log(`Found ${qualifyingPerfumes.length} qualifying 100ml perfumes.`);
qualifyingPerfumes.forEach(p => {
  const hasZidId = zidMap[p.id] || p.zid_id;
  if (!hasZidId) {
    console.warn(`NOTICE: Qualifying perfume ${p.id} (${p.title}) has no direct ZID_PRODUCT_MAP entry (will fallback to id).`);
  }
});

console.log('PASS: Suite 1 Catalog & Assets Audit completed successfully.');
