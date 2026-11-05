const assert = require('node:assert/strict');
require('./test_zid_grounding_audit.cjs');
const manager=global.CartManager;
const bundleId='4e22b431-43a0-4cd8-9e45-f6a671f2620c';
const sprays=[
 {id:'940195dc-fc3b-4180-b062-c1cd85809564',title:'رويال بودر'},
 {id:'7de839f3-86a9-4fac-ba15-fad102696e73',title:'بحر'},
 {id:'7a9286bf-4d38-447a-9b9f-fcd006e35e9b',title:'شيكونيلا'}
].map(p=>({...p,product_id:p.id,zid_id:p.id,cat:'all-over',category_ids:['1759042'],price:169,quantity:1}));
const selections=sprays.map((p,index)=>({id:p.id,product_id:p.id,quantity:1,selection_group_id:'group-'+index}));
const explicit={id:bundleId,product_id:bundleId,zid_id:bundleId,title:'باقة 3 معطرات الجسم',cat:'packages',category_ids:['1752110'],price:249,quantity:2,sub_items:selections};
const tola={id:'dcea75e0-ac06-424d-a0ac-0bd94848b9c6',title:'تولة شوجر عود',cat:'tollah',category_ids:['1421002'],price:119,quantity:1};
let partition=manager.partitionCart(sprays);
assert.equal(partition.groups.tier1_spray_bundles.length,0);
assert.equal(partition.groups.tier2_trios.length,1);
assert.equal(partition.totalDiscount,168);
assert.equal(manager.buildZidPayloads(sprays).some(row=>row.product_id===bundleId),false);
const payloads=manager.buildZidPayloads([...sprays,explicit]);
const bundles=payloads.filter(row=>row.product_id===bundleId);
assert.equal(bundles.reduce((sum,row)=>sum+row.quantity,0),2);
for(const row of bundles)assert.deepEqual(row.sub_items.map(p=>[p.product_id,p.quantity,p.selection_group_id]),selections.map(p=>[p.product_id,p.quantity,p.selection_group_id]));
assert.equal(payloads.filter(row=>row.product_id!==bundleId).reduce((sum,row)=>sum+row.quantity,0),3);
partition=manager.partitionCart([explicit,tola]);
assert.equal(partition.groups.tier3_pairs.length,0);
partition=manager.partitionCart([sprays[0],tola]);
assert.equal(partition.groups.tier3_pairs.length,1);
console.log('PASS: loose sprays use offers, only explicitly chosen bundles become bundle products, selections and quantities survive');
