const publications = [
  {year:2026,venue:'Under Review',type:'review',title:'PAVER: Planning-Aligned Pretraining of BEV Representations with Sparse Action-Conditioned Targets for End-to-End Autonomous Driving',authors:'Jaeha Song, Soonmin Hwang',image:'assets/paver-demo.webp',animated:true,video:'assets/paver-demo.mp4',alt:'PAVER multi-camera driving and BEV Grad-CAM comparison',description:'Planning-aligned BEV encoder pretraining with sparse action-conditioned targets.',links:[['Paper','https://arxiv.org/abs/2609.22868'],['Project','https://archiiive99.github.io/PAVER/'],['Code','https://github.com/archiiive99/PAVER']]},
  {year:2026,venue:'ICLR 2026',title:'Self-Guided Low Light Object Detection Framework',authors:'Gwangik Shin, Jaeha Song, Soonmin Hwang',image:'assets/sgldet.png',alt:'SGLDet auxiliary training pipeline',description:'Self-guided representation learning for low-light detection without extra inference-time computation.',links:[['Paper','https://openreview.net/forum?id=MGgAJ8yy2D'],['Project','https://gw-shin.github.io/sgldet-page/'],['Code','https://github.com/gw-shin/SGLDet']]},
  {year:2026,venue:'ICPR 2026',title:'RSD-BEV: Residual Self-Distillation Framework for Efficient BEV Representation Learning',authors:'Sungjin Park, Jaeha Song, Soonmin Hwang',thumbnail:'assets/rsd-bev-overview.png',links:[['Paper','https://doi.org/10.1007/978-3-032-31438-3_21']]},
  {year:2025,venue:'CVPR 2025 Workshop',title:'Swin-Trajectory: Technical Report for 2025 Waymo Vision-based End-to-End Driving Challenge',authors:'Sungjin Park, Gwangik Shin, Jaeha Song, Sumin Lee, Hyukju Shon, Byounggun Park, Jinhee Na, Hawook Jeong, Soonmin Hwang',description:'3rd place in the 2025 Waymo Vision-based End-to-End Driving Challenge.',thumbnail:'assets/swin-figure.png',links:[['Paper','https://storage.googleapis.com/waymo-uploads/files/research/2025%20Technical%20Reports/2025%20WOD%20E2E%20Driving%20Challenge%20-%203rd%20Place%20-%20Swin-Trajectory.pdf']]},
  {year:2025,venue:'ICAIIC 2025',title:'Efficient Occupancy Prediction with Instance-Level Attention',authors:'Sungjin Park, Jaeha Song, Soonmin Hwang',thumbnail:'assets/occupancy-figure.png',links:[['Paper','https://ieeexplore.ieee.org/document/10920673']]},
  {year:2025,venue:'ICAIIC 2025',title:'Leveraging Camera-Based Methods for Enhanced Feature-to-World Mapping',authors:'Jaeha Song, Sungjin Park, Soonmin Hwang',thumbnail:'assets/mapping-figure.png',links:[['Paper','https://ieeexplore.ieee.org/document/10920789']]},
  {year:2024,venue:'BMVC 2024',title:'Advancing Medical Image Segmentation: Morphology-Driven Learning with Diffusion Transformer',authors:'Sungmin Kang, Jaeha Song, Jihie Kim',thumbnail:'assets/bmvc-figure.png',links:[['Paper','https://arxiv.org/abs/2408.00347']]},
  {year:2024,venue:'Yonsei Medical Journal',title:'Detection of Cervical Foraminal Stenosis From Oblique Radiograph Using Convolutional Neural Network Algorithm',authors:'Jihie Kim, Jae Jun Yang, Jaeha Song, SeongWoon Jo, YoungHoon Kim, Jiho Park, Jinbok Lee, Gun Woo Lee, Sehan Park',thumbnail:'assets/ymj-figure.png',links:[['Paper','https://doi.org/10.3349/ymj.2023.0091']]},
];
// All content is maintained locally, not supplied by runtime HTML or a remote API.
const escapeHTML = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
const renderAuthors = (authors) => authors.split(', ').map((name,index,names) => `<span class="author-name">${name === 'Jaeha Song' ? `<strong>${escapeHTML(name)}</strong>` : escapeHTML(name)}${index < names.length-1 ? ',' : ''}</span>`).join(' ');
function venueBadge(p) {
  const label=p.type==='review'||/20\d{2}/.test(p.venue)?p.venue:`${p.venue} ${p.year}`;
  const family=p.type==='review'?'review':p.venue.startsWith('ICLR')?'iclr':p.venue.startsWith('ICPR')?'icpr':p.venue.startsWith('CVPR')?'cvpr':'academic';
  return `<span class="venue venue-${family}">${escapeHTML(label)}</span>`;
}
document.querySelector('#publications').innerHTML = publications.map(p => `<article class="publication ${p.image?'featured':p.thumbnail?'with-thumbnail':''}" data-year="${p.year}">${p.image?`<a class="pub-visual" href="${p.links.find(([name])=>name==='Project')[1]}" aria-label="${escapeHTML(p.title)} project">${p.video?`<video data-src="${p.video}" muted loop playsinline disablepictureinpicture disableremoteplayback controlslist="nodownload nofullscreen noremoteplayback" preload="none" poster="assets/paver.png" aria-label="${escapeHTML(p.alt)}" width="1200" height="506"></video>`:`<img src="${p.image}" alt="${escapeHTML(p.alt)}" loading="lazy" width="960" height="350">`}<span class="figure-link">${icon('arrow-up-right')}</span></a>`:''}<div class="pub-body"><div class="pub-meta">${venueBadge(p)}</div><h3>${escapeHTML(p.title)}</h3><p class="authors">${renderAuthors(p.authors)}</p>${p.description?`<p class="pub-description">${escapeHTML(p.description).replace(/^3rd place/, '<strong class="result-highlight">3rd place</strong>')}</p>`:''}<div class="pub-links">${p.links.map(([name,url])=>`<a href="${url}">${icon(name==='Code'?'github':name==='Paper'?'file-text':'arrow-up-right')}${name}</a>`).join('')}</div></div>${p.thumbnail?`<button class="pub-thumbnail" type="button" data-figure="${p.thumbnail}" data-title="${escapeHTML(p.title)}" aria-label="Enlarge figure: ${escapeHTML(p.title)}"><img src="${p.thumbnail}" alt="Main figure from ${escapeHTML(p.title)}" loading="lazy" width="1200" height="700"></button>`:''}</article>`).join('');
lucide.createIcons({attrs:{'stroke-width':1.6}});

const figureDialog=document.createElement('dialog');
figureDialog.className='figure-dialog';
figureDialog.setAttribute('aria-label','Publication figure');
figureDialog.innerHTML='<button class="figure-close" type="button" aria-label="Close figure" title="Close figure">'+icon('x')+'</button><img alt="">';
document.body.append(figureDialog);
lucide.createIcons({attrs:{'stroke-width':1.6}});
figureDialog.querySelector('button').addEventListener('click',()=>figureDialog.close());
figureDialog.addEventListener('click',event=>{if(event.target===figureDialog)figureDialog.close()});
document.querySelectorAll('[data-figure]').forEach(button=>button.addEventListener('click',()=>{
  const image=figureDialog.querySelector('img');
  image.src=button.dataset.figure;image.alt=button.dataset.title;
  figureDialog.showModal();
}));

const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const previewVideos=[...document.querySelectorAll('.pub-visual video')];
const previewPosters=new Map(previewVideos.map(video=>{
  video.controls=false;
  video.muted=true;
  const poster=document.createElement('img');
  poster.src=video.poster;
  poster.alt=video.getAttribute('aria-label') || '';
  poster.className='preview-poster';
  poster.hidden=true;
  video.before(poster);
  return [video,poster];
}));
const visibleVideos=new Set();
const updatePreviews=()=>previewVideos.forEach(video=>{
  if(visibleVideos.has(video)&&!motionPreference.matches&&!document.hidden){
    if(!video.getAttribute('src'))video.src=video.dataset.src;
    video.play().then(()=>{
      video.hidden=false;
      previewPosters.get(video).hidden=true;
    }).catch(error=>{
      if(error.name==='AbortError')return;
      video.hidden=true;
      previewPosters.get(video).hidden=false;
    });
  }else video.pause();
});
const previewObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)visibleVideos.add(entry.target);else visibleVideos.delete(entry.target)});
  updatePreviews();
});
previewVideos.forEach(video=>previewObserver.observe(video));
motionPreference.addEventListener('change',updatePreviews);
document.addEventListener('visibilitychange',updatePreviews);
try{localStorage.removeItem('jaeha.publication-filter')}catch{}
function setTheme(theme){
  document.documentElement.dataset.theme=theme;
  const toggle=document.querySelector('.theme-toggle');
  const label=theme==='dark'?'Switch to light mode':'Switch to dark mode';
  toggle.setAttribute('aria-label',label);
  toggle.title=label;
  document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#161616':'#f3f3f3';
}
setTheme(document.documentElement.dataset.theme);
document.querySelector('.theme-toggle').addEventListener('click',()=>{
  const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';
  setTheme(theme);
  try{localStorage.setItem('jaeha.theme',theme)}catch{}
});

const navigation=[...document.querySelectorAll('nav a')];
const header=document.querySelector('.site-header');
let headerOffset=112;
const updateNavigation=()=>{
  const atBottom=scrollY+innerHeight>=document.documentElement.scrollHeight-2;
  const active=atBottom?navigation.at(-1):[...navigation].reverse().find(a=>{
    const section=document.querySelector(a.hash);
    const start=section.getBoundingClientRect().top;
    const end=section.nextElementSibling?.getBoundingClientRect().top??section.getBoundingClientRect().bottom;
    return start<=headerOffset+8&&end>headerOffset+8;
  });
  navigation.forEach(a=>{if(a===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
  if(active){
    const nav=active.parentElement;
    const bounds=nav.getBoundingClientRect();
    const item=active.getBoundingClientRect();
    if(item.left<bounds.left||item.right>bounds.right){
      nav.scrollTo({left:nav.scrollLeft+item.left-bounds.left-(bounds.width-item.width)/2,behavior:'instant'});
    }
  }
};
let scrollFrame=0;
addEventListener('scroll',()=>{
  if(scrollFrame)return;
  scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;updateNavigation()});
},{passive:true});
new ResizeObserver(()=>{
  headerOffset=Math.ceil(header.getBoundingClientRect().height)+20;
  document.body.style.setProperty('--nav-height',`${headerOffset-20}px`);
  document.documentElement.style.setProperty('--header-offset',`${headerOffset}px`);
  updateNavigation();
}).observe(header);
updateNavigation();

// Measure text only: the portrait must not feed its own height back into sizing.
const intro=document.querySelector('.intro');
const identity=intro.querySelector('.identity');
const story=intro.querySelector('.intro-story');
const portrait=intro.querySelector('.portrait-slot');
const portraitImage=portrait.querySelector('img');
const sizePortrait=()=>{
  const ratio=(portraitImage.naturalWidth || portraitImage.width)/(portraitImage.naturalHeight || portraitImage.height);
  const textHeight=identity.getBoundingClientRect().height+
    (innerWidth>800?story.getBoundingClientRect().height+parseFloat(getComputedStyle(intro).rowGap):0);
  portrait.style.setProperty('--portrait-aspect',`${ratio}`);
  portrait.style.setProperty('--portrait-width',`${textHeight*ratio*1.2}px`);
};
portraitImage.addEventListener('load',sizePortrait);
const portraitObserver=new ResizeObserver(sizePortrait);
portraitObserver.observe(identity);
portraitObserver.observe(story);
addEventListener('resize',sizePortrait,{passive:true});
document.fonts.ready.then(sizePortrait);
sizePortrait();

// CounterAPI provides a cookie-free, anonymous count for this static Pages site.
const counterBase='https://counterapi.com/api/archiiive99.github.io/view/profile-pageviews';
const loadVisitorStats=async()=>{
  const today=document.querySelector('#visitors-today');
  const total=document.querySelector('#visitors-total');
  try{
    await fetch(counterBase,{mode:'cors',keepalive:true});
    const [totalResponse,todayResponse]=await Promise.all([
      fetch(`${counterBase}?readOnly=true`,{mode:'cors'}),
      fetch(`${counterBase}?timeline=24h&readOnly=true`,{mode:'cors'})
    ]);
    if(!totalResponse.ok||!todayResponse.ok)throw new Error('counter request failed');
    const [totalData,todayData]=await Promise.all([totalResponse.json(),todayResponse.json()]);
    total.textContent=Number(totalData.value).toLocaleString();
    today.textContent=Number(todayData.value).toLocaleString();
  }catch{
    document.querySelector('.visitor-stats')?.setAttribute('hidden','');
  }
};
loadVisitorStats();
