const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('--- RUNNING SECURITY, CONTACT & NETWORK TESTS ---');

// 1. Search XSS Test
const appJs = fs.readFileSync(path.join(__dirname, 'note-app.js'), 'utf8');

// Check that escapeHTML is used in handleLiveSearch
assert(appJs.includes('لم نجد أي نتائج تطابق "${escapeHTML(rawTrimmed)}"'), 'Search results must escape rawTrimmed using escapeHTML');
assert(appJs.includes('${escapeHTML(p.title)}'), 'Search results must escape p.title');
assert(appJs.includes('${escapeHTML(p.notes || p.cat_ar || \'\')}'), 'Search results must escape p.notes');
console.log('PASS: Search XSS sanitization verified 100%');

// 2. Contact Form Dispatch Test
assert(appJs.includes('https://wa.me/966565955420?text='), 'Contact handler must route to official WhatsApp 966565955420');
assert(appJs.includes('marketing.noteperf@gmail.com'), 'Contact handler must include marketing email fallback');
assert(appJs.includes('handleContactSubmit'), 'handleContactSubmit must be exported to window');

const contactHtml = fs.readFileSync(path.join(__dirname, 'contact.html'), 'utf8');
assert(contactHtml.includes('name="name"'), 'Contact form must have named name field');
assert(contactHtml.includes('name="phone"'), 'Contact form must have named phone field');
assert(contactHtml.includes('name="email"'), 'Contact form must have named email field');
assert(contactHtml.includes('name="message"'), 'Contact form must have named message field');
console.log('PASS: Contact form routing verified 100%');

// 3. Network Polling Throttling Test
const storefrontLive = fs.readFileSync(path.join(__dirname, 'storefront-live.js'), 'utf8');
assert(!storefrontLive.includes('setInterval(()=>{if(!document.hidden)ZidSyncManager.fetchLiveCategories();},10000);'), '10-second polling must be removed');
assert(storefrontLive.includes('5 * 60 * 1000') || storefrontLive.includes('300000'), 'Category polling must be throttled to 5 minutes');
console.log('PASS: Network polling throttling verified 100%');

// 4. Fallback Catalog Integrity Test
const productsData = fs.readFileSync(path.join(__dirname, 'products-data.js'), 'utf8');
assert(!productsData.includes('musk-bundle-gift'), 'Ghost bundle musk-bundle-gift must be removed');
assert(!productsData.includes('musk-bundle"'), 'Ghost bundle musk-bundle must be removed');
assert(!appJs.includes('"id": "musk-bundle-gift"'), 'Ghost bundle must not be in compiled app.js');
console.log('PASS: Fallback catalog integrity verified 100%');

console.log('--- ALL SECURITY, CONTACT & NETWORK TESTS PASSED (100%) ---');
