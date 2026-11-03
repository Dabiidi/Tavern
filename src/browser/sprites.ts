import type { CharacterId, Direction, Hat } from '../shared/types';
import type { ArmorId, HairStyle, HairColor } from '../shared/appearance';
import { hairColors } from '../shared/appearance';
import { weaponInfo } from '../shared/weapons';

// Every character drawn in the world uses this scale; UI previews can zoom in.
export const WORLD_CHARACTER_SCALE=1.05;
export type Pose='idle'|'walk'|'attack'|'shoot'|'dash';
export interface SpriteLook {character:CharacterId;hat:Hat;shirt:string;skin:string;hair:HairStyle;hairColor:HairColor;armor:ArmorId;weapon:string;armed:boolean;sandals:number;charm:number;wrap:number}
const TILE_W=80,TILE_H=64,FRAMES=8;
const sheets=new Map<string,HTMLCanvasElement>();
function shade(hex:string,amount:number){const value=parseInt(hex.slice(1),16);return '#'+[value>>16,(value>>8)&255,value&255].map(c=>Math.max(0,Math.min(255,c+amount)).toString(16).padStart(2,'0')).join('');}

function drawFrame(ctx:CanvasRenderingContext2D,look:SpriteLook,dir:Direction,pose:Pose,frame:number){
  const r=(x:number,y:number,w:number,h:number,color:string)=>{ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),w,h);};
  const phase=frame/FRAMES*Math.PI*2,moving=pose==='walk'||pose==='dash',stride=moving?Math.round(Math.sin(phase)*3):0,bob=moving?Math.abs(stride)*.4:frame===3||frame===4?1:0;
  const outline='#374237',hair=hairColors[look.hairColor],hairLight=shade(hair,20),skin=look.skin,skinShadow=shade(skin,-26),skinLight=shade(skin,21),shirt=look.shirt,shirtShade=shade(shirt,-29),shirtLight=shade(shirt,27);
  const back=dir==='up',side=dir==='left'||dir==='right',style=look.hair==='natural'?({tala:'long',isko:'crop',amihan:'ponytail'} as const)[look.character]:look.hair;
  ctx.save();ctx.translate(40,59);if(dir==='left')ctx.scale(-1,1);
  // Boots, trousers, and alternating footfalls have their own layers.
  for(const [x,step] of [[-6,stride],[1,-stride]]){
    r(x,-12+step*.4,6,13,outline);r(x+1,-11+step*.4,4,11,'#68715b');r(x+1,-11+step*.4,1,10,'#89917a');
    const sole=['#655440','#bd9657','#d0b778','#e9cf87'][look.sandals];r(x-1,step*.6,7,4,outline);r(x,1+step*.6,6,2,sole);r(x+1,step*.6,3,1,'#d9c291');if(look.sandals>1)r(x,3+step*.6,6,1,'#f2dbab');
  }
  ctx.translate(pose==='dash'?2:0,-Math.round(bob));
  // Hair behind the neck, then shoulders and clothing.
  if(style==='long'||style==='bob'){r(-8,-37,16,19,outline);r(-7,-36,14,18,hair);r(-7,-34,2,14,hairLight);}
  if(style==='ponytail'){const swish=moving?stride*.4:frame%3-1;r(back?-2:-10,-37,5,15,outline);r(back?-1:-9,-36,3,13,hair);r(back?-2:-10,-23+swish,4,6,hair);r(back?-1:-9,-35,3,2,'#cf9a69');}
  r(-8,-24,16,14,outline);r(-7,-23,14,12,shirtShade);r(-5,-24,10,13,shirt);r(-5,-22,2,10,shirtLight);r(-7,-13,14,3,shirtShade);
  r(-3,-26,6,4,skinShadow);r(-2,-26,4,3,skin);r(-3,-23,6,2,'#ebd5a8');r(-1,-21,2,8,shirtShade);r(0,-20,1,1,'#edcd8b');r(0,-17,1,1,'#edcd8b');
  if(look.character==='amihan'&&look.armor==='linen'){r(-7,-12,14,3,shirt);r(-6,-10,12,2,shirtLight);}
  if(look.armor==='abaca'){
    r(-7,-23,5,12,'#a88b57');r(2,-23,5,12,'#c0a671');r(-6,-22,3,10,'#ddc48b');r(3,-22,3,10,'#ead59d');for(let y=-21;y<-12;y+=3){r(-6,y,3,1,'#b59761');r(3,y,3,1,'#b59761');}r(-7,-12,14,2,'#8d784f');
  }else if(look.armor==='leather'){
    r(-7,-23,14,12,'#704f3c');r(-6,-22,5,10,'#ad7954');r(1,-22,5,10,'#976446');r(-8,-24,5,4,'#866044');r(3,-24,5,4,'#bb8b61');r(-5,-20,10,1,'#6e503c');r(-5,-15,10,1,'#6e503c');r(-2,-18,4,3,'#d9b36a');r(-1,-17,2,1,'#6d5740');
  }else if(look.armor==='moonweave'){
    r(-7,-24,14,14,'#405e68');r(-6,-23,5,12,'#668d8d');r(1,-23,5,12,'#51797c');r(-8,-24,4,5,'#a5c0aa');r(4,-24,4,5,'#a5c0aa');r(-7,-11,5,8+stride*.3,'#4c7479');r(2,-11,5,8-stride*.3,'#60868a');r(-6,-5+stride*.3,4,1,'#c8cfac');r(2,-5-stride*.3,4,1,'#c8cfac');r(-1,-22,2,10,'#d7bd7e');
  }
  r(-7,-12,14,2,'#65503a');r(-1,-12,3,2,'#e2c180');
  // Arms alternate while walking and lift into attacks and tirador shots.
  const reach=pose==='attack'?Math.sin(frame/7*Math.PI)*7:pose==='shoot'?5:0;
  for(const [x,sign] of [[-10,-1],[7,1]]){const y=-22+stride*sign*.5-(sign===1?reach:pose==='shoot'?4:0);r(x,y,4,9,outline);r(x+1,y+1,3,5,shirt);r(x+1,y+6,3,5,skinShadow);r(x+1,y+6,2,4,skinLight);}
  // Cross-body abaca bag and optional agimat.
  r(-5,-22,1,4,'#e0c78c');r(-4,-18,1,4,'#e0c78c');r(-3,-14,1,4,'#e0c78c');r(-10,-11,7,8,outline);r(-9,-10,6,6,'#bb9960');r(-8,-9,4,2,'#dfc384');r(-7,-6,1,2,'#846e43');
  if(look.charm){const x=back?6:0;r(x,-21,1,6,'#e9d398');r(x-2,-17,5,5,'#a88b4e');r(x-1,-16,3,3,look.charm===3?'#ffecae':look.charm===2?'#8cc6ad':'#deb46a');if(look.charm>1){r(x-4,-15,2,1,'#ead08e');r(x+3,-15,2,1,'#ead08e');}}
  // Shaded head, ears, individual hair shapes, blink, and directional face.
  r(-7,-41,14,15,outline);r(-6,-40,12,13,skinShadow);r(-5,-39,10,11,skin);r(-4,-38,4,7,skinLight);r(-8,-35,2,5,skinShadow);r(6,-35,2,5,skin);r(-7,-42,14,6,hair);r(-6,-41,11,2,hairLight);
  if(back){r(-6,-39,12,12,hair);r(-5,-37,2,8,hairLight);r(2,-40,2,8,hairLight);r(-4,-28,8,2,hair);}
  else{
    const blink=pose==='idle'&&frame===7,eye=blink?1:2;
    if(!side){r(-4,-34,2,eye,'#344033');r(3,-34,2,eye,'#344033');if(!blink){r(-4,-34,1,1,'#faf1d5');r(3,-34,1,1,'#faf1d5');}r(-5,-31,2,1,shade(skin,-8));}
    else{r(3,-34,2,eye,'#344033');r(6,-33,2,3,skinLight);r(-6,-39,4,10,hair);}
    r(0,-32,1,2,skinShadow);r(0,-29,3,1,'#9c6d50');r(-5,-39,2,6,hair);if(style==='crop')r(2,-40,5,3,hairLight);if(style==='bob'||style==='long'){r(-7,-38,3,12,hair);r(5,-38,3,12,hair);r(-6,-34,1,7,hairLight);}
  }
  if(look.hat==='salakot'){r(-12,-41,25,4,'#8b7449');r(-11,-42,23,3,'#d4b77b');r(-8,-46,17,5,'#e6cd95');r(-4,-49,9,4,'#f0dbac');r(-1,-51,3,3,'#b99b63');r(-9,-42,19,1,'#fff0c6');for(let i=-5;i<7;i+=4)r(i,-45,1,3,'#c0a16b');}
  if(look.hat==='bandana'){r(-7,-41,14,4,'#b85e4c');r(-5,-40,10,1,'#e7a37b');r(-10,-39,4,4,'#975443');r(-12,-36+stride*.25,4,5,'#cb7759');r(-11,-33+stride*.25,2,4,'#dc9870');}
  if(look.hat==='rattan'){r(-9,-42,18,4,'#8e774c');r(-7,-47,14,7,'#cbb67b');r(-4,-49,8,3,'#e2d197');for(let y=-45;y<-40;y+=2)for(let x=-6;x<7;x+=3)r(x,y,1,1,'#a68f5d');r(-9,-40,3,7,'#b6a36d');r(6,-40,3,7,'#b6a36d');}
  if(look.armed){
    const weapon=weaponInfo(look.weapon);ctx.save();
    if(pose==='attack'){ctx.translate(1,-20);ctx.rotate((dir==='up'?-Math.PI/2:dir==='down'?Math.PI/2:0)-.85+frame/7*1.7);ctx.translate(0,20);}
    if(weapon.kind==='slingshot'){r(10,-13,3,13,'#987242');r(7,-23,3,12,weapon.color);r(15,-23,3,12,weapon.color);r(9,-22,8,1,'#f0deab');if(pose==='shoot')r(9,-23+Math.sin(frame/7*Math.PI)*4,7,1,'#fbe8be');}
    else if(weapon.kind==='blade'){r(11,-30,5,25,outline);r(12,-29,4,23,weapon.color);r(13,-32,2,5,'#eef0cd');r(10,-8,8,2,'#d9b66c');r(12,-5,3,7,'#9b7047');r(12,-28,1,18,'#f4f4da');}
    else if(weapon.kind==='spear'){r(12,-41,2,46,'#bca26e');r(10,-45,6,8,weapon.color);r(12,-49,2,5,'#edf1d1');r(11,-35,4,3,'#8a6844');}
    else{r(11,-33,4,37,outline);r(12,-32,3,35,weapon.color);r(12,-31,1,32,'#eed29c');if(look.wrap){r(11,-15,5,8,['','#b66f52','#4e9188','#b89758'][look.wrap]);for(let i=0;i<look.wrap;i++)r(12,-27+i*4,3,1,'#896644');}if(look.wrap===3){r(11,-34,5,2,'#ffe3a0');r(11,2,5,2,'#ffe3a0');}}
    ctx.restore();
  }
  ctx.restore();
}

export function paintSprite(target:CanvasRenderingContext2D,x:number,y:number,look:SpriteLook,dir:Direction,pose:Pose,phase:number,scale:number){
  const key=JSON.stringify([look,dir,pose]);let sheet=sheets.get(key);
  if(!sheet){sheet=document.createElement('canvas');sheet.width=TILE_W*FRAMES;sheet.height=TILE_H;const ctx=sheet.getContext('2d')!;for(let frame=0;frame<FRAMES;frame++){ctx.save();ctx.translate(frame*TILE_W,0);drawFrame(ctx,look,dir,pose,frame);ctx.restore();}if(sheets.size>=128)sheets.delete(sheets.keys().next().value!);sheets.set(key,sheet);}
  const frame=((Math.floor(phase)%FRAMES)+FRAMES)%FRAMES;target.imageSmoothingEnabled=false;target.drawImage(sheet,frame*TILE_W,0,TILE_W,TILE_H,Math.round(x-40*scale),Math.round(y-59*scale),TILE_W*scale,TILE_H*scale);
}
