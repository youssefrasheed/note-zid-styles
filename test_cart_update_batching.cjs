const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const source = fs.readFileSync(__dirname + '/storefront-live.js', 'utf8');

function fixture({pauseFirstRead = false, failRemoval = false} = {}) {
  let now = 0;
  let nextTimer = 0;
  const timers = new Map();
  const storage = new Map();
  let cart = [{ id: 'product', product_id: 'product', quantity: 1 }];
  let rows = [{ id: 'row', product_id: 'product', quantity: 1 }];
  let coupon = null;
  const changes = [];
  const status = {hidden:true};
  const busy = {value:'false',setAttribute(name,value){this.value=value;}};
  let feedbackAtRemoval;

  const response = () => ({
    products: rows.map(row => ({ ...row })),
    totals: [{ code: 'total', value: rows.reduce((sum, row) => sum + row.quantity * 100, 0) }],
    coupon: coupon ? { code: coupon } : null
  });
  let releaseRead;
  const readGate = new Promise(resolve => { releaseRead = resolve; });
  let readCount = 0;
  let readCalls = 0;
  const api = {
    get: async () => {
      readCalls++;
      const cartResponse = response();
      if (pauseFirstRead && readCount++ === 0) await readGate;
      return cartResponse;
    },
    addProduct: async payload => {
      changes.push(['add', payload.quantity]);
      rows[0].quantity += payload.quantity;
      return { status: 'success' };
    },
    updateProduct: async ({quantity}) => {
      changes.push(['update', quantity]);
      rows[0].quantity = quantity;
      return { status: 'success' };
    },
    removeProduct: async () => { changes.push(['remove']); if(failRemoval) throw Error('offline'); rows = []; return { status: 'success' }; },
    applyCoupon: async ({coupon_code}) => { changes.push(['coupon', coupon_code]); coupon=coupon_code; return { status: 'success' }; }
  };
  const manager = {
    getCart: () => cart.map(item => ({ ...item })),
    buildZidPayloads: entries => entries.map(({product_id, quantity}) => ({product_id, quantity})),
    updateQuantity: (key, delta) => { cart[0].quantity += delta; },
    removeItem: () => { feedbackAtRemoval = {visible:!status.hidden,busy:busy.value}; cart = []; },
    renderDrawer() {},
    showToast() {}
  };
  const sandbox = {
    window: { zid: {cart:api} }, CartManager: manager, noteProductsCatalog: [],
    localStorage: {
      getItem: key => storage.get(key) || null,
      setItem: (key,value) => storage.set(key,value),
      removeItem: key => storage.delete(key)
    },
    document: { getElementById: id => id==='note-page-cart-loading' ? status : id==='cart-page-items' ? busy : null },
    Date: { now: () => now },
    setTimeout: (fn, delay) => { timers.set(++nextTimer, {fn, at:now+delay}); return nextTimer; },
    clearTimeout: id => timers.delete(id),
    console: {warn() {}},
    matchingCartPayloads: (expected,actual) =>
      JSON.stringify(expected.map(({product_id,quantity})=>[product_id,quantity])) ===
      JSON.stringify(actual.map(({product_id,quantity})=>[product_id,quantity])),
    nativeCartItems: value => value.products,
    extractCartData: value => value,
    assertCartResponse: value => { if(value.status==='error') throw Error('Rejected'); return value; },
    signature() {},
    renderCartPage() {},
    updateCartFinancials() {}
  };
  vm.createContext(sandbox);
  const queueStart = source.indexOf('  function cartReconciliationPlan(');
  const queueEnd = source.indexOf('  CartManager.addItem=function', queueStart);
  vm.runInContext(source.slice(queueStart, queueEnd), sandbox);
  const actionsStart = source.indexOf('  const originalRemove=CartManager.removeItem,');
  const actionsEnd = source.indexOf("\n  if (typeof document", actionsStart);
  vm.runInContext(source.slice(actionsStart, actionsEnd), sandbox);
  vm.runInContext('this.confirmForCheckout = () => enqueueNativeCartSync();', sandbox);
  return {
    sandbox, changes, releaseRead, reads: () => readCalls, status, busy, feedbackAtRemoval:()=>feedbackAtRemoval,
    advance: milliseconds => {
      now += milliseconds;
      for(const [id,timer] of [...timers]) {
        if(timer.at <= now) {timers.delete(id);timer.fn();}
      }
    }
  };
}

(async () => {
  const reopening = fixture();
  await reopening.sandbox.confirmForCheckout();
  assert.equal(reopening.reads(), 1);
  await reopening.sandbox.window.noteConfirmCartOnOpen();
  await reopening.sandbox.window.noteConfirmCartOnOpen();
  assert.equal(reopening.reads(), 1);
  reopening.advance(9999);
  await reopening.sandbox.window.noteConfirmCartOnOpen();
  assert.equal(reopening.reads(), 1);
  reopening.advance(1);
  await reopening.sandbox.window.noteConfirmCartOnOpen();
  assert.equal(reopening.reads(), 2);
  await reopening.sandbox.confirmForCheckout();
  assert.equal(reopening.reads(), 3);
  reopening.sandbox.localStorage.setItem('note_applied_coupon','HN');
  await reopening.sandbox.window.noteConfirmCartOnOpen();
  assert.equal(reopening.reads(), 4);
  delete reopening.sandbox.window._noteVerifiedCart.confirmedAt;
  await reopening.sandbox.window.noteConfirmCartOnOpen();
  assert.equal(reopening.reads(), 5);
  reopening.sandbox.window._noteVerifiedCart.totals = {};
  await reopening.sandbox.window.noteConfirmCartOnOpen();
  assert.equal(reopening.reads(), 6);
  reopening.sandbox.localStorage.removeItem('note_applied_coupon');
  await reopening.sandbox.confirmForCheckout();
  const quantityChange = reopening.sandbox.CartManager.updateQuantity('product', 1);
  const reopeningDuringChange = reopening.sandbox.window.noteConfirmCartOnOpen();
  reopening.advance(250);
  await quantityChange;
  await reopeningDuringChange;
  assert.equal(reopening.sandbox.window._noteVerifiedCart.products[0].quantity, 2);
  console.log('PASS: reopening reuses a confirmed quote for less than 10 seconds; expired, changed, undated and checkout requests fetch fresh prices');

  const rapid = fixture();
  const first = rapid.sandbox.CartManager.updateQuantity('product', 1);
  const second = rapid.sandbox.CartManager.updateQuantity('product', 1);
  const third = rapid.sandbox.CartManager.updateQuantity('product', 1);
  assert.equal(rapid.sandbox.CartManager.getCart()[0].quantity, 4);
  assert.equal(first, second);
  assert.equal(second, third);
  assert.equal(rapid.sandbox.window.noteConfirmCartPricing(), first);
  rapid.advance(249);
  assert.deepEqual(rapid.changes, []);
  rapid.advance(1);
  await first;
  assert.deepEqual(rapid.changes, [['add',3]]);
  assert.equal(rapid.sandbox.window._noteVerifiedCart.products[0].quantity, 4);

  const checkout = fixture();
  const pending = checkout.sandbox.CartManager.updateQuantity('product', 1);
  const verified = await checkout.sandbox.confirmForCheckout();
  await pending;
  assert.equal(verified.products[0].quantity, 2);
  assert.deepEqual(checkout.changes, [['add',1]]);
  checkout.advance(250);
  assert.deepEqual(checkout.changes, [['add',1]]);

  const coupon = fixture();
  const quantity = coupon.sandbox.CartManager.updateQuantity('product', 1);
  await coupon.sandbox.window.noteChangeCartCoupon('HN');
  await quantity;
  assert.deepEqual(coupon.changes, [['add',1], ['coupon','HN']]);
  assert.equal(coupon.sandbox.window._noteVerifiedCart.couponCode, 'HN');

  for (const failRemoval of [false,true]) {
    const removing = fixture({pauseFirstRead:true,failRemoval});
    const removed = removing.sandbox.CartManager.removeItem('product');
    assert.deepEqual(removing.feedbackAtRemoval(),{visible:true,busy:'true'},'feedback must precede local removal/render');
    assert.equal(removing.busy.value,'true');
    removing.releaseRead();await removed;
    removing.advance(1000);
    assert.equal(removing.busy.value,'false','success and network failure both release the loading jobs');
    assert.equal(removing.status.hidden,true);
    assert.equal(removing.sandbox.CartManager.getCart().length,0);
  }

  const couponAddition = fixture();
  await couponAddition.sandbox.window.noteChangeCartCoupon('HN');
  const readsBeforeAdd = couponAddition.reads();
  const addedQuantity = couponAddition.sandbox.CartManager.updateQuantity('product', 1);
  couponAddition.advance(250);
  await addedQuantity;
  assert.deepEqual(couponAddition.changes, [['coupon','HN'], ['add',1]]);
  assert.equal(couponAddition.reads()-readsBeforeAdd, 2, 'addition needs only the initial and final reads');
  assert.equal(couponAddition.sandbox.window._noteVerifiedCart.couponCode, 'HN');
  assert.equal(couponAddition.sandbox.window._noteVerifiedCart.products[0].quantity, 2);

  const couponDeletion = fixture();
  await couponDeletion.sandbox.window.noteChangeCartCoupon('HN');
  const readsBeforeDelete = couponDeletion.reads();
  await couponDeletion.sandbox.CartManager.removeItem('product');
  assert.deepEqual(couponDeletion.changes, [['coupon','HN'], ['remove']]);
  assert.equal(couponDeletion.reads()-readsBeforeDelete, 1, 'fresh verified removal skips the redundant initial cart read');
  assert.equal(couponDeletion.sandbox.window._noteVerifiedCart.couponCode, 'HN');

  const deletion = fixture();
  const increment = deletion.sandbox.CartManager.updateQuantity('product', 1);
  await deletion.sandbox.CartManager.removeItem('product');
  await increment;
  assert.deepEqual(deletion.changes, [['remove']]);
  assert.equal(deletion.sandbox.window._noteVerifiedCart.products.length, 0);
  deletion.advance(250);
  assert.deepEqual(deletion.changes, [['remove']]);
  const inFlight = fixture({pauseFirstRead:true});
  const olderRead = inFlight.sandbox.confirmForCheckout().catch(() => null);
  inFlight.sandbox.CartManager.updateQuantity('product', 1);
  for (let turn=0; turn<5; turn++) await Promise.resolve();
  const finalChange = inFlight.sandbox.CartManager.updateQuantity('product', -1);
  inFlight.advance(250);
  inFlight.releaseRead();
  await olderRead;
  await finalChange;
  assert.equal(inFlight.sandbox.window._noteVerifiedCart.products[0].quantity, 1);
  assert.equal(inFlight.sandbox.window._noteVerifiedCart.totals[0].value, 100);
  console.log('PASS: rapid changes use one update; checkout, coupon, deletion and an overlapping older request preserve the final quantity');
})().catch(error => { console.error(error); process.exitCode=1; });
