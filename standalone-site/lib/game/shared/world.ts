import type { CharacterId, Point } from './types';
export const REGION={width:3072,height:2304};
export const WORLD={width:6144,height:4608};
export function regionOrigin(stage:number):Point{return {x:stage%2*REGION.width,y:Math.floor(stage/2)*REGION.height};}
export function regionAt(x:number,y:number):number{return (x>=REGION.width?1:0)+(y>=REGION.height?2:0);}
export function inRegion<T extends Point>(p:T,stage:number):T{const o=regionOrigin(stage);return {...p,x:p.x+o.x,y:p.y+o.y};}
export const regionLocks=[0,6,15,30];
export const passages=[{a:0,b:1,x:3072,y:735},{a:0,b:2,x:455,y:2304},{a:1,b:3,x:3527,y:2304},{a:2,b:3,x:3072,y:3039}];
export const TAVERN={width:768,height:512,spawn:{x:384,y:365},door:{x:384,y:454},outside:{x:392,y:732},entrance:{x:392,y:710}};
export const companions: {id:CharacterId; x:number; y:number; role:string}[]=[
  {id:'tala',x:240,y:240,role:'Wayfarer'}, {id:'isko',x:384,y:240,role:'Guardian · faster swings'}, {id:'amihan',x:528,y:240,role:'Scout · faster steps'}
];
export const tavernFurniture=[{x:94,y:116,w:580,h:48},{x:103,y:296,w:100,h:48},{x:560,y:296,w:100,h:48},{x:620,y:188,w:74,h:48}];
export const chests: Point[]=[{x:1120,y:250},{x:1700,y:970},{x:730,y:1010},{x:2480,y:870},{x:2120,y:1940},{x:540,y:1950},{x:2820,y:1680}];
export const camps: Point[]=[{x:1100,y:800},{x:1630,y:250},{x:2400,y:1200},{x:850,y:1790}];
export const wildNodes: Point[]=[{x:1060,y:285},{x:1560,y:190},{x:1780,y:380},{x:740,y:840},{x:1110,y:930},{x:1500,y:810},{x:1720,y:1050},{x:240,y:1020},{x:970,y:670},...Array.from({length:42},(_,i)=>({x:600+(i*463%2310),y:650+(i*197%1500)}))];
export const wildSpiritHomes: Point[]=[{x:1160,y:330},{x:1550,y:340},{x:1780,y:290},{x:940,y:870},{x:1510,y:930},{x:1720,y:890},...Array.from({length:15},(_,i)=>({x:1050+(i*337%1810),y:680+(i*271%1440)}))];
const forests:Point[][]=[];
export function wildTreesFor(stage:number):Point[]{
  if(forests[stage])return forests[stage];
  let seed=417+stage*239;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const result:Point[]=[],protectedPoints=[...wildNodes,...wildSpiritHomes,...chests,...camps];
  for(let i=0;i<4800;i++){
    const t={x:70+random()*(REGION.width-140),y:130+random()*(REGION.height-210)};
    if(t.x<960&&t.y<610||t.x<550&&t.y<820)continue;
    if(Math.abs(t.y-735)<75||Math.abs(t.y-1000)<45||Math.abs(t.x-455)<65||Math.abs(t.x-1370)<65)continue;
    if(protectedPoints.some(p=>Math.hypot(p.x-t.x,p.y-t.y)<65)||result.some(p=>Math.hypot(p.x-t.x,p.y-t.y)<72))continue;
    result.push(t);
  }
  return forests[stage]=result;
}
