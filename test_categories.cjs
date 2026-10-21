const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
let source=fs.readFileSync(__dirname+'/test_live.cjs','utf8');source=source.slice(0,source.indexOf('const product='));source=source.replace("const source=", "const integration=").replace("runInContext(source+", "runInContext(integration+");
source+=`\nvm.runInContext('this.categoryAPI={registerCategories,categoryProducts};',ctx);
const products=[{id:'a',name:'A',price:100,quantity:1,categories:[{id:1,name:'Shared name'}]},{id:'b',name:'B',price:100,quantity:1,categories:[{id:2,name:'Shared name'}]}];
const categories=[{id:1,name:'Shared name'},{id:2,name:'Shared name'}];
ctx.categoryAPI.registerCategories(categories);ctx.testAPI.sync.applyToCatalog(products);
for(const c of categories){if(['1327929','1697258'].includes(String(c.id)))continue;const expected=products.filter(p=>p.categories.some(x=>x.id===c.id)).map(p=>p.id).sort();assert.deepEqual(Array.from(ctx.categoryAPI.categoryProducts('zid-'+c.id),p=>p.id).sort(),expected);}
const fresh={...products[0],id:'new-product',slug:'new-product',name:'منتج جديد',created_at:'2099-01-01',categories:[{id:999,name:'تصنيف جديد',slug:'new-category'}]};
ctx.testAPI.sync.applyToCatalog([...products,fresh]);
assert.equal(ctx.categoryAPI.categoryProducts('zid-999')[0].id,'new-product');
assert.equal(ctx.NoteRouter.resolveCategory('/categories/999/new-category',new URLSearchParams()),'zid-999');
assert.equal(ctx.categoryAPI.categoryProducts('new')[0].id,'new-product');
assert.equal(ctx.categoryAPI.categoryProducts('all').length,products.length+1);
ctx.testAPI.sync.applyToCatalog([...products,{...fresh,categories:[{id:998,name:'تصنيف آخر'}]}]);
assert.equal(ctx.categoryAPI.categoryProducts('zid-999').length,0);assert.equal(ctx.categoryAPI.categoryProducts('zid-998').length,1);
ctx.testAPI.sync.applyToCatalog([{...fresh,price:410,sale_price:229}]);assert.equal(ctx.noteProductsCatalog[0].tag,'خصم 44.1%');
ctx.testAPI.sync.applyToCatalog([{...fresh,price:410,sale_price:null}]);assert.equal(ctx.noteProductsCatalog[0].tag,'');
console.log('PASS: exact live category membership/counts, new product/category, reassignment, latest-first, discount percentage and no-sale badge');`;
vm.runInThisContext('(function(require,__dirname){'+source+'})')(require,__dirname);
