const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(__dirname + '/storefront-live.js', 'utf8');
const code = source.slice(source.indexOf('  let checkoutBusy=false;'), source.indexOf('  const originalRemove=CartManager.removeItem,'));
function fixture({shown='200.00', total=200, changed=false, reject=false}={}) {
  let release;
  const gate = new Promise(resolve => {release=resolve;});
  let key='current', syncs=0, refreshed=0;
  const toasts=[];
  const button={innerHTML:'Pay',style:{}};
  const sandbox={
    window:{},location:{href:''},console:{warn(){}},
    document:{querySelectorAll:()=>[button],getElementById:id=>id==='page-grand-total'?{getAttribute:()=>shown}:null},
    CartManager:{getCart:()=>[{id:'one',quantity:2}],getTotal:()=>200,showToast:text=>toasts.push(text)},
    cartPricingKey:()=>key,
    enqueueNativeCartSync:async()=>{syncs++;await gate;if(reject)throw Error('network');if(changed)key='changed';return {totals:[{code:'total',value:total}],basket_url:'/confirmed-checkout'};},
    updateCartFinancials:()=>{refreshed++;}
  };
  vm.createContext(sandbox);vm.runInContext(code,sandbox);
  return {sandbox,release,toasts,button,syncs:()=>syncs,refreshed:()=>refreshed};
}
(async()=>{
  for(const shown of [null,'','200.00','200']) {
    const f=fixture({shown});
    const first=f.sandbox.window.proceedToCheckout();
    assert.equal(f.sandbox.location.href,'','must await Zid');
    await f.sandbox.window.proceedToCheckout();
    assert.equal(f.syncs(),1,'double click must not queue another checkout');
    f.release();await first;
    assert.equal(f.sandbox.location.href,'/confirmed-checkout');
    assert.equal(f.refreshed(),1);assert.equal(f.toasts.length,0);
    assert.equal(f.button.style.pointerEvents,'');
  }
  for(const options of [{total:201},{changed:true},{total:NaN},{reject:true}]) {
    const f=fixture(options);const pending=f.sandbox.window.proceedToCheckout();f.release();await pending;
    assert.equal(f.sandbox.location.href,'','changed or failed verification must not navigate');
    assert.equal(f.toasts.length,1);assert.equal(f.button.innerHTML,'Pay');
  }
  console.log('PASS: pending prices wait for Zid and navigate on one click; duplicate clicks, changed totals, changed cart and failed verification are guarded');
})().catch(error=>{console.error(error);process.exitCode=1;});
