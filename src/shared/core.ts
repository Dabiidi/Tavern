import { weapons, weaponInfo } from './weapons';
export { weapons, weaponInfo } from './weapons';
import { WORLD, REGION, regionOrigin, regionAt, inRegion, regionLocks, passages, TAVERN, companions, tavernFurniture, wildNodes, wildTreesFor, wildSpiritHomes, chests, camps } from './world';
export { WORLD, REGION, regionOrigin, regionAt, inRegion, regionLocks, passages, TAVERN, companions, tavernFurniture, chests, camps } from './world';
import { legendFor } from './folklore';
export { legends, legendFor, chapterFor } from './folklore';
import { isRecord, isKey } from './types';
import type { Action, Building, Character, CharacterId, Direction, EventType, GearId, GameState, HarvestNode, Interaction, MovementInput, Npc, Outfit, Point, Quest, QuestItem, Stage, WorldFeature } from './types';
export const equipment: Record<GearId, { name: string; icon: string; description: string; tiers: string[] }> = {
  arnis: {name:'Yantok arnis',icon:'╱',description:'Locally inspired rattan stick. Each upgrade makes swings quicker; tier 3 deals double damage.',tiers:['Practice yantok','Wrapped yantok','Polished yantok','Bayani yantok']},
  sandals: {name:'Abaca sandals',icon:'♧',description:'Woven trail sandals. Each upgrade adds 8% walking and running speed.',tiers:['Simple sandals','Woven abaca','Trail abaca','Lakbay abaca']},
  agimat: {name:'Agimat pendant',icon:'◇',description:'A fictional lucky keepsake. Each upgrade adds one peso coin to every sprite drop.',tiers:['Plain keepsake','Beaded agimat','Sun agimat','Bayanihan agimat']}
};
export function progression(s: GameState) {const level=Math.min(10,1+Math.floor(s.xp/100));return {level,progress:level===10?100:s.xp%100,title:level>=7?'Bayani ng Baryo':level>=4?'Kaibigan ng Bayan':level>=2?'Lakbay Adventurer':'Bagong Adventurer'};}
export function ownedTier(s: GameState, id: GearId) {return Math.max(s.gear[id],s.gearOwned[id]);}
export function upgradeCost(s: GameState, id: GearId) {const tier=ownedTier(s,id);return {coins:30+tier*45,beads:tier*2,level:[1,2,4][tier]??10};}
function gainXP(s: GameState, amount: number) {const before=progression(s).level;s.xp=Math.min(900,s.xp+amount);if(progression(s).level>before)emit(s,'Level '+progression(s).level+'! '+progression(s).title,'quest');}

export const characters: Record<CharacterId, Character> ={tala:{name:'Tala',description:'Wayfarer · balanced',shirt:'#dc795d',skin:'#d2a174'},isko:{name:'Isko',description:'Guardian · faster swings',shirt:'#598d8a',skin:'#ba865f'},amihan:{name:'Amihan',description:'Scout · +12% speed',shirt:'#a987bd',skin:'#dfb28a'}};
export const colors: Record<Outfit, string> ={terracotta:'#dc795d',ocean:'#598d8a',ube:'#a987bd',mango:'#e5b653'};
export const buildings: Building[] =[{x:142,y:154,w:114,h:75,type:'kubo'},{x:350,y:120,w:113,h:76,type:'kubo'},{x:610,y:167,w:126,h:73,type:'store'}];
export const trees=[{x:66,y:153},{x:99,y:305},{x:265,y:159},{x:485,y:132},{x:780,y:143},{x:876,y:218},{x:859,y:393},{x:219,y:397},{x:57,y:420},{x:744,y:526},{x:155,y:535}];
export const npcs: Npc[] =[{id:'lola',name:'Lola Rosa',x:360,y:245,shirt:'#a87da4'},{id:'nena',name:'Aling Nena',x:617,y:254,shirt:'#d88b58'},{id:'benji',name:'Kuya Benji',x:563,y:363,shirt:'#6b96a5'}];
export const nodes: HarvestNode[] =[{id:0,x:115,y:324,type:'mango'},{id:1,x:276,y:184,type:'mango'},{id:2,x:798,y:174,type:'mango'},{id:3,x:80,y:405,type:'mango'},{id:4,x:450,y:285,type:'flowers'},{id:5,x:520,y:300,type:'flowers'},{id:6,x:693,y:321,type:'flowers'},{id:7,x:306,y:340,type:'flowers'},{id:8,x:825,y:407,type:'buko'},...wildNodes.map((p,i)=>({...p,id:9+i,type:(['mango','flowers','buko'] as const)[i%3]}))];
export const spiritHomes=[{x:715,y:295},{x:815,y:340},{x:748,y:381},...wildSpiritHomes];
export const quests: Quest[] =[{title:'A sweet little favor',description:'Bring 3 mangoes to Lola Rosa by the plaza.',goal:3,item:'mango',npc:'lola',reward:25},{title:'Flowers for the fiesta',description:'Bring 3 sampaguita to Aling Nena at the sari-sari store.',goal:3,item:'flowers',npc:'nena',reward:35},{title:'A clear path home',description:'Shoo 3 playful leaf sprites near the rice fields, then visit Kuya Benji.',goal:3,item:'cleared',npc:'benji',reward:50}];
export const stages: Stage[] =[
    {name:'Maligaya Barrio',region:'LOWLAND LUZON',architecture:'Bahay kubo',note:'Raised bamboo homes and broad nipa roofs frame this sunny fictional barrio.',theme:'barrio',tasks:quests},
    {name:'Heritage Streets',region:'VIGAN-INSPIRED · ILOCOS',architecture:'Bahay na bato',note:'Stone lower floors, timber upper stories, capiz-style window grids, and tiled roofs inspired by Vigan’s heritage streets.',theme:'vigan',tasks:[{title:'A potter’s welcome',description:'Bring 3 clay bundles to Aling Pilar at the plaza.',goal:3,item:'clay',npc:'lola',reward:45},{title:'Flowers along the street',description:'Bring 4 sampaguita to Mang Tomas at the heritage shop.',goal:4,item:'flowers',npc:'nena',reward:55},{title:'A quiet kalesa route',description:'Shoo 4 sprites on the eastern street, then see Kuya Benji.',goal:4,item:'cleared',npc:'benji',reward:70}]},
    {name:'Highland Terraces',region:'IFUGAO-INSPIRED · CORDILLERA',architecture:'Bale houses',note:'Steep thatched roofs, elevated timber houses, and stepped rice terraces inspired by Ifugao architecture and landscapes.',theme:'ifugao',tasks:[{title:'Rice for the gathering',description:'Bring 3 rice bundles to Ate Laya near the highland house.',goal:3,item:'rice',npc:'lola',reward:65},{title:'Bamboo for the footpath',description:'Bring 3 bamboo bundles to Mang Dado at the workshop.',goal:3,item:'bamboo',npc:'nena',reward:75},{title:'A peaceful mountain trail',description:'Shoo 4 sprites beside the terraces, then visit Kuya Benji.',goal:4,item:'cleared',npc:'benji',reward:90}]},
    {name:'Lakeside Gathering',region:'MARANAO-INSPIRED · LANAO',architecture:'Torogan-inspired hall',note:'A raised timber hall with a sweeping roof and decorative projecting beams inspired by the Maranao torogan and its panolong.',theme:'maranao',tasks:[{title:'Wood for the craft table',description:'Bring 3 carving-wood bundles to Ate Salma near the hall.',goal:3,item:'wood',npc:'lola',reward:85},{title:'A woven welcome',description:'Bring 3 woven-cloth bundles to Kuya Amir at the lakeside stall.',goal:3,item:'cloth',npc:'nena',reward:95},{title:'The final gathering',description:'Shoo 5 sprites along the lakeside path, then see Kuya Benji.',goal:5,item:'cleared',npc:'benji',reward:120}]}
  ];
export const itemLabels: Record<QuestItem, string> ={mango:'mangga',flowers:'sampaguita',buko:'buko',clay:'clay bundles',rice:'rice bundles',bamboo:'bamboo bundles',wood:'carving wood',cloth:'woven cloth',cleared:'shades'};
  export function stageInfo(s: GameState): Stage{return stages[s.stage||0];}
  export function currentQuest(s: GameState): Quest | undefined{const q=stageInfo(s).tasks[s.quest];return q?.item==='cleared'?{...q,title:['Smoke in the palayan','The crooked road','Wings in the moonlight','Bring back the moon'][s.stage],description:'Dispel '+q.goal+' '+legendFor(s).shade.toLowerCase()+'s, then visit '+stageNpcs(s)[2].name+'.'}:q;}
  export function questAmount(s: GameState, q: Quest | undefined = currentQuest(s)): number{return q?(q.item==='cleared'?Math.max(0,s.cleared-(s.clearStart?.[s.stage]||0)):s[q.item]):0;}
  const buildingCache: Building[][]=[],treeCache:Point[][]=[],homeCache:Point[][]=[];
  export function stageBuildings(s: Pick<GameState, 'stage'>): Building[]{const i=s.stage||0;return buildingCache[i]??=(buildings.map<Building>((b,j)=>i===0?b:{...b,type:i===1?'bato':i===2?'bale':j===1?'torogan':'pavilion',w:i===1?b.w+12:i===3&&j===1?158:b.w,h:i===1?92:i===2?96:i===3?98:b.h}).map(b=>inRegion(b,i)));}
  export function stageTrees(s: Pick<GameState, 'stage'>): Point[]{return treeCache[s.stage]??=([... (s.stage===3?trees.filter(t=>t.x!==265&&t.y<451):trees),...wildTreesFor(s.stage)].map(t=>inRegion(t,s.stage)));}
  export function stageNodes(s: GameState): HarvestNode[]{const mappings: Partial<Record<import('./types').Resource, import('./types').Resource>>[] = [{}, {mango:'clay'}, {mango:'rice',flowers:'bamboo',buko:'rice'}, {mango:'wood',flowers:'cloth'}];return nodes.map(n=>({...n,type:mappings[s.stage||0][n.type]||n.type,...(s.stage===3&&n.id===1?{x:248,y:218}:{})})).map(n=>inRegion(n,s.stage));}
  export function stageNpcs(s: GameState): Npc[]{const names=[['Lola Rosa','Aling Nena','Kuya Benji'],['Aling Pilar','Mang Tomas','Kuya Benji'],['Ate Laya','Mang Dado','Kuya Benji'],['Ate Salma','Kuya Amir','Kuya Benji']][s.stage||0];return npcs.map((n,i)=>({...n,name:names[i]})).map(n=>inRegion(n,s.stage));}
  export function monsterHomes(s:Pick<GameState,'stage'>){return homeCache[s.stage]??=spiritHomes.map(p=>inRegion(p,s.stage));}
  function setBiome(s:GameState,index:number){s.projectiles=[];s.stage=index;s.quest=s.stageProgress[index];s.completed=Array.from({length:s.quest},(_,i)=>i);s.nodes=nodes.map(()=>0);s.spirits=monsterHomes(s).map((h,i)=>({...h,hp:2+s.stage,dead:0,phase:i*2,flash:0}));}
  function unlockAreas(s:GameState){const before=s.unlocked;for(let i=1;i<4;i++)if(s.cleared>=regionLocks[i]||s.stageProgress[i-1]===3)s.unlocked=Math.max(s.unlocked,i);if(s.unlocked>before)emit(s,'✦ New paths opened','arrival');}
  function enterStage(s: GameState, index: unknown): boolean{
    if(typeof index!=='number'||!Number.isInteger(index)||index<0||index>Math.min(3,s.unlocked)||s.paused)return false;
    s.projectiles=[];s.area='field';s.stage=index;s.quest=s.stageProgress[index];s.completed=Array.from({length:s.quest},(_,i)=>i);s.transition=null;s.arrival++;s.player.x=392+regionOrigin(s.stage).x;s.player.y=284+regionOrigin(s.stage).y;s.player.dir='down';s.player.hp=5;s.player.stamina=100;s.player.walking=false;s.player.swing=0;s.player.invincible=2;s.nodes=nodes.map(()=>0);s.spirits=monsterHomes(s).map((h,i)=>({...h,hp:2+s.stage,dead:0,phase:i*2,flash:0}));emit(s,legendFor(s).title+' · Press L for the lantern journal.','arrival');return true;
  }
  export function create(): GameState{return {version:4,worldVersion:1,weapon:'yantok',weapons:['yantok','tirador'],area:'tavern',chests:[0,0,0,0],loreSeen:[false,false,false,false],xp:0,gear:{arnis:0,sandals:0,agimat:0},gearOwned:{arnis:0,sandals:0,agimat:0},stage:0,stageProgress:[0,0,0,0],clearStart:[0,0,0,0],unlocked:0,arrival:0,transition:null,character:'tala',name:'Tala',outfit:'terracotta',hat:'salakot',coins:0,mango:0,flowers:0,buko:0,beads:0,clay:0,rice:0,bamboo:0,wood:0,cloth:0,cleared:0,quest:0,completed:[],projectiles:[],player:{...TAVERN.spawn,shot:0,shotCooldown:0,dir:'down',hp:5,stamina:100,walking:false,walkTime:0,swing:0,cooldown:0,dash:0,dashCooldown:0,invincible:0},nodes:nodes.map(()=>0),spirits:spiritHomes.map((h,i)=>({...h,hp:2,dead:0,phase:i*2,flash:0})),time:0,paused:false,compact:false,eventId:0,events:[],savedAt:Date.now()};}
  function emit(s: GameState, text: string, type: EventType = 'notice', x = s.player.x, y = s.player.y): void{s.eventId++;s.events.push({id:s.eventId,text,type,x,y});s.events=s.events.slice(-20);}
  export function bounds(s: Pick<GameState,'area'>) {return s.area==='tavern'?TAVERN:WORLD;}
  export function features(s: GameState): WorldFeature[] {
    if(s.area==='tavern')return [
      ...companions.map(c=>({id:c.id,name:characters[c.id].name+' · '+c.role,kind:'recruit' as const,character:c.id,x:c.x,y:c.y})),
      {id:'exit',name:'Head out',kind:'door',...TAVERN.door},
      {id:'bed',name:'Rest',kind:'rest',x:654,y:251}
    ];
    return [
      ...(s.stage===0?[{id:'inn',name:'Enter tavern',kind:'door' as const,...TAVERN.entrance}]:[]),
      ...chests.filter((_,i)=>!(s.chests[s.stage]&(1<<i))).map(p=>({...p,id:'chest-'+chests.indexOf(p),name:'Open chest',kind:'chest' as const,chest:chests.indexOf(p)})).map(f=>inRegion(f,s.stage)),
      ...camps.map((p,i)=>({...p,id:'camp-'+i,name:'Rest',kind:'rest' as const})).map(f=>inRegion(f,s.stage)),
      ...passages.filter(p=>p.a===s.stage||p.b===s.stage).map((p,i)=>{const destination=p.a===s.stage?p.b:p.a;const horizontal=p.x%REGION.width===0;return {id:'passage-'+i,name:destination<=s.unlocked?'Enter '+stages[destination].name:'🔒 '+s.cleared+'/'+regionLocks[destination]+' shades',kind:'gate' as const,destination,x:p.x+(horizontal?(s.stage===p.a?-32:32):0),y:p.y+(!horizontal?(s.stage===p.a?-32:32):0)};})
    ];
  }
  export function blocked(x: number, y: number, s: Pick<GameState, 'stage'> & Partial<Pick<GameState,'area'|'unlocked'>> = {stage:0}): boolean{
    if(s.area==='tavern')return x<68||x>700||y<174||y>469||tavernFurniture.some(f=>x>f.x-8&&x<f.x+f.w+8&&y>f.y-5&&y<f.y+f.h+6);
    if(x<20||y<86||x>WORLD.width-20||y>WORLD.height-20)return true;
    const stage=regionAt(x,y),o=regionOrigin(stage),lx=x-o.x,ly=y-o.y;
    if(stage>(s.unlocked??s.stage))return true;
    if(ly>456&&ly<(stage===3&&lx<960?600:505)&&!((lx>425&&lx<490)||(lx>1340&&lx<1400)))return true;
    if(stage===0&&Math.abs(lx-392)<100&&ly>623&&ly<696)return true;
    if(stageBuildings({stage}).some(b=>x>b.x-b.w/2-5&&x<b.x+b.w/2+5&&y>b.y-20&&y<b.y+b.h*.48))return true;
    if(stageTrees({stage}).some(t=>Math.abs(x-t.x)<12&&Math.abs(y-t.y)<9))return true;
    return false;
  }
  export function nearest(s: GameState): Interaction | null{
    const p=s.player,choices: Interaction[]=s.area==='tavern'?features(s):[...features(s),...stageNpcs(s).map(n=>({...n,kind:'npc' as const})),...stageNodes(s).filter(n=>s.nodes[n.id]<=0).map(n=>({...n,kind:'node' as const}))];
    choices.sort((a,b)=>Math.hypot(p.x-a.x,p.y-a.y)-Math.hypot(p.x-b.x,p.y-b.y));
    const n=choices[0];return n&&Math.hypot(p.x-n.x,p.y-n.y)<40?n:null;
  }
  function interact(s: GameState): void{
    if(s.paused||s.transition)return;const n=nearest(s);if(!n){emit(s,'Walk closer to a villager or a glowing harvest spot.');return;}
    if(n.kind==='door'){action(s,s.area==='tavern'?'depart':'home');return;}
    if(n.kind==='recruit'){action(s,'customize',{character:n.character});emit(s,characters[s.character].name+' ready!');return;}
    if(n.kind==='rest'){s.player.hp=5;s.player.stamina=100;emit(s,'♥ Rested');return;}
    if(n.kind==='gate'){if(n.destination!==undefined&&n.destination<=s.unlocked){const p=passages.find(p=>p.a===s.stage&&p.b===n.destination||p.b===s.stage&&p.a===n.destination)!;const dir=s.stage===p.a?1:-1;const horizontal=p.x%REGION.width===0;const x=p.x+(horizontal?dir*40:0),y=p.y+(!horizontal?dir*40:0);if(!blocked(x,y,s)){setBiome(s,n.destination);s.player.x=x;s.player.y=y;}}else emit(s,n.name);return;}
    if(n.kind==='chest'){if(n.chest!==undefined&&!(s.chests[s.stage]&(1<<n.chest))){s.chests[s.stage]|=1<<n.chest;s.coins+=25+s.stage*10;s.beads+=2;gainXP(s,20);emit(s,'◉ +'+(25+s.stage*10)+'  ◇ +2','loot',n.x,n.y);}return;}
    if(n.kind==='node'){s[n.type]++;gainXP(s,3);s.nodes[n.id]=18;emit(s,'+1 '+itemLabels[n.type],'gather',n.x,n.y);return;}
    if(n.kind!=='npc')return;
    const q=currentQuest(s);
    if(q&&n.id===q.npc){
      if(questAmount(s,q)>=q.goal){if(q.item!=='cleared')s[q.item]-=q.goal;s.coins+=q.reward;s.completed.push(s.quest);s.quest++;s.stageProgress[s.stage]=s.quest;gainXP(s,40);emit(s,'Lantern journal updated · '+legendFor(s).title,'lore');emit(s,n.name+': Salamat! +'+q.reward+' coins','quest');
        if(s.quest===3&&s.stage<3){const next=s.stage+1;if(s.unlocked<next){s.unlocked=next;s.clearStart[next]=s.cleared;}emit(s,'✦ Path opened: '+stages[next].name,'departure');}
      }
      else emit(s,n.name+': '+(s.stage===0?({lola:'Puwede mo ba akong dalhan ng 3 mangga?',nena:'Three sampaguita for our fiesta, please!',benji:legendFor(s).warning}[n.id]):q.description));
    }else emit(s,n.name+': '+(s.quest>=3?'Salamat! You can revisit completed places from Our Journey.':s.stage===0?({lola:'There is an ember in the balete. Have you seen it?',nena:'Tuloy po! There’s always something good at the tindahan.',benji:legendFor(s).warning}[n.id]):legendFor(s).name+': '+legendFor(s).warning));
    if(n.id==='lola'){s.player.hp=5;s.player.stamina=100;}
  }
  function dropEquipment(s: GameState, x: number, y: number): void {
    // A guaranteed first find, followed by one equipment drop every three clears.
    if((s.cleared-1)%3!==0)return;
    const pool=[['kamagong','bolo'],['bolo','sunshot','sibat'],['sibat','sunshot','moonbolo'],['moonbolo','sibat','kamagong']][s.stage],weapon=pool[Math.floor((s.cleared-1)/3)%pool.length];
    if(!s.weapons.includes(weapon)){s.weapons.push(weapon);if(weaponInfo(weapon).damage>weaponInfo(s.weapon).damage)s.weapon=weapon;emit(s,'⚔ '+weaponInfo(weapon).name+' found','equipment',x,y);}else s.beads++;

    const id=(['arnis','sandals','agimat'] as const)[Math.floor((s.cleared-1)/3)%3];
    const tier=Math.min(3,1+Math.floor((s.stage+1)/2));
    if(tier>ownedTier(s,id)){
      s.gearOwned[id]=tier;s.gear[id]=tier;
      emit(s,'◇ Found '+equipment[id].tiers[tier]+' · equipped!','equipment',x,y);
    }else{
      s.beads+=2;emit(s,'◇ Duplicate '+equipment[id].tiers[tier]+' · +2 beads','equipment',x,y);
    }
  }
  function defeat(s:GameState,e:GameState['spirits'][number]){
    if(e.dead||e.hp>0)return;e.dead=28;s.cleared++;s.coins+=3+s.gear.agimat;s.beads++;gainXP(s,12);unlockAreas(s);emit(s,'+'+(3+s.gear.agimat)+' coins · +1 agimat bead','loot',e.x,e.y);dropEquipment(s,e.x,e.y);
  }
  function shoot(s:GameState){
    const p=s.player;if(s.area==='tavern'||s.paused||p.shotCooldown>0)return;
    const id=weaponInfo(s.weapon).kind==='slingshot'?s.weapon:s.weapons.includes('sunshot')?'sunshot':'tirador',weapon=weaponInfo(id);
    const dir={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}[p.dir];
    const target=s.spirits.filter(e=>!e.dead&&Math.hypot(e.x-p.x,e.y-p.y)<weapon.range&&((e.x-p.x)*dir[0]+(e.y-p.y)*dir[1])>0).sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)-Math.hypot(b.x-p.x,b.y-p.y))[0];
    const dx=target?target.x-p.x:dir[0],dy=target?target.y-p.y:dir[1],length=Math.hypot(dx,dy)||1;
    p.shot=.22;p.shotCooldown=weapon.cooldown;s.projectiles.push({x:p.x,y:p.y,vx:dx/length*340,vy:dy/length*340,life:weapon.range/340,damage:weapon.damage});
  }
  function swing(s: GameState): void{
    if(weaponInfo(s.weapon).kind==='slingshot'){shoot(s);return;}const p=s.player;if(s.area==='tavern'||s.paused||p.cooldown>0)return;p.swing=.32;p.cooldown=Math.max(.16,weaponInfo(s.weapon).cooldown-s.gear.arnis*.045-(s.character==='isko'?.045:0));
    const dir: number[] = {up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}[p.dir];
    let hit=false;
    for(const e of s.spirits)if(!e.dead&&Math.hypot(p.x-e.x,p.y-e.y)<weaponInfo(s.weapon).range){const dx=e.x-p.x,dy=e.y-p.y;if(dx*dir[0]+dy*dir[1]<-10)continue;e.hp-=Math.max(weaponInfo(s.weapon).damage,s.gear.arnis===3?2:1);e.flash=.2;hit=true;emit(s,'✦','hit',e.x,e.y);const len=Math.hypot(dx,dy)||1;const x=e.x+dx/len*9,y=e.y+dy/len*9;if(!blocked(x,y,s)){e.x=x;e.y=y;}
      defeat(s,e);
    }
    if(!hit)emit(s,'','swing');
  }
  export function action(s: GameState, type: Action, value?: unknown): GameState{
    if(type==='home'&&!s.paused){setBiome(s,0);s.area='tavern';s.transition=null;Object.assign(s.player,TAVERN.spawn,{walking:false,swing:0,dash:0});s.arrival++;emit(s,'☀ Bahay Pahinga','arrival');}
    if(type==='depart'&&!s.paused){setBiome(s,0);s.area='field';Object.assign(s.player,TAVERN.outside,{walking:false,swing:0,dash:0,invincible:2});s.arrival++;emit(s,stageInfo(s).name,'arrival');}
    if(type==='travel'){const inside=s.area==='tavern';if(enterStage(s,value)&&inside){s.area='tavern';Object.assign(s.player,TAVERN.spawn);}}
    if(s.transition&&!['pause','compact','travel','customize'].includes(type))return s;
    if(type==='weapon'&&typeof value==='string'&&s.weapons.includes(value))s.weapon=value;
    if(type==='equip'&&isRecord(value)&&isKey(equipment,value.id)&&typeof value.tier==='number'&&Number.isInteger(value.tier)&&value.tier>=0&&value.tier<=ownedTier(s,value.id)){
      s.gear[value.id]=value.tier;emit(s,equipment[value.id].tiers[value.tier]+' equipped!','notice');
    }
    if(type==='upgrade'&&isKey(equipment,value)&&!s.paused){
      const cost=upgradeCost(s,value);
      if(ownedTier(s,value)>=3)emit(s,'This keepsake is fully upgraded.');
      else if(progression(s).level<cost.level)emit(s,'Reach level '+cost.level+' to unlock this upgrade.');
      else if(s.coins<cost.coins||s.beads<cost.beads)emit(s,'Gather more peso coins and agimat beads first.');
      else {s.coins-=cost.coins;s.beads-=cost.beads;s.gear[value]=ownedTier(s,value)+1;s.gearOwned[value]=s.gear[value];emit(s,equipment[value].tiers[s.gear[value]]+' equipped!','quest');}
    }
    if(type==='interact')interact(s);
    if(type==='swing')swing(s);
    if(type==='shoot')shoot(s);
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
    s.time+=dt;const p=s.player,beforeX=p.x,beforeY=p.y;
    for(const k of ['swing','cooldown','dash','dashCooldown','invincible','shot','shotCooldown'] as const)p[k]=Math.max(0,p[k]-dt);
    let dx=Math.max(-1,Math.min(1,Number(input.x)||0)),dy=Math.max(-1,Math.min(1,Number(input.y)||0));
    const len=Math.hypot(dx,dy);p.walking=len>0;
    if(len){dx/=len;dy/=len;if(Math.abs(dx)>Math.abs(dy))p.dir=dx>0?'right':'left';else p.dir=dy>0?'down':'up';
      const run=input.run&&p.stamina>1,speed=p.dash>0?240:(run?110:73)*(1+s.gear.sandals*.08)*(s.character==='amihan'?1.12:1);
      if(!blocked(p.x+dx*speed*dt,p.y,s))p.x+=dx*speed*dt;
      if(!blocked(p.x,p.y+dy*speed*dt,s))p.y+=dy*speed*dt;
      p.walkTime+=dt*(run?1.5:1);if(run)p.stamina=Math.max(0,p.stamina-22*dt);else p.stamina=Math.min(100,p.stamina+16*dt);
    }else p.stamina=Math.min(100,p.stamina+22*dt);
    p.walking=len>0&&Math.hypot(p.x-beforeX,p.y-beforeY)>.001;
    if(s.area==='tavern')return s;
    const biome=regionAt(p.x,p.y);if(biome!==s.stage)setBiome(s,biome);
    s.nodes=s.nodes.map(t=>Math.max(0,t-dt));
    for(const shot of s.projectiles){
      shot.life-=dt;const parts=Math.max(1,Math.ceil(Math.hypot(shot.vx,shot.vy)*dt/6));
      for(let i=0;i<parts&&shot.life>0;i++){shot.x+=shot.vx*dt/parts;shot.y+=shot.vy*dt/parts;if(blocked(shot.x,shot.y,s)){shot.life=0;break;}const enemy=s.spirits.find(e=>!e.dead&&Math.hypot(e.x-shot.x,e.y-shot.y)<14);if(enemy){enemy.hp-=shot.damage;enemy.flash=.2;emit(s,'✦','hit',enemy.x,enemy.y);defeat(s,enemy);shot.life=0;}}
    }
    s.projectiles=s.projectiles.filter(p=>p.life>0);
    const homes=monsterHomes(s);s.spirits.forEach((e,i)=>{
      if(s.area!=='field')return;
      e.flash=Math.max(0,e.flash-dt);e.phase+=dt;
      if(e.dead>0){e.dead=Math.max(0,e.dead-dt);if(e.dead===0){e.hp=2+s.stage;e.x=homes[i].x;e.y=homes[i].y;}return;}
      if(Math.hypot(p.x-e.x,p.y-e.y)>800)return;
      if(!s.loreSeen[s.stage]&&Math.hypot(p.x-e.x,p.y-e.y)<105){s.loreSeen[s.stage]=true;emit(s,'Encounter: '+legendFor(s).name+' · '+legendFor(s).warning,'lore');}
      const h=homes[i],pace=[.55,1.15,.75,.85][s.stage],tx=h.x+Math.sin(e.phase*pace)*[24,38,28,32][s.stage],ty=h.y+Math.cos(e.phase*(pace+.2))*16;
      const distance=Math.hypot(p.x-e.x,p.y-e.y),alert=distance<115&&distance>12,rate=alert?(25+s.stage*5)*dt/(distance||1):Math.min(1,dt*1.5),nx=e.x+((alert?p.x:tx)-e.x)*rate,ny=e.y+((alert?p.y:ty)-e.y)*rate;
      if(!blocked(nx,e.y,s))e.x=nx;if(!blocked(e.x,ny,s))e.y=ny;
      if(Math.hypot(p.x-e.x,p.y-e.y)<15&&p.invincible<=0&&p.dash<=0){p.hp--;p.invincible=1.8;emit(s,'Watch out! '+legendFor(s).shade+' nearby.','hurt');if(p.hp<=0){p.hp=5;setBiome(s,0);s.area='tavern';Object.assign(p,TAVERN.spawn,{walking:false,dash:0,swing:0});s.arrival++;emit(s,'♥ Recovered at the tavern.');}}
    });return s;
  }
  export function restore(raw: unknown): GameState {
  const s = create();
  if (!isRecord(raw) || raw.version !== 4) return s;
  for (const key of ['coins','mango','flowers','buko','beads','clay','rice','bamboo','wood','cloth','cleared','quest','time'] as const) {
    const value = raw[key];
    if (typeof value === 'number' && Number.isFinite(value)) s[key] = Math.max(0, Math.min(key === 'quest' ? 3 : 1e7, value));
  }
  s.area=raw.area==='tavern'?'tavern':'field';
  if(s.area==='field'){s.player.x=392+regionOrigin(s.stage).x;s.player.y=284+regionOrigin(s.stage).y;}
  s.stage = typeof raw.stage === 'number' && Number.isInteger(raw.stage) ? Math.max(0, Math.min(3, raw.stage)) : 0;
  const progress: unknown[] | null = Array.isArray(raw.stageProgress) ? raw.stageProgress : null;
  if (progress) s.stageProgress = s.stageProgress.map((_, i) => {
    const value = progress[i];
    return typeof value === 'number' && Number.isFinite(value) ? Math.floor(Math.max(0, Math.min(3, value))) : 0;
  });
  else s.stageProgress[0] = Math.floor(s.quest);
  s.unlocked = 0;
  for (let i = 0; i < 3 && s.stageProgress[i] === 3; i++) s.unlocked = i + 1;
  unlockAreas(s);s.events=[];s.eventId=0;
  s.stage = Math.min(s.stage, s.unlocked);
  const starts: unknown[] = Array.isArray(raw.clearStart) ? raw.clearStart : [];
  s.clearStart = s.clearStart.map((_, i) => {
    const value = starts[i];
    return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, Math.min(s.cleared, value)) : i === 0 ? 0 : s.cleared;
  });
  s.xp = typeof raw.xp==='number'&&Number.isFinite(raw.xp)?Math.floor(Math.max(0,Math.min(900,raw.xp))):Math.min(900,s.stageProgress.reduce((a,b)=>a+b,0)*40+s.cleared*12);
  if(isRecord(raw.gear))for(const id of Object.keys(equipment) as GearId[]){const tier=raw.gear[id];if(typeof tier==='number'&&Number.isFinite(tier))s.gear[id]=Math.floor(Math.max(0,Math.min(3,tier)));}
  for(const id of Object.keys(equipment) as GearId[]){const tier=isRecord(raw.gearOwned)?raw.gearOwned[id]:undefined;s.gearOwned[id]=typeof tier==='number'&&Number.isFinite(tier)?Math.max(s.gear[id],Math.floor(Math.max(0,Math.min(3,tier)))):s.gear[id];}
  s.chests=s.chests.map((_,i)=>{const mask=Array.isArray(raw.chests)?raw.chests[i]:0;return typeof mask==='number'&&Number.isInteger(mask)?Math.max(0,Math.min((1<<chests.length)-1,mask)):0;});
  s.loreSeen=s.loreSeen.map((_,i)=>i<=s.unlocked&&(Array.isArray(raw.loreSeen)?raw.loreSeen[i]===true:s.stageProgress[i]===3));
  s.quest = s.stageProgress[s.stage];
  s.completed = Array.from({length:s.quest}, (_,i) => i);
  action(s, 'customize', raw);
  s.paused = raw.paused === true;
  s.compact = raw.compact === true;
  s.transition=null;
  s.weapons=Array.isArray(raw.weapons)?[...new Set(['yantok','tirador',...raw.weapons.filter((id):id is string=>typeof id==='string'&&isKey(weapons,id))])]:['yantok','tirador'];
  s.weapon=typeof raw.weapon==='string'&&s.weapons.includes(raw.weapon)?raw.weapon:'yantok';
  const p = isRecord(raw.player)&&s.area==='field'&&raw.worldVersion!==1&&typeof raw.player.x==='number'&&typeof raw.player.y==='number'?inRegion({...raw.player,x:raw.player.x,y:raw.player.y},s.stage):raw.player;
  if(s.area==='field'){s.player.x=392+regionOrigin(s.stage).x;s.player.y=284+regionOrigin(s.stage).y;s.spirits=monsterHomes(s).map((h,i)=>({...h,hp:2+s.stage,dead:0,phase:i*2,flash:0}));}
  if (isRecord(p) && typeof p.x === 'number' && Number.isFinite(p.x) && typeof p.y === 'number' && Number.isFinite(p.y) && (s.area==='tavern'||regionAt(p.x,p.y)===s.stage) && !blocked(p.x,p.y,s)) {
    s.player.x=p.x; s.player.y=p.y;
    if (p.dir === 'up' || p.dir === 'down' || p.dir === 'left' || p.dir === 'right') s.player.dir = p.dir;
    s.player.hp = typeof p.hp === 'number' && Number.isFinite(p.hp) ? Math.max(1,Math.min(5,p.hp)) : 5;
  }
  if(raw.worldVersion===1&&isRecord(p)&&typeof p.x==='number'&&Number.isFinite(p.x)&&typeof p.y==='number'&&Number.isFinite(p.y)&&s.area==='field'&&regionAt(p.x,p.y)===s.stage&&p.x>20&&p.y>86&&p.x<WORLD.width-20&&p.y<WORLD.height-20&&blocked(p.x,p.y,s)){
    let found=false;for(let radius=8;radius<=80&&!found;radius+=8)for(let i=0;i<12;i++){const x=p.x+Math.cos(i*Math.PI/6)*radius,y=p.y+Math.sin(i*Math.PI/6)*radius;if(!blocked(x,y,s)&&regionAt(x,y)===s.stage){s.player.x=x;s.player.y=y;found=true;break;}}
  }
  const timers: unknown[] = Array.isArray(raw.nodes) ? raw.nodes : [];
  s.nodes = s.nodes.map((_,i) => { const value=timers[i]; return typeof value === 'number' && Number.isFinite(value) ? Math.max(0,Math.min(18,value)) : 0; });
  return s;
}
