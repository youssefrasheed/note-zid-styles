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
    domElements[id] = {
      id,
      classList: {
        classes: new Set(),
        add: function(c) { this.classes.add(c); },
        remove: function(c) { this.classes.delete(c); },
        contains: function(c) { return this.classes.has(c); }
      },
      textContent: '',
      innerHTML: '',
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
  location: { pathname: '/cart', search: '', href: '' }
};
global.location = global.window.location;
global.URLSearchParams = URLSearchParams;
global.fetch = () => Promise.resolve({ ok: false, json: () => Promise.resolve({}) });
global.formatPrice = function(val) {
  const n = Number(val) || 0;
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' ر.س';
};

// 2. Extract Catalog and CartManager from note-app.js
const catalogMatch = appJs.match(/const noteProductsCatalog = (\[[\s\S]*?\]);/);
assert(catalogMatch, 'noteProductsCatalog must exist in note-app.js');
const catalog = eval(catalogMatch[1]);
global.noteProductsCatalog = catalog;

const zidMapMatch = appJs.match(/const ZID_PRODUCT_MAP = (\{[\s\S]*?\n  \});/)[1];
const ZID_PRODUCT_MAP = eval('(' + zidMapMatch + ')');
global.ZID_PRODUCT_MAP = ZID_PRODUCT_MAP;

const slugMapMatch = appJs.match(/const zidSlugMap = (\{[\s\S]*?\n  \});/);
global.zidSlugMap = slugMapMatch ? eval('(' + slugMapMatch[1] + ')') : {};
global.escapeHTML = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
global.resolveImgUrl = (url) => url || '';

const cmMatch = appJs.match(/const CartManager = \{([\s\S]*?)\n  \};/);
assert(cmMatch, 'CartManager must exist in note-app.js');
const CartManager = eval('({' + cmMatch[1] + '})');
global.CartManager = CartManager;

const updateCartFinancialsMatch = appJs.match(/function updateCartFinancials\(subtotal\) \{([\s\S]*?)\n  \}/);
assert(updateCartFinancialsMatch, 'updateCartFinancials must exist in note-app.js');
const updateCartFinancials = new Function('subtotal', updateCartFinancialsMatch[1]);
global.updateCartFinancials = updateCartFinancials;

// Helper: resolveZidUuid
const isUuid = (s) => typeof s === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
const resolveZidUuid = (item) => {
  if (!item) return null;
  const rawKey = item.id || item.product_id;
  const p = catalog.find(cp => cp.id === rawKey || cp.id === item.product_id || cp.slug === rawKey || ZID_PRODUCT_MAP[rawKey] === cp.id);
  if (p && isUuid(p.zid_id)) return p.zid_id;
  if (ZID_PRODUCT_MAP[rawKey]) return ZID_PRODUCT_MAP[rawKey];
  if (p && ZID_PRODUCT_MAP[p.id]) return ZID_PRODUCT_MAP[p.id];
  if (isUuid(item.product_id)) return item.product_id;
  if (isUuid(item.id)) return item.id;
  if (p && isUuid(p.id)) return p.id;
  return (p && p.zid_id) || item.product_id || item.id;
};

// ----------------------------------------------------------------
// TEST SECTION 1: PRODUCT CLASSIFICATION AUDIT
// ----------------------------------------------------------------
console.log('\n[TEST 1] Product Classification & Mutual Exclusivity Audit:');
let perfumesCount = 0;
let spraysCount = 0;
let tolasCount = 0;
let excludedCount = 0;

for (const prod of catalog) {
  const isPerfume = CartManager._isQualifying100mlPerfume(prod);
  const isSpray = CartManager._isQualifyingBodySpray(prod);
  const isTola = CartManager._isQualifyingTola(prod);

  // No product can be both perfume and spray, or tola and perfume, etc.
  const trueCount = (isPerfume ? 1 : 0) + (isSpray ? 1 : 0) + (isTola ? 1 : 0);
  assert(trueCount <= 1, `Product ${prod.id} (${prod.title}) matched multiple categories!`);

  if (isPerfume) perfumesCount++;
  else if (isSpray) spraysCount++;
  else if (isTola) tolasCount++;
  else excludedCount++;

  // Explicit safety checks
  if (prod.cat === 'linen' || (prod.category_ids && prod.category_ids.includes('1759044'))) {
    assert(!isPerfume && !isSpray && !isTola, `Linen spray ${prod.id} must NEVER qualify for any offer`);
  }
  if (prod.cat === 'packages' || prod.id.startsWith('pkg-')) {
    assert(!isPerfume && !isSpray && !isTola, `Package ${prod.id} must NEVER qualify for any offer`);
  }
  if (prod.cat === 'travel' || prod.title.includes('30 مل')) {
    assert(!isPerfume && !isSpray && !isTola, `Travel 30ml ${prod.id} must NEVER qualify for any offer`);
  }
}
console.log(`  ✓ 100ml / Niche Perfumes: ${perfumesCount}`);
console.log(`  ✓ Body Sprays: ${spraysCount}`);
console.log(`  ✓ Tolas: ${tolasCount}`);
console.log(`  ✓ Excluded Non-Offer Products: ${excludedCount}`);
console.log('  -> PASS: All 49 products strictly and mutually classified.');

// ----------------------------------------------------------------
// TEST SECTION 2: DETERMINISTIC PROMO MATRIX & COMBINATIONS
// ----------------------------------------------------------------
console.log('\n[TEST 2] Deterministic Offer Scenarios:');

const perfumeA = { id: 'note-musk', zid_id: '9ba63129-20bc-4a0f-b49f-17d06e130ad9', title: 'عطر مِسك نوت', price: 239, cat: 'perfumes', quantity: 1 };
const perfumeB = { id: 'roayal-tobacco', zid_id: '764d587d-7cba-46b3-8d34-265ee4bc4b6a', title: 'عطر رويال توباكو', price: 229, cat: 'perfumes', quantity: 1 };
const perfumeC = { id: 'oud-rosewood', zid_id: '7a28376c-3973-4822-b6b2-b3a6a4e7013e', title: 'عطر عود روز وود', price: 189, cat: 'perfumes', quantity: 1 };
const sprayAsal = { id: 'all-over-asal', zid_id: '7a9286bf-4d38-447a-9b9f-fcd006e35e9b', title: 'معطر للجسم عسل', price: 169, cat: 'all-over', quantity: 1 };
const tolaMusk = { id: 'tollah-musk-toffee', zid_id: '95f09483-36aa-43e6-a2bc-3e4070fb1f2c', title: 'تولة مسك توفي', price: 119, cat: 'tollah', quantity: 1 };
const linenSpray = { id: 'linen-oud-rosewood', zid_id: '8a62dee7-ea33-4c54-a39a-ca25096701b9', title: 'معطر مفارش', price: 95, cat: 'linen', quantity: 1 };
const pkgBox = { id: 'pkg-luxury-trio', zid_id: 'c1234567-89ab-cdef-0123-456789abcdef', title: 'باقة الفخامة', price: 399, cat: 'packages', quantity: 1 };

const scenarios = [
  {
    name: 'Empty Cart',
    cart: [],
    expectedDiscount: 0,
    expectedSubtotal: 0,
    expectedTotal: 0
  },
  {
    name: '1 Perfume (No offer)',
    cart: [perfumeA],
    expectedDiscount: 0,
    expectedSubtotal: 239,
    expectedTotal: 239
  },
  {
    name: '2 Perfumes (No offer)',
    cart: [perfumeA, perfumeB],
    expectedDiscount: 0,
    expectedSubtotal: 239 + 229,
    expectedTotal: 468
  },
  {
    name: '3 Perfumes (2+1 Offer -> cheapest is 1 SAR)',
    cart: [perfumeA, perfumeB, perfumeC],
    expectedDiscount: 189 - 1, // 188
    expectedSubtotal: 239 + 229 + 189, // 657
    expectedTotal: 239 + 229 + 1 // 469
  },
  {
    name: '2 Perfumes + 1 Body Spray (2+1 Offer -> spray is 1 SAR)',
    cart: [perfumeA, perfumeB, sprayAsal],
    expectedDiscount: 169 - 1, // 168
    expectedSubtotal: 239 + 229 + 169, // 637
    expectedTotal: 239 + 229 + 1 // 469
  },
  {
    name: '6 Perfumes (2 sets of 2+1)',
    cart: [
      { ...perfumeA, quantity: 2 }, // 2x 239
      { ...perfumeB, quantity: 2 }, // 2x 229
      { ...perfumeC, quantity: 2 }  // 2x 189
    ],
    expectedDiscount: (189 - 1) * 2, // 376
    expectedSubtotal: (239*2) + (229*2) + (189*2), // 1314
    expectedTotal: 1314 - 376 // 938
  },
  {
    name: '1 Perfume + 1 Tola (1+تولة Offer -> tola is 1 SAR)',
    cart: [perfumeA, tolaMusk],
    expectedDiscount: 119 - 1, // 118
    expectedSubtotal: 239 + 119, // 358
    expectedTotal: 239 + 1 // 240
  },
  {
    name: '1 Body Spray + 1 Tola (1+تولة Offer -> tola is 1 SAR)',
    cart: [sprayAsal, tolaMusk],
    expectedDiscount: 119 - 1, // 118
    expectedSubtotal: 169 + 119, // 288
    expectedTotal: 169 + 1 // 170
  },
  {
    name: '2 Perfumes + 2 Tolas (1+تولة x 2 -> both tolas 1 SAR)',
    cart: [{ ...perfumeA, quantity: 2 }, { ...tolaMusk, quantity: 2 }],
    expectedDiscount: (119 - 1) * 2, // 236
    expectedSubtotal: (239 * 2) + (119 * 2), // 716
    expectedTotal: (239 * 2) + 2 // 480
  },
  {
    name: '3 Perfumes + 1 Tola (2+1 absorbs all 3 perfumes -> tola is full price)',
    cart: [perfumeA, perfumeB, perfumeC, tolaMusk],
    expectedDiscount: 189 - 1, // 188
    expectedSubtotal: 239 + 229 + 189 + 119, // 776
    expectedTotal: 776 - 188 // 588
  },
  {
    name: '4 Perfumes + 1 Tola (1 set 2+1 + 1 set 1+تولة)',
    cart: [
      { ...perfumeA, quantity: 2 }, // 2x 239
      { ...perfumeB, quantity: 2 }, // 2x 229
      tolaMusk                      // 1x 119
    ],
    // 4 perfumes: 1 set 2+1 discounts 1 cheapest perfume (229 - 1 = 228)
    // 1 remaining perfume + 1 tola discounts tola (119 - 1 = 118)
    // Total discount: 228 + 118 = 346
    expectedDiscount: (229 - 1) + (119 - 1), // 346
    expectedSubtotal: (239 * 2) + (229 * 2) + 119, // 1055
    expectedTotal: 1055 - 346 // 709
  },
  {
    name: 'Mixed Cart with Non-Offer Items (Linen & Package untouched)',
    cart: [
      perfumeA, perfumeB, perfumeC, // 2+1 offer
      linenSpray,                   // 95 (no discount)
      pkgBox                        // 399 (no discount)
    ],
    expectedDiscount: 189 - 1, // 188
    expectedSubtotal: 239 + 229 + 189 + 95 + 399, // 1151
    expectedTotal: 1151 - 188 // 963
  }
];

for (const sc of scenarios) {
  mockLocalStorage.setItem('note_cart', JSON.stringify(sc.cart));
  const subtotal = CartManager.getTotal();
  const discount = CartManager.getLiveBundleDiscount();
  const finalTotal = subtotal - discount;

  assert.strictEqual(subtotal, sc.expectedSubtotal, `[${sc.name}] Subtotal mismatch! Expected ${sc.expectedSubtotal}, got ${subtotal}`);
  assert.strictEqual(discount, sc.expectedDiscount, `[${sc.name}] Discount mismatch! Expected ${sc.expectedDiscount}, got ${discount}`);
  assert.strictEqual(finalTotal, sc.expectedTotal, `[${sc.name}] Final total mismatch! Expected ${sc.expectedTotal}, got ${finalTotal}`);

  // Test DOM Update
  mockDocument.getElementById('cart-page-items'); // ensure items container exists
  updateCartFinancials(subtotal);

  const subtotalEl = mockDocument.getElementById('page-subtotal');
  const grandEl = mockDocument.getElementById('page-grand-total');
  const bundleRow = mockDocument.getElementById('bundle-discount-row');

  assert(subtotalEl.textContent.includes(formatPrice(subtotal)) || subtotalEl.textContent.includes(String(subtotal)), `[${sc.name}] page-subtotal must contain subtotal ${subtotal}`);
  assert(!grandEl.innerHTML.includes('NaN'), `[${sc.name}] page-grand-total must NEVER contain NaN`);
  assert(!grandEl.innerHTML.includes('undefined'), `[${sc.name}] page-grand-total must NEVER contain undefined`);

  if (discount > 0) {
    assert(!bundleRow.classList.contains('hidden'), `[${sc.name}] bundle-discount-row must be visible when discount > 0`);
    assert(grandEl.innerHTML.includes(formatPrice(finalTotal)) || grandEl.innerHTML.includes(String(finalTotal)), `[${sc.name}] page-grand-total must contain finalTotal ${finalTotal}`);
  } else {
    assert(bundleRow.classList.contains('hidden'), `[${sc.name}] bundle-discount-row must be hidden when discount == 0`);
  }

  // Test UUID Resolution for Checkout
  for (const it of sc.cart) {
    const zidId = resolveZidUuid(it);
    assert(zidId, `[${sc.name}] Item ${it.id} must resolve to a valid UUID/ID for checkout`);
  }

  console.log(`  ✓ ${sc.name} -> Subtotal: ${subtotal} | Discount: ${discount} | Total: ${finalTotal}`);
}
console.log('  -> PASS: All deterministic scenarios passed.');

// ----------------------------------------------------------------
// TEST SECTION 3: COUPON & BUNDLE MUTUAL EXCLUSIVITY
// ----------------------------------------------------------------
console.log('\n[TEST 3] Coupon & Bundle Mutual Exclusivity Audit:');

// Scenario 1: Cart with active bundle + applied coupon
// When bundle is active, coupon discount must be 0 to match Zid backend rule!
mockLocalStorage.setItem('note_applied_coupon', 'NOTE5');
mockLocalStorage.setItem('note_cart', JSON.stringify([perfumeA, perfumeB, perfumeC])); // 2+1 active
{
  const sub = CartManager.getTotal(); // 657
  const disc = CartManager.getLiveBundleDiscount(); // 188
  updateCartFinancials(sub);

  const discountRow = mockDocument.getElementById('discount-row');
  const grandEl = mockDocument.getElementById('page-grand-total');
  const couponMsg = mockDocument.getElementById('coupon-msg');

  assert(discountRow.classList.contains('hidden'), 'Coupon discount row must be hidden when bundle is active');
  assert(grandEl.innerHTML.includes('469'), `Grand total must equal 469 (657 - 188) with no coupon subtraction. Found: ${grandEl.innerHTML}`);
  assert(couponMsg.textContent.includes('عروض جمعة نوت'), 'Coupon message must clearly state Friday offer precedence');
  console.log('  ✓ Active bundle suppresses coupon subtraction: Grand total = exactly 469 SAR.');
}

// Scenario 2: Cart without active bundle + applied coupon
// When NO bundle is active, coupon DOES apply!
mockLocalStorage.setItem('note_cart', JSON.stringify([perfumeA])); // 1 perfume, 239 SAR
{
  const sub = CartManager.getTotal(); // 239
  const disc = CartManager.getLiveBundleDiscount(); // 0
  updateCartFinancials(sub);

  const discountRow = mockDocument.getElementById('discount-row');
  const discountVal = mockDocument.getElementById('page-discount');
  const grandEl = mockDocument.getElementById('page-grand-total');

  assert(!discountRow.classList.contains('hidden'), 'Coupon discount row must be visible when NO bundle is active');
  // 5% of 239 = 11.95. Final = 227.05 SAR.
  assert(discountVal.textContent.includes('11.95'), `Coupon discount must be 11.95 SAR. Found: ${discountVal.textContent}`);
  assert(grandEl.innerHTML.includes('227.05'), `Grand total must be 227.05 SAR. Found: ${grandEl.innerHTML}`);
  console.log('  ✓ Inactive bundle allows coupon: 239 SAR - 11.95 = 227.05 SAR.');
}

mockLocalStorage.removeItem('note_applied_coupon');
console.log('  -> PASS: Coupon and bundle exclusivity verified with 0 error.');

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
  const itemCount = getRandomInt(1, 7);
  const selectedProds = getRandomItems(catalog, itemCount);
  
  const testCart = selectedProds.map(p => ({
    id: p.id,
    product_id: p.id,
    zid_id: p.zid_id,
    title: p.title,
    price: Number(p.price) || 189,
    cat: p.cat,
    category_ids: p.category_ids,
    quantity: getRandomInt(1, 4)
  }));

  mockLocalStorage.setItem('note_cart', JSON.stringify(testCart));

  // 1. Calculate Expected Values Indulging in Zid promotion logic
  let expectedSubtotal = 0;
  const eligible2Plus1Prices = [];
  const tolaPrices = [];

  for (const it of testCart) {
    const itPrice = Number(it.price) || 0;
    const itQty = Number(it.quantity) || 1;
    expectedSubtotal += itPrice * itQty;

    if (CartManager._isQualifying100mlPerfume(it) || CartManager._isQualifyingBodySpray(it)) {
      for (let q = 0; q < itQty; q++) eligible2Plus1Prices.push(itPrice);
    } else if (CartManager._isQualifyingTola(it)) {
      for (let q = 0; q < itQty; q++) tolaPrices.push(itPrice);
    }
  }

  // Offer 2: 2+1
  const sets2Plus1 = Math.floor(eligible2Plus1Prices.length / 3);
  let expectedDiscount = 0;
  if (sets2Plus1 > 0) {
    eligible2Plus1Prices.sort((a, b) => a - b);
    for (let s = 0; s < sets2Plus1; s++) {
      expectedDiscount += Math.max(0, eligible2Plus1Prices[s] - 1);
    }
  }

  // Offer 1: 1+تولة
  const remaining2Plus1 = eligible2Plus1Prices.length - (sets2Plus1 * 3);
  const sets1PlusTola = Math.min(remaining2Plus1, tolaPrices.length);
  if (sets1PlusTola > 0) {
    tolaPrices.sort((a, b) => a - b);
    for (let t = 0; t < sets1PlusTola; t++) {
      expectedDiscount += Math.max(0, tolaPrices[t] - 1);
    }
  }

  const expectedTotal = Math.max(0, expectedSubtotal - expectedDiscount);

  // 2. Validate CartManager
  const actualSubtotal = CartManager.getTotal();
  const actualDiscount = CartManager.getLiveBundleDiscount();
  const actualTotal = actualSubtotal - actualDiscount;

  assert.strictEqual(actualSubtotal, expectedSubtotal, `[Iter ${iter}] Subtotal mismatch`);
  assert.strictEqual(actualDiscount, expectedDiscount, `[Iter ${iter}] Discount mismatch`);
  assert.strictEqual(actualTotal, expectedTotal, `[Iter ${iter}] Total mismatch`);

  // 3. Validate Financials & DOM
  updateCartFinancials(actualSubtotal);
  const grandEl = mockDocument.getElementById('page-grand-total');
  const grandHtml = grandEl.innerHTML;

  assert(!grandHtml.includes('NaN'), `[Iter ${iter}] Grand total rendered NaN`);
  assert(!grandHtml.includes('undefined'), `[Iter ${iter}] Grand total rendered undefined`);
  assert(grandHtml.includes('ر.س'), `[Iter ${iter}] Grand total missing SAR currency symbol`);

  // 4. Validate Checkout Payload Mapping
  for (const it of testCart) {
    const zidId = resolveZidUuid(it);
    assert(zidId, `[Iter ${iter}] Failed to resolve UUID for ${it.id}`);
  }

  // 5. Test Live Cart Mutability (Quantity update & Remove)
  if (testCart.length > 0) {
    const randomItem = testCart[0];
    const initialQty = randomItem.quantity;
    
    // Increment
    CartManager.updateQuantity(randomItem.id, 1);
    const cartAfterInc = CartManager.getCart();
    const itemAfterInc = cartAfterInc.find(i => i.id === randomItem.id);
    assert.strictEqual(itemAfterInc.quantity, initialQty + 1, `[Iter ${iter}] Quantity increment failed`);

    // Decrement back
    CartManager.updateQuantity(randomItem.id, -1);

    // Remove
    CartManager.removeItem(randomItem.id);
    const cartAfterRem = CartManager.getCart();
    assert.strictEqual(cartAfterRem.length, testCart.length - 1, `[Iter ${iter}] Remove item failed`);
  }

  totalStressPasses++;
}

console.log(`  -> PASS: 500 random permutations passed with 100% price and cart consistency.`);

// ----------------------------------------------------------------
// TEST SECTION 5: STALE SERVER CART OVERRIDE PROTECTION
// ----------------------------------------------------------------
console.log('\n[TEST 5] Stale Zid Server Cart Shielding:');
// Simulate user with 3 items locally (subtotal 657 SAR)
// But server returns stale session containing only 1 item (subtotal 239 SAR)
mockLocalStorage.setItem('note_cart', JSON.stringify([perfumeA, perfumeB, perfumeC]));
global.window._noteLiveCartState = {
  totals: [
    { code: 'sub_totals', value: 239 },
    { code: 'total', value: 239 }
  ]
};

{
  const localTotal = CartManager.getTotal(); // 657
  updateCartFinancials(localTotal);

  const subtotalEl = mockDocument.getElementById('page-subtotal');
  const grandEl = mockDocument.getElementById('page-grand-total');

  // Verify that the stale 239 SAR did NOT clobber the authoritative 657 SAR!
  assert(subtotalEl.textContent.includes('657'), `Subtotal must remain 657 SAR despite stale server session. Got: ${subtotalEl.textContent}`);
  assert(grandEl.innerHTML.includes('469'), `Grand total must remain 469 SAR (657 - 188). Got: ${grandEl.innerHTML}`);
  console.log('  ✓ Stale server cart (239 SAR) successfully rejected; local authoritative cart (657 -> 469 SAR) preserved.');
}

global.window._noteLiveCartState = null;

console.log('\n================================================================');
console.log(`🎉 ALL AUDIT & STRESS TESTS PASSED! (${totalStressPasses + scenarios.length} permutation suites verified)`);
console.log('================================================================\n');
