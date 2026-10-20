// Keep the new provider's raw counts separate from the legacy total.
const loadVisitorStats=async()=>{
  const stats=document.querySelector('.visitor-stats');
  const today=document.querySelector('#visitors-today');
  const total=document.querySelector('#visitors-total');
  const date=new Date(Date.now()+9*60*60*1000).toISOString().slice(0,10);
  const cacheKey='jaeha.visitor-stats.hitscounter.v1';
  const validCount=value=>Number.isSafeInteger(value)&&value>=0;
  let cached={};
  try{cached=JSON.parse(localStorage.getItem(cacheKey))||{}}catch{}
  // Preserve any count saved by the previous implementation during the outage.
  try{
    const old=JSON.parse(localStorage.getItem('jaeha.visitor-stats'));
    if(!validCount(cached.legacyTotal)&&validCount(old?.total))cached.legacyTotal=old.total;
  }catch{}
  const save=()=>{try{localStorage.setItem(cacheKey,JSON.stringify(cached))}catch{}};
  const render=()=>{
    stats.hidden=false;
    today.textContent=cached.date===date&&validCount(cached.today)?cached.today.toLocaleString():'—';
    total.textContent=validCount(cached.total)?(cached.total+(validCount(cached.legacyTotal)?cached.legacyTotal:0)).toLocaleString():validCount(cached.legacyTotal)?cached.legacyTotal.toLocaleString():'—';
    total.parentElement.title=validCount(cached.legacyTotal)?'Includes recovered visits from the previous counter.':'Visits since October 20, 2026. Earlier visits are pending recovery.';
  };
  render();
  const request=async url=>{
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),5000);
    try{
      const response=await fetch(url,{mode:'cors',credentials:'omit',cache:'no-store',signal:controller.signal});
      if(!response.ok)throw new Error('counter request failed');
      return await response.json();
    }finally{clearTimeout(timeout)}
  };
  try{
    const config=await request('visitor-counter.json');
    if(config.site!=='https://archiiive99.github.io/'||config.timezone!=='Asia/Seoul')throw new Error('invalid counter configuration');
    if(validCount(config.legacy.total)){
      cached.legacyTotal=config.legacy.total;
      save();render();
    }
    const recoverLegacy=async()=>{
      if(validCount(config.legacy.total))return;
      try{
        const data=await request(config.legacy.endpoint);
        if(!validCount(data.value))throw new Error('invalid legacy count');
        cached.legacyTotal=data.value;
        save();render();
      }catch{}
    };
    const track=async()=>{
      const query=`url=${encodeURIComponent(config.site)}&tz=${encodeURIComponent(config.timezone)}`;
      const apply=data=>{
        if(!validCount(data.total_hits)||!validCount(data.today_hits))throw new Error('invalid counter value');
        cached={...cached,total:data.total_hits,today:data.today_hits,date,updatedAt:Date.now()};
        save();render();
      };
      try{
        // This endpoint increments once. Do not retry an uncertain write.
        apply(await request(`https://hitscounter.dev/api/hit?${query}&output=json`));
      }catch{
        // The history endpoint is read-only. Select the KST date explicitly.
        try{
          const data=await request(`https://hitscounter.dev/api/history?url=${encodeURIComponent(config.site)}`);
          if(!Array.isArray(data.history))throw new Error('invalid history');
          const daily=data.history.find(row=>row.hit_date===date);
          apply({...data,today_hits:daily?daily.hit_count:0});
        }catch{}
      }
    };
    // Legacy downtime must never delay the working provider.
    await Promise.all([track(),recoverLegacy()]);
  }catch{}
  if(today.textContent==='—')today.textContent='Unavailable';
  if(total.textContent==='—')total.textContent='Unavailable';
};
loadVisitorStats();
