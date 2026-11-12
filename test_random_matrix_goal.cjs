const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const app = fs.readFileSync(__dirname + '/note-app.js', 'utf8');
const start = app.indexOf('  function updateCartFinancials(');
const end = app.indexOf('  async function proceedToCheckout(', start);
assert(start >= 0 && end > start, 'Find the storefront pricing renderer');

const grandTotal = {
  textContent: '',
  setAttribute(name, value) { this[name] = value; },
  removeAttribute(name) { delete this[name]; },
};
let cartSnapshot;
const window = { noteCartPricingKey: () => cartSnapshot };
const context = vm.createContext({
  window,
  document: { getElementById: id => id === 'page-grand-total' ? grandTotal : null },
  formatPrice: amount => amount + ' ر.س',
});
vm.runInContext(app.slice(start, end), context);

let seed = 42;
function sample(limit) {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed % limit;
}

for (let index = 0; index < 500; index++) {
  cartSnapshot = 'cart-' + index;
  const subtotal = 30000 + sample(200000);
  const offerDiscount = sample(subtotal);
  const couponDiscount = index % 2 === 0 ? sample(subtotal - offerDiscount) : 0;
  const shipping = index % 3 === 0 ? 1900 : 0;
  const total = (subtotal - offerDiscount - couponDiscount + shipping) / 100;

  context.updateCartFinancials(subtotal / 100);
  assert.equal(grandTotal['data-note-total'], undefined, 'A changed cart must wait for its own quote');

  window._noteVerifiedCart = {
    snapshot: cartSnapshot,
    couponCode: couponDiscount ? 'NOTE5' : null,
    totals: [
      { code: 'sub_totals', value: subtotal / 100 },
      { code: 'products_discount', value: -offerDiscount / 100 },
      { code: 'coupon', value: -couponDiscount / 100 },
      { code: 'shipping', value: shipping / 100 },
      { code: 'total', value: total },
    ],
  };

  context.updateCartFinancials();
  assert.equal(grandTotal['data-note-total'], total.toFixed(2));
  assert.equal(grandTotal.textContent, total + ' ر.س');
}

console.log('PASS: 500 repeatable quote cases preserve Zid totals and reject stale cart prices');
