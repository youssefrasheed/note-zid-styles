const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');

const baseDir = '/Users/yousefsoom/note-zid-styles';
const appJs = fs.readFileSync(path.join(baseDir, 'note-app.js'), 'utf8');

console.log('=== SUITE 4: COUPON SYSTEM & BEHAVIOR AUDIT ===');

// Verify default coupon button styling in CSS
const noteCss = fs.readFileSync(path.join(baseDir, 'note.css'), 'utf8');
assert(noteCss.includes('#drawer-coupon-btn'), 'note.css must style #drawer-coupon-btn');
assert(noteCss.includes('#coupon-apply-btn'), 'note.css must style #coupon-apply-btn');
assert(noteCss.includes('#111111 !important'), 'Coupon button must be styled with #111111 !important default');
console.log('PASS: Coupon button default black styling verified.');

// Verify coupon handler logic in note-app.js
assert(appJs.includes('function applyCartCoupon'), 'applyCartCoupon must exist');
assert(appJs.includes('function clearCartCoupon'), 'clearCartCoupon must exist');
assert(appJs.includes('function restoreSavedCartCoupon'), 'restoreSavedCartCoupon must exist');

// Verify speculative client-side coupon percentage calculator is absent
assert(!appJs.includes('getNoteCouponPercent'), 'Speculative coupon guessing must not exist; Zid server is authoritative');
console.log('PASS: Confirmed Zid coupon pricing architecture verified.');

// Verify active gold vs inactive black coupon button behavior
assert(appJs.includes('applyBtn.classList.add(\'note-btn-gold\')'), 'Must add gold class when coupon is active');
assert(appJs.includes('applyBtn.classList.remove(\'note-btn-gold\')'), 'Must remove gold class when coupon is cleared');
assert(appJs.includes('drawerCouponBtn.classList.add(\'note-btn-gold\')'), 'Must add gold class to drawer coupon button when active');

console.log('PASS: Active gold vs inactive black coupon button logic verified.');

// Exercise coupon replacement against a cart API that rejects overlapping coupons.
(async () => {
  const vm = require('node:vm');
  const live = fs.readFileSync(path.join(baseDir, 'storefront-live.js'), 'utf8');
  const start = live.indexOf('  function cartReconciliationPlan(');
  const end = live.indexOf('  CartManager.addItem=function', start);
  const values = new Map([['note_applied_coupon', 'NOTE5']]);
  let coupon = 'NOTE5';
  const changes = [];
  const rows = [{id:'row',product_id:'product',quantity:1}];
  const cartApi = {
    get: async () => ({products:rows,totals:[{code:'total',value:100}],coupon:coupon ? {code:coupon} : null}),
    addProduct: async () => { throw Error('Cart contents must remain unchanged'); },
    removeCoupons: async () => { changes.push('remove'); coupon=null; return {status:'success'}; },
    applyCoupon: async ({coupon_code}) => {
      changes.push('apply:'+coupon_code);
      if (coupon || coupon_code === 'INVALID') return {status:'error',message:'Rejected coupon'};
      coupon=coupon_code;
      return {status:'success'};
    }
  };
  const sandbox = {
    window:{zid:{cart:cartApi}}, console:{warn(){}},setTimeout,clearTimeout,
    localStorage:{getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value),removeItem:key=>values.delete(key)},
    document:{getElementById:()=>null},
    CartManager:{getCart:()=>[{id:'product',quantity:1}],buildZidPayloads:()=>[{product_id:'product',quantity:1}],renderDrawer(){}},
    matchingCartPayloads:()=>true,nativeCartItems:cart=>cart.products,extractCartData:response=>response,
    assertCartResponse:response=>{if(response.status==='error')throw Error(response.message);return response;},
    signature:()=>'',renderCartPage(){},updateCartFinancials(){}
  };
  vm.createContext(sandbox);
  vm.runInContext(live.slice(start,end),sandbox);
  await sandbox.window.noteChangeCartCoupon('HN');
  assert.equal(coupon,'HN');
  assert.deepEqual(changes,['remove','apply:HN']);
  assert.equal(sandbox.window._noteVerifiedCart.couponCode,'HN');
  await assert.rejects(sandbox.window.noteChangeCartCoupon('INVALID'),/Rejected coupon/);
  assert.equal(coupon,'HN');
  assert.equal(values.get('note_applied_coupon'),'HN');
  assert.equal(sandbox.window._noteVerifiedCart.couponCode,'HN');
  await sandbox.window.noteChangeCartCoupon(null);
  assert.equal(coupon,null);
  assert.equal(sandbox.window._noteVerifiedCart.couponCode,null);
  console.log('PASS: switching coupons removes the previous coupon, and a rejected code restores the confirmed previous coupon');
})().catch(error=>{console.error(error);process.exitCode=1;});
