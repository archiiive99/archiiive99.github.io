const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const {recover}=require('../scripts/recover-visitor-count.cjs');
const root=path.join(__dirname,'..');
const source=fs.readFileSync(path.join(root,'visitor-counter.js'),'utf8').replace(/loadVisitorStats\(\);\s*$/,'');
const config=JSON.parse(fs.readFileSync(path.join(root,'visitor-counter.json'),'utf8'));
const date=new Date(Date.now()+9*3600000).toISOString().slice(0,10);
const ok=data=>({ok:true,json:async()=>data});
async function run({cache,oldCache,legacyTotal=null,fetcher=async()=>{throw new Error('offline')},storageBlocked=false}={}){
  const calls=[];
  const today={textContent:'—',parentElement:{}};
  const total={textContent:'—',parentElement:{}};
  const stats={hidden:false};
  const saved={'jaeha.visitor-stats.hitscounter.v1':cache,'jaeha.visitor-stats':oldCache};
  const context={AbortController,Date,Number,Promise,JSON,encodeURIComponent,
    setTimeout:callback=>setTimeout(callback,5),clearTimeout,
    document:{querySelector:selector=>({'.visitor-stats':stats,'#visitors-today':today,'#visitors-total':total}[selector])},
    localStorage:{getItem:key=>{if(storageBlocked)throw new Error('blocked');return JSON.stringify(saved[key])},setItem:(key,value)=>{if(storageBlocked)throw new Error('blocked');saved[key]=JSON.parse(value)}},
    fetch:async(url,options)=>{calls.push(url);if(url==='visitor-counter.json')return ok({...config,legacy:{...config.legacy,total:legacyTotal}});return fetcher(url,options,calls.length)}
  };
  vm.createContext(context);
  await vm.runInContext(source+';loadVisitorStats()',context);
  return {stats,today,total,calls,saved:saved['jaeha.visitor-stats.hitscounter.v1']};
}
test('provider outage leaves the footer visible and never retries an increment',async()=>{
  const result=await run();
  assert.equal(result.stats.hidden,false);
  assert.equal(result.total.textContent,'Unavailable');
  assert.equal(result.calls.filter(url=>url.includes('/api/hit?')).length,1);
  assert.equal(result.calls.filter(url=>url.includes('/api/history?')).length,1);
});
test('new provider immediately shows KST today and total',async()=>{
  const result=await run({fetcher:async url=>url.includes('counterapi.com')?Promise.reject(new Error('legacy offline')):ok({today_hits:3,total_hits:12})});
  assert.equal(result.today.textContent,'3');
  assert.equal(result.total.textContent,'12');
  assert.match(result.calls.find(url=>url.includes('/api/hit?')),/tz=Asia%2FSeoul/);
  assert.match(result.total.parentElement.title,/pending recovery/);
});
test('a previously cached legacy total is preserved and added to raw new counts',async()=>{
  const result=await run({oldCache:{total:1000},fetcher:async url=>url.includes('counterapi.com')?Promise.reject(new Error('offline')):ok({today_hits:2,total_hits:10})});
  assert.equal(result.total.textContent,(1010).toLocaleString());
  assert.equal(result.saved.total,10);
  assert.equal(result.saved.legacyTotal,1000);
});
test('automatic recovery replaces the baseline and never double-adds it on reload',async()=>{
  const fetcher=async url=>url.includes('counterapi.com')?ok({value:1200}):ok({today_hits:2,total_hits:10});
  const first=await run({cache:{total:9,legacyTotal:1000,date,today:1},fetcher});
  const second=await run({cache:first.saved,fetcher});
  assert.equal(first.total.textContent,(1210).toLocaleString());
  assert.equal(second.total.textContent,(1210).toLocaleString());
  assert.equal(second.saved.total,10);
  assert.ok(second.calls.filter(url=>url.includes('counterapi.com')).every(url=>url.endsWith('?readOnly=true')));
});
test('persisted legacy baseline avoids all calls to the retired service',async()=>{
  const result=await run({legacyTotal:1500,fetcher:async()=>ok({today_hits:0,total_hits:20})});
  assert.equal(result.total.textContent,(1520).toLocaleString());
  assert.equal(result.today.textContent,'0');
  assert.equal(result.calls.some(url=>url.includes('counterapi.com')),false);
});
test('hanging increment falls back to read-only KST history without duplicating the write',async()=>{
  const result=await run({legacyTotal:0,fetcher:async(url,{signal})=>{
    if(url.includes('/api/hit?'))return new Promise((_,reject)=>signal.addEventListener('abort',()=>reject(new Error('aborted'))));
    return ok({total_hits:21,today_hits:999,history:[{hit_date:'2000-01-01',hit_count:999},{hit_date:date,hit_count:4}]});
  }});
  assert.equal(result.today.textContent,'4');
  assert.equal(result.total.textContent,'21');
  assert.equal(result.calls.filter(url=>url.includes('/api/hit?')).length,1);
});
test('cached raw counts survive downtime, with yesterday hidden from Today',async()=>{
  const result=await run({cache:{today:4,total:1234,legacyTotal:100,date:'2000-01-01'}});
  assert.equal(result.stats.hidden,false);
  assert.equal(result.today.textContent,'Unavailable');
  assert.equal(result.total.textContent,(1334).toLocaleString());
});
test('blocked storage still permits live counts and rejects invalid legacy values',async()=>{
  const result=await run({storageBlocked:true,fetcher:async url=>url.includes('counterapi.com')?ok({value:null}):ok({today_hits:7,total_hits:17})});
  assert.equal(result.today.textContent,'7');
  assert.equal(result.total.textContent,'17');
});
test('recovery helper imports an absolute baseline once and only uses read-only API',async()=>{
  const calls=[];
  const updated=await recover(config,async url=>{calls.push(url);return ok({value:2345})});
  assert.equal(updated.legacy.total,2345);
  assert.ok(updated.legacy.recoveredAt);
  assert.ok(calls[0].endsWith('?readOnly=true'));
  const unchanged=await recover(updated,async()=>{throw new Error('must not request twice')});
  assert.equal(unchanged,updated);
});
test('recovery helper refuses errors and invalid values without changing configuration',async()=>{
  const original=JSON.stringify(config);
  await assert.rejects(recover(config,async()=>({ok:false,status:502})),/502/);
  await assert.rejects(recover(config,async()=>ok({value:null})),/invalid/);
  assert.equal(JSON.stringify(config),original);
});
