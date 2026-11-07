const assert = require('assert');
const fs = require('fs');

console.log('Testing Cache Management & Invalidation...');

// 1. Verify version.json
assert(fs.existsSync('version.json'), 'version.json must exist');
const versionInfo = JSON.parse(fs.readFileSync('version.json', 'utf8'));
assert.strictEqual(versionInfo.version, '4.7.2', 'version.json must be 4.7.2');
assert(typeof versionInfo.build_time === 'number', 'build_time must be number');
console.log('PASS: version.json is valid (v' + versionInfo.version + ')');

// 2. Test upgrade logic and cache purge
const appJs = fs.readFileSync('note-app.js', 'utf8');
assert(appJs.includes("const STOREFRONT_VERSION = '4.7.2'"), 'note-app.js must contain STOREFRONT_VERSION 4.7.2');
assert(appJs.includes("localStorage.removeItem('note_zid_catalog_v9')"), 'Must purge note_zid_catalog_v9 on version mismatch');
assert(appJs.includes("localStorage.setItem('note_storefront_version', STOREFRONT_VERSION)"), 'Must save new version to localStorage');

// Simulate client environment with old version '4.5.8' and cached data
let storage = {
  'note_storefront_version': '4.5.8',
  'note_zid_catalog_v9': JSON.stringify([{ id: 'old-product' }]),
  'note_zid_catalog_time_v9': '123456789',
  'note_zid_categories_v1': JSON.stringify([{ id: 'old-category' }]),
  'note_cart': JSON.stringify([{ id: 'roayal-tobacco', quantity: 2 }]) // Customer's real cart!
};

global.localStorage = {
  getItem: k => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: k => { delete storage[k]; }
};

global.document = {
  documentElement: {
    dataset: {},
    setAttribute: () => {},
    classList: { add: () => {} }
  },
  getElementById: () => null,
  querySelectorAll: () => [],
  querySelector: () => null,
  createElement: () => ({ rel: '', href: '', style: {}, setAttribute: () => {}, appendChild: () => {}, append: () => {} }),
  head: { appendChild: () => {}, append: () => {} },
  addEventListener: () => {},
  body: { classList: { add: () => {}, remove: () => {} }, setAttribute: () => {} },
  readyState: 'loading'
};
global.window = {
  addEventListener: () => {},
  noteConfirmCartPricing: () => Promise.resolve()
};
global.location = { pathname: '/cart', search: '' };

eval(appJs);

// Verify that old catalog and category caches were PURGED:
assert.strictEqual(storage['note_zid_catalog_v9'], undefined, 'note_zid_catalog_v9 must be deleted');
assert.strictEqual(storage['note_zid_catalog_time_v9'], undefined, 'note_zid_catalog_time_v9 must be deleted');
assert.strictEqual(storage['note_zid_categories_v1'], undefined, 'note_zid_categories_v1 must be deleted');

// Verify that the version was updated to 4.7.2:
assert.strictEqual(storage['note_storefront_version'], '4.7.2', 'note_storefront_version must be updated to 4.7.2');

// Verify that the customer cart was PRESERVED:
assert(storage['note_cart'], 'note_cart must NOT be deleted');
const cart = JSON.parse(storage['note_cart']);
assert.strictEqual(cart.length, 1, 'Cart items must be preserved');
assert.strictEqual(cart[0].id, 'roayal-tobacco', 'Cart item ID must be preserved');
assert.strictEqual(cart[0].quantity, 2, 'Cart quantity must be preserved');

console.log('PASS: Upgrading version automatically purges stale catalog/categories while preserving cart items.');
process.exit(0);
