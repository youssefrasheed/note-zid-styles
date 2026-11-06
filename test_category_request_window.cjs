const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(__dirname+'/storefront-live.js','utf8');let now=10000,calls=0,resolveFetch,registered=0;
const ctx={ZidSyncManager:{},categoryListAuthoritative:false,Date:{now:()=>now},Number,Promise,JSON,AbortController,setTimeout,clearTimeout,console:{warn(){}},fetch:()=>{calls++;return new Promise(resolve=>{resolveFetch=resolve})},registerCategories(){registered++},refreshCategoryUI(){},initSliders(){},document:{getElementById:()=>null},CartManager:{renderDrawer(){}}};
vm.createContext(ctx);vm.runInContext(source.slice(source.indexOf('  ZidSyncManager.fetchLiveCategories=function()'),source.indexOf('  setInterval(()=>{if(!document.hidden)ZidSyncManager.fetchLiveCategories();}')),ctx);
const manager=ctx.ZidSyncManager;
(async()=>{
 const first=manager.fetchLiveCategories(),overlap=manager.fetchLiveCategories();assert.equal(first,overlap);assert.equal(calls,1);
 resolveFetch({ok:true,json:async()=>[{id:1}]});assert.equal(await first,true);assert.equal(registered,1);
 for(const age of [0,100,2999]){now=10000+age;assert.equal(await manager.fetchLiveCategories(),true);assert.equal(calls,1);}
 now=13000;const expired=manager.fetchLiveCategories();assert.equal(calls,2);resolveFetch({ok:false});assert.equal(await expired,false);
 const retry=manager.fetchLiveCategories();assert.equal(calls,3);resolveFetch({ok:true,json:async()=>[{id:2}]});assert.equal(await retry,true);assert.equal(registered,2);
 now=12000;const backwards=manager.fetchLiveCategories();assert.equal(calls,4);resolveFetch({ok:true,json:async()=>[{id:2}]});await backwards;
 assert.equal(registered,2,'unchanged categories must not render again');
 console.log('PASS: rapid category requests reuse the applied list for 3s; pending, expiry, failure retry and clock changes are handled');
})().catch(e=>{console.error(e);process.exitCode=1});
