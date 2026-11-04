const assert = require('assert');
const fs = require('fs');
const path = require('path');

const appJs = fs.readFileSync(path.join(__dirname, 'note-app.js'), 'utf8');

console.log('================================================================');
console.log('🚀 EXHAUSTIVE STRESS & RANDOM PERMUTATION TEST SUITE (/goal)');
console.log('================================================================');

// 1. Setup DOM & Global Mocks
const domElements = {};
function getMockElement(id) {
  if (!domElements[id]) {
    let _text = '', _html = '';
    domElements[id] = {
      id,
      classList: {
        classes: new Set(),
        add: function(c) { this.classes.add(c); },
        remove: function(c) { this.classes.delete(c); },
        contains: function(c) { return this.classes.has(c); }
      },
      get textContent() { return _text || _html; },
      set textContent(v) { _text = v; _html = v; },
      get innerHTML() { return _html || _text; },
      set innerHTML(v) { _html = v; _text = v; },
      style: {},
      disabled: false,
      value: '',
      querySelectorAll: function() { return []; },
      addEventListener: function() {},
      focus: function() {}
    };
  }
  return domElements[id];
}

const mockDocument = {
  getElementById: getMockElement,
  querySelectorAll: function(sel) {
    if (sel.includes('button') || sel.includes('checkout')) {
      return [getMockElement('checkout-btn-1')];
    }
    return [];
  },
  querySelector: function(sel) { return null; },
  addEventListener: function() {},
  documentElement: { dataset: {} }
};

const mockLocalStorage = {
  _data: {},
  getItem: function(k) { return this._data[k] || null; },
  setItem: function(k, v) { this._data[k] = String(v); },
  removeItem: function(k) { delete this._data[k]; },
  clear: function() { this._data = {}; }
};

global.document = mockDocument;
global.localStorage = mockLocalStorage;
global.window = {
  _noteLiveCartState: null,
  addEventListener: () => {},
  getNoteCouponPercent: (c) => (String(c || '').toUpperCase() === 'NOTE5' ? 2 : 5),
  location: { pathname: '/cart', search: '' }
};
global.formatPrice = (val) => `${val} ر.س`;
global.escapeHTML = (s) => String(s);

// Load Catalog & CartManager from built note-app.js
const catalogMatch = appJs.match(/const noteProductsCatalog = (\[[\s\S]*?\]);/);
assert(catalogMatch, 'Must find noteProductsCatalog in note-app.js');
const catalog = eval(catalogMatch[1]);
global.noteProductsCatalog = catalog;

const cmStart = appJs.indexOf('const CartManager = {');
const cmEnd = appJs.indexOf('\n  };', cmStart);
assert(cmStart !== -1 && cmEnd !== -1, 'Must find CartManager in note-app.js');
const CartManager = eval('({' + appJs.slice(cmStart + 'const CartManager = {'.length, cmEnd) + '})');
global.CartManager = CartManager;

const ucfStart = appJs.indexOf('function updateCartFinancials(subtotal) {');
const ucfEnd = appJs.indexOf('\n  }', ucfStart);
assert(ucfStart !== -1 && ucfEnd !== -1, 'Must find updateCartFinancials in note-app.js');
const updateCartFinancials = new Function('subtotal', appJs.slice(ucfStart + 'function updateCartFinancials(subtotal) {'.length, ucfEnd));
global.updateCartFinancials = updateCartFinancials;

// ----------------------------------------------------------------
// TEST SECTION 1: PRODUCT CLASSIFICATION
// ----------------------------------------------------------------
console.log('\n[TEST 1] Product Classification & Mutual Exclusivity Audit:');
const perfumes100 = catalog.filter(p => CartManager._isQualifying100mlPerfume(p));
const bodySprays = catalog.filter(p => CartManager._isQualifyingBodySpray(p));
const tolas = catalog.filter(p => CartManager._isQualifyingTola(p));
const excluded = catalog.filter(p => !CartManager._isQualifying100mlPerfume(p) && !CartManager._isQualifyingBodySpray(p) && !CartManager._isQualifyingTola(p));

console.log(`  ✓ 100ml / Niche Perfumes: ${perfumes100.length}`);
console.log(`  ✓ Body Sprays: ${bodySprays.length}`);
console.log(`  ✓ Tolas: ${tolas.length}`);
console.log(`  ✓ Excluded Non-Offer Products: ${excluded.length}`);

assert(perfumes100.length > 0, 'Must have qualifying perfumes');
assert(bodySprays.length > 0, 'Must have qualifying body sprays');
assert(tolas.length > 0, 'Must have qualifying tolas');

// Ensure zero overlap between classes
for (const p of catalog) {
  let hits = 0;
  if (CartManager._isQualifying100mlPerfume(p)) hits++;
  if (CartManager._isQualifyingBodySpray(p)) hits++;
  if (CartManager._isQualifyingTola(p)) hits++;
  assert(hits <= 1, `Product ${p.title} (${p.id}) matched multiple qualifying categories! Hits: ${hits}`);
}
console.log('  -> PASS: All products strictly and mutually classified.');

// ----------------------------------------------------------------
// TEST SECTION 2: THE 5 USER-REQUIRED TEST SCENARIOS
// ----------------------------------------------------------------
console.log('\n[TEST 2] Deterministic User Scenarios Verification:');

const perfumeTobacco = catalog.find(p => p.id === 'roayal-tobacco'); // Tobacco 229
const perfumeRosewood = catalog.find(p => p.id === 'oud-rosewood'); // Rosewood 189
const perfumePhantom = catalog.find(p => p.id === 'note-phantom'); // Phantom 189
const perfumeGold = catalog.find(p => p.id === 'note-gold'); // Gold 179
const perfumeNiche = catalog.find(p => p.id === 'note-musk'); // Niche Royal Musk 239 (EXCLUDED from offers)
const sprayAsal = catalog.find(p => p.id === 'all-over-asal'); // Asal Spray 99
const sprayChoco = catalog.find(p => p.id === 'all-over-choconilla'); // Choconilla 99
const sprayPowderose = catalog.find(p => p.id === 'all-over-powderose'); // Powderose 99
const sprayRoyal = catalog.find(p => p.id === 'all-over-royal-tobacco'); // Royal Powder Spray 99
const tolaMusk = catalog.find(p => p.id === 'lady-rose'); // Tola 119
const tolaToffee = catalog.find(p => p.id === 'musk-toffee-oil'); // Tola Toffee 96

const scenarios = [
  {
    name: 'Scenario 1: 3 Body Sprays = 249 SAR (Tier 1 Body Spray Bundle)',
    cart: [sprayAsal, sprayChoco, sprayPowderose],
    expectedSubtotal: 99 + 99 + 99, // 297
    expectedDiscount: 297 - 249, // 48
    expectedTotal: 249
  },
  {
    name: 'Scenario 2: 4 Body Sprays + 1 Tola',
    // 3 sprays go to Tier 1 bundle (249 SAR).
    // 1 leftover spray (99 SAR) pairs with 1 tola (119 SAR) in Tier 3 (99 + 1 = 100 SAR).
    // Total = 249 + 100 = 349 SAR.
    cart: [sprayAsal, sprayChoco, sprayPowderose, sprayRoyal, tolaMusk],
    expectedSubtotal: 99 + 99 + 99 + 99 + 119, // 515
    expectedDiscount: (297 - 249) + (119 - 1), // 48 + 118 = 166
    expectedTotal: 515 - 166 // 349
  },
  {
    name: 'Scenario 3: 3 Qualifying Perfumes of different prices + 1 Tola = 538 SAR',
    // 3 perfumes (229 + 189 + 179) form Tier 2 trio: customer pays 229 + 189 + 1 = 419 SAR (178 discount).
    // Leftover perfumes/sprays = 0. Tola cannot pair.
    // Tola goes to Tier 4 standalone @ 119 SAR. Total = 419 + 119 = 538 SAR.
    cart: [perfumeTobacco, perfumeRosewood, perfumeGold, tolaMusk],
    expectedSubtotal: 229 + 189 + 179 + 119, // 716
    expectedDiscount: 179 - 1, // 178
    expectedTotal: 538
  },
  {
    name: 'Scenario 4: 4 Perfumes + 2 Body Sprays + 1 Tola (2 Trios, Tola full price)',
    // 4 perfumes + 2 sprays = 6 items = 2 trios (Tier 2).
    // Customer pays 4 most expensive (229, 229, 189, 189) + 1 + 1 for the 2 cheapest (99, 99).
    // Leftover perfumes/sprays = 0. Tola cannot pair, stays full price (119 SAR).
    cart: [
      { ...perfumeTobacco, quantity: 2 }, // 2x 229
      { ...perfumeRosewood, quantity: 2 }, // 2x 189
      sprayAsal, // 99
      sprayChoco, // 99
      tolaMusk // 119
    ],
    expectedSubtotal: (229 * 2) + (189 * 2) + 99 + 99 + 119, // 1153
    expectedDiscount: (99 - 1) + (99 - 1), // 98 + 98 = 196
    expectedTotal: 1153 - 196 // 957
  },
  {
    name: 'Scenario 5A: 2x Trio + 2x Pair WITHOUT NOTE5',
    cart: [
      { ...perfumeTobacco, quantity: 2 }, // 2x 229
      { ...perfumePhantom, quantity: 2 }, // 2x 189
      { ...perfumeRosewood, quantity: 2 }, // 2x 189
      sprayAsal, // 1x 99
      sprayChoco, // 1x 99
      { ...tolaMusk, quantity: 2 } // 2x 119
    ],
    // 8 base items: 2 trios take 6 items. 2 cheapest items (99, 99) in trios discounted by 98 each (196).
    // 2 remaining items (189, 189) pair with 2 tolas. Both tolas discounted by 118 each (236).
    // Total discount = 196 + 236 = 432 SAR.
    expectedSubtotal: (229 * 2) + (189 * 4) + (99 * 2) + (119 * 2), // 1650
    expectedDiscount: 196 + 236, // 432
    expectedTotal: 1650 - 432 // 1218
  },
  {
    name: 'Scenario 5B: 2x Trio + 2x Pair WITH NOTE5 (2% off total after bundle discounts)',
    cart: [
      { ...perfumeTobacco, quantity: 2 },
      { ...perfumePhantom, quantity: 2 },
      { ...perfumeRosewood, quantity: 2 },
      sprayAsal,
      sprayChoco,
      { ...tolaMusk, quantity: 2 }
    ],
    coupon: 'NOTE5',
    expectedSubtotal: 1650,
    expectedDiscount: 432,
    expectedCouponDiscount: +(1218 * 0.02).toFixed(2), // 24.36
    expectedTotal: +(1218 * 0.98).toFixed(2) // 1193.64
  },
  {
    name: 'Scenario 6: 1 Niche Perfume + 2 Qualifying Perfumes -> Niche DOES NOT complete trio',
    // Niche (239) is excluded. Only 2 qualifying perfumes (229, 189) present -> No trio formed!
    // Total discount = 0. All 3 items full price.
    cart: [perfumeNiche, perfumeTobacco, perfumeRosewood],
    expectedSubtotal: 239 + 229 + 189, // 657
    expectedDiscount: 0,
    expectedTotal: 657
  }
];

for (const sc of scenarios) {
  mockLocalStorage.setItem('note_cart', JSON.stringify(sc.cart));
  if (sc.coupon) {
    mockLocalStorage.setItem('note_applied_coupon', sc.coupon);
  } else {
    mockLocalStorage.removeItem('note_applied_coupon');
  }
  const partition = CartManager.partitionCart();
  const subtotal = CartManager.getTotal();
  const discount = CartManager.getLiveBundleDiscount();
  const couponDiscount = sc.coupon ? +( (subtotal - discount) * 0.02 ).toFixed(2) : 0;
  const finalTotal = +( (subtotal - discount) - couponDiscount ).toFixed(2);

  assert.strictEqual(subtotal, sc.expectedSubtotal, `[${sc.name}] Subtotal mismatch! Expected ${sc.expectedSubtotal}, got ${subtotal}`);
  assert.strictEqual(discount, sc.expectedDiscount, `[${sc.name}] Discount mismatch! Expected ${sc.expectedDiscount}, got ${discount}`);
  assert.strictEqual(finalTotal, sc.expectedTotal, `[${sc.name}] Final total mismatch! Expected ${sc.expectedTotal}, got ${finalTotal}`);

  // Test Zid Payloads generation
  const payloads = CartManager.buildZidPayloads(sc.cart);
  assert(Array.isArray(payloads) && payloads.length > 0, `[${sc.name}] buildZidPayloads must return valid payloads`);

  // Test DOM Update
  updateCartFinancials(subtotal);
  const grandEl = mockDocument.getElementById('page-grand-total');
  assert(grandEl.innerHTML.includes(String(finalTotal)), `[${sc.name}] DOM grand total must display ${finalTotal}. Found: ${grandEl.innerHTML}`);

  console.log(`  ✓ ${sc.name} -> Subtotal: ${subtotal} | Discount: ${discount} | Total: ${finalTotal}`);
}

// ----------------------------------------------------------------
// TEST SECTION 3: NOTE5 COUPON COMBINATION WITH OFFERS
// ----------------------------------------------------------------
console.log('\n[TEST 3] NOTE5 Coupon Applied Alongside Bundle Offers:');

// Scenario 5B: Scenario 5 WITH NOTE5 (2% off total after bundles)
mockLocalStorage.setItem('note_applied_coupon', 'NOTE5');
mockLocalStorage.setItem('note_cart', JSON.stringify([
  { ...perfumePhantom, quantity: 2 },
  { ...perfumeTobacco, quantity: 2 },
  { ...perfumeRosewood, quantity: 2 },
  sprayAsal,
  sprayChoco,
  { ...tolaMusk, quantity: 2 }
]));
{
  const sub = CartManager.getTotal(); // 1650
  const disc = CartManager.getLiveBundleDiscount(); // 432
  const baseAfterBundle = sub - disc; // 1218
  // NOTE5 is 2% in Zid: 2% of 1218 = 24.36 SAR
  const expectedCouponDisc = Math.round((baseAfterBundle * 0.02) * 100) / 100; // 24.36
  const expectedFinalWithCoupon = Math.round((baseAfterBundle - expectedCouponDisc) * 100) / 100; // 1193.64

  updateCartFinancials(sub);
  const discountRow = mockDocument.getElementById('discount-row');
  const discountVal = mockDocument.getElementById('page-discount');
  const grandEl = mockDocument.getElementById('page-grand-total');
  const couponMsg = mockDocument.getElementById('coupon-msg');

  assert(!discountRow.classList.contains('hidden'), 'Coupon discount row MUST BE VISIBLE when coupon is active');
  assert(discountVal.textContent.includes('24.36'), `Coupon discount must be 24.36 SAR. Found: ${discountVal.textContent}`);
  assert(grandEl.innerHTML.includes('1,193.64') || grandEl.innerHTML.includes('1193.64'), `Grand total must be 1193.64 SAR. Found: ${grandEl.innerHTML}`);
  assert(couponMsg.textContent.includes('مفعّل لطلبك'), 'Coupon message must confirm activation');
  console.log(`  ✓ NOTE5 (2%) combined with bundles: Base ${baseAfterBundle} SAR - 24.36 = ${expectedFinalWithCoupon} SAR.`);
}

mockLocalStorage.removeItem('note_applied_coupon');
console.log('  -> PASS: NOTE5 coupon combination verified with 100% precision.');

// ----------------------------------------------------------------
// TEST SECTION 4: 500 RANDOM CART PERMUTATIONS STRESS TEST
// ----------------------------------------------------------------
console.log('\n[TEST 4] 500 Random Cart Permutations Stress Testing:');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItems(pool, count) {
  const shuffled = pool.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

let totalStressPasses = 0;

for (let iter = 1; iter <= 500; iter++) {
  const itemCount = getRandomInt(1, 6);
  const selectedProds = getRandomItems(catalog, itemCount);
  
  const testCart = selectedProds.map(p => ({
    id: p.id,
    product_id: p.id,
    zid_id: p.zid_id,
    title: p.title,
    price: Number(p.price) || 189,
    cat: p.cat,
    category_ids: p.category_ids,
    quantity: getRandomInt(1, 3)
  }));

  mockLocalStorage.setItem('note_cart', JSON.stringify(testCart));

  const actualSubtotal = CartManager.getTotal();
  const partition = CartManager.partitionCart(testCart);
  const actualDiscount = CartManager.getLiveBundleDiscount();
  const actualTotal = actualSubtotal - actualDiscount;

  assert(Number.isFinite(actualSubtotal) && actualSubtotal >= 0, `[Iter ${iter}] Invalid subtotal`);
  assert(Number.isFinite(actualDiscount) && actualDiscount >= 0, `[Iter ${iter}] Invalid discount`);
  assert(Number.isFinite(actualTotal) && actualTotal >= 0, `[Iter ${iter}] Invalid total`);
  assert(actualDiscount <= actualSubtotal, `[Iter ${iter}] Discount exceeds subtotal!`);

  // Verify payloads are always valid and non-empty
  const payloads = CartManager.buildZidPayloads(testCart);
  assert(Array.isArray(payloads) && payloads.length > 0, `[Iter ${iter}] Payloads must be non-empty`);

  // Financials & DOM update
  updateCartFinancials(actualSubtotal);
  const grandEl = mockDocument.getElementById('page-grand-total');
  const grandHtml = grandEl.innerHTML;

  assert(!grandHtml.includes('NaN'), `[Iter ${iter}] Grand total rendered NaN`);
  assert(!grandHtml.includes('undefined'), `[Iter ${iter}] Grand total rendered undefined`);
  assert(grandHtml.includes('ر.س'), `[Iter ${iter}] Grand total missing SAR currency symbol`);

  totalStressPasses++;
}

console.log(`  -> PASS: All ${totalStressPasses} / 500 randomized cart stress permutations succeeded flawlessly!`);

console.log('\n================================================================');
console.log('✅ ALL TEST SUITES PASSED (0 ERRORS, 100% DETERMINISTIC FIDELITY)');
console.log('================================================================');
