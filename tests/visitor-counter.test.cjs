const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
const source=fs.readFileSync(path.join(root,'app.js'),'utf8').split('// CounterAPI provides')[1].replace(/loadVisitorStats\(\);\s*$/,'');
const date=new Date(Date.now()+9*3600000).toISOString().slice(0,10);
async function run({cache,fetcher=async()=>{throw new Error('offline')},storageBlocked=false}={}){
  const calls=[];
  const today={textContent:'—',parentElement:{}};
  const total={textContent:'—',parentElement:{}};
  const divider={};
  const stats={hidden:true,querySelector:()=>divider};
  let saved=cache;
  const context={AbortController,Date,Number,Promise,JSON,
    setTimeout:callback=>setTimeout(callback,5),clearTimeout,
    document:{querySelector:selector=>({'.visitor-stats':stats,'#visitors-today':today,'#visitors-total':total}[selector])},
    localStorage:{getItem:()=>{if(storageBlocked)throw new Error('blocked');return JSON.stringify(saved)},setItem:(_key,value)=>{if(storageBlocked)throw new Error('blocked');saved=JSON.parse(value)}},
    fetch:async(url,options)=>{calls.push(url);return fetcher(url,options,calls.length)}
  };
  vm.createContext(context);
  await vm.runInContext('//'+source+';loadVisitorStats()',context);
  return {stats,today,total,divider,calls,saved};
}
const ok=value=>({ok:true,json:async()=>({value})});
test('outage hides placeholders and never retries an increment',async()=>{
  const result=await run();
  assert.equal(result.stats.hidden,true);
  assert.equal(result.calls.filter(url=>!url.includes('?')).length,1);
  assert.equal(result.calls.length,5);
  const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
  assert.match(css,/\.visitor-stats\[hidden\], \.visitor-stats \[hidden\] \{ display: none !important; \}/);
  assert.match(fs.readFileSync(path.join(root,'index.html'),'utf8'),/class="visitor-stats"[^>]* hidden/);
});
test('same-day cached counts survive an outage',async()=>{
  const result=await run({cache:{today:4,total:1234,date,updatedAt:Date.now()}});
  assert.equal(result.stats.hidden,false);
  assert.equal(result.today.textContent,'4');
  assert.equal(result.total.textContent,(1234).toLocaleString());
});
test('yesterday count is hidden while cached total remains visible',async()=>{
  const result=await run({cache:{today:4,total:1234,date:'2000-01-01'}});
  assert.equal(result.stats.hidden,false);
  assert.equal(result.today.parentElement.hidden,true);
  assert.equal(result.divider.hidden,true);
  assert.equal(result.total.parentElement.hidden,false);
});
test('a hanging increment times out and does not block successful reads',async()=>{
  const result=await run({fetcher:async(url,{signal})=>{
    if(!url.includes('?'))return new Promise((_,reject)=>signal.addEventListener('abort',()=>reject(new Error('aborted'))));
    return ok(url.includes('timeline=')?0:321);
  }});
  assert.equal(result.today.textContent,'0');
  assert.equal(result.total.textContent,'321');
  assert.equal(result.saved.total,321);
  assert.equal(result.saved.date,date);
});
test('a failed daily query does not hide a successful total',async()=>{
  const result=await run({fetcher:async url=>{if(url.includes('timeline='))throw new Error('daily unavailable');return ok(42)}});
  assert.equal(result.stats.hidden,false);
  assert.equal(result.total.textContent,'42');
  assert.equal(result.today.parentElement.hidden,true);
});
test('invalid responses never turn into a fake zero',async()=>{
  const result=await run({fetcher:async()=>ok(null)});
  assert.equal(result.stats.hidden,true);
  assert.equal(result.total.textContent,'—');
});
test('blocked browser storage still permits live counts',async()=>{
  const result=await run({storageBlocked:true,fetcher:async()=>ok(7)});
  assert.equal(result.stats.hidden,false);
  assert.equal(result.today.textContent,'7');
});
