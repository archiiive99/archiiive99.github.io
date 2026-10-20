const fs=require('node:fs/promises');
const path=require('node:path');

async function recover(config,request=fetch){
  if(Number.isSafeInteger(config.legacy.total)&&config.legacy.total>=0)return config;
  const response=await request(config.legacy.endpoint,{signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw new Error(`Legacy counter returned HTTP ${response.status}; no values were changed.`);
  const {value}=await response.json();
  if(!Number.isSafeInteger(value)||value<0)throw new Error('Legacy counter returned an invalid value; no values were changed.');
  return {...config,legacy:{...config.legacy,total:value,recoveredAt:new Date().toISOString()}};
}
module.exports={recover};
if(require.main===module){
  (async()=>{
    const file=path.join(__dirname,'..','visitor-counter.json');
    const config=JSON.parse(await fs.readFile(file,'utf8'));
    const updated=await recover(config);
    if(updated===config){console.log(`Legacy total already preserved: ${config.legacy.total}. Nothing changed.`);return}
    await fs.writeFile(file,JSON.stringify(updated,null,2)+'\n');
    console.log(`Preserved legacy total: ${updated.legacy.total}. Commit and deploy visitor-counter.json to share it with every visitor.`);
  })().catch(error=>{console.error(error.message);process.exitCode=1});
}
