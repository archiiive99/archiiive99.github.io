const publications = [
  {year:2026,venue:'Under Review',type:'review',title:'PAVER: Planning-Aligned Pretraining of BEV Representations with Sparse Action-Conditioned Targets for End-to-End Autonomous Driving',authors:'Jaeha Song, Soonmin Hwang',image:'assets/paver-demo.webp',animated:true,video:'assets/paver-demo.mp4',alt:'PAVER multi-camera driving and BEV Grad-CAM comparison',description:'Planning-aligned BEV encoder pretraining with sparse action-conditioned targets.',links:[['Project','https://archiiive99.github.io/PAVER/'],['Code','https://github.com/archiiive99/PAVER']]},
  {year:2026,venue:'ICLR 2026',title:'Self-Guided Low Light Object Detection Framework',authors:'Gwangik Shin, Jaeha Song, Soonmin Hwang',image:'assets/sgldet.png',alt:'SGLDet auxiliary training pipeline',description:'Self-guided representation learning for low-light detection without extra inference-time computation.',links:[['Paper','https://openreview.net/forum?id=MGgAJ8yy2D'],['Project','https://gw-shin.github.io/sgldet-page/'],['Code','https://github.com/gw-shin/SGLDet']]},
  {year:2026,venue:'ICPR 2026',title:'RSD-BEV: Residual Self-Distillation Framework for Efficient BEV Representation Learning',authors:'Sungjin Park, Jaeha Song, Soonmin Hwang',links:[['Paper','https://doi.org/10.1007/978-3-032-31438-3_21']]},
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
document.querySelector('#publications').innerHTML = publications.map(p => `<article class="publication ${p.image?'featured':p.thumbnail?'with-thumbnail':''}" data-year="${p.year}">${p.image?`<a class="pub-visual" href="${p.links.find(([name])=>name==='Project')[1]}" aria-label="${escapeHTML(p.title)} project">${p.video?`<video data-src="${p.video}" muted loop playsinline preload="none" poster="assets/paver.png" aria-label="${escapeHTML(p.alt)}" width="1200" height="506"></video>`:`<img src="${p.image}" alt="${escapeHTML(p.alt)}" loading="lazy" width="960" height="350">`}<span class="figure-link">${icon('arrow-up-right')}</span></a>`:''}<div class="pub-body"><div class="pub-meta">${venueBadge(p)}</div><h3>${escapeHTML(p.title)}</h3><p class="authors">${renderAuthors(p.authors)}</p>${p.description?`<p class="pub-description">${escapeHTML(p.description).replace(/^3rd place/, '<strong class="result-highlight">3rd place</strong>')}</p>`:''}<div class="pub-links">${p.links.map(([name,url])=>`<a href="${url}">${icon(name==='Code'?'github':name==='Paper'?'file-text':'arrow-up-right')}${name}</a>`).join('')}</div></div>${p.thumbnail?`<button class="pub-thumbnail" type="button" data-figure="${p.thumbnail}" data-title="${escapeHTML(p.title)}" aria-label="Enlarge figure: ${escapeHTML(p.title)}"><img src="${p.thumbnail}" alt="Main figure from ${escapeHTML(p.title)}" loading="lazy" width="1200" height="700"></button>`:''}</article>`).join('');
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
const visibleVideos=new Set();
const updatePreviews=()=>previewVideos.forEach(video=>{
  if(visibleVideos.has(video)&&!motionPreference.matches&&!document.hidden){
    if(!video.getAttribute('src'))video.src=video.dataset.src;
    video.play().catch(()=>{video.controls=true});
  }else video.pause();
});
const previewObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)visibleVideos.add(entry.target);else visibleVideos.delete(entry.target)});
  updatePreviews();
});
previewVideos.forEach(video=>previewObserver.observe(video));
motionPreference.addEventListener('change',updatePreviews);
document.addEventListener('visibilitychange',updatePreviews);
function setPublicationFilter(value){
  const filter=['all','2026','earlier'].includes(value)?value:'all';
  document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));
  document.querySelectorAll('.publication').forEach(row=>row.hidden=filter==='2026'?row.dataset.year!=='2026':filter==='earlier'?row.dataset.year==='2026':false);
}
let savedFilter='all';
try{savedFilter=localStorage.getItem('jaeha.publication-filter')}catch{}
setPublicationFilter(savedFilter);
for(const button of document.querySelectorAll('[data-filter]')) button.addEventListener('click',()=>{
  setPublicationFilter(button.dataset.filter);
  try{localStorage.setItem('jaeha.publication-filter',button.dataset.filter)}catch{}
});
function setTheme(theme){
  document.documentElement.dataset.theme=theme;
  document.querySelectorAll('[data-theme-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.themeChoice===theme)));
  document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#161616':'#f3f3f3';
}
setTheme(document.documentElement.dataset.theme);
for(const button of document.querySelectorAll('[data-theme-choice]'))button.addEventListener('click',()=>{setTheme(button.dataset.themeChoice);try{localStorage.setItem('jaeha.theme',button.dataset.themeChoice)}catch{}});

// Lens boxes follow controls, including changes to the font or viewport.
function createLens(group,selector){
  const lens=document.createElement('span');
  lens.className='selection-lens';
  lens.setAttribute('aria-hidden','true');
  group.prepend(lens);
  const position=()=>{
    const active=group.querySelector(selector);
    if(!active)return;
    lens.style.width=`${active.offsetWidth}px`;
    lens.style.height=`${active.offsetHeight}px`;
    lens.style.transform=`translate(${active.offsetLeft}px,${active.offsetTop}px)`;
  };
  position();
  requestAnimationFrame(()=>requestAnimationFrame(()=>group.classList.add('lens-ready')));
  new ResizeObserver(position).observe(group);
  document.fonts.ready.then(position);
  return position;
}
document.querySelectorAll('.segmented').forEach(group=>{
  const position=group.matches('.theme-control')?()=>{}:createLens(group,'[aria-pressed="true"]');
  group.addEventListener('click',position);
  group.addEventListener('keydown',event=>{
    const buttons=[...group.querySelectorAll('button:not(:disabled)')];
    const index=buttons.indexOf(document.activeElement);
    if(index<0)return;
    let next;
    if(event.key==='ArrowRight')next=(index+1)%buttons.length;
    else if(event.key==='ArrowLeft')next=(index+buttons.length-1)%buttons.length;
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=buttons.length-1;
    else return;
    event.preventDefault();buttons[next].focus({preventScroll:true});buttons[next].click();
  });
});

const navigation=[...document.querySelectorAll('nav a')];
const header=document.querySelector('.site-header');
let headerOffset=112;
const updateNavigation=()=>{
  const active=[...navigation].reverse().find(a=>{
    const section=document.querySelector(a.hash);
    const start=section.getBoundingClientRect().top;
    const end=section.nextElementSibling?.getBoundingClientRect().top??section.getBoundingClientRect().bottom;
    return start<=headerOffset+8&&end>headerOffset+8;
  });
  navigation.forEach(a=>{if(a===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
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
  portrait.style.setProperty('--portrait-width',`${textHeight*ratio}px`);
};
portraitImage.addEventListener('load',sizePortrait);
const portraitObserver=new ResizeObserver(sizePortrait);
portraitObserver.observe(identity);
portraitObserver.observe(story);
addEventListener('resize',sizePortrait,{passive:true});
document.fonts.ready.then(sizePortrait);
sizePortrait();
