/* Monochrome aurora curtains; retain the lightweight background runtime. */
(() => {
  // Static film grain: generated once, below text and figures, never flickering.
  const grain=document.createElement('canvas');
  grain.width=196;grain.height=196;
  const grainContext=grain.getContext('2d');
  const grainPixels=grainContext.createImageData(196,196);
  let seed=99173;
  for(let i=0;i<grainPixels.data.length;i+=4){
    seed=(Math.imul(1664525,seed)+1013904223)>>>0;
    const value=seed>>>24;
    grainPixels.data[i]=grainPixels.data[i+1]=grainPixels.data[i+2]=value;
    grainPixels.data[i+3]=255;
  }
  grainContext.putImageData(grainPixels,0,0);
  document.body.style.setProperty('--grain-image',`url("${grain.toDataURL()}")`);
  const canvas = document.querySelector('#silk-background');
  const control = document.querySelector('#background-motion');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const contrast = matchMedia('(prefers-contrast: more)');
  let enabled = !reduced.matches;
  try { enabled = localStorage.getItem('jaeha.background-motion') !== 'off' && !reduced.matches; } catch {}
  const gl = canvas.getContext('webgl', {alpha:false, antialias:false, depth:false, powerPreference:'low-power'});
  const unavailable = () => {
    canvas.hidden = true;
    control.disabled = true;
    control.setAttribute('aria-label', 'Animated background unavailable');
    control.title = 'Animated background unavailable';
  };
  if (!gl) { unavailable(); return; }
  const vertex = `attribute vec2 position;
    varying vec2 vUv;
    void main(){vUv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;
  const fragment = `precision mediump float;
    varying vec2 vUv;
    uniform float time;
    uniform float dark;
    uniform float aspect;
    uniform vec3 pointer;
    void main(){
      vec2 uv=vUv;
      uv.x=(uv.x-.5)*min(aspect,1.8)+.5;
      vec2 cursor=vec2((pointer.x-.5)*min(aspect,1.8)+.5,pointer.y);
      vec2 offset=uv-cursor;
      float influence=exp(-dot(offset,offset)*4.)*pointer.z;
      uv+=offset*.10*influence;
      uv+=(cursor-vec2(.5))*.018*pointer.z;
      float t=time*.18;
      float curtains=0.;
      for(int i=0;i<3;i++){
        float layer=float(i);
        float x=uv.x+layer*.37;
        float center=.23+layer*.24
          +.13*sin(x*3.4+t+layer)
          +.045*sin(x*7.1-t*.7+layer*1.8);
        float distance=uv.y-center;
        float width=.055+.025*sin(x*2.8+t*.5+layer);
        float ribbon=exp(-distance*distance/(width*width));
        float veil=exp(-distance*distance/.045);
        float pleats=.84+.16*sin(x*29.+sin(x*6.-t)*2.5+t);
        curtains+=(ribbon*.7+veil*.3)*pleats;
      }
      float edge=smoothstep(.08,.55,abs(vUv.x-.5));
      float strength=mix(.64,1.,edge);
      float lightShade=.955-curtains*.20*strength;
      float darkShade=.075+curtains*.25*strength;
      gl_FragColor=vec4(vec3(mix(lightShade,darkShade,dark)),1.);
    }`;
  const shaders = [];
  let program;
  try {
    const compile = (type,source) => {
      const shader=gl.createShader(type);
      shaders.push(shader);
      gl.shaderSource(shader,source);gl.compileShader(shader);
      if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error('Background shader compilation failed');
      return shader;
    };
    program=gl.createProgram();
    gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex));
    gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment));
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Background shader link failed');
  } catch {
    shaders.forEach(shader=>gl.deleteShader(shader));
    if(program)gl.deleteProgram(program);
    unavailable();return;
  }
  gl.useProgram(program);
  const buffer=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const position=gl.getAttribLocation(program,'position');
  gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  const uniforms=Object.fromEntries(['time','dark','aspect','pointer'].map(name=>[name,gl.getUniformLocation(program,name)]));
  const pointer={x:.5,y:.5,strength:0,targetX:.5,targetY:.5,targetStrength:0};
  let frame=0, elapsed=12, previous=0, lost=false;
  const shouldAnimate=()=>enabled&&!reduced.matches&&!contrast.matches&&!document.hidden&&!lost;
  const draw=()=>{
    if(lost)return;
    canvas.hidden=contrast.matches;
    gl.uniform1f(uniforms.time,elapsed);
    gl.uniform1f(uniforms.dark,document.documentElement.dataset.theme==='dark'?1:0);
    gl.uniform1f(uniforms.aspect,innerWidth/innerHeight);
    gl.uniform3f(uniforms.pointer,pointer.x,pointer.y,pointer.strength);
    gl.drawArrays(gl.TRIANGLES,0,6);
  };
  const tick=now=>{
    frame=0;
    if(!shouldAnimate())return;
    // 30 fps and a bounded pixel budget keep the ambient layer inexpensive.
    if(now-previous>=1000/30){
      const dt=Math.min((now-previous)/1000,.08);
      const follow=1-Math.exp(-dt/ .24);
      pointer.x+=(pointer.targetX-pointer.x)*follow;
      pointer.y+=(pointer.targetY-pointer.y)*follow;
      pointer.strength+=(pointer.targetStrength-pointer.strength)*follow;
      elapsed+=dt;previous=now;draw();
    }
    frame=requestAnimationFrame(tick);
  };
  const refresh=()=>{
    cancelAnimationFrame(frame);frame=0;previous=performance.now();
    const active=enabled&&!reduced.matches&&!contrast.matches;
    control.disabled=reduced.matches||contrast.matches;
    control.setAttribute('aria-pressed',String(active));
    const label=control.disabled?'Background motion disabled by accessibility settings':active?'Pause background animation':'Play background animation';
    control.title=label;control.setAttribute('aria-label',label);
    control.innerHTML=`<i data-lucide="${active?'pause':'play'}" aria-hidden="true"></i>`;
    lucide.createIcons({attrs:{'stroke-width':1.6}});
    draw();if(shouldAnimate())frame=requestAnimationFrame(tick);
  };
  const resize=()=>{
    const scale=Math.min(1,1280/innerWidth,900/innerHeight);
    canvas.width=Math.max(1,Math.round(innerWidth*scale));
    canvas.height=Math.max(1,Math.round(innerHeight*scale));
    gl.viewport(0,0,canvas.width,canvas.height);draw();
  };
  control.addEventListener('click',()=>{
    enabled=!enabled;
    try{localStorage.setItem('jaeha.background-motion',enabled?'on':'off')}catch{}
    refresh();
  });
  addEventListener('resize',resize,{passive:true});
  addEventListener('pointermove',event=>{
    if(event.pointerType==='touch'||!shouldAnimate())return;
    pointer.targetX=Math.max(0,Math.min(1,event.clientX/innerWidth));
    pointer.targetY=1-Math.max(0,Math.min(1,event.clientY/innerHeight));
    pointer.targetStrength=1;
  },{passive:true});
  const releasePointer=()=>{pointer.targetStrength=0};
  document.documentElement.addEventListener('pointerleave',releasePointer);
  addEventListener('blur',releasePointer);
  document.addEventListener('visibilitychange',refresh);
  reduced.addEventListener('change',refresh);
  contrast.addEventListener('change',refresh);
  new MutationObserver(draw).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();lost=true;cancelAnimationFrame(frame);unavailable()});
  resize();refresh();
})();
