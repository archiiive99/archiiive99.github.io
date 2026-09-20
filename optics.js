// Progressive backdrop refraction. Safari/Firefox retain the blurred material.
// The map bends background pixels at the rounded rim, never foreground text.
if (/Chrome\//.test(navigator.userAgent) && CSS.supports('backdrop-filter', 'url("#nav-refraction")')) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:fixed;width:0;height:0;pointer-events:none';
  const defs = document.createElementNS(ns, 'defs');
  svg.append(defs);
  document.body.append(svg);
  const controls=document.querySelectorAll('nav, .contact-links .button, .pub-links a, .appearance-controls, .wordmark');
  const maps=new Map();
  controls.forEach((control,index)=>{
  const filter = document.createElementNS(ns, 'filter');
  filter.id = `control-refraction-${index}`;
  filter.setAttribute('color-interpolation-filters', 'sRGB');
  filter.setAttribute('filterUnits','userSpaceOnUse');
  filter.setAttribute('x','0');filter.setAttribute('y','0');
  const map = document.createElementNS(ns, 'feImage');
  map.setAttribute('result', 'rim');
  map.setAttribute('preserveAspectRatio', 'none');
  const displacement = document.createElementNS(ns, 'feDisplacementMap');
  for (const [key,value] of Object.entries({in:'SourceGraphic',in2:'rim',scale:control.closest('.site-header')?'3':'7',xChannelSelector:'R',yChannelSelector:'G'})) displacement.setAttribute(key,value);
  filter.append(map, displacement);
  defs.append(filter);
  let previousSize = '';
  const update = () => {
    const {width,height} = control.getBoundingClientRect();
    const w = Math.ceil(width), h = Math.ceil(height);
    if (!w || !h || previousSize === `${w}:${h}`) return;
    previousSize = `${w}:${h}`;
    filter.setAttribute('width',String(w));filter.setAttribute('height',String(h));
    map.setAttribute('width',String(w));map.setAttribute('height',String(h));
    if(maps.has(previousSize)){
      map.setAttribute('href',maps.get(previousSize));
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    const pixels = ctx.createImageData(w,h);
    const radius = h / 2;
    for(let y=0;y<h;y++) for(let x=0;x<w;x++) {
      const dx=x-w/2, dy=y-h/2;
      const qx=Math.max(Math.abs(dx)-(w/2-radius),0), qy=Math.abs(dy);
      const distance=Math.hypot(qx,qy);
      const depth=radius-distance;
      const bend=depth>=0&&depth<10?Math.sin(Math.PI*depth/10)*100:0;
      const index=(y*w+x)*4;
      pixels.data[index]=128+(distance?qx/distance*Math.sign(dx)*bend:0);
      pixels.data[index+1]=128+(distance?qy/distance*Math.sign(dy)*bend:0);
      pixels.data[index+2]=128; pixels.data[index+3]=255;
    }
    ctx.putImageData(pixels,0,0);
    const image=canvas.toDataURL();
    map.setAttribute('href',image);
    if(maps.size>64)maps.clear();
    maps.set(previousSize,image);
  };
  control.style.setProperty('--refraction',`url("#${filter.id}")`);
  control.classList.add('refractive');
  new ResizeObserver(update).observe(control);
  update();
  });
}
