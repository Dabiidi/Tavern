import * as core from '../shared/core';
import type { GameState, Point } from '../shared/types';
import { canvasElement, context2d, element } from './dom';

const canvas=canvasElement('minimap-canvas'),map=context2d(canvas);
const terrain=document.createElement('canvas');terrain.width=256;terrain.height=192;
const ink=context2d(terrain);
let terrainKey='',lastDraw=-Infinity;

export function drawMinimap(state:GameState,camera:Point,width:number,height:number,now:number):void {
  const key=JSON.stringify([state.area,state.stage,state.unlocked,state.chests[state.stage]]);
  if(key===terrainKey&&now-lastDraw<80)return;
  lastDraw=now;
  const outside=state.area==='field',origin=outside?core.regionOrigin(state.stage):{x:0,y:0},size=core.bounds(state),sx=256/size.width*(outside?2:1),sy=192/size.height*(outside?2:1);
  const position=(p:Point)=>({x:Math.max(4,Math.min(252,(p.x-origin.x)*sx)),y:Math.max(4,Math.min(188,(p.y-origin.y)*sy))});
  if(key!==terrainKey){
    terrainKey=key;
    if(!outside){ink.fillStyle='#745b40';ink.fillRect(0,0,256,192);ink.fillStyle='#9b7950';ink.fillRect(48*sx,84*sy,672*sx,396*sy);ink.fillStyle='#a76d50';ink.fillRect(202*sx,208*sy,364*sx,216*sy);ink.fillStyle='#443b30';for(const f of core.tavernFurniture)ink.fillRect(f.x*sx,f.y*sy,f.w*sx,f.h*sy);ink.fillStyle='#e3c387';for(const c of core.companions){ink.beginPath();ink.arc(c.x*sx,c.y*sy,3,0,Math.PI*2);ink.fill();}ink.fillStyle='#9fd0af';ink.fillRect(354*sx,452*sy,60*sx,20*sy);}
    else{
    ink.fillStyle=['#466b46','#747557','#42675b','#386d68'][state.stage];ink.fillRect(0,0,256,192);
    ink.fillStyle='#a9b88244';for(const tree of core.stageTrees(state)){const p=position(tree);ink.fillRect(p.x,p.y,2,2);}
    ink.fillStyle='#729f9a';ink.fillRect(0,458*sy,256,47*sy);if(state.stage===3)ink.fillRect(0,458*sy,960*sx,142*sy);
    ink.strokeStyle='#c2af78';ink.lineWidth=2;ink.beginPath();ink.moveTo(455*sx,280*sy);ink.lineTo(455*sx,192);ink.moveTo(0,735*sy);ink.lineTo(256,735*sy);ink.moveTo(1370*sx,130*sy);ink.lineTo(1370*sx,192);ink.moveTo(455*sx,1000*sy);ink.lineTo(256,1000*sy);ink.stroke();
    for(const building of core.stageBuildings(state)){const p=position(building);ink.fillStyle='#d6c59a';ink.fillRect(p.x-3,p.y-2,6,4);}
    for(const feature of core.features(state)){
      const p=position(feature);
      if(feature.kind==='rest'){ink.fillStyle='#b4d29b';ink.beginPath();ink.moveTo(p.x,p.y-4);ink.lineTo(p.x+4,p.y+3);ink.lineTo(p.x-4,p.y+3);ink.fill();}
      if(feature.kind==='chest'){ink.fillStyle='#e4be68';ink.fillRect(p.x-2,p.y-2,4,4);}
      if(feature.kind==='gate'){
        const locked=(feature.destination??0)>state.unlocked;ink.fillStyle=locked?'#a5a49b':'#8ed3c0';ink.fillRect(p.x-3,p.y-2,6,5);
        if(locked){ink.strokeStyle='#a5a49b';ink.lineWidth=1;ink.strokeRect(p.x-2,p.y-5,4,4);}else{ink.fillStyle='#244e44';ink.fillRect(p.x-1,p.y-1,2,2);}
      }
    }
    for(const npc of core.stageNpcs(state)){const p=position(npc);ink.fillStyle='#f2d594';ink.beginPath();ink.arc(p.x,p.y,2,0,Math.PI*2);ink.fill();}
    if(state.stage===0){const p=position(core.TAVERN.entrance);ink.fillStyle='#ffe4a0';ink.fillRect(p.x-3,p.y-2,6,5);ink.beginPath();ink.moveTo(p.x-5,p.y-2);ink.lineTo(p.x,p.y-7);ink.lineTo(p.x+5,p.y-2);ink.fill();}
    }
    element('minimap-place').textContent=outside?core.stageInfo(state).name:'Bahay Pahinga';
    canvas.setAttribute('aria-label',outside?'Map of '+core.stageInfo(state).name+'. White arrow: you. Gold: villagers and treasure. Green: rest camps. Locks: closed paths.':'Map of Bahay Pahinga. White arrow: you. Gold: companions. Green: exit.');
  }
  map.clearRect(0,0,256,192);map.drawImage(terrain,0,0);
  map.strokeStyle='#f6efd077';map.lineWidth=1;map.strokeRect((camera.x-origin.x)*sx,(camera.y-origin.y)*sy,width*sx,height*sy);
  const p=position(state.player);map.save();map.translate(p.x,p.y);map.rotate({up:0,right:Math.PI/2,down:Math.PI,left:-Math.PI/2}[state.player.dir]);
  map.fillStyle='#243e35';map.beginPath();map.arc(0,0,6,0,Math.PI*2);map.fill();map.fillStyle='#fff4cb';map.beginPath();map.moveTo(0,-5);map.lineTo(4,4);map.lineTo(0,2);map.lineTo(-4,4);map.closePath();map.fill();map.restore();
  map.font='bold 9px monospace';map.fillStyle='#f4e6ba';map.fillText('N',6,12);
}
