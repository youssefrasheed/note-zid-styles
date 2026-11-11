const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const app = fs.readFileSync(__dirname + '/note-app.js', 'utf8');
const uuid = '1edb4902-613d-43a7-8350-4fcd225954a4';
const products = [{ id: uuid, slug: 'رويال-توباكو' }, { id: 'note-for-him' }];
const content = { innerHTML: '' };
const ctx = {
  noteProductsCatalog: products,
  zidSlugMap: { 'note-for-him': 'for-him' },
  URLSearchParams,
  document: { getElementById: () => content },
  currentProduct: products[0],
};
vm.createContext(ctx);
const start = app.indexOf('    resolveProductId: function(');
const end = app.indexOf('    resolveCategory:', start);
vm.runInContext('this.router = ({' + app.slice(start, end) + '});', ctx);
const resolve = (path, query = '') => ctx.router.resolveProductId(path, new URLSearchParams(query));
assert.equal(resolve('/products/' + encodeURIComponent('رويال-توباكو')), uuid);
assert.equal(resolve('/product.html', 'id=' + uuid.replace(/-/g, '')), uuid);
assert.equal(resolve('/products/for-him'), 'note-for-him');
assert.equal(resolve('/products/old-for-him'), null);
assert.equal(resolve('/products/%invalid'), null);
assert.equal(resolve('/product.html', 'id=removed'), null);
products.shift();
assert.equal(resolve('/products/' + encodeURIComponent('رويال-توباكو')), null);
const statusStart = app.indexOf('  function renderMissingProduct(');
vm.runInContext(app.slice(statusStart, app.indexOf('  function initPDP(', statusStart)), ctx);
ctx.renderMissingProduct('loading');
assert.match(content.innerHTML, /جاري تحميل المنتج/);
assert.doesNotMatch(content.innerHTML, /المنتج غير متاح/);
ctx.renderMissingProduct();
assert.equal(ctx.currentProduct, null);
assert.match(content.innerHTML, /المنتج غير متاح/);
assert.match(content.innerHTML, /href="\/categories">تصفّح المنتجات/);
console.log('PASS: valid, removed, malformed and old product links; loading and unavailable views');
