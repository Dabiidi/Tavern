import { isRecord, isKey } from './types';
import type { Action, Building, Character, CharacterId, Direction, EventType, GameState, HarvestNode, Interaction, MovementInput, Npc, Outfit, Point, Quest, QuestItem, Stage } from './types';
export const WORLD={width:960,height:600};
export const characters: Record<CharacterId, Character> ={tala:{name:'Tala',description:'A curious explorer with a big heart.',shirt:'#dc795d',skin:'#d2a174'},isko:{name:'Isko',description:'Always ready for a little adventure.',shirt:'#598d8a',skin:'#ba865f'},amihan:{name:'Amihan',description:'A quick step and a sunny smile.',shirt:'#a987bd',skin:'#dfb28a'}};
export const colors: Record<Outfit, string> ={terracotta:'#dc795d',ocean:'#598d8a',ube:'#a987bd',mango:'#e5b653'};
export const buildings: Building[] =[{x:142,y:154,w:114,h:75,type:'kubo'},{x:350,y:120,w:113,h:76,type:'kubo'},{x:610,y:167,w:126,h:73,type:'store'}];
export const trees=[{x:66,y:153},{x:99,y:305},{x:265,y:159},{x:485,y:132},{x:780,y:143},{x:876,y:218},{x:859,y:393},{x:219,y:397},{x:57,y:420},{x:744,y:526},{x:155,y:535}];
export const npcs: Npc[] =[{id:'lola',name:'Lola Rosa',x:360,y:245,shirt:'#a87da4'},{id:'nena',name:'Aling Nena',x:617,y:254,shirt:'#d88b58'},{id:'benji',name:'Kuya Benji',x:563,y:363,shirt:'#6b96a5'}];
export const nodes: HarvestNode[] =[{id:0,x:115,y:324,type:'mango'},{id:1,x:276,y:184,type:'mango'},{id:2,x:798,y:174,type:'mango'},{id:3,x:80,y:405,type:'mango'},{id:4,x:450,y:285,type:'flowers'},{id:5,x:520,y:300,type:'flowers'},{id:6,x:693,y:321,type:'flowers'},{id:7,x:306,y:340,type:'flowers'},{id:8,x:825,y:407,type:'buko'}];
export const spiritHomes=[{x:715,y:295},{x:815,y:340},{x:748,y:381}];
export const quests: Quest[] =[{title:'A sweet little favor',description:'Bring 3 mangoes to Lola Rosa by the plaza.',goal:3,item:'mango',npc:'lola',reward:25},{title:'Flowers for the fiesta',description:'Bring 3 sampaguita to Aling Nena at the sari-sari store.',goal:3,item:'flowers',npc:'nena',reward:35},{title:'A clear path home',description:'Shoo 3 playful leaf sprites near the rice fields, then visit Kuya Benji.',goal:3,item:'cleared',npc:'benji',reward:50}];
export const stages: Stage[] =[
    {name:'Maligaya Barrio',region:'LOWLAND LUZON',architecture:'Bahay kubo',note:'Raised bamboo homes and broad nipa roofs frame this sunny fictional barrio.',theme:'barrio',tasks:quests},
    {name:'Heritage Streets',region:'VIGAN-INSPIRED · ILOCOS',architecture:'Bahay na bato',note:'Stone lower floors, timber upper stories, capiz-style window grids, and tiled roofs inspired by Vigan’s heritage streets.',theme:'vigan',tasks:[{title:'A potter’s welcome',description:'Bring 3 clay bundles to Aling Pilar at the plaza.',goal:3,item:'clay',npc:'lola',reward:45},{title:'Flowers along the street',description:'Bring 4 sampaguita to Mang Tomas at the heritage shop.',goal:4,item:'flowers',npc:'nena',reward:55},{title:'A quiet kalesa route',description:'Shoo 4 sprites on the eastern street, then see Kuya Benji.',goal:4,item:'cleared',npc:'benji',reward:70}]},
    {name:'Highland Terraces',region:'IFUGAO-INSPIRED · CORDILLERA',architecture:'Bale houses',note:'Steep thatched roofs, elevated timber houses, and stepped rice terraces inspired by Ifugao architecture and landscapes.',theme:'ifugao',tasks:[{title:'Rice for the gathering',description:'Bring 3 rice bundles to Ate Laya near the highland house.',goal:3,item:'rice',npc:'lola',reward:65},{title:'Bamboo for the footpath',description:'Bring 3 bamboo bundles to Mang Dado at the workshop.',goal:3,item:'bamboo',npc:'nena',reward:75},{title:'A peaceful mountain trail',description:'Shoo 4 sprites beside the terraces, then visit Kuya Benji.',goal:4,item:'cleared',npc:'benji',reward:90}]},
    {name:'Lakeside Gathering',region:'MARANAO-INSPIRED · LANAO',architecture:'Torogan-inspired hall',note:'A raised timber hall with a sweeping roof and decorative projecting beams inspired by the Maranao torogan and its panolong.',theme:'maranao',tasks:[{title:'Wood for the craft table',description:'Bring 3 carving-wood bundles to Ate Salma near the hall.',goal:3,item:'wood',npc:'lola',reward:85},{title:'A woven welcome',description:'Bring 3 woven-cloth bundles to Kuya Amir at the lakeside stall.',goal:3,item:'cloth',npc:'nena',reward:95},{title:'The final gathering',description:'Shoo 5 sprites along the lakeside path, then see Kuya Benji.',goal:5,item:'cleared',npc:'benji',reward:120}]}
  ];
export const itemLabels: Record<QuestItem, string> ={mango:'mangga',flowers:'sampaguita',buko:'buko',clay:'clay bundles',rice:'rice bundles',bamboo:'bamboo bundles',wood:'carving wood',cloth:'woven cloth',cleared:'sprites'};
  export function stageInfo(s: GameState): Stage{return stages[s.stage||0];}
  export function currentQuest(s: GameState): Quest | undefined{return stageInfo(s).tasks[s.quest];}
  export function questAmount(s: GameState, q: Quest | undefined = currentQuest(s)): number{return q?(q.item==='cleared'?Math.max(0,s.cleared-(s.clearStart?.[s.stage]||0)):s[q.item]):0;}
  export function stageBuildings(s: Pick<GameState, 'stage'>): Building[]{const i=s.stage||0;return buildings.map<Building>((b,j)=>i===0?b:{...b,type:i===1?'bato':i===2?'bale':j===1?'torogan':'pavilion',w:i===1?b.w+12:i===3&&j===1?158:b.w,h:i===1?92:i===2?96:i===3?98:b.h});}
  export function stageTrees(s: Pick<GameState, 'stage'>): Point[]{return (s.stage===3?trees.filter(t=>t.x!==265&&t.y<451):trees);}
  export function stageNodes(s: GameState): HarvestNode[]{const mappings: Partial<Record<import('./types').Resource, import('./types').Resource>>[] = [{}, {mango:'clay'}, {mango:'rice',flowers:'bamboo',buko:'rice'}, {mango:'wood',flowers:'cloth'}];return nodes.map(n=>({...n,type:mappings[s.stage||0][n.type]||n.type,...(s.stage===3&&n.id===1?{x:248,y:218}:{})}));}
  export function stageNpcs(s: GameState): Npc[]{const names=[['Lola Rosa','Aling Nena','Kuya Benji'],['Aling Pilar','Mang Tomas','Kuya Benji'],['Ate Laya','Mang Dado','Kuya Benji'],['Ate Salma','Kuya Amir','Kuya Benji']][s.stage||0];return npcs.map((n,i)=>({...n,name:names[i]}));}
  function enterStage(s: GameState, index: unknown): boolean{
    if(typeof index!=='number'||!Number.isInteger(index)||index<0||index>Math.min(3,s.unlocked)||s.paused)return false;
    s.stage=index;s.quest=s.stageProgress[index];s.completed=Array.from({length:s.quest},(_,i)=>i);s.transition=null;s.arrival++;s.player.x=392;s.player.y=284;s.player.dir='down';s.player.hp=5;s.player.stamina=100;s.player.walking=false;s.player.swing=0;s.player.invincible=2;s.nodes=nodes.map(()=>0);s.spirits=spiritHomes.map((h,i)=>({...h,hp:2,dead:0,phase:i*2,flash:0}));emit(s,'Welcome to '+stages[index].name+'!','arrival');return true;
  }
  export function create(): GameState{return {version:4,stage:0,stageProgress:[0,0,0,0],clearStart:[0,0,0,0],unlocked:0,arrival:0,transition:null,character:'tala',name:'Tala',outfit:'terracotta',hat:'salakot',coins:0,mango:0,flowers:0,buko:0,beads:0,clay:0,rice:0,bamboo:0,wood:0,cloth:0,cleared:0,quest:0,completed:[],player:{x:392,y:284,dir:'down',hp:5,stamina:100,walking:false,walkTime:0,swing:0,cooldown:0,dash:0,dashCooldown:0,invincible:0},nodes:nodes.map(()=>0),spirits:spiritHomes.map((h,i)=>({...h,hp:2,dead:0,phase:i*2,flash:0})),time:0,paused:false,compact:false,eventId:0,events:[],savedAt:Date.now()};}
  function emit(s: GameState, text: string, type: EventType = 'notice', x = s.player.x, y = s.player.y): void{s.eventId++;s.events.push({id:s.eventId,text,type,x,y});s.events=s.events.slice(-20);}
  export function blocked(x: number, y: number, s: Pick<GameState, 'stage'> = {stage:0}): boolean{
    if(x<20||y<86||x>WORLD.width-20||y>WORLD.height-20)return true;
    if(y>456&&(s.stage===3||y<505)&&!(x>425&&x<490))return true;
    if(stageBuildings(s).some(b=>x>b.x-b.w/2-5&&x<b.x+b.w/2+5&&y>b.y-20&&y<b.y+b.h*.48))return true;
    if(stageTrees(s).some(t=>Math.abs(x-t.x)<12&&Math.abs(y-t.y)<9))return true;
    return false;
  }
  export function nearest(s: GameState): Interaction | null{
    const p=s.player,choices: Interaction[]=[...stageNpcs(s).map(n=>({...n,kind:'npc' as const})),...stageNodes(s).filter(n=>s.nodes[n.id]<=0).map(n=>({...n,kind:'node' as const}))];
    choices.sort((a,b)=>Math.hypot(p.x-a.x,p.y-a.y)-Math.hypot(p.x-b.x,p.y-b.y));
    const n=choices[0];return n&&Math.hypot(p.x-n.x,p.y-n.y)<40?n:null;
  }
  function interact(s: GameState): void{
    if(s.paused||s.transition)return;const n=nearest(s);if(!n){emit(s,'Walk closer to a villager or a glowing harvest spot.');return;}
    if(n.kind==='node'){s[n.type]++;s.nodes[n.id]=18;emit(s,'+1 '+itemLabels[n.type],'gather',n.x,n.y);return;}
    const q=currentQuest(s);
    if(q&&n.id===q.npc){
      if(questAmount(s,q)>=q.goal){if(q.item!=='cleared')s[q.item]-=q.goal;s.coins+=q.reward;s.completed.push(s.quest);s.quest++;s.stageProgress[s.stage]=s.quest;emit(s,n.name+': Salamat! +'+q.reward+' coins','quest');
        if(s.quest===3&&s.stage<3){const next=s.stage+1;if(s.unlocked<next){s.unlocked=next;s.clearStart[next]=s.cleared;}s.transition={next,remaining:3};emit(s,'Stage complete! Next stop: '+stages[next].name,'departure');}
      }
      else emit(s,n.name+': '+(s.stage===0?({lola:'Puwede mo ba akong dalhan ng 3 mangga?',nena:'Three sampaguita for our fiesta, please!',benji:'Three leaf sprites are blocking the rice-field path.'}[n.id]):q.description));
    }else emit(s,n.name+': '+(s.quest>=3?'Salamat! You can revisit completed places from Our Journey.':s.stage===0?({lola:'Magandang araw! Enjoy our little barangay.',nena:'Tuloy po! There’s always something good at the tindahan.',benji:'Ingat sa daan! The rice fields are just east of here.'}[n.id]):'Welcome! '+stageInfo(s).architecture+' is part of this place’s story.'));
    if(n.id==='lola'){s.player.hp=5;s.player.stamina=100;}
  }
  function swing(s: GameState): void{
    const p=s.player;if(s.paused||p.cooldown>0)return;p.swing=.32;p.cooldown=.4;
    const dir: number[] = {up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}[p.dir];
    let hit=false;
    for(const e of s.spirits)if(!e.dead&&Math.hypot(p.x-e.x,p.y-e.y)<48){const dx=e.x-p.x,dy=e.y-p.y;if(dx*dir[0]+dy*dir[1]<-10)continue;e.hp--;e.flash=.2;hit=true;emit(s,'✦','hit',e.x,e.y);const len=Math.hypot(dx,dy)||1;const x=e.x+dx/len*9,y=e.y+dy/len*9;if(!blocked(x,y,s)){e.x=x;e.y=y;}
      if(e.hp<=0){e.dead=28;s.cleared++;s.coins+=3;s.beads++;emit(s,'+3 coins · +1 agimat bead','loot',e.x,e.y);}
    }
    if(!hit)emit(s,'','swing');
  }
  export function action(s: GameState, type: Action, value?: unknown): GameState{
    if(type==='travel')enterStage(s,value);
    if(s.transition&&!['pause','compact','travel','customize'].includes(type))return s;
    if(type==='interact')interact(s);
    if(type==='swing')swing(s);
    if(type==='pause')s.paused=!s.paused;
    if(type==='compact')s.compact=!s.compact;
    if(type==='dash'&&!s.paused&&s.player.stamina>=25&&s.player.dashCooldown<=0){s.player.stamina-=25;s.player.dash=.18;s.player.dashCooldown=.8;}
    if(type==='snack'&&!s.paused){if(s.buko>0){s.buko--;s.player.hp=Math.min(5,s.player.hp+2);s.player.stamina=100;emit(s,'Fresh buko! +2 hearts · energy restored','gather');}else emit(s,'Find a buko by the palms to restore your energy.');}
    if(type==='customize'&&isRecord(value)){if(isKey(characters,value.character)){s.character=value.character;s.name=characters[value.character].name;}if(isKey(colors,value.outfit))s.outfit=value.outfit;if(value.hat==='salakot'||value.hat==='bandana'||value.hat==='none')s.hat=value.hat;if(typeof value.name==='string')s.name=value.name.trim().slice(0,20)||characters[s.character].name;}
    return s;
  }
  export function step(s: GameState, dt: number, input: MovementInput = {}): GameState{
    dt=Math.max(0,Math.min(.05,Number.isFinite(dt)?dt:0));if(s.paused){s.player.walking=false;return s;}
    if(s.transition){s.player.walking=false;s.transition.remaining-=dt;if(s.transition.remaining<=0)enterStage(s,s.transition.next);return s;}
    s.time+=dt;const p=s.player;
    for(const k of ['swing','cooldown','dash','dashCooldown','invincible'] as const)p[k]=Math.max(0,p[k]-dt);
    let dx=Math.max(-1,Math.min(1,Number(input.x)||0)),dy=Math.max(-1,Math.min(1,Number(input.y)||0));
    const len=Math.hypot(dx,dy);p.walking=len>0;
    if(len){dx/=len;dy/=len;if(Math.abs(dx)>Math.abs(dy))p.dir=dx>0?'right':'left';else p.dir=dy>0?'down':'up';
      const run=input.run&&p.stamina>1,speed=p.dash>0?240:run?110:73;
      if(!blocked(p.x+dx*speed*dt,p.y,s))p.x+=dx*speed*dt;
      if(!blocked(p.x,p.y+dy*speed*dt,s))p.y+=dy*speed*dt;
      p.walkTime+=dt*(run?1.5:1);if(run)p.stamina=Math.max(0,p.stamina-22*dt);else p.stamina=Math.min(100,p.stamina+16*dt);
    }else p.stamina=Math.min(100,p.stamina+22*dt);
    s.nodes=s.nodes.map(t=>Math.max(0,t-dt));
    s.spirits.forEach((e,i)=>{
      e.flash=Math.max(0,e.flash-dt);e.phase+=dt;
      if(e.dead>0){e.dead=Math.max(0,e.dead-dt);if(e.dead===0){e.hp=2;e.x=spiritHomes[i].x;e.y=spiritHomes[i].y;}return;}
      const h=spiritHomes[i],tx=h.x+Math.sin(e.phase*.7)*24,ty=h.y+Math.cos(e.phase*.9)*16;
      e.x+=(tx-e.x)*Math.min(1,dt*1.5);e.y+=(ty-e.y)*Math.min(1,dt*1.5);
      if(Math.hypot(p.x-e.x,p.y-e.y)<15&&p.invincible<=0&&p.dash<=0){p.hp--;p.invincible=1.8;emit(s,'Oop! Watch the playful sprites.','hurt');if(p.hp<=0){p.hp=5;p.x=392;p.y=284;emit(s,'A little rest at the plaza. Your treasures are safe.');}}
    });return s;
  }
  export function restore(raw: unknown): GameState {
  const s = create();
  if (!isRecord(raw) || raw.version !== 4) return s;
  for (const key of ['coins','mango','flowers','buko','beads','clay','rice','bamboo','wood','cloth','cleared','quest','time'] as const) {
    const value = raw[key];
    if (typeof value === 'number' && Number.isFinite(value)) s[key] = Math.max(0, Math.min(key === 'quest' ? 3 : 1e7, value));
  }
  s.stage = typeof raw.stage === 'number' && Number.isInteger(raw.stage) ? Math.max(0, Math.min(3, raw.stage)) : 0;
  const progress: unknown[] | null = Array.isArray(raw.stageProgress) ? raw.stageProgress : null;
  if (progress) s.stageProgress = s.stageProgress.map((_, i) => {
    const value = progress[i];
    return typeof value === 'number' && Number.isFinite(value) ? Math.floor(Math.max(0, Math.min(3, value))) : 0;
  });
  else s.stageProgress[0] = Math.floor(s.quest);
  s.unlocked = 0;
  for (let i = 0; i < 3 && s.stageProgress[i] === 3; i++) s.unlocked = i + 1;
  s.stage = Math.min(s.stage, s.unlocked);
  const starts: unknown[] = Array.isArray(raw.clearStart) ? raw.clearStart : [];
  s.clearStart = s.clearStart.map((_, i) => {
    const value = starts[i];
    return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, Math.min(s.cleared, value)) : i === 0 ? 0 : s.cleared;
  });
  s.quest = s.stageProgress[s.stage];
  s.completed = Array.from({length:s.quest}, (_,i) => i);
  action(s, 'customize', raw);
  s.paused = raw.paused === true;
  s.compact = raw.compact === true;
  if (s.quest === 3 && s.stage < 3 && ((isRecord(raw.transition) && raw.transition.next === s.stage + 1) || !progress)) s.transition = {next:s.stage+1,remaining:3};
  const p = raw.player;
  if (isRecord(p) && typeof p.x === 'number' && Number.isFinite(p.x) && typeof p.y === 'number' && Number.isFinite(p.y) && !blocked(p.x,p.y,s)) {
    s.player.x=p.x; s.player.y=p.y;
    if (p.dir === 'up' || p.dir === 'down' || p.dir === 'left' || p.dir === 'right') s.player.dir = p.dir;
    s.player.hp = typeof p.hp === 'number' && Number.isFinite(p.hp) ? Math.max(1,Math.min(5,p.hp)) : 5;
  }
  const timers: unknown[] = Array.isArray(raw.nodes) ? raw.nodes : [];
  s.nodes = s.nodes.map((_,i) => { const value=timers[i]; return typeof value === 'number' && Number.isFinite(value) ? Math.max(0,Math.min(18,value)) : 0; });
  return s;
}
