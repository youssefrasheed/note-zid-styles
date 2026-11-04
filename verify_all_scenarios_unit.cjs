const assert = require('assert');
const fs = require('fs');
const path = require('path');

const appJs = fs.readFileSync(path.join(__dirname, 'note-app.js'), 'utf8');

// Extract noteProductsCatalog
const catalogMatch = appJs.match(/const noteProductsCatalog = (\[[\s\S]*?\]);/);
assert(catalogMatch, 'Found noteProductsCatalog');
const noteProductsCatalog = eval(catalogMatch[1]);

// Extract normalizeCartId, signature, matchingCartPayloads from note-app.js
const bodySprayBundleId = '4e22b43143a04cd89e45f6a671f2620c';
const normalizeCartId = value => String(value || '').replace(/-/g, '').toLowerCase();

const isUuid = (s) => typeof s === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
const resolveZidUuid = (item) => {
  if (!item) return null;
  const rawKey = item.id || item.product_id;
  const p = noteProductsCatalog.find(cp => cp.id === rawKey || cp.id === item.product_id || cp.slug === rawKey);
  if (p && isUuid(p.zid_id)) return p.zid_id;
  if (isUuid(item.product_id)) return item.product_id;
  if (isUuid(item.id)) return item.id;
  if (p && isUuid(p.id)) return p.id;
  return (p && p.zid_id) || item.product_id || item.id;
};

// Use the function directly from note-app.js
const sigStart = appJs.indexOf('const signature = (items, bodySprayNames = null) => {');
assert(sigStart !== -1, 'Found signature');
const sigEnd = appJs.indexOf('  };\n\n  function matchingCartPayloads', sigStart);
assert(sigEnd !== -1, 'Found signature end');
const signature = eval(appJs.slice(sigStart + 'const signature = '.length, sigEnd + '  };'.length));

const qbsMatch = appJs.match(/const QUALIFIED_BODY_SPRAYS = new Set\(\[([\s\S]*?)\]\.map\(normalizeCartId\)\);/);
assert(qbsMatch, 'Found QUALIFIED_BODY_SPRAYS');
global.QUALIFIED_BODY_SPRAYS = new Set(eval('[' + qbsMatch[1] + ']').map(normalizeCartId));

const isBodyMatch = appJs.match(/function isBodySprayBundleOption\(product\) \{([\s\S]*?)\n  \}/);
assert(isBodyMatch, 'Found isBodySprayBundleOption');
const isBodySprayBundleOption = new Function('product', isBodyMatch[1]);

global.normalizeCartId = normalizeCartId;
global.bodySprayBundleId = bodySprayBundleId;
global.signature = signature;
global.noteProductsCatalog = noteProductsCatalog;
global.resolveZidUuid = resolveZidUuid;
global.isBodySprayBundleOption = isBodySprayBundleOption;
const matchFnMatch = appJs.match(/function matchingCartPayloads\(payloads, rows\) \{([\s\S]*?)\n  \}/);
assert(matchFnMatch, 'Found matchingCartPayloads');
const matchingCartPayloads = new Function('payloads', 'rows', matchFnMatch[1]);
global.matchingCartPayloads = matchingCartPayloads;

console.log('--- TEST 1: Regular Loose Items (No Bundles) ---');
const regPayloads = [
  { product_id: '764d587d-7cba-46b3-8d34-265ee4bc4b6a', quantity: 1 } // Royal Tobacco
];
const regZidResponse = [
  { id: 'row1', product_id: '764d587d7cba46b38d34265ee4bc4b6a', quantity: 1 }
];
assert.strictEqual(matchingCartPayloads(regPayloads, regZidResponse), true, 'Regular items must match');
console.log('✓ PASS: Regular items match');

console.log('--- TEST 2: Tola Offer (1 Perfume + 1 Tola) ---');
const tolaPayloads = [
  { product_id: '764d587d-7cba-46b3-8d34-265ee4bc4b6a', quantity: 1 }, // Tobacco 229
  { product_id: 'dcea75e0-ac06-424d-a0ac-0bd94848b9c6', quantity: 1 }  // Sugar Oud 119
];
const tolaZidResponse = [
  { id: 'row1', product_id: '764d587d7cba46b38d34265ee4bc4b6a', quantity: 1 },
  { id: 'row2', product_id: 'dcea75e0ac06424da0ac0bd94848b9c6', quantity: 1 }
];
assert.strictEqual(matchingCartPayloads(tolaPayloads, tolaZidResponse), true, 'Tola offer must match');
console.log('✓ PASS: Tola offer matches');

console.log('--- TEST 3: 13-Item Cart with Dynamic Bundle Name-Only Sub-Items ---');
const spray1Uuid = normalizeCartId('940195dc-fc3b-4180-b062-c1cd85809564'); // Royal Powder
const spray2Uuid = normalizeCartId('7de839f3-86a9-4fac-ba15-fad102696e73'); // Bahr
const spray3Uuid = normalizeCartId('7a9286bf-4d38-447a-9b9f-fcd006e35e9b'); // Choconilla

// Set raw names on catalog items as ZidSyncManager.applyToCatalog does
const spray1Prod = noteProductsCatalog.find(p => normalizeCartId(p.id) === spray1Uuid || p.id === 'all-over-powderose');
if (spray1Prod) { spray1Prod.name = 'رويال بودر'; spray1Prod.zid_id = '940195dc-fc3b-4180-b062-c1cd85809564'; }
const spray2Prod = noteProductsCatalog.find(p => normalizeCartId(p.id) === spray2Uuid || p.id === 'all-over-bahr');
if (spray2Prod) { spray2Prod.name = 'بحر'; spray2Prod.zid_id = '7de839f3-86a9-4fac-ba15-fad102696e73'; }
const spray3Prod = noteProductsCatalog.find(p => normalizeCartId(p.id) === spray3Uuid || p.id === 'all-over-choconilla');
if (spray3Prod) { spray3Prod.name = 'شيكونيلا'; spray3Prod.zid_id = '7a9286bf-4d38-447a-9b9f-fcd006e35e9b'; }

// Also add Royal Tobacco spray to test non-ambiguity with Royal Tobacco perfume
const tobaccoSpray = noteProductsCatalog.find(p => p.id === 'all-over-royal-tobacco');
if (tobaccoSpray) { tobaccoSpray.name = 'رويال توباكو'; tobaccoSpray.zid_id = '5d373011-9e95-472c-bec6-51fd8ed457dc'; }
const tobaccoPerfume = noteProductsCatalog.find(p => p.id === 'roayal-tobacco' || p.id === '764d587d-7cba-46b3-8d34-265ee4bc4b6a');
if (tobaccoPerfume) { tobaccoPerfume.name = 'رويال توباكو'; }

const p13Payloads = [
  {
    product_id: bodySprayBundleId,
    quantity: 1,
    sub_items: [
      { id: spray1Uuid, product_id: spray1Uuid, quantity: 1, selection_group_id: 'group1' },
      { id: spray2Uuid, product_id: spray2Uuid, quantity: 1, selection_group_id: 'group2' },
      { id: spray3Uuid, product_id: spray3Uuid, quantity: 1, selection_group_id: 'group3' }
    ]
  },
  { product_id: '620ef67b-39ba-41f0-a4f2-f9ce56cf3b1c', quantity: 1 }, // Royal Leather Niche
  { product_id: '08874f48-8caf-441f-876b-de578508105a', quantity: 2 }, // Phantom x2
  { product_id: '764d587d-7cba-46b3-8d34-265ee4bc4b6a', quantity: 1 }, // Tobacco
  { product_id: 'cc5e1bb2-bebc-4ef7-9e1b-af52362bc852', quantity: 1 }, // Note for Him
  { product_id: '7a28376c-3973-4822-b6b2-b3a6a4e7013e', quantity: 1 }, // Oud Rosewood
  { product_id: '54805f9b-53c4-4e4c-a75a-5173eda716c8', quantity: 1 }, // Aura
  { product_id: 'b99d66f3-c201-4de6-af2d-4e991f483a6b', quantity: 1 }, // Powderose
  { product_id: 'dcea75e0-ac06-424d-a0ac-0bd94848b9c6', quantity: 2 }  // Sugar Oud x2
];

// Exact live response structure returned by Zid
const p13ZidResponse = [
  {
    id: 'bundle_row',
    product_id: bodySprayBundleId,
    quantity: 1,
    sub_items: [
      { product_name: 'رويال بودر', quantity: 1 },
      { product_name: 'بحر', quantity: 1 },
      { product_name: 'شيكونيلا', quantity: 1 }
    ]
  },
  { id: 'r1', product_id: '620ef67b39ba41f0a4f2f9ce56cf3b1c', quantity: 1 },
  { id: 'r2', product_id: '08874f488caf441f876bde578508105a', quantity: 1 },
  { id: 'r3', product_id: '08874f488caf441f876bde578508105a', quantity: 1 }, // Zid split lines for Phantom
  { id: 'r4', product_id: '764d587d7cba46b38d34265ee4bc4b6a', quantity: 1 },
  { id: 'r5', product_id: 'cc5e1bb2bebc4ef79e1baf52362bc852', quantity: 1 },
  { id: 'r6', product_id: '7a28376c39734822b6b2b3a6a4e7013e', quantity: 1 },
  { id: 'r7', product_id: '54805f9b53c44e4ca75a5173eda716c8', quantity: 1 },
  { id: 'r8', product_id: 'b99d66f3c2014de6af2d4e991f483a6b', quantity: 1 },
  { id: 'r9', product_id: 'dcea75e0ac06424da0ac0bd94848b9c6', quantity: 2 }
];

assert.strictEqual(matchingCartPayloads(p13Payloads, p13ZidResponse), true, '13-item cart must match perfectly');
console.log('✓ PASS: 13-item cart with dynamic bundle name-only sub-items matched perfectly!');

console.log('--- TEST 4: Negative Checks (Must Fail on Corrupted Data) ---');
// 4A: Missing bundle item
const corruptMissing = JSON.parse(JSON.stringify(p13ZidResponse));
corruptMissing[0].sub_items.pop();
assert.strictEqual(matchingCartPayloads(p13Payloads, corruptMissing), false, 'Must fail when item missing');
console.log('✓ PASS: Correctly failed on missing sub-item');

// 4B: Wrong quantity
const corruptQty = JSON.parse(JSON.stringify(p13ZidResponse));
corruptQty[0].sub_items[0].quantity = 2;
assert.strictEqual(matchingCartPayloads(p13Payloads, corruptQty), false, 'Must fail on wrong quantity');
console.log('✓ PASS: Correctly failed on wrong quantity');

// 4C: Wrong product name
const corruptName = JSON.parse(JSON.stringify(p13ZidResponse));
corruptName[0].sub_items[0].product_name = 'معطر غير موجود';
assert.strictEqual(matchingCartPayloads(p13Payloads, corruptName), false, 'Must fail on uncataloged name');
console.log('✓ PASS: Correctly failed on uncataloged product name');

// 4D: Royal Tobacco body spray works without ambiguity despite perfume of same name
const tobaccoSprayUuid = normalizeCartId('5d373011-9e95-472c-bec6-51fd8ed457dc');
const pTobacco = [
  {
    product_id: bodySprayBundleId,
    quantity: 1,
    sub_items: [
      { id: tobaccoSprayUuid, product_id: tobaccoSprayUuid, quantity: 1, selection_group_id: 'g1' },
      { id: spray2Uuid, product_id: spray2Uuid, quantity: 1, selection_group_id: 'g2' },
      { id: spray3Uuid, product_id: spray3Uuid, quantity: 1, selection_group_id: 'g3' }
    ]
  }
];
const zidTobacco = [
  {
    product_id: bodySprayBundleId,
    quantity: 1,
    sub_items: [
      { product_name: 'رويال توباكو', quantity: 1 },
      { product_name: 'بحر', quantity: 1 },
      { product_name: 'شيكونيلا', quantity: 1 }
    ]
  }
];
assert.strictEqual(matchingCartPayloads(pTobacco, zidTobacco), true, 'Royal Tobacco spray must not be ambiguous with perfume');
console.log('✓ PASS: Royal Tobacco spray matches without ambiguity');

// 4E: Truly ambiguous body spray names (two distinct sprays sharing the same name) MUST fail safely
const fakeSpray2 = { id: 'fake-spray-uuid', zid_id: 'fake-spray-uuid', name: 'بحر', cat: 'all-over' };
noteProductsCatalog.push(fakeSpray2);
assert.strictEqual(matchingCartPayloads(p13Payloads, p13ZidResponse), false, 'Must fail when body spray name is duplicated across two sprays');
noteProductsCatalog.pop(); // cleanup
console.log('✓ PASS: Correctly failed when body spray name is ambiguous across two sprays');

console.log('\n======================================================');
console.log('🎯 ALL MATCHING TESTS PASSED WITH 100% PRECISION');
console.log('======================================================');
