const assert = require('assert');
const fs = require('fs');

const appJs = fs.readFileSync('note-app.js', 'utf8');

// Set up mock window, localStorage, document
let mockStorage = {};
global.localStorage = {
  getItem: (k) => mockStorage[k] || null,
  setItem: (k, v) => { mockStorage[k] = String(v); },
  removeItem: (k) => { delete mockStorage[k]; },
  clear: () => { mockStorage = {}; }
};

global.window = {
  _noteLiveCartState: null,
  _noteVerifiedCart: null,
  addEventListener: () => {},
  renderCartPage: () => {},
  noteConfirmCartPricing: () => Promise.resolve()
};
global.document = {
  readyState: 'loading',
  documentElement: { dataset: {} },
  getElementById: () => null,
  querySelectorAll: () => [],
  querySelector: () => null,
  createElement: () => ({ rel: '', href: '', style: {}, setAttribute: () => {}, appendChild: () => {}, append: () => {} }),
  head: { appendChild: () => {}, append: () => {} },
  addEventListener: () => {},
  body: { classList: { add: () => {}, remove: () => {} } }
};
global.location = { pathname: '/cart', search: '' };

// Execute appJs in this scope
eval(appJs);

const CartManager = global.window.CartManager || global.CartManager;
assert(typeof CartManager !== 'undefined', 'CartManager must be defined');
assert(typeof CartManager._itemMatches === 'function', 'CartManager._itemMatches must be defined');

// 1. Test _itemMatches
console.log('Testing CartManager._itemMatches...');
const cartItem1 = {
  id: 'roayal-tobacco',
  product_id: '764d587d-7cba-46b3-8d34-265ee4bc4b6a',
  zid_id: '764d587d-7cba-46b3-8d34-265ee4bc4b6a',
  title: 'رويال توباكو'
};

// Match by exact id
assert(CartManager._itemMatches(cartItem1, 'roayal-tobacco'), 'Exact ID match failed');
// Match by dashed UUID
assert(CartManager._itemMatches(cartItem1, '764d587d-7cba-46b3-8d34-265ee4bc4b6a'), 'Dashed UUID match failed');
// Match by undashed UUID (CRITICAL BUG FIX)
assert(CartManager._itemMatches(cartItem1, '764d587d7cba46b38d34265ee4bc4b6a'), 'Undashed UUID match failed');

// 2. Test CartManager._findCatalogProduct
console.log('Testing CartManager._findCatalogProduct with undashed UUID...');
const testItem = { product_id: '764d587d7cba46b38d34265ee4bc4b6a' };
console.log('typeof noteProductsCatalog in global:', typeof global.noteProductsCatalog);
console.log('typeof window.noteProductsCatalog:', typeof global.window.noteProductsCatalog);
console.log('CartManager._findCatalogProduct string:', CartManager._findCatalogProduct.toString().slice(0, 400));
const catalogProduct = CartManager._findCatalogProduct(testItem);
console.log('catalogProduct:', catalogProduct);
assert(catalogProduct, 'Must find catalog product using undashed UUID');
assert.strictEqual(catalogProduct.id, 'roayal-tobacco', 'Found product id must match roayal-tobacco');

// 3. Test CartManager.removeItem with undashed UUID
console.log('Testing CartManager.removeItem with undashed UUID...');
CartManager.saveCart([
  { id: 'roayal-tobacco', product_id: '764d587d-7cba-46b3-8d34-265ee4bc4b6a', quantity: 1, title: 'رويال توباكو' },
  { id: 'fe2daa2f-28ca-4342-8c7e-2b8e8dbbc95a', product_id: 'fe2daa2f-28ca-4342-8c7e-2b8e8dbbc95a', quantity: 1, title: 'عسل' }
]);

assert.strictEqual(CartManager.getCart().length, 2, 'Cart should start with 2 items');

// Remove roayal-tobacco using its undashed UUID
CartManager.removeItem('764d587d7cba46b38d34265ee4bc4b6a');
assert.strictEqual(CartManager.getCart().length, 1, 'Cart should have 1 item after removeItem');
assert.strictEqual(CartManager.getCart()[0].title, 'عسل', 'Remaining item should be عسل');

// Remove عسل using its undashed UUID
CartManager.removeItem('fe2daa2f28ca43428c7e2b8e8dbbc95a');
assert.strictEqual(CartManager.getCart().length, 0, 'Cart should be empty after removing second item');

// 4. Test CartManager.updateQuantity with undashed UUID
console.log('Testing CartManager.updateQuantity with undashed UUID...');
CartManager.saveCart([
  { id: 'roayal-tobacco', product_id: '764d587d-7cba-46b3-8d34-265ee4bc4b6a', quantity: 2, title: 'رويال توباكو' }
]);

CartManager.updateQuantity('764d587d7cba46b38d34265ee4bc4b6a', -1);
assert.strictEqual(CartManager.getCart()[0].quantity, 1, 'Quantity should decrement to 1');

CartManager.updateQuantity('764d587d7cba46b38d34265ee4bc4b6a', -1);
assert.strictEqual(CartManager.getCart().length, 0, 'Quantity reaching 0 should remove item from cart');

console.log('ALL TESTS PASSED: Item resolution and deletion with undashed UUIDs is 100% verified!');
process.exit(0);
