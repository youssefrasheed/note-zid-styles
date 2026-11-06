const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(__dirname+'/storefront-live.js','utf8');
function fixture(){
 let now=0,next=0;const timers=new Map();
 const status={hidden:true},items={setAttribute(k,v){this[k]=v}};
 const ctx={window:{},CartManager:{getCart:()=>[{}]},document:{getElementById:id=>id.includes('loading')?status:items},Date:{now:()=>now},clearTimeout:id=>timers.delete(id),setTimeout:(fn,delay)=>{timers.set(++next,{fn,at:now+delay});return next}};
 vm.createContext(ctx);vm.runInContext(source.slice(source.indexOf('  function renderOfferOrderNotice('),source.indexOf('  let cartLoadingJobs =')),ctx);vm.runInContext(source.slice(source.indexOf('  let cartLoadingJobs ='),source.indexOf('  let scheduledQuantitySync;')),ctx);
 return {ctx,status,items,advance(ms){now+=ms;for(const [id,t]of [...timers])if(t.at<=now){timers.delete(id);t.fn();}}};
}
for(const latency of [0,50,149,150,700,1800]){
 const f=fixture();f.ctx.startCartLoading();f.advance(latency);
 assert.equal(f.status.hidden,false,'must stay visible until request finishes');
 f.ctx.finishCartLoading();const remaining=Math.max(0,150-latency);
 if(remaining){f.advance(remaining-1);assert.equal(f.status.hidden,false);f.advance(1);}else f.advance(0);
 assert.equal(f.status.hidden,true);assert.equal(f.items['aria-busy'],'false');
}
const f=fixture();f.ctx.startCartLoading();f.ctx.startCartLoading();f.advance(2000);f.ctx.finishCartLoading();f.advance(1000);assert.equal(f.status.hidden,false);assert.equal(f.items['aria-busy'],'true');f.ctx.finishCartLoading();f.advance(0);assert.equal(f.status.hidden,true);
const retry=fixture();retry.ctx.startCartLoading();retry.ctx.finishCartLoading();retry.advance(100);retry.ctx.startCartLoading();retry.advance(1000);assert.equal(retry.status.hidden,false);retry.ctx.finishCartLoading();retry.advance(0);assert.equal(retry.status.hidden,true);
console.log('PASS: 150ms minimum, no added delay on slow responses, overlapping requests and restarted requests keep loading until confirmation');
