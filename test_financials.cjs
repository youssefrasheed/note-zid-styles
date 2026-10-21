const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const app=fs.readFileSync(__dirname+'/note-app.js','utf8');
const fn=app.slice(app.indexOf('  function updateCartFinancials('),app.indexOf('  async function proceedToCheckout('));
const els=Object.fromEntries(['page-subtotal','page-grand-total','page-shipping','discount-row'].map(id=>[id,{textContent:'',classList:{add(x){this.hidden=x==='hidden'}}}]));
const ctx={document:{getElementById:id=>els[id]}};vm.createContext(ctx);vm.runInContext(fn,ctx);
for(const subtotal of [0,179.55,299,300,488]){ctx.updateCartFinancials(subtotal);assert.equal(els['page-grand-total'].textContent,subtotal.toLocaleString('ar-SA',{maximumFractionDigits:2})+' ر.س');assert.equal(els['page-shipping'].textContent,'يُحسب عند الدفع');assert(els['discount-row'].classList.hidden)}
assert(!app.includes("code === 'NOTE10'"));assert(!app.includes('shippingCost = 25'));
assert(app.includes('إجمالي المنتجات قبل الشحن والخصومات:'));
console.log('PASS: zero, fractional, below/at/above shipping threshold; no fabricated coupon discount or shipping charge');
