import * as core from '../shared/core';
import type { Building, CharacterId, Direction, Hat, HarvestNode, Npc, Point, Spirit } from '../shared/types';
import { getState, setTarget } from './client';
import { canvasElement, context2d } from './dom';
const canvas=canvasElement('game'),out=context2d(canvas),world=document.createElement('canvas'),ctx=context2d(world);
interface Particle extends Point { vx:number; vy:number; life:number; color:string }
interface Floater extends Point { text:string; life:number }
  let W=640,H=360,camera={x:72,y:50},state=core.create(),last=performance.now(),clock=0,lastEvent=0,portraitKey='',pointer: (Point & {life:number}) | null=null,lastStage=-1,arrivalFade=0;
  const particles:Particle[]=[],floaters:Floater[]=[];
  const clamp=(v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));
  function rect(x:number,y:number,w:number,h:number,c:string){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h);}
  function oval(x:number,y:number,rx:number,ry:number,c:string){ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fill();}
  function line(points: number[][],color:string,width=1){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();}
  const resize=()=>{const box=canvas.getBoundingClientRect();W=Math.max(280,Math.min(720,Math.round(box.width/1.25)));H=Math.max(160,Math.round(W*box.height/box.width));world.width=W;world.height=H;canvas.width=W*2;canvas.height=H*2;};new ResizeObserver(resize).observe(canvas);resize();
  canvas.addEventListener('pointerdown',event=>{const box=canvas.getBoundingClientRect(),x=(event.clientX-box.left)/box.width*W+camera.x,y=(event.clientY-box.top)/box.height*H+camera.y;if(!state.transition&&!core.blocked(x,y,state)){setTarget(x,y);pointer={x,y,life:.7};}});
  let seed=417;const rng=()=>{seed=seed*16807%2147483647;return seed/2147483647;};const grass=Array.from({length:2000},()=>({x:rng()*960,y:90+rng()*510,c:Math.floor(rng()*4),flower:rng()>.97}));
  function ground(){
    if(state.stage>0){regionalGround();return;}
    rect(0,0,960,600,'#83a760');rect(0,0,960,83,'#b9d5ae');
    // Distant foothills and morning haze.
    for(let i=0;i<9;i++){ctx.fillStyle=i%2?'#94b592':'#9dc39d';ctx.beginPath();ctx.moveTo(i*140-50,90);ctx.lineTo(i*140+55,9+(i*17)%38);ctx.lineTo(i*140+170,90);ctx.fill();}rect(0,70,960,22,'#a8c799');
    // Footpaths converge in the plaza and along the jeepney route.
    rect(94,252,580,39,'#d4bf88');rect(352,145,36,180,'#d4bf88');rect(130,188,25,80,'#d4bf88');rect(594,199,31,149,'#d4bf88');rect(198,345,665,51,'#ceb780');rect(425,280,64,320,'#cdb886');rect(310,270,220,26,'#dcc997');
    for(const g of grass){const path=(g.y>252&&g.y<291&&g.x>94&&g.x<674)||(g.y>345&&g.y<396&&g.x>198&&g.x<863)||(g.x>425&&g.x<489&&g.y>280);const color=path?['#c4ae79','#e0ca97'][g.c%2]:['#73994f','#91b26c','#a1bc74','#7a9f56'][g.c];rect(g.x,g.y,2,1,color);if(!path&&g.c===0)rect(g.x+1,g.y-2,1,2,color);if(g.flower&&!path&&g.y<445){rect(g.x,g.y-2,1,3,'#67874b');rect(g.x-1,g.y-4,3,2,g.c%2?'#f4e6b7':'#d8cf9f');}}
    // Rice terraces: wet paddies, earthen banks, rows of bright shoots.
    rect(675,212,176,122,'#6f9766');for(let j=0;j<4;j++){rect(681,219+j*28,163,22,j%2?'#8aac6a':'#91af72');rect(680,241+j*28,166,3,'#b5b57c');for(let i=0;i<16;i++){const x=685+i*10,y=227+j*28;rect(x,y,1,8,'#547a43');rect(x-2,y+2,2,1,'#bad084');rect(x+1,y+4,2,1,'#bdd488');rect(x+3,y+10,4,1,'#a8c49a');}}
    // River and stepping-bank reeds.
    rect(0,451,960,7,'#b7bb84');rect(0,458,960,46,'#6fa7a1');rect(0,463,960,34,'#78b1aa');rect(0,504,960,7,'#b8bc86');
    for(let i=0;i<70;i++){const x=i*15;rect(x,447,1,10,'#597e4a');rect(x+2,449,1,7,'#96b478');rect(x,509,2,4,'#698d50');}
    // Wooden footbridge.
    rect(423,449,68,62,'#8b7351');for(let j=0;j<9;j++){rect(425,451+j*7,64,5,'#c3a773');rect(429,451+j*7,54,1,'#d6bd8e');}rect(423,444,3,68,'#765b40');rect(489,444,3,68,'#765b40');for(let j=0;j<4;j++){rect(420,446+j*21,6,6,'#8c6e4b');rect(488,446+j*21,6,6,'#8c6e4b');}
    // Plaza stones and a modest bamboo fence.
    for(let i=0;i<5;i++)rect(358+i%2*5,199+i*9,13,4,'#c3b282');
    for(let i=0;i<15;i++){rect(84+i*12,213,3,25,'#b49d66');rect(82+i*12,214,6,3,'#ddc38a');}rect(83,220,173,3,'#bca26e');rect(83,231,173,2,'#a78b5d');
    // Banderitas between homes: little flags, big fiesta energy.
    line([[197,93],[285,116],[371,82],[494,119],[612,105]],'#6e7350');
    const flags=['#e0946e','#e9c578','#88a99b','#b69dba'];for(let i=0;i<22;i++){const x=203+i*18,y=x<285?95+(x-203)*.25:x<371?116-(x-285)*.4:x<494?83+(x-371)*.29:119-(x-494)*.12;ctx.fillStyle=flags[i%4];ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+10,y+2);ctx.lineTo(x+5,y+13);ctx.fill();}
  }
  function house(b:Building){
    if(state.stage>0){regionalHouse(b);return;}
    const {x,y,w,h}=b,shop=b.type==='store';oval(x,y+36,w*.64,12,'#466b3b35');
    if(!shop){for(let i=-1;i<=1;i++){rect(x+i*39-3,y+18,6,34,'#876745');rect(x+i*39-1,y+18,2,32,'#aa895a');}}
    rect(x-w/2,y-h*.55,w,h*.95,shop?'#c2b08b':'#c4ac78');rect(x-w/2,y+17,w,4,'#9b8058');
    for(let i=0;i<w/7;i++){rect(x-w/2+i*7,y-h*.55,1,h*.95,shop?'#ad9975':'#aa915f');rect(x-w/2+i*7+2,y-h*.55,1,h*.95,'#d6be8b');}
    const doorX=shop?x-35:x-5;rect(doorX,y-17,22,44,'#69583e');rect(doorX+3,y-15,16,39,'#87734e');rect(doorX+15,y+6,2,3,'#e6c67e');
    rect(x-42,y-26,25,23,'#6f8b76');rect(x-41,y-25,10,20,'#a6bca1');rect(x-28,y-25,10,20,'#b8c6a4');rect(x-31,y-27,3,25,'#927851');rect(x-43,y-16,27,2,'#9b8056');
    if(!shop){rect(x+31,y-27,18,23,'#7e8e70');for(let j=0;j<4;j++)rect(x+32,y-25+j*5,16,2,'#bfaf7f');}
    // Wide pitched roof with layered nipa or painted tin strips.
    const roof=shop?['#ba7864','#ce947a','#d8ac88']:['#9a8652','#b6a06a','#c7b37d'];
    for(let j=0;j<10;j++){const rw=w*.48+j*9;rect(x-rw/2,y-h-10+j*5,rw,6,roof[j%3]);if(!shop)for(let k=0;k<rw/10;k++)rect(x-rw/2+k*10,y-h-7+j*5,1,4,'#8d7b4d55');}
    rect(x-w*.78,y-h+38,w*1.56,5,shop?'#915f50':'#9c8451');
    if(shop){rect(x-59,y-10,118,7,'#dbb76c');for(let i=0;i<12;i++)rect(x-59+i*10,y-10,5,7,'#7c9b7e');rect(x-13,y-27,62,33,'#6b7658');rect(x-10,y-24,57,21,'#9fb08a');for(let i=0;i<5;i++){rect(x-8+i*11,y-20,5,8,['#d9b36b','#b57e67','#d3d2a3'][i%3]);rect(x-7+i*11,y-22,3,2,'#e3d8a9');}rect(x-11,y+4,62,6,'#a18a5f');rect(x-48,y-61,96,16,'#f2dfad');ctx.fillStyle='#695c42';ctx.font='bold 6px monospace';ctx.textAlign='center';ctx.fillText('NENA’S SARI-SARI',x,y-51);}
    else{for(let i=0;i<3;i++)rect(doorX-4-i*3,y+25+i*6,31+i*6,5,['#bb9e6b','#a68a5c','#92794e'][i]);rect(x-46,y+24,13,8,'#936e4e');rect(x-44,y+14,2,13,'#547846');rect(x-50,y+13,14,5,'#83a260');}
  }
  function regionalGround(){
    const stage=state.stage,base=stage===1?'#b4b28b':stage===2?'#78956c':'#709e83';
    rect(0,0,960,600,base);rect(0,0,960,87,stage===1?'#d9d8bc':stage===2?'#c5d3cf':'#bcd6cf');
    for(let i=0;i<8;i++){ctx.fillStyle=stage===2?(i%2?'#819a91':'#92aaa1'):stage===3?'#8fb7ac':'#b5c2a2';ctx.beginPath();ctx.moveTo(i*150-80,104);ctx.lineTo(i*150+55,stage===2?i%2*28:45+i%3*10);ctx.lineTo(i*150+190,104);ctx.fill();}
    if(stage===2){for(let j=0;j<6;j++){const yy=90+j*23;rect(j*9,yy,960-j*18,20,j%2?'#86a579':'#94af7d');rect(j*9,yy+17,960-j*18,4,'#657f6c');for(let i=0;i<38;i++){rect(i*26+j*2,yy+9,17,1,'#bbcd9e');rect(i*26+j*2+3,yy+5,1,4,'#547d4d');}}}
    const path=stage===1?'#d1c3a7':stage===2?'#b4b09a':'#c2b78d';
    rect(94,252,580,39,path);rect(352,145,36,180,path);rect(130,188,25,80,path);rect(594,199,31,149,path);rect(198,345,665,51,path);rect(425,280,64,320,path);rect(310,270,220,26,path);
    if(stage===1){rect(42,212,878,225,'#b9b29b');for(let j=0;j<19;j++)for(let i=0;i<42;i++){const x=42+i*21+(j%2)*10,y=214+j*12;rect(x,y,19,10,['#cbc0a5','#d4c9b1','#bdb39c'][(i+j)%3]);rect(x+2,y+1,14,1,'#e0d4bb');}}
    for(const g of grass){if(g.y>445||stage===1&&g.y>210)continue;rect(g.x,g.y,2,1,stage===2?['#9db58b','#668966'][g.c%2]:stage===3?['#8bb38d','#5a906e'][g.c%2]:'#a1ae84');}
    if(stage===2){for(let j=0;j<5;j++){rect(669+j*5,215+j*25,184-j*10,21,j%2?'#9cb27f':'#a7be8b');rect(667+j*5,233+j*25,188-j*10,5,'#6c8573');for(let i=0;i<15-j;i++){rect(677+j*5+i*11,223+j*25,1,8,'#577f4e');rect(675+j*5+i*11,225+j*25,5,1,'#d1d79d');}}}
    if(stage===3){for(let j=0;j<4;j++){rect(680,223+j*24,161,18,j%2?'#c4ad78':'#a48b62');for(let i=0;i<23;i++)rect(683+i*7,223+j*24,2,18,j%2?'#9a8060':'#d4bb86');}line([[674,216],[849,216]],'#466f5d',2);}
    const water=stage===1?'#89a99e':stage===2?'#8cb7b2':'#6faaa9';rect(0,451,960,7,stage===1?'#a29983':'#b5bd9b');rect(0,458,960,stage===3?142:46,water);if(stage!==3)rect(0,504,960,7,'#b7bc9b');
    if(stage===1){rect(420,446,75,67,'#999e8c');for(let j=0;j<8;j++)for(let i=0;i<5;i++)rect(423+i*14,448+j*8,12,6,'#ccc7b0');rect(420,443,4,72,'#777d70');rect(491,443,4,72,'#777d70');}
    else{const length=stage===3?151:62;rect(423,449,69,length,'#816f58');for(let j=0;j<length/7;j++)rect(425,451+j*7,64,5,stage===2?'#b6b18a':'#cebb8e');rect(422,446,3,length,'#766b53');rect(489,446,3,length,'#766b53');}
    if(stage===1){for(const [x,y] of [[275,251],[510,250],[860,391],[94,393]]){rect(x-2,y-43,4,43,'#636f64');rect(x-6,y-52,12,10,'#9b9c7e');rect(x-4,y-50,8,7,'#f3d99a');rect(x-7,y-54,14,2,'#6d796a');rect(x-4,y+1,8,3,'#7a8170');}}
    if(stage!==2){line([[194,92],[350,111],[610,99]],stage===3?'#526f60':'#8d8c72');for(let i=0;i<21;i++){const x=200+i*19,y=93+Math.sin(i*.14)*16;ctx.fillStyle=['#cf927a','#ddb968','#8eaaa0','#b5a0ba'][i%4];ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+10,y+1);ctx.lineTo(x+5,y+10);ctx.fill();}}
  }
  function regionalHouse(b:Building){
    const {x,y,w}=b,stage=state.stage;oval(x,y+35,w*.65,11,'#435a4533');
    if(stage===1){
      rect(x-w/2,y-17,w,56,'#b8aa8e');for(let j=0;j<6;j++)for(let i=0;i<w/18;i++)rect(x-w/2+i*18+(j%2)*7,y-14+j*8,16,6,j%2?'#cbc0a6':'#c2b69d');
      rect(x-w/2-3,y-65,w+6,51,'#a89574');rect(x-w/2-5,y-17,w+10,4,'#807e68');
      for(let i=0;i<4;i++){const wx=x-w/2+10+i*(w-15)/4;rect(wx,y-58,21,32,'#6a8079');rect(wx+2,y-56,17,27,'#d0d3b4');for(let j=0;j<4;j++){rect(wx+2,y-54+j*7,17,1,'#8e9d87');rect(wx+4+j*4,y-56,1,27,'#98a58b');}rect(wx,y-24,21,3,'#7e7862');rect(wx+2,y-22,17,3,'#c7b698');}
      rect(x-14,y+3,28,36,'#817b65');ctx.fillStyle='#5f705f';ctx.beginPath();ctx.arc(x,y+4,14,Math.PI,0);ctx.fill();rect(x-11,y+3,22,33,'#6a7564');rect(x-10,y+2,20,2,'#d5c6a5');
      for(let j=0;j<7;j++){const rw=w*.55+j*12;rect(x-rw/2,y-102+j*5,rw,6,['#a57862','#bd8f72','#cc9f7f'][j%3]);for(let i=0;i<rw/9;i++)rect(x-rw/2+i*9,y-100+j*5,1,3,'#946c5755');}rect(x-w*.76,y-67,w*1.52,4,'#8c6e59');
      if(b.x===610){rect(x-38,y-6,76,13,'#ede1bf');ctx.fillStyle='#69705b';ctx.font='5px monospace';ctx.textAlign='center';ctx.fillText('HERITAGE CRAFTS',x,y+3);}
    }else if(stage===2){
      for(const off of [-35,35]){rect(x+off-4,y-8,8,51,'#807257');rect(x+off-10,y+13,20,4,'#a39a73');rect(x+off-2,y+21,2,21,'#b5a780');}
      rect(x-w*.38,y-51,w*.76,53,'#957e59');for(let i=0;i<w/9;i++)rect(x-w*.38+i*7,y-50,1,51,'#b19b71');rect(x-w*.4,y-2,w*.8,6,'#74664e');
      rect(x-9,y-27,20,30,'#5e5f48');rect(x-6,y-24,14,25,'#7c7252');
      for(let j=0;j<17;j++){const rw=9+j*(w*1.35/17);rect(x-rw/2,y-117+j*4,rw,5,['#978b63','#b2a478','#c0b086'][j%3]);if(j>5)for(let i=0;i<rw/11;i++)rect(x-rw/2+i*11,y-115+j*4,1,3,'#7e785755');}
      rect(x-w*.73,y-51,w*1.46,5,'#8c805b');line([[x-8,y+5],[x-23,y+44]],'#b8a47a',3);line([[x+7,y+5],[x-8,y+44]],'#b8a47a',3);for(let j=0;j<5;j++)line([[x-9-j*3,y+10+j*7],[x+5-j*3,y+10+j*7]],'#d0bd92',2);
    }else{
      for(const off of [-w*.36,0,w*.36]){rect(x+off-4,y+9,8,38,'#705c48');rect(x+off-2,y+9,2,36,'#af9368');}
      rect(x-w/2,y-46,w,63,'#9b7955');for(let j=0;j<8;j++)rect(x-w/2,y-44+j*8,w,1,'#b89969');rect(x-w/2,y+12,w,7,'#756149');
      const torogan=b.type==='torogan';for(let j=0;j<12;j++){const rw=w*.30+j*(w*.12);rect(x-rw/2,y-112+j*5,rw,6,['#766c52','#988760','#b3a173'][j%3]);}
      rect(x-w*.86,y-53,w*1.72,5,'#6e6047');
      for(let i=0;i<4;i++){const wx=x-w*.42+i*w*.23;rect(wx,y-35,w*.16,21,'#567a71');rect(wx+2,y-33,w*.12,17,'#91aaa0');rect(wx+3,y-30,w*.10,1,'#bfc6a0');}
      rect(x-10,y-14,21,30,'#5a6551');rect(x-7,y-12,15,26,'#7b7758');
      if(torogan){
        // Abstract projecting beam silhouettes; no copied sacred or clan motifs.
        for(const side of [-1,1]){ctx.save();ctx.translate(x+side*w*.48,y+8);ctx.scale(side,1);ctx.fillStyle='#b89453';ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(36,-9);ctx.lineTo(48,-28);ctx.lineTo(39,-35);ctx.lineTo(38,-23);ctx.lineTo(26,-16);ctx.lineTo(6,-12);ctx.closePath();ctx.fill();line([[7,-5],[30,-12],[41,-28]],'#705f42',2);rect(10,-10,5,2,'#d4bd7d');ctx.restore();}
        rect(x-w/2+3,y-7,w-6,6,'#748a65');for(let i=0;i<12;i++)rect(x-w/2+7+i*12,y-5,5,2,'#e0c77e');
      }else{rect(x-29,y-6,58,12,'#d2b382');ctx.fillStyle='#5f6b51';ctx.font='5px monospace';ctx.textAlign='center';ctx.fillText('LAKESIDE CRAFTS',x,y+2);}
      for(let j=0;j<4;j++)rect(x-13-j*3,y+18+j*6,27+j*6,4,'#b39c70');
    }
  }
  function highlandTree(t:Point){const {x,y}=t;oval(x,y,20,6,'#4f715044');rect(x-3,y-49,6,49,'#84785e');for(let i=0;i<5;i++){const width=49-i*8;rect(x-width/2,y-27-i*12,width,12,['#557c65','#638b6c','#729b75'][i%3]);rect(x-width/2+2,y-27-i*12,width*.4,2,'#8aac80');}}
  function regionalTransport(){
    if(state.stage===1){const x=587,y=366;oval(x-38,y+13,34,7,'#6f765633');rect(x-47,y-17,35,19,'#988263');rect(x-51,y-22,43,6,'#6a7864');rect(x-47,y-35,34,15,'#708574');rect(x-43,y-33,26,10,'#b7c2a2');for(const off of [-40,-18]){oval(x+off,y+4,8,8,'#626858');oval(x+off,y+4,5,5,'#b7b198');}line([[x-9,y-7],[x+30,y+1]],'#b29b73',2);rect(x+27,y-13,31,13,'#b19371');rect(x+53,y-25,9,18,'#b19371');rect(x+57,y-30,11,10,'#ba9f7d');for(const off of [30,51]){rect(x+off,y-1,3,14,'#7c715a');rect(x+off,y+11+Math.sin(clock*3+off),5,3,'#6b6854');}line([[x+28,y-10],[x+21,y-16],[x+18,y-8]],'#80745b',2);rect(x+65,y-27,1,2,'#525f4c');}
    else if(state.stage===2){const x=592,y=366;rect(x-33,y-8,65,12,'#968362');rect(x-30,y-14,58,6,'#b5a37a');for(let i=0;i<5;i++)rect(x-26+i*12,y-19,7,8,'#c8bb8e');for(const off of [-23,23]){oval(x+off,y+6,8,8,'#5c6e58');oval(x+off,y+6,5,5,'#b2b695');}line([[x+31,y-5],[x+54,y+2]],'#83785d',3);}
    else{const x=596,y=478+Math.sin(clock*2)*2;oval(x,y+7,57,5,'#42898444');ctx.fillStyle='#a58c60';ctx.beginPath();ctx.moveTo(x-55,y-6);ctx.lineTo(x+56,y-6);ctx.lineTo(x+38,y+10);ctx.lineTo(x-40,y+10);ctx.closePath();ctx.fill();rect(x-36,y-7,72,3,'#d5bd8d');rect(x-28,y-5,8,10,'#6a7760');rect(x+20,y-5,8,10,'#6a7760');line([[x-3,y-15],[x+19,y+16]],'#c0ac7f',3);}
  }
  function palm(t:Point){const x=t.x,y=t.y,sway=Math.sin(clock*.9+x)*2;oval(x+4,y+1,24,7,'#456e3d33');line([[x,y],[x-4,y-25],[x+1,y-58],[x+sway,y-87]],'#8d7951',7);line([[x+2,y],[x-1,y-30],[x+3,y-65],[x+sway+2,y-86]],'#b19b65',2);for(let j=0;j<6;j++)rect(x-5,y-j*12,8,1,'#7e6d48');
    const top=y-88;const leaves=[[-39,-4,-17,-19],[-35,16,-17,-8],[36,-5,19,-20],[38,15,19,-6],[-12,-27,-6,-19],[11,-25,7,-21]];
    for(const [dx,dy,cx,cy] of leaves){ctx.strokeStyle='#4d8052';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(x+sway,top);ctx.quadraticCurveTo(x+cx+sway,top+cy,x+dx+sway,top+dy);ctx.stroke();line([[x+sway,top],[x+dx*.75+sway,top+dy*.65]],'#7ba063',2);}oval(x-6,top+7,4,5,'#a0a16c');oval(x+2,top+8,4,5,'#b2ad74');}
  function mangoTree(t:Point){const x=t.x,y=t.y;oval(x,y+1,27,8,'#436c3d33');rect(x-4,y-47,8,48,'#8e7750');rect(x+1,y-45,2,44,'#b09865');line([[x,y-32],[x-15,y-52]],'#8e7750',4);rect(x-28,y-65,55,28,'#50814c');rect(x-34,y-56,65,22,'#4b7846');rect(x-22,y-75,43,20,'#638f51');rect(x-16,y-78,29,7,'#80a661');rect(x-31,y-58,13,5,'#6d9b56');rect(x+8,y-64,15,6,'#709a53');if(state.stage===0)for(let i=0;i<4;i++){rect(x-22+i*13,y-49+(i%2)*7,4,6,'#edc16b');rect(x-21+i*13,y-49+(i%2)*7,1,4,'#f6da8a');}}
  function person(target:CanvasRenderingContext2D,x:number,y:number,who:CharacterId,walk:boolean,dir:Direction,hat:Hat,shirt:string,scale=1){
    target.save();target.translate(x,y);target.scale(scale,scale);target.imageSmoothingEnabled=false;
    const r=(x:number,y:number,w:number,h:number,c:string)=>{target.fillStyle=c;target.fillRect(Math.round(x),Math.round(y),w,h);},step=walk?Math.sin(state.player.walkTime*15)*2:0,skin=core.characters[who]?.skin||'#c59570',side=dir==='left'?-1:1,back=dir==='up';
    target.scale(side,1);r(-5,-11,10,10,shirt);r(-5,-10,3,8,'#ffffff20');r(-4,-2+step,3,5,'#80684e');r(2,-2-step,3,5,'#80684e');r(-5,2+step,4,2,'#544b3b');r(2,2-step,4,2,'#544b3b');r(-7,-10-step*.5,2,7,skin);r(5,-10+step*.5,2,7,skin);
    r(-5,-20,11,10,'#4e4a38');r(-4,-18,9,8,skin);r(-5,-20,11,4,'#514937');if(back)r(-4,-17,9,6,'#514937');else{r(2,-15,1,2,'#39473b');if(dir==='down')r(-2,-15,1,2,'#39473b');r(0,-11,3,1,'#aa795c');}
    if(who==='amihan'){r(-6,-17,2,8,'#514937');r(5,-17,2,8,'#514937');r(-4,-2,9,3,shirt);}
    if(hat==='salakot'){r(-9,-20,19,3,'#c9ad72');r(-6,-24,13,5,'#dbc38b');r(-2,-27,5,3,'#e9d29a');r(-8,-20,17,1,'#f1dba8');r(-6,-18,2,2,'#a18657');}
    if(hat==='bandana'){r(-5,-20,11,3,'#c66f55');r(-7,-19,3,4,'#a95844');r(-8,-15,2,4,'#d28466');}
    // Woven shoulder bag follows the body as the character steps.
    r(-3,-9,1,9,'#cfb077');r(-6,-3,6,6,'#b79761');r(-5,-2,4,1,'#dfc086');r(-4,-1,1,3,'#886c46');
    target.restore();
  }
  function npc(n:Npc){oval(n.x,n.y+2,9,3,'#4b643c44');person(ctx,n.x,n.y+Math.sin(clock*2+n.x)*.25,'isko',false,'down','none',n.shirt,1.3);if(n.id==='lola'){rect(n.x-6,n.y-29,14,6,'#c2b79a');rect(n.x+7,n.y-26,4,4,'#ded4b5');}const q=core.currentQuest(state);if(q&&q.npc===n.id){ctx.font='bold 10px monospace';ctx.fillStyle='#fff1b6';ctx.textAlign='center';ctx.fillText('!',n.x,n.y-44+Math.sin(clock*3)*2);}if(Math.hypot(state.player.x-n.x,state.player.y-n.y)<64){ctx.font='6px monospace';ctx.fillStyle='#fff0c7';ctx.textAlign='center';ctx.fillText(n.name,n.x,n.y-38);}}
  function jeepney(){const x=596,y=365+Math.sin(clock*10)*.3;oval(x,y+11,58,10,'#4e613c44');rect(x-52,y-31,94,40,'#7d9e94');rect(x-59,y-23,111,25,'#d9c794');rect(x-54,y-33,92,7,'#e7dab2');rect(x-49,y-38,83,5,'#63867c');rect(x-53,y-21,88,7,'#c97758');for(let i=0;i<5;i++){rect(x-48+i*17,y-30,13,12,'#73928a');rect(x-47+i*17,y-29,10,8,'#a8c6b0');}rect(x+37,y-26,19,25,'#9caf9b');rect(x+41,y-23,16,13,'#b8d4bd');rect(x+47,y-4,18,12,'#d2bb83');rect(x+49,y-5,14,3,'#e6d9a6');rect(x+60,y+3,4,4,'#f9e8a9');rect(x-58,y+3,5,5,'#d3a16d');rect(x-59,y+7,124,3,'#a0a38a');for(const off of [-35,38]){oval(x+off,y+10,9,9,'#4d5142');oval(x+off,y+10,5,5,'#afb8a1');oval(x+off,y+10,2,2,'#687967');}ctx.textAlign='center';ctx.font='bold 5px monospace';ctx.fillStyle='#4e644a';ctx.fillText('MALIGAYA • BAYAN',x-10,y-34);ctx.fillStyle='#e9d8a9';ctx.fillText('INGAT!',x-6,y-7);}
  function spirit(e:Spirit){const bob=Math.sin(clock*5+e.phase)*3;oval(e.x,e.y+2,9,3,'#43653d44');ctx.save();ctx.translate(e.x,e.y+bob);rect(-8,-15,16,13,e.flash?'#fff5cd':'#9ebc72');rect(-5,-20,10,7,'#bbcf89');line([[0,-19],[4,-26],[9,-27]],'#628f51',2);rect(4,-28,7,3,'#9cbb6a');rect(-4,-11,2,3,'#456144');rect(4,-11,2,3,'#456144');rect(0,-6,2,1,'#6e8d55');rect(-11,-9,3,4,'#c0cf8c');rect(8,-9,3,4,'#c0cf8c');ctx.restore();}
  function drawNode(n:HarvestNode){if(state.nodes[n.id]>0)return;const y=n.y+Math.sin(clock*3+n.id)*1.1;oval(n.x,n.y+1,7,2,'#55764633');if(n.type==='clay'){rect(n.x-6,y-8,12,8,'#bd9579');rect(n.x-4,y-11,8,4,'#d2b196');rect(n.x-3,y-8,5,1,'#e5c8a4');}else if(n.type==='rice'){rect(n.x-4,y-8,8,8,'#c6b175');for(let i=0;i<5;i++){rect(n.x-5+i*2,y-15,1,10,'#dad097');rect(n.x-6+i*2,y-14+(i%2)*2,3,2,'#e8d9a0');}rect(n.x-4,y-4,8,2,'#927c54');}else if(n.type==='bamboo'){for(let i=0;i<3;i++){rect(n.x-5+i*4,y-15+(i%2)*2,3,16,'#96b77d');for(let j=0;j<3;j++)rect(n.x-5+i*4,y-13+j*5,3,1,'#d1d3a0');}}else if(n.type==='wood'){for(let i=0;i<3;i++){rect(n.x-6,y-10+i*4,13,3,'#b39262');rect(n.x-5,y-10+i*4,10,1,'#dcc08e');}rect(n.x-1,y-11,2,13,'#7c7957');}else if(n.type==='cloth'){rect(n.x-7,y-12,14,12,'#b49a7d');for(let i=0;i<4;i++)rect(n.x-6+i*4,y-12,2,12,'#dbc398');rect(n.x-7,y-8,14,2,'#7a9d87');rect(n.x-7,y-3,14,1,'#e8d7a9');}else if(n.type==='mango'){rect(n.x-4,y-9,7,9,'#e9bb58');rect(n.x-3,y-8,2,6,'#f8d27c');rect(n.x,y-12,1,4,'#69844c');rect(n.x+1,y-12,4,2,'#88a65b');}else if(n.type==='flowers'){rect(n.x,y-7,1,8,'#608446');for(const [dx,dy] of [[-3,-7],[2,-7],[0,-10],[0,-4]])rect(n.x+dx,y+dy,3,3,'#f4eed7');rect(n.x,y-7,2,2,'#dfcb8d');}else{rect(n.x-5,y-7,10,8,'#b2b77b');rect(n.x-3,y-10,6,4,'#cbd29b');rect(n.x+2,y-6,2,5,'#8f9c60');}ctx.fillStyle='#ffedb9';ctx.font='8px monospace';if(Math.sin(clock*3+n.id)>0)ctx.fillText('·',n.x+9,y-13);}
  function frame(now:number){const dt=Math.min(.04,(now-last)/1000);last=now;state=getState();if(!state.paused)clock+=dt;
    const p=state.player,tx=clamp(p.x-W*.5,0,960-W),ty=clamp(p.y-H*(state.stage? .80:.70),0,600-H);if(lastStage!==state.stage){lastStage=state.stage;camera.x=tx;camera.y=ty;arrivalFade=1;particles.length=0;floaters.length=0;pointer=null;}camera.x+=(tx-camera.x)*(1-Math.exp(-dt*8));camera.y+=(ty-camera.y)*(1-Math.exp(-dt*8));
    ctx.clearRect(0,0,W,H);ctx.save();ctx.translate(-Math.round(camera.x),-Math.round(camera.y));ground();
    for(let i=0;i<55;i++){const x=(i*29+clock*7)%960,y=467+(i*11)%(state.stage===3?120:29);rect(x,y,8+(i%3)*3,1,i%2?'#acd1b9':'#8fc5b4');}
    // Slow ripples under the bridge.
    if(state.stage===0){rect(425,451,64,58,'#b59a6c');for(let i=0;i<9;i++)rect(425,452+i*7,64,4,'#d4bb87');rect(423,446,3,67,'#8d714d');rect(489,446,3,67,'#8d714d');}
    // Carabao beside the palayan, with a flicking tail.
    if(state.stage===0||state.stage===2){oval(887,299,20,6,'#4b6a3b33');rect(869,279,35,18,'#8c9482');rect(900,279,13,13,'#a0a590');rect(871,294,4,11,'#7c8775');rect(895,294,4,11,'#7c8775');line([[903,279],[899,272],[894,274]],'#d3c9a7',2);line([[910,279],[916,273],[921,275]],'#d3c9a7',2);rect(909,284,1,2,'#495a47');line([[870,281],[861,283+Math.sin(clock*3)*3],[858,290]],'#747f6d',2);}
    const objects=[...core.stageBuildings(state).map(b=>({y:b.y+35,draw:()=>house(b)})),...core.stageTrees(state).map((t,i)=>({y:t.y,draw:()=>state.stage===2?highlandTree(t):state.stage===1?mangoTree(t):i%3?mangoTree(t):palm(t)})),...core.stageNpcs(state).map(n=>({y:n.y,draw:()=>npc(n)})),...core.stageNodes(state).map(n=>({y:n.y,draw:()=>drawNode(n)})),{y:state.stage===3?485:385,draw:()=>state.stage===0?jeepney():regionalTransport()}];
    for(const e of state.spirits)if(e.dead<=0)objects.push({y:e.y,draw:()=>spirit(e)});
    objects.push({y:p.y,draw:()=>{oval(p.x,p.y+3,10,3,'#3f633d55');if(p.invincible>0&&Math.floor(clock*12)%2===0)ctx.globalAlpha=.5;person(ctx,p.x,p.y,state.character,p.walking,p.dir,state.hat,core.colors[state.outfit],1.4);ctx.globalAlpha=1;
      if(p.swing>0){const angle={right:0,down:Math.PI/2,left:Math.PI,up:-Math.PI/2}[p.dir],progress=1-p.swing/.32;ctx.save();ctx.translate(p.x,p.y-10);ctx.rotate(angle-.8+progress*1.6);rect(4,-1,27,3,'#c6a16b');rect(10,-1,16,1,'#f3d299');ctx.restore();ctx.strokeStyle='#f6e4b5bb';ctx.lineWidth=2;ctx.beginPath();ctx.arc(p.x,p.y-10,31,angle-.9,angle-.9+progress*1.8);ctx.stroke();}if(p.dash>0){for(let i=1;i<4;i++)rect(p.x-7-i*5,p.y-9+i*3,6,2,'#f6e5ad77');}
    }});objects.sort((a,b)=>a.y-b.y);for(const o of objects)o.draw();
    for(let i=0;i<5;i++){const x=180+i*141+Math.sin(clock*.4+i)*20,y=217+(i*61)%180+Math.cos(clock*.7+i)*7;rect(x,y,1,2,'#8d8960');rect(x-2,y+(Math.floor(clock*6)%2),2,1,i%2?'#f0db99':'#dfb19f');rect(x+1,y,2,1,'#f3dfa8');}
    // Water birds trace a quiet route over the village.
    for(let i=0;i<3;i++){const x=(clock*13+i*53)%960,y=99+i*7+Math.sin(clock+i)*3;line([[x-3,y-2],[x,y],[x+4,y-2]],'#eee7c6',1);}
    for(const e of state.events)if(e.id>lastEvent){lastEvent=e.id;if(['gather','loot','hit','quest'].includes(e.type)){floaters.push({x:e.x,y:e.y-25,text:e.text,life:1.5});for(let i=0;i<9;i++)particles.push({x:e.x,y:e.y-6,vx:(Math.random()-.5)*38,vy:-Math.random()*35,life:.7,color:e.type==='hit'?'#d2e5a3':'#f6df9e'});}}
    for(let i=particles.length-1;i>=0;i--){const a=particles[i];a.life-=dt;a.x+=a.vx*dt;a.y+=a.vy*dt;a.vy+=dt*45;rect(a.x,a.y,2,2,a.color);if(a.life<=0)particles.splice(i,1);}
    ctx.font='bold 7px monospace';ctx.textAlign='center';for(let i=floaters.length-1;i>=0;i--){const a=floaters[i];a.life-=dt;a.y-=dt*12;ctx.fillStyle='#3e5738';ctx.fillText(a.text,a.x+1,a.y+1);ctx.fillStyle='#fff0bc';ctx.fillText(a.text,a.x,a.y);if(a.life<=0)floaters.splice(i,1);}
    if(pointer){pointer.life-=dt;ctx.strokeStyle='#fff2bb';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(pointer.x,pointer.y,6+pointer.life*8,3+pointer.life*4,0,0,Math.PI*2);ctx.stroke();if(pointer.life<=0)pointer=null;}
    if(state.stageProgress.every(q=>q===3)){ctx.fillStyle='#ffedb9';ctx.font='12px Georgia';ctx.fillText('Salamat, kaibigan!',450,230+Math.sin(clock)*2);}
    ctx.restore();if(arrivalFade>0){arrivalFade=Math.max(0,arrivalFade-dt*.9);ctx.fillStyle='rgba(247,240,219,'+arrivalFade*.7+')';ctx.fillRect(0,0,W,H);}out.imageSmoothingEnabled=false;out.clearRect(0,0,canvas.width,canvas.height);out.drawImage(world,0,0,canvas.width,canvas.height);
    const key=JSON.stringify([state.character,state.hat,state.outfit]);if(key!==portraitKey){portraitKey=key;const portrait=context2d(canvasElement('portrait'));portrait.clearRect(0,0,48,56);person(portrait,24,49,state.character,false,'down',state.hat,core.colors[state.outfit],1.6);for(const [id,c] of Object.entries(core.characters)){const target=context2d(canvasElement('sprite-'+id));target.clearRect(0,0,48,56);person(target,24,49,id as CharacterId,false,'down',state.hat,id===state.character?core.colors[state.outfit]:c.shirt,1.6);}}
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
