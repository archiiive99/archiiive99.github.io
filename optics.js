// Progressive backdrop refraction. Safari/Firefox retain the blurred material.
// The map bends background pixels at the rounded rim, never foreground text.
if (/Chrome\//.test(navigator.userAgent) && CSS.supports('backdrop-filter', 'url("#nav-refraction")')) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:fixed;width:0;height:0;pointer-events:none';
  const defs = document.createElementNS(ns, 'defs');
  svg.append(defs);
  const filter = document.createElementNS(ns, 'filter');
  filter.id = 'nav-refraction';
  filter.setAttribute('color-interpolation-filters', 'sRGB');
  const map = document.createElementNS(ns, 'feImage');
  map.setAttribute('result', 'rim');
  map.setAttribute('preserveAspectRatio', 'none');
  const displacement = document.createElementNS(ns, 'feDisplacementMap');
  for (const [key,value] of Object.entries({in:'SourceGraphic',in2:'rim',scale:'10',xChannelSelector:'R',yChannelSelector:'G'})) displacement.setAttribute(key,value);
  filter.append(map, displacement);
  defs.append(filter);
  document.body.append(svg);
  const nav = document.querySelector('nav');
  let previousSize = '';
  const update = () => {
    const {width,height} = nav.getBoundingClientRect();
    const w = Math.ceil(width), h = Math.ceil(height);
    if (!w || !h || previousSize === `${w}:${h}`) return;
    previousSize = `${w}:${h}`;
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
    map.setAttribute('href',canvas.toDataURL());
    nav.classList.add('refractive');
  };
  new ResizeObserver(update).observe(nav);
  update();
}
