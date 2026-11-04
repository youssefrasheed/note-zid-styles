const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const app = fs.readFileSync(path.join(__dirname, 'note-app.js'), 'utf8');
const page = app.slice(app.indexOf('  function renderCartPage('), app.indexOf('  function updateCheckoutUpsell('));

assert(page.includes('note-bundle-group-card'), 'Cart must group offer items under bundle group cards');
assert(page.includes('مشمول بالعرض بـ 1 ريال'), 'Cart must show offer badge on discounted items');
assert(!page.includes('قبل خصم العرض'), 'Must never show before-discount text in cart items');
assert(page.includes('CartManager.partitionCart'), 'Cart rendering must be driven by partitionCart');
assert(page.includes('CartManager.updateQuantity'), 'Standalone items must keep quantity controls');

console.log('PASS: cart displays bundle group cards and standalone items without "قبل خصم العرض"');
