const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(__dirname+'/storefront-live.js','utf8');
const ctx={nativeCartItems:c=>c.products};vm.createContext(ctx);
vm.runInContext(source.slice(source.indexOf('  function validateNativeOfferPrices('),source.indexOf('  async function syncNativeCartWithPayloads(')),ctx);
const gift=(id,price=1,name='الثالث بريال 189')=>({product_id:id,quantity:1,price,is_discounted:true,meta:{bundle_offer:{name}}});
for(const products of [[gift('any-product')],[gift('tola',1,'عطرك بريال (1+تولة)')],[gift('free',0,'هدية مجانية')]])assert.doesNotThrow(()=>ctx.validateNativeOfferPrices({products}));
for(const price of [0,1.05,null,NaN])assert.throws(()=>ctx.validateNativeOfferPrices({products:[gift('any',price)]}));
console.log('PASS: Zid chooses reward recipients; one-riyal promotions still reject zero, missing and incorrect reward prices');
