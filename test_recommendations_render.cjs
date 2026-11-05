const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const source=fs.readFileSync(__dirname+'/storefront-live.js','utf8');
const start=source.indexOf('  let recAnimation;');
const end=source.indexOf('  renderCartPageRecommendations=',start);
const products=[
 {id:'a',slug:'first',title:'First',img:'first.png',price:100,in_stock:true},
 {id:'b',slug:'second',title:'Second',img:'second.png',price:200,in_stock:true}
];
let writes=0,intervals=0,buttons=[],markup='';
const hidden=new Set();
const grid={
 scrollLeft:120,scrollWidth:1000,clientWidth:300,isConnected:true,dataset:{},style:{},
 addEventListener(){},
 querySelectorAll:()=>buttons,
 set innerHTML(value){
  writes++;markup=value;
  buttons=[...value.matchAll(/data-product="([^"]+)"/g)].map(match=>({dataset:{product:match[1]}}));
 },
 get innerHTML(){return markup;}
};
const nav={style:{},innerHTML:'',querySelector:()=>({})};
const box={classList:{toggle(name,on){if(on)hidden.add(name);else hidden.delete(name);}},querySelector:()=>nav};
const additions=[];
const context={
 document:{hidden:false,getElementById:id=>id==='grid'?grid:box},
 window:{addEventListener(){}},
 categoryProducts:()=>products,
 formatPrice:value=>String(value),
 escapeHTML:value=>String(value),
 CartManager:{addItem:id=>additions.push(id)},
 NoteRouter:{navigate(){}},
 setInterval:()=>++intervals,clearInterval(){},setTimeout(){},matchMedia:()=>({matches:false})
};
vm.createContext(context);
vm.runInContext(source.slice(start,end)+'\nthis.renderRecommendations=compactRecommendations;',context);
const render=cart=>context.renderRecommendations(cart,'grid','section');
render([{id:'in-cart',quantity:1}]);
assert.equal(writes,1);
const originalButton=buttons[0];
render([{id:'in-cart',quantity:3}]);
assert.equal(writes,1);
assert.equal(buttons[0],originalButton);
assert.equal(grid.scrollLeft,120);
render([{id:'in-cart',quantity:3},{id:'a',quantity:1}]);
assert.equal(writes,2);
assert.equal(buttons.length,1);
assert.equal(buttons[0].dataset.product,'b');
buttons[0].onclick({stopPropagation(){}});
assert.deepEqual(additions,['b']);
products[1].price=210;
render([{id:'a',quantity:1}]);
assert.equal(writes,3);
assert(markup.includes('210'));
products[1].img='updated.png';
render([{id:'a',quantity:1}]);
assert.equal(writes,4);
assert(markup.includes('updated.png'));
products[1].in_stock=false;
render([{id:'a',quantity:1}]);
assert.equal(writes,5);
assert(hidden.has('hidden'));
products[1].in_stock=true;
render([]);
assert(hidden.has('hidden'));
const beforeReopen=writes;
render([{id:'in-cart',quantity:1}]);
assert.equal(writes,beforeReopen);
assert(!hidden.has('hidden'));

const pageContext={...context,document:{...context.document,getElementById:id=>id==='cart-page-recs-grid'?grid:box}};
vm.createContext(pageContext);
vm.runInContext(source.slice(start,end)+'\nthis.renderRecommendations=compactRecommendations;',pageContext);
delete grid._noteRecommendationMarkup;
pageContext.renderRecommendations([{id:'in-cart'}],'cart-page-recs-grid','section');
const started=intervals;
pageContext.renderRecommendations([{id:'in-cart',quantity:2}],'cart-page-recs-grid','section');
assert.equal(intervals,started);
console.log('PASS: unchanged recommendations preserve DOM, scrolling and animation; product, price, image and stock changes refresh the cards');
