const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');

const baseDir = '/Users/yousefsoom/note-zid-styles';
const appJs = fs.readFileSync(path.join(baseDir, 'note-app.js'), 'utf8');

console.log('=== SUITE 3: DOM, DRAWER & CART PAGE RENDERING AUDIT ===');

// Check that side drawer rendering code NEVER includes note-bundle-group-card
const drawerMatch = appJs.match(/renderDrawer:\s*function\(\)\s*\{([\s\S]*?)\n    \},/);
assert(drawerMatch, 'renderDrawer must exist in note-app.js');
const drawerCode = drawerMatch[1];

assert(!drawerCode.includes('note-bundle-group-card'), 'Side drawer MUST NOT render bundle cards!');
assert(!drawerCode.includes('partitionCartForPage'), 'Side drawer MUST NOT call partitionCartForPage!');
console.log('PASS: Side drawer verified 100% clean and free of bundle grouping.');

// Check that cart page rendering includes partitionCartForPage
const cartPageMatch = appJs.match(/function renderCartPage\(\)\s*\{([\s\S]*?)\n  \}/);
assert(cartPageMatch, 'renderCartPage must exist in note-app.js');
const cartPageCode = cartPageMatch[1];

assert(cartPageCode.includes('partitionCartForPage(cart)'), 'renderCartPage must call partitionCartForPage');
assert(cartPageCode.includes('note-bundle-group-card'), 'renderCartPage must include note-bundle-group-card when bundles present');
assert(cartPageCode.includes('note-standalone-group-header'), 'renderCartPage must include note-standalone-group-header when standalone present');
console.log('PASS: Cart page rendering verified to contain strict bundle partitioning.');

// Test HTML generation for the user video cart: 4 Musks + 1 Tobacco + 1 Tola
const pStart = appJs.indexOf('function partitionCartForPage(cartList) {');
const pEnd = appJs.indexOf('const partitioned = partitionCartForPage(cart);');
const partitionCode = appJs.slice(pStart, pEnd);

const isPerfumeCode = appJs.match(/_isQualifying100mlPerfume:\s*(function\([\s\S]*?\n    \}),/)[1];
const isTolaCode = appJs.match(/_isQualifyingTola:\s*(function\([\s\S]*?\n    \}),/)[1];

const CartManager = {
  _isQualifying100mlPerfume: eval('(' + isPerfumeCode + ')'),
  _isQualifyingTola: eval('(' + isTolaCode + ')')
};
eval(partitionCode);

const zidSlugMap = {};
function resolveImgUrl(url) { return url || ''; }
function formatPrice(p) { return p + ' ر.س'; }
function escapeHTML(v) { return String(v ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

const cart = [
  { id: 'note-musk', title: 'مِسك', price: 239, quantity: 4, cat: 'perfumes', img: '/products/NOTE_Musk.webp' },
  { id: 'roayal-tobacco', title: 'رويال توباكو', price: 229, quantity: 1, cat: 'perfumes', img: '/products/NOTE_Royal_Tobacco.webp' },
  { id: 'lady-rose', title: 'تولة ليدي روز', price: 119, quantity: 1, cat: 'tollah', img: '/products/NOTE_Lady_Rose.webp' }
];

const rStart = appJs.indexOf('const partitioned = partitionCartForPage(cart);');
const rEnd = appJs.indexOf('itemsContainer.innerHTML = html;');
const renderLoopCode = "function renderMock(cart) {\n" + appJs.slice(rStart, rEnd) + "\n return { html, partitioned }; \n}";

const { html, partitioned } = eval('(' + renderLoopCode + ')')(cart);

assert(html.includes('عرض عطرك بـ 1 ريال (اشترِ 2 واحصل على الثالث بـ 1 ريال)'), 'Must render Offer 2 header');
assert(html.includes('عرض عطرك بريال (اشترِ عطر واحصل على تولة بـ 1 ريال)'), 'Must render Offer 1 header');
assert(html.includes('🛍️ منتجات فردية (خارج العرض)'), 'Must render standalone header');
assert(html.includes('رويال توباكو'), 'Must render Royal Tobacco in standalone');
assert(!html.includes('undefined'), 'HTML must not contain undefined values');
assert(!html.includes('NaN'), 'HTML must not contain NaN values');

// Count card instances in html
const offerCardsCount = (html.match(/class="note-bundle-group-card"/g) || []).length;
assert.strictEqual(offerCardsCount, 2, 'Must have exactly 2 offer cards (1 for Offer 2, 1 for Offer 1)');

const discountedBadgesCount = (html.match(/مشمول بالعرض بـ 1 ريال ✨/g) || []).length;
assert.strictEqual(discountedBadgesCount, 2, 'Must have exactly 2 discounted items at 1 SAR (1 in Offer 2, 1 in Offer 1)');

const standaloneItemCount = (html.match(/class="note-cart-item note-cart-page-item/g) || []).length;
assert.strictEqual(standaloneItemCount, 1, 'Must have exactly 1 standalone item card (Royal Tobacco)');

console.log('PASS: Full HTML structure verified for real multi-tier bundle cart.');
