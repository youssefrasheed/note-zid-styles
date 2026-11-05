const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(__dirname + '/storefront-live.js','utf8');
const start = source.indexOf('  function replaceCartItems(');
const end = source.indexOf('  let cartLoadingJobs',start);

function fixture(id='cart-page-items') {
  const scroller={scrollTop:900};
  const body={};
  const document={body,activeElement:body,scrollingElement:scroller,getElementById:()=>scroller};
  let rows=[],nextRows=[];
  const container={
    id,style:{},getBoundingClientRect:()=>({height:2000}),
    contains:element=>rows.some(row=>row.buttons.includes(element)),
    querySelectorAll:()=>rows,
    set innerHTML(value){
      if(this.contains(document.activeElement))document.activeElement=body;
      rows=value ? nextRows : [];
      scroller.scrollTop=0;
    }
  };
  const makeRow=(key,label='زيادة الكمية')=>{
    const row={dataset:{cartId:key},buttons:[],querySelectorAll:()=>row.buttons};
    const button={
      tagName:'BUTTON',closest:()=>row,getAttribute:()=>label,
      focus(options){assert.equal(options.preventScroll,true);document.activeElement=button;}
    };
    row.buttons=[button];
    return row;
  };
  const context={window:{},document};
  vm.createContext(context);
  vm.runInContext(source.slice(start,end),context);
  return {scroller,document,container,makeRow,replace:context.window.noteReplaceCartItems,
    existing:value=>{rows=value;},next:value=>{nextRows=value;}};
}

const drawer=fixture('cart-drawer-items');
const oldRow=drawer.makeRow('product');
const newRow=drawer.makeRow('product');
drawer.existing([oldRow]);drawer.next([newRow]);drawer.document.activeElement=oldRow.buttons[0];
drawer.replace(drawer.container,'updated');
assert.equal(drawer.scroller.scrollTop,900);
assert.equal(drawer.document.activeElement,newRow.buttons[0]);

const page=fixture();
const initial=page.makeRow('product');
const restored=page.makeRow('product');
page.existing([initial]);page.next([]);page.document.activeElement=initial.buttons[0];
page.replace(page.container,'pending',true);
assert.equal(page.container.style.minHeight,'2000px');
assert.equal(page.scroller.scrollTop,900);
page.scroller.scrollTop=650;
page.replace(page.container,'pending',true);
page.next([restored]);
page.replace(page.container,'confirmed');
assert.equal(page.scroller.scrollTop,650);
assert.equal(page.document.activeElement,restored.buttons[0]);
assert.equal(page.container.style.minHeight,'');
assert.equal(page.container._notePendingView,undefined);

const coupon=fixture();
const couponRow=coupon.makeRow('product');
coupon.existing([couponRow]);coupon.next([]);coupon.document.activeElement=couponRow.buttons[0];
coupon.replace(coupon.container,'pending',true);
const input={tagName:'INPUT'};
coupon.document.activeElement=input;
coupon.next([coupon.makeRow('product')]);
coupon.replace(coupon.container,'confirmed');
assert.equal(coupon.document.activeElement,input);

const deletion=fixture();
const deleted=deletion.makeRow('product','حذف المنتج من السلة');
deletion.existing([deleted]);deletion.next([deletion.makeRow('product')]);deletion.document.activeElement=deleted.buttons[0];
deletion.replace(deletion.container,'remaining');
assert.equal(deletion.document.activeElement,deletion.document.body);

const duplicate=fixture();
const duplicateRows=[duplicate.makeRow('same'),duplicate.makeRow('same')];
const replacements=[duplicate.makeRow('same'),duplicate.makeRow('same')];
duplicate.existing(duplicateRows);duplicate.next(replacements);duplicate.document.activeElement=duplicateRows[1].buttons[0];
duplicate.replace(duplicate.container,'confirmed');
assert.equal(duplicate.document.activeElement,replacements[1].buttons[0]);
duplicate.replace(duplicate.container,'',false);
assert.equal(duplicate.container.style.minHeight,'');

console.log('PASS: cart scrolling and quantity focus survive rendering, pending views retain height, and coupon focus is respected');
