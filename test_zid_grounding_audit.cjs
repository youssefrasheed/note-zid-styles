const assert = require('assert');
const fs = require('fs');

const appJs = fs.readFileSync(require('node:path').join(__dirname, 'note-app.js'), 'utf8');

console.log('=== ZID GROUNDING & TITLE AUDIT ===');

// Setup mock window environment
const dom = {
  elements: {},
  getElementById: function(id) {
    if (!this.elements[id]) {
      this.elements[id] = {
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
        querySelectorAll: function() { return []; }
      };
    }
    return this.elements[id];
  }
};

global.formatPrice = value => String(value);
global.window = {
  _noteLiveCartState: null,
  addEventListener: () => {},
  location: { pathname: '/cart', search: '' }
};
global.document = dom;
global.localStorage = {
  _data: {},
  getItem: function(k) { return this._data[k] || null; },
  setItem: function(k, v) { this._data[k] = String(v); },
  removeItem: function(k) { delete this._data[k]; }
};

// 1. Verify qualifying classifier rejects "رويال بودر" and all-over sprays
const catalogMatch = appJs.match(/const noteProductsCatalog = (\[[\s\S]*?\]);/);
assert(catalogMatch, 'Must find noteProductsCatalog');
const catalog = eval(catalogMatch[1]);
global.noteProductsCatalog = catalog;

// Extract CartManager from note-app.js
const cmMatch = appJs.match(/const CartManager = \{([\s\S]*?)\n  \};/);
assert(cmMatch, 'Must find CartManager');
const CartManager = eval('({' + cmMatch[1] + '})');
global.CartManager = CartManager;

const royalPowderAllOver = { id: '940195dc-fc3b-4180-b062-c1cd85809564', zid_id: '940195dc-fc3b-4180-b062-c1cd85809564', title: 'رويال بودر', cat: 'all-over', category_ids: ['1759042'], price: 159 };
const muskPerfume = { id: '9ba63129-20bc-4a0f-b49f-17d06e130ad9', zid_id: '9ba63129-20bc-4a0f-b49f-17d06e130ad9', title: 'مسك', cat: 'perfumes', category_ids: ['1748533'], price: 239 };
const tobaccoPerfume = { id: '764d587d-7cba-46b3-8d34-265ee4bc4b6a', zid_id: '764d587d-7cba-46b3-8d34-265ee4bc4b6a', title: 'رويال توباكو', cat: 'perfumes', category_ids: ['1748533'], price: 229 };
const rosewoodPerfume = { id: '7a28376c-3973-4822-b6b2-b3a6a4e7013e', zid_id: '7a28376c-3973-4822-b6b2-b3a6a4e7013e', title: 'عود روز وود', cat: 'perfumes', category_ids: ['1748533'], price: 189 };

assert.strictEqual(CartManager._isQualifying100mlPerfume(royalPowderAllOver), false, 'رويال بودر All-Over MUST NOT qualify as 100ml perfume');
assert.strictEqual(CartManager._isQualifying100mlPerfume(muskPerfume), true, 'Musk must qualify as perfume');
assert.strictEqual(CartManager._isQualifying100mlPerfume(tobaccoPerfume), true, 'Tobacco must qualify as perfume');
assert.strictEqual(CartManager._isQualifying100mlPerfume(rosewoodPerfume), true, 'Rosewood must qualify as perfume');
console.log('PASS: Perfume qualifier accurately excludes All-Over Sprays.');

// 2. Scenario A: Musk + Tobacco + Royal Powder All-Over Body Spray (Qualifies for 2+1 offer, 158 SAR discount!)
global.localStorage.setItem('note_cart', JSON.stringify([muskPerfume, tobaccoPerfume, royalPowderAllOver]));
assert.strictEqual(CartManager.getLiveBundleOffers().length, 1, 'Bundle offer 2+1 MUST trigger for 2 perfumes + 1 body spray');
assert.strictEqual(CartManager.getLiveBundleOffers()[0].name, 'عطرك بـ 1 ريال (2+1)');
assert.strictEqual(CartManager.getLiveBundleDiscount(), 158, 'Bundle discount must be 158 SAR (159 - 1)');
console.log('PASS: Body spray properly qualifies in 2+1 offer for 158 SAR discount.');

// Scenario A2: Non-qualifying items (e.g. Linen Spray) must NOT trigger bundle discounts
const linenSpray = { id: 'linen-oud-rosewood', zid_id: '8a62dee7-ea33-4c54-a39a-ca25096701b9', title: 'معطر مفارش عود روز وود', cat: 'linen', category_ids: ['1759044'], price: 95 };
global.localStorage.setItem('note_cart', JSON.stringify([muskPerfume, tobaccoPerfume, linenSpray]));
assert.strictEqual(CartManager.getLiveBundleOffers().length, 0, 'No bundle offers must trigger for 2 perfumes + 1 linen spray');
assert.strictEqual(CartManager.getLiveBundleDiscount(), 0, 'Bundle discount must be 0 SAR for non-qualifying linen');
console.log('PASS: Non-qualifying linen spray correctly yields 0 bundle discount.');

// 3. Scenario B: Title cleanup ("الثالث بريال 189" -> "عطرك بـ 1 ريال")
// Test updateCartFinancials logic
const ucfMatch = appJs.match(/function updateCartFinancials\(subtotal\)\s*\{([\s\S]*?)\n  \}/);
assert(ucfMatch, 'Must find updateCartFinancials');
const updateCartFinancials = new Function('subtotal', ucfMatch[1]);

// Mock Zid state with internal tier name
global.window._noteLiveCartState = {
  totals: [
    { code: 'sub_totals', value: 816 },
    { code: 'products_discount', value: -188 },
    { code: 'total', value: 628 }
  ],
  bundle_offers: [
    { name: 'الثالث بريال 189', usage_count: 1, discount_total: 188 }
  ]
};

global.localStorage.setItem('note_cart', JSON.stringify(
  [muskPerfume, tobaccoPerfume, rosewoodPerfume, royalPowderAllOver].map(item => ({ ...item, quantity: 1 }))
));
updateCartFinancials(816);
const titleEl = dom.getElementById('page-bundle-discount-title');
const valEl = dom.getElementById('page-bundle-discount');
assert.strictEqual(titleEl.textContent, 'وفّرت مع العرض (عطرك بـ 1 ريال):', 'Offer title MUST be clean customer name, never 189!');
assert(valEl.textContent.includes('−188.00'), 'Discount must be -188 SAR');
console.log('PASS: Title cleanup successfully converts "الثالث بريال 189" -> "وفّرت مع العرض (عطرك بـ 1 ريال):".');

window._noteLiveCartState.bundle_offers[0].usage_count = 2;
updateCartFinancials(816);
assert.notStrictEqual(dom.getElementById('page-grand-total').textContent, 'يُؤكّد الإجمالي عند الدفع', 'Must NEVER display text placeholder for total');
assert(dom.getElementById('page-grand-total').innerHTML.includes('628'), 'Must display exact grounded Zid server total');
console.log('PASS: Exact numerical total is always preserved without text placeholders.');

// Native cart prices and arbitrary coupon amounts must come from the same confirmed quote.
window.noteConfirmCartPricing = () => {};
window.noteCartPricingKey = () => JSON.stringify([CartManager.getCart(), localStorage.getItem('note_applied_coupon')]);
localStorage.setItem('note_applied_coupon', 'CUSTOM90');
window._noteVerifiedCart = {
  snapshot: window.noteCartPricingKey(),
  totals: [
    { code: 'sub_totals', value: 816 },
    { code: 'products_discount', value: -188 },
    { code: 'coupon', value: -7.43 },
    { code: 'total', value: 620.57 }
  ]
};
updateCartFinancials(816);
assert.equal(dom.getElementById('page-discount').textContent, '−7.43 ر.س');
assert.equal(dom.getElementById('page-shipping').textContent, 'يُحسب عند الدفع');
localStorage.removeItem('note_applied_coupon');
updateCartFinancials(816);
assert.equal(dom.getElementById('page-grand-total').textContent, 'جارٍ تأكيد أسعار سلتك…');
console.log('PASS: Custom coupon uses exact Zid amount, stale coupon quote is rejected, and shipping remains unconfirmed.');
