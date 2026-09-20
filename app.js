const publications = [
  {year:2026,venue:'Under Review',type:'review',title:'PAVER: Planning-Aligned Pretraining of BEV Representations with Sparse Action-Conditioned Targets for End-to-End Autonomous Driving',authors:'Jaeha Song, Soonmin Hwang',image:'assets/paver.png',alt:'PAVER representation pretraining overview',description:'Planning-aligned BEV encoder pretraining with sparse action-conditioned targets.',links:[['Project','https://archiiive99.github.io/PAVER/'],['Code','https://github.com/archiiive99/PAVER']]},
  {year:2026,venue:'ICLR 2026',title:'Self-Guided Low Light Object Detection Framework',authors:'Gwangik Shin, Jaeha Song, Soonmin Hwang',image:'assets/sgldet.png',alt:'SGLDet auxiliary training pipeline',description:'Self-guided representation learning for low-light detection without extra inference-time computation.',links:[['Paper','https://openreview.net/forum?id=MGgAJ8yy2D'],['Project','https://gw-shin.github.io/sgldet-page/'],['Code','https://github.com/gw-shin/SGLDet']]},
  {year:2026,venue:'ICPR 2026',title:'RSD-BEV: Residual Self-Distillation Framework for Efficient BEV Representation Learning',authors:'Sungjin Park, Jaeha Song, Soonmin Hwang',links:[['Publication record','https://ircv.hanyang.ac.kr/publications/']]},
  {year:2025,venue:'CVPR 2025 Workshop',title:'Swin-Trajectory: Technical Report for 2025 Waymo Vision-based End-to-End Driving Challenge',authors:'Sungjin Park, Gwangik Shin, Jaeha Song, Sumin Lee, Hyukju Shon, Byounggun Park, Jinhee Na, Hawook Jeong, Soonmin Hwang',description:'3rd place in the 2025 Waymo Vision-based End-to-End Driving Challenge.',links:[['Research profile','https://ircv.hanyang.ac.kr/team/jaeha-song']]},
  {year:2025,venue:'ICAIIC 2025',title:'Efficient Occupancy Prediction with Instance-Level Attention',authors:'Sungjin Park, Jaeha Song, Soonmin Hwang',links:[['Publication record','https://ircv.hanyang.ac.kr/publications/']]},
  {year:2025,venue:'ICAIIC 2025',title:'Leveraging Camera-Based Methods for Enhanced Feature-to-World Mapping',authors:'Jaeha Song, Sungjin Park, Soonmin Hwang',links:[['Publication record','https://ircv.hanyang.ac.kr/publications/']]},
  {year:2024,venue:'BMVC 2024',title:'Advancing Medical Image Segmentation: Morphology-Driven Learning with Diffusion Transformer',authors:'Sungmin Kang, Jaeha Song, Jihie Kim',links:[['Research profile','https://ircv.hanyang.ac.kr/team/jaeha-song']]},
  {year:2024,venue:'Yonsei Medical Journal',title:'Detection of Cervical Foraminal Stenosis From Oblique Radiograph Using Convolutional Neural Network Algorithm',authors:'Jihie Kim, Jae Jun Yang, Jaeha Song, SeongWoon Jo, YoungHoon Kim, Jiho Park, Jinbok Lee, Gun Woo Lee, Sehan Park',links:[['Research profile','https://ircv.hanyang.ac.kr/team/jaeha-song']]},
];
// All content is maintained locally, not supplied by runtime HTML or a remote API.
const escapeHTML = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
function venueBadge(p) {
  const label=p.venue.replace(/ 20\d{2}/,'');
  const family=p.type==='review'?'review':p.venue.startsWith('ICLR')?'iclr':p.venue.startsWith('ICPR')?'icpr':'academic';
  return `<span class="venue venue-${family}"><span class="venue-label">${p.type==='review'?icon('clock-3'):icon('book-open')}${escapeHTML(label)}</span><span class="venue-year">${p.year}</span></span>`;
}
document.querySelector('#publications').innerHTML = publications.map(p => `<article class="publication ${p.image?'featured':''}" data-year="${p.year}">${p.image?`<a class="pub-visual" href="${p.links.find(([name])=>name==='Project')[1]}" aria-label="${escapeHTML(p.title)} project"><img src="${p.image}" alt="${escapeHTML(p.alt)}" loading="lazy" width="960" height="350"><span class="figure-link">${icon('arrow-up-right')}</span></a>`:''}<div class="pub-body"><div class="pub-meta">${venueBadge(p)}</div><h3>${escapeHTML(p.title)}</h3><p class="authors">${escapeHTML(p.authors).replaceAll('Jaeha Song','<strong>Jaeha Song</strong>')}</p>${p.description?`<p class="pub-description">${escapeHTML(p.description)}</p>`:''}<div class="pub-links">${p.links.map(([name,url])=>`<a href="${url}">${icon(name==='Code'?'github':name==='Paper'?'file-text':'arrow-up-right')}${name}</a>`).join('')}</div></div></article>`).join('');
lucide.createIcons({attrs:{'stroke-width':1.6}});
for(const button of document.querySelectorAll('[data-filter]')) button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  document.querySelectorAll('.publication').forEach(row=>row.hidden=button.dataset.filter==='2026'?row.dataset.year!=='2026':button.dataset.filter==='earlier'?row.dataset.year==='2026':false);
});
function setTheme(theme){
  document.documentElement.dataset.theme=theme;
  document.querySelectorAll('[data-theme-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.themeChoice===theme)));
  document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#161616':'#f3f3f3';
}
setTheme(document.documentElement.dataset.theme);
for(const button of document.querySelectorAll('[data-theme-choice]'))button.addEventListener('click',()=>{setTheme(button.dataset.themeChoice);try{localStorage.setItem('jaeha.theme',button.dataset.themeChoice)}catch{}});

// A single moving lens preserves continuity between selections.
document.querySelectorAll('.segmented').forEach(group=>{
  const lens=document.createElement('span');
  lens.className='selection-lens';
  lens.setAttribute('aria-hidden','true');
  group.prepend(lens);
  const position=()=>{
    const active=group.querySelector('[aria-pressed="true"]');
    lens.style.width=`${active.offsetWidth}px`;
    lens.style.height=`${active.offsetHeight}px`;
    lens.style.transform=`translate(${active.offsetLeft}px,${active.offsetTop}px)`;
  };
  position();
  requestAnimationFrame(()=>group.classList.add('lens-ready'));
  group.addEventListener('click',position);
  new ResizeObserver(position).observe(group);
});

const navigation=[...document.querySelectorAll('nav a')];
const updateNavigation=()=>{
  const active=[...navigation].reverse().find(a=>document.querySelector(a.hash).getBoundingClientRect().top<=160);
  navigation.forEach(a=>{if(a===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
};
addEventListener('scroll',updateNavigation,{passive:true});
updateNavigation();
