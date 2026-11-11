const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const app = fs.readFileSync(__dirname + '/note-app.js', 'utf8');
const fn = app.slice(app.indexOf('  function updateCartFinancials('), app.indexOf('  async function proceedToCheckout('));
const els = Object.fromEntries(['page-subtotal', 'page-grand-total', 'page-shipping-amount', 'page-shipping-note', 'discount-row', 'page-discount', 'bundle-discount-row', 'page-bundle-discount'].map(id => [id, {
  textContent: '',
  classList: new Set(),
  setAttribute(key, value) { this[key] = value; },
  removeAttribute(key) { delete this[key]; },
}]));
for (const element of Object.values(els)) element.classList.remove = element.classList.delete;
let snapshot = 'cart-one';
const window = { noteCartPricingKey: () => snapshot };
const ctx = { window, document: { getElementById: id => els[id] }, formatPrice: amount => amount + ' ر.س' };
vm.createContext(ctx);
vm.runInContext(fn, ctx);
const grand = els['page-grand-total'];
ctx.updateCartFinancials(500);
assert.equal(grand.textContent, 'جاري تحديث السعر…');
assert.equal(grand['data-note-total'], undefined);
assert(els['discount-row'].classList.has('hidden'));
window._noteVerifiedCart = { snapshot, couponCode: null, totals: [
  { code: 'sub_totals', value: 488 },
  { code: 'total', value: 488 },
] };
ctx.updateCartFinancials();
assert.equal(grand.textContent, '488 ر.س');
assert(els['discount-row'].classList.has('hidden'));
window._noteVerifiedCart = { snapshot, couponCode: 'HN', totals: [
  { code: 'sub_totals', value: 488 },
  { code: 'products_discount', value: -100 },
  { code: 'coupon', value: -11.25 },
  { code: 'total', value: 376.75 },
] };
ctx.updateCartFinancials();
assert.equal(grand['data-note-total'], '376.75');
assert.equal(els['page-discount'].textContent, '−11.25 ر.س');
assert.equal(els['page-bundle-discount'].textContent, '−100.00 ر.س');
assert.equal(els['page-shipping-amount'].textContent, '+19');
snapshot = 'after-removal';
ctx.updateCartFinancials();
assert.equal(grand.textContent, 'جاري تحديث السعر…');
assert.equal(grand['data-note-total'], undefined);
assert(els['discount-row'].classList.has('hidden'));
assert(els['bundle-discount-row'].classList.has('hidden'));
window._noteFailedCartPricing = snapshot;
ctx.updateCartFinancials();
assert.equal(grand.textContent, 'تعذّر تأكيد السعر');
snapshot = 'note5-active';
window._noteVerifiedCart = { snapshot, couponCode: 'NOTE5', totals: [
  { code: 'coupon', value: -31.97 },
  { code: 'total', value: 1805.24 },
] };
ctx.updateCartFinancials();
assert.equal(grand['data-note-total'], '1805.24');
assert.equal(els['page-discount'].textContent, '−31.97 ر.س');
snapshot = 'note5-cleared';
ctx.updateCartFinancials();
assert.equal(grand['data-note-total'], undefined);
assert(els['discount-row'].classList.has('hidden'));
window._noteVerifiedCart = { snapshot, couponCode: null, totals: [{ code: 'total', value: 1842 }] };
ctx.updateCartFinancials();
assert.equal(grand['data-note-total'], '1842.00');
assert.equal(els['page-shipping-amount'].textContent, '+19');
snapshot = 'repeated-offers';
window._noteVerifiedCart = { snapshot, couponCode: null, totals: [
  { code: 'products_discount', value: -376 },
  { code: 'total', value: 624 },
] };
ctx.updateCartFinancials();
assert.equal(els['page-bundle-discount'].textContent, '−376.00 ر.س');
snapshot = 'one-offer-after-removal';
ctx.updateCartFinancials();
assert.equal(grand['data-note-total'], undefined);
assert(els['bundle-discount-row'].classList.has('hidden'));
window._noteVerifiedCart = { snapshot, couponCode: null, totals: [
  { code: 'products_discount', value: -188 },
  { code: 'shipping', value: 19 },
  { code: 'total', value: 512.31 },
] };
ctx.updateCartFinancials();
assert.equal(grand['data-note-total'], '512.31');
assert.equal(els['page-shipping-amount'].textContent, '19');
assert.equal(els['page-bundle-discount'].textContent, '−188.00 ر.س');
assert(!app.includes('getNoteCouponPercent'));
console.log('PASS: confirmed totals, HN discount, offer discount, stale quote after removal, and pricing error');
