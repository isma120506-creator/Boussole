/* Boussole — scène 3D (Three.js r128) : un objet par sujet, carrousel et vue unique */
(function(){
const S3 = {ok:false};
window.BSL_3D = S3;
if(typeof THREE==="undefined"){return;}
let renderer;
try{
  renderer = new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:"high-performance"});
}catch(e){return;}
S3.ok = true;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
const canvas = renderer.domElement;
canvas.className = "gl";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32,1,0.1,100);
camera.position.set(0,0.2,9);

/* --- environnement de reflets : studio sombre avec panneaux lumineux --- */
(function(){
  const pm = new THREE.PMREMGenerator(renderer);
  const env = new THREE.Scene();
  const g = new THREE.SphereGeometry(20,32,16);
  const cols=[];const pos=g.attributes.position;
  for(let i=0;i<pos.count;i++){const y=pos.getY(i)/20;const c=new THREE.Color().setHSL(0.62,0.25,0.04+Math.max(0,y)*0.22);cols.push(c.r,c.g,c.b)}
  g.setAttribute("color",new THREE.Float32BufferAttribute(cols,3));
  env.add(new THREE.Mesh(g,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.BackSide})));
  const panel=(w,h,x,y,z,int)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(int,int,int),side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);env.add(m)};
  panel(14,3,0,12,4,3.2); panel(4,10,-12,2,6,2.2); panel(4,10,12,1,-4,1.6); panel(10,2,0,-6,10,0.9);
  S3.envMap = pm.fromScene(env,0.02).texture;
  scene.environment = S3.envMap;
})();

const key = new THREE.DirectionalLight(0xffffff,1.6); key.position.set(3,5,6); scene.add(key);
const rim = new THREE.PointLight(0x6f8dff,40,20); rim.position.set(-3,1.5,-2.5); scene.add(rim);
const fill = new THREE.PointLight(0xffffff,6,20); fill.position.set(2,-2,4); scene.add(fill);
scene.add(new THREE.AmbientLight(0xffffff,0.15));

/* --- matériaux --- */
const M = {
  metal:(c,r=0.25)=>new THREE.MeshPhysicalMaterial({color:c,metalness:0.9,roughness:r,clearcoat:0.6,clearcoatRoughness:0.2,envMapIntensity:1.2}),
  gloss:(c)=>new THREE.MeshPhysicalMaterial({color:c,metalness:0.2,roughness:0.25,clearcoat:1,clearcoatRoughness:0.08,envMapIntensity:1.1}),
  matte:(c)=>new THREE.MeshStandardMaterial({color:c,metalness:0,roughness:0.7}),
  glow:(c,i=2)=>new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:i,roughness:0.4})
};
const GOLD=0xE6B84A, SILVER=0xD9DEE8;
function rrShape(w,h,r){const s=new THREE.Shape();const x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s}
function extr(shape,depth,bevel=0.03){const g=new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelThickness:bevel,bevelSize:bevel,bevelSegments:4,curveSegments:16});g.center();return g}

/* --- les objets --- */
const BUILD = {
  card(sub){const g=new THREE.Group();
    const body=new THREE.Mesh(extr(rrShape(3.2,2,0.18),0.06,0.025),M.metal(new THREE.Color(sub.c1).multiplyScalar(0.9),0.3));g.add(body);
    const chip=new THREE.Mesh(extr(rrShape(0.46,0.36,0.06),0.02,0.01),M.metal(GOLD,0.2));chip.position.set(-0.95,0.2,0.06);g.add(chip);
    for(let i=0;i<4;i++){const d=new THREE.Mesh(new THREE.BoxGeometry(0.42,0.08,0.01),M.metal(SILVER,0.35));d.position.set(-0.95+i*0.5,-0.45,0.06);g.add(d)}
    const logo=new THREE.Mesh(new THREE.TorusGeometry(0.2,0.035,12,40),M.metal(SILVER,0.2));logo.position.set(1.15,0.55,0.06);g.add(logo);
    const logo2=logo.clone();logo2.position.x=0.9;g.add(logo2);
    g.rotation.set(-0.25,0.5,0.12);g.scale.setScalar(0.95);return g},
  coins(sub){const g=new THREE.Group();const geo=new THREE.CylinderGeometry(0.8,0.8,0.14,64);
    const ring=new THREE.TorusGeometry(0.72,0.03,8,64);
    for(let i=0;i<7;i++){const c=new THREE.Mesh(geo,M.metal(i%3===2?SILVER:GOLD,0.22));c.position.set(Math.sin(i*1.7)*0.06,-1.1+i*0.16,Math.cos(i*1.3)*0.06);g.add(c)}
    const top=new THREE.Mesh(geo,M.metal(GOLD,0.18));top.rotation.set(1.2,0,0.3);top.position.set(0.55,0.75,0.3);g.add(top);
    const r=new THREE.Mesh(ring,M.metal(GOLD,0.15));r.rotation.copy(top.rotation);r.position.copy(top.position);r.translateY(0.075);g.add(r);
    const gem=new THREE.Mesh(new THREE.OctahedronGeometry(0.2),M.glow(sub.glow,1.2));gem.position.set(-0.7,0.6,0.2);g.add(gem);g.userData.gem=gem;
    return g},
  doc(sub){const g=new THREE.Group();
    for(let i=0;i<4;i++){const p=new THREE.Mesh(new THREE.BoxGeometry(2,2.7,0.03),M.matte(i===3?0xF7F4EC:0xE8E4DA));p.position.set(i*0.05,-i*0.04,i*0.05);p.rotation.z=(i-1.5)*0.04;g.add(p)}
    for(let i=0;i<6;i++){const l=new THREE.Mesh(new THREE.BoxGeometry(i%3===2?0.9:1.4,0.07,0.01),M.matte(0x9AA0AE));l.position.set(-0.05-(i%3===2?0.25:0),0.8-i*0.28,0.23);g.add(l)}
    const seal=new THREE.Mesh(new THREE.CylinderGeometry(0.38,0.38,0.1,48),M.metal(sub.c1,0.25));seal.rotation.x=Math.PI/2;seal.position.set(0.55,-0.85,0.28);g.add(seal);
    const pct=new THREE.Mesh(new THREE.TorusGeometry(0.2,0.04,10,40),M.metal(0xffffff,0.2));pct.position.set(0.55,-0.85,0.36);g.add(pct);
    g.rotation.set(-0.15,0.45,0.08);g.scale.setScalar(0.85);return g},
  candles(sub){const g=new THREE.Group();const hs=[0.7,1.1,0.85,1.5,1.3,2.0];
    hs.forEach((h,i)=>{const up=i===0||hs[i]>=hs[i-1];const col=up?sub.glow:0xFF5C7A;
      const b=new THREE.Mesh(new THREE.BoxGeometry(0.34,h,0.34),M.gloss(new THREE.Color(col)));b.position.set(-1.25+i*0.5,-1.1+h/2+i*0.12,0);g.add(b);
      const w=new THREE.Mesh(new THREE.BoxGeometry(0.05,h+0.5,0.05),M.matte(0xDADDE6));w.position.copy(b.position);g.add(w)});
    const curve=new THREE.CatmullRomCurve3(hs.map((h,i)=>new THREE.Vector3(-1.25+i*0.5,-1.1+h+i*0.12+0.35,0.3)));
    const tube=new THREE.Mesh(new THREE.TubeGeometry(curve,60,0.035,8,false),M.glow(0xffffff,1.5));g.add(tube);
    const base=new THREE.Mesh(extr(rrShape(3.4,0.9,0.2),0.08,0.03),M.metal(0x20242E,0.4));base.rotation.x=-Math.PI/2;base.position.y=-1.18;g.add(base);
    g.rotation.set(0.15,-0.5,0);g.scale.setScalar(0.95);return g},
  envelope(sub){const g=new THREE.Group();const col=new THREE.Color(sub.c1);
    const body=new THREE.Mesh(extr(rrShape(3,1.9,0.08),0.08,0.02),M.gloss(col));g.add(body);
    const tri=new THREE.Shape();tri.moveTo(-1.5,0.95);tri.lineTo(1.5,0.95);tri.lineTo(0,-0.15);tri.lineTo(-1.5,0.95);
    const flap=new THREE.Mesh(extr(tri,0.03,0.015),M.gloss(col.clone().offsetHSL(0,0,0.08)));flap.position.set(0,0.4,0.08);g.add(flap);
    const seal=new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.32,0.08,40),M.metal(GOLD,0.2));seal.rotation.x=Math.PI/2;seal.position.set(0,-0.1,0.14);g.add(seal);
    const card=new THREE.Mesh(extr(rrShape(2.4,1.2,0.05),0.02,0.01),M.matte(0xF4F1EA));card.position.set(0,0.75,-0.06);card.rotation.z=0.05;g.add(card);
    g.rotation.set(-0.2,0.5,0.06);g.scale.setScalar(0.92);return g},
  house(sub){const g=new THREE.Group();const wall=M.gloss(new THREE.Color(0xF2EDE4));
    const b=new THREE.Mesh(new THREE.BoxGeometry(2,1.4,1.6),wall);b.position.y=-0.4;g.add(b);
    const tri=new THREE.Shape();tri.moveTo(-1.2,0);tri.lineTo(1.2,0);tri.lineTo(0,1);tri.lineTo(-1.2,0);
    const roof=new THREE.Mesh(new THREE.ExtrudeGeometry(tri,{depth:1.9,bevelEnabled:true,bevelThickness:0.04,bevelSize:0.04,bevelSegments:2}),M.gloss(new THREE.Color(sub.c1)));roof.position.set(0,0.3,-0.95);g.add(roof);
    const door=new THREE.Mesh(new THREE.BoxGeometry(0.42,0.75,0.05),M.metal(0x2A2F3A,0.4));door.position.set(0.45,-0.73,0.81);g.add(door);
    [[-0.5,-0.25],[-0.5,-0.25]].slice(0,1).forEach(([x,y])=>{const w=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.42,0.04),M.glow(0xFFD9A0,1.6));w.position.set(x,y,0.81);g.add(w)});
    const w2=new THREE.Mesh(new THREE.BoxGeometry(0.04,0.42,0.5),M.glow(0xFFD9A0,1.6));w2.position.set(1.02,-0.3,0);g.add(w2);
    const ch=new THREE.Mesh(new THREE.BoxGeometry(0.28,0.6,0.28),M.gloss(new THREE.Color(sub.c1).multiplyScalar(0.7)));ch.position.set(0.6,0.85,-0.3);g.add(ch);
    const base=new THREE.Mesh(new THREE.CylinderGeometry(1.7,1.8,0.12,64),M.metal(0x1C2029,0.5));base.position.y=-1.17;g.add(base);
    g.rotation.set(0.12,0.65,0);g.scale.setScalar(0.95);return g},
  gold(sub){const g=new THREE.Group();const geo=new THREE.CylinderGeometry(0.62,0.85,0.5,4,1);geo.rotateY(Math.PI/4);geo.scale(1.7,1,0.75);
    const mat=M.metal(GOLD,0.16);
    [[-0.85,-0.75,0,0],[0.85,-0.75,0,0],[0,-0.25,0,0.08],[0.05,0.35,0.25,-0.5]].forEach(([x,y,z,r])=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.rotation.y=r;g.add(m)});
    const coin=new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.42,0.08,48),M.metal(0xF7931A,0.2));coin.rotation.set(1.3,0.2,0.4);coin.position.set(1.25,0.35,0.5);g.add(coin);g.userData.coin=coin;
    const b=new THREE.Mesh(new THREE.TorusGeometry(0.2,0.04,8,32),M.metal(0xffffff,0.2));b.rotation.copy(coin.rotation);b.position.copy(coin.position);b.translateY(0.05);g.add(b);
    g.rotation.set(0.2,-0.4,0);g.scale.setScalar(0.95);return g},
  compass(sub){const g=new THREE.Group();
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.3,0.14,24,96),M.metal(GOLD,0.2));g.add(ring);
    const face=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.2,0.08,64),M.gloss(new THREE.Color(0x0E1418)));face.rotation.x=Math.PI/2;face.position.z=-0.04;g.add(face);
    for(let i=0;i<16;i++){const t=new THREE.Mesh(new THREE.BoxGeometry(0.03,i%4===0?0.22:0.1,0.02),M.metal(SILVER,0.3));const a=i/16*Math.PI*2;t.position.set(Math.sin(a)*1.02,Math.cos(a)*1.02,0.02);t.rotation.z=-a;g.add(t)}
    const needle=new THREE.Group();const n1=new THREE.Mesh(new THREE.ConeGeometry(0.16,1,4),M.glow(sub.glow,0.9));n1.position.y=0.5;const n2=new THREE.Mesh(new THREE.ConeGeometry(0.16,1,4),M.metal(SILVER,0.25));n2.position.y=-0.5;n2.rotation.z=Math.PI;needle.add(n1,n2);needle.position.z=0.1;g.add(needle);g.userData.needle=needle;
    const pin=new THREE.Mesh(new THREE.SphereGeometry(0.1,24,16),M.metal(GOLD,0.15));pin.position.z=0.16;g.add(pin);
    g.rotation.set(-0.35,0.35,0);return g}
};

/* --- état --- */
let subjects=[], items=[], mode="carousel", active=0, host=null, running=false, loopId=0, t0=performance.now();
const pointer={x:0,y:0};
S3.init=function(subs){subjects=subs;items=subs.map((s,i)=>{const pivot=new THREE.Group();const o=BUILD[s.obj](s);pivot.add(o);scene.add(pivot);return {pivot,obj:o,sub:s,cur:{x:0,y:0,z:0,s:0.01,o:0}}})};
function targets(){
  const n=items.length;
  return items.map((it,i)=>{
    if(mode==="single"){const on=i===active;return {x:host&&host.clientWidth<760?0:1.6,y:host&&host.clientWidth<760?0.3:0,z:0,s:on?1.15:0.001,o:on?1:0}}
    let d=i-active; if(d>n/2)d-=n; if(d<-n/2)d+=n;
    const ad=Math.abs(d);const narrow=host&&host.clientWidth<760;
    const spread=narrow?2.1:2.9;
    const ox=narrow?0:1.7, oy=narrow?1.75:0.15;
    return {x:ox+d*spread,y:oy-ad*0.12,z:-ad*1.6,s:ad===0?(narrow?0.8:1.0):Math.max(0.001,0.55-ad*0.1),o:ad>2?0:1};
  });
}
S3.setActive=function(i){active=(i+items.length)%items.length;const s=items[active].sub;rim.color.set(s.glow)};
S3.mount=function(el,m,idx){host=el;mode=m;if(typeof idx==="number")S3.setActive(idx);el.appendChild(canvas);resize();running=true;const id=++loopId;requestAnimationFrame(t=>loop(t,id))};
S3.unmount=function(){host=null;running=false;loopId++;if(canvas.parentNode)canvas.parentNode.removeChild(canvas)};
function resize(){if(!host)return;const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.position.z=w<760?11.5:9;camera.updateProjectionMatrix()}
addEventListener("resize",resize);
addEventListener("pointermove",e=>{pointer.x=e.clientX/innerWidth*2-1;pointer.y=e.clientY/innerHeight*2-1},{passive:true});
let drag=null;
S3.drag=function(dx){if(items[active])items[active].pivot.rotation.y+=dx*0.01};
function loop(now,id){
  if(!running||id!==loopId)return;
  if(document.hidden){requestAnimationFrame(t=>loop(t,id));return}
  const t=(now-t0)/1000;const T=targets();
  items.forEach((it,i)=>{const g=T[i],c=it.cur;const k=0.085;
    c.x+=(g.x-c.x)*k;c.y+=(g.y-c.y)*k;c.z+=(g.z-c.z)*k;c.s+=(g.s-c.s)*k;
    it.pivot.visible=c.s>0.02;
    it.pivot.position.set(c.x,c.y+(reduce?0:Math.sin(t*1.1+i)*0.08),c.z);
    it.pivot.scale.setScalar(c.s);
    const on=i===active;
    if(!reduce){it.pivot.rotation.y+=on?0.006:0.002;it.pivot.rotation.x=(on?pointer.y*0.15:0)+Math.sin(t*0.6+i)*0.04}
    if(it.obj.userData.needle)it.obj.userData.needle.rotation.z=Math.sin(t*0.9)*0.6;
    if(it.obj.userData.gem)it.obj.userData.gem.rotation.y=t*1.5;
    if(it.obj.userData.coin&&!reduce)it.obj.userData.coin.rotation.z=t*1.2;
  });
  camera.position.x+=((mode==="carousel"?pointer.x*0.25:0)-camera.position.x)*0.05;
  camera.lookAt(0,0,0);
  renderer.render(scene,camera);
  requestAnimationFrame(t=>loop(t,id));
}
})();
