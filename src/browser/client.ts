import { findPath } from '../shared/navigation';
import * as core from '../shared/core';
import { isRecord } from '../shared/types';
import type { Action, GearId, Point, WindowCommand } from '../shared/types';
import { element as $ } from './dom';
import type { InstallPromptEvent, VsCodeApi } from './platform';
import './platform';
const vscode: VsCodeApi | null=typeof acquireVsCodeApi==='function'?acquireVsCodeApi():null;
  const keys=new Set<string>();let state=core.create(),loaded=!vscode,last=performance.now(),lastUI='',lastEvent=0,saveClock=0,target: Point | null=null,route:Point[]=[],toastTimer=0,installEvent: InstallPromptEvent | null=null,popup: Window | null=null,lastStage='',lastWeapons='';
  const key='baryo-adventure-v4';
  if(!vscode){try{state=core.restore(JSON.parse(localStorage.getItem(key)||'null'));}catch(_){}if(new URLSearchParams(location.search).has('popup'))state.compact=true;}
export function getState(){return state;}
export function setTarget(x:number,y:number){route=findPath(state.player,{x,y},(x,y)=>core.blocked(x,y,state));target=route.shift()||null;$('game').focus();}
  function notice(text: string){if(!text)return;$('notice').textContent=text;$('notice').classList.add('visible');toastTimer=4;}
  function persist(){if(!loaded)return;state.savedAt=Date.now();if(vscode)vscode.postMessage({type:'save',save:state});else try{localStorage.setItem(key,JSON.stringify(state));}catch(_){$('save-status').textContent='Storage unavailable — session only';}}
  if(vscode){window.addEventListener('message',(event: MessageEvent<unknown>)=>{if(!isRecord(event.data))return;if(event.data.type==='load'){state=core.restore(event.data.save);loaded=true;lastUI='';update();}if(event.data.type==='notice'&&typeof event.data.text==='string')notice(event.data.text);});vscode.postMessage({type:'ready'});}
  export function action(type: Action,value?: unknown){if(!loaded)return;core.action(state,type,value);if(['pause','home','depart','travel'].includes(type)){keys.clear();target=null;route=[];}update();persist();}
  let lorePage=state.stage;
  function drawLore(){
    $('lore-tabs').replaceChildren(...core.legends.map((legend,i)=>{const b=document.createElement('button');b.textContent=i>state.unlocked?'◇ Unwritten':legend.symbol+' '+legend.name;b.disabled=i>state.unlocked;b.setAttribute('aria-pressed',String(i===lorePage));b.addEventListener('click',()=>{lorePage=i;drawLore();});return b;}));
    const legend=core.legends[lorePage],entry=$('lore-entry');entry.replaceChildren();
    const heading=document.createElement('h3');heading.textContent=legend.symbol+' '+legend.title;entry.append(heading);
    const tradition=document.createElement('p');tradition.className='lore-tradition';tradition.textContent=legend.tradition;entry.append(tradition);
    const field=document.createElement('p');field.className='lore-field';field.textContent=state.loreSeen[lorePage]?'ENCOUNTER RECORDED · '+legend.warning:'UNSEEN · Explore the eastern paths to record an encounter.';entry.append(field);
    for(let i=0;i<4;i++){const fragment=document.createElement('p');fragment.className=i<=state.stageProgress[lorePage]?'lore-fragment':'lore-fragment locked';fragment.textContent=i<=state.stageProgress[lorePage]?String(i+1).padStart(2,'0')+' · '+legend.fragments[i]:'◇ Complete '+i+' favors here to reveal this page.';entry.append(fragment);}
  }
  function toggleLore(){const panel=$('lore-panel');keys.clear();target=null;route=[];state.player.walking=false;if(panel.open)panel.close();else{lorePage=state.stage;drawLore();panel.showModal();}}
  $('lore-open').addEventListener('click',toggleLore);$('lore-close').addEventListener('click',()=>$('lore-panel').close());$('lore-panel').addEventListener('close',()=>{keys.clear();target=null;route=[];$('game').focus();});
  function toggleEquipment(){const panel=$('equipment-panel');keys.clear();target=null;route=[];state.player.walking=false;if(panel.open)panel.close();else{lastUI='';update();panel.showModal();}}
  $('equipment-open').addEventListener('click',toggleEquipment);
  $('equipment-close').addEventListener('click',()=>{ $('equipment-panel').close(); });
  $('equipment-panel').addEventListener('close',()=>{keys.clear();target=null;route=[];$('game').focus();});
  const gearButtons=new Map<GearId,HTMLButtonElement>();
  for(const id of Object.keys(core.equipment) as GearId[]){
    const gear=core.equipment[id],card=document.createElement('article');card.className='equipment-card';
    const icon=document.createElement('span');icon.className='gear-icon gear-'+id;icon.textContent=gear.icon;
    const name=document.createElement('h3');name.textContent=gear.name;
    const tier=document.createElement('b');tier.id='gear-tier-'+id;
    const description=document.createElement('p');description.textContent=({arnis:'↑ Swing speed · Tier 3: ×2 damage',sandals:'+8% speed / tier',agimat:'+1 coin per drop / tier'})[id];description.title=gear.description;
    const button=document.createElement('button');button.addEventListener('click',()=>action('upgrade',id));gearButtons.set(id,button);
    const select=document.createElement('select');select.id='gear-equipped-'+id;select.setAttribute('aria-label','Equipped '+gear.name);select.addEventListener('change',()=>action('equip',{id,tier:Number(select.value)}));
    card.append(icon,name,tier,description,select,button);$('equipment-cards').append(card);
  }
  const bindings: Record<string,string>={w:'up',W:'up',ArrowUp:'up',s:'down',S:'down',ArrowDown:'down',a:'left',A:'left',ArrowLeft:'left',d:'right',D:'right',ArrowRight:'right',Shift:'run'};
  window.addEventListener('keydown',event=>{
    if(event.target instanceof HTMLElement&&['INPUT','SELECT','TEXTAREA'].includes(event.target.tagName))return;
    if(event.code==='KeyH'&&!event.repeat&&!$('equipment-panel').open&&!$('lore-panel').open){event.preventDefault();action('home');return;}
    if(event.code==='KeyL'&&!event.repeat&&!$('equipment-panel').open){event.preventDefault();toggleLore();return;}
    if(event.code==='KeyI'&&!event.repeat){if(!$('lore-panel').open){event.preventDefault();toggleEquipment();}return;}
    if($('equipment-panel').open||$('lore-panel').open||event.target instanceof HTMLButtonElement)return;
    if(event.code==='Space'||event.code==='KeyR'){event.preventDefault();keys.add(event.code==='Space'?'attack':'shoot');}
    if(!event.repeat&&(event.code==='Digit1'||event.code==='Digit2')){event.preventDefault();const ranged=event.code==='Digit2',choices=state.weapons.filter(id=>(core.weaponInfo(id).kind==='slingshot')===ranged).sort((a,b)=>core.weaponInfo(b).damage-core.weaponInfo(a).damage);if(choices[0])action('weapon',choices[0]);}
    const k=bindings[event.key];if(k){event.preventDefault();keys.add(k);target=null;route=[];}
    if(!event.repeat){if(event.code==='Space'){event.preventDefault();keys.add('attack');action('swing');}if(event.code==='KeyR'){event.preventDefault();keys.add('shoot');action('shoot');}if(event.code==='KeyE'){event.preventDefault();action('interact');}if(event.code==='KeyQ'){event.preventDefault();action('dash');}if(event.code==='Escape')action('pause');}
  });
  window.addEventListener('keyup',event=>{if(bindings[event.key])keys.delete(bindings[event.key]);if(event.code==='Space')keys.delete('attack');if(event.code==='KeyR')keys.delete('shoot');});
  function clear(){keys.clear();target=null;route=[];state.player.walking=false;persist();}
  window.addEventListener('blur',clear);window.addEventListener('pagehide',clear);
  document.addEventListener('visibilitychange',()=>{clear();last=performance.now();});
  document.querySelectorAll<HTMLButtonElement>('[data-key]').forEach(b=>{b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);keys.add(b.dataset.key!);target=null;});for(const ev of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(ev,()=>keys.delete(b.dataset.key!));});
  $('travel-now').addEventListener('click',()=>{if(state.transition)action('travel',state.transition.next);});
  $('touch-interact').addEventListener('click',()=>action('interact'));$('touch-swing').addEventListener('click',()=>action('swing'));$('touch-dash').addEventListener('click',()=>action('dash'));$('shoot').addEventListener('click',()=>{action('shoot');$('game').focus();});$('touch-shoot').addEventListener('click',()=>action('shoot'));
  for(const [id,key] of [['touch-swing','attack'],['touch-shoot','shoot']] as const){const b=$(id);b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);keys.add(key);});for(const ev of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(ev,()=>keys.delete(key));}
  $('game').addEventListener('pointerdown',()=>{$('game').focus();});
  $('pause').addEventListener('click',()=>{action('pause');$('game').focus();});$('snack').addEventListener('click',()=>action('snack'));$('compact').addEventListener('click',()=>{action('compact');window.mosslightDesktop?.control('expand');});
  $('popup').addEventListener('click',()=>{persist();if(vscode){vscode.postMessage({type:'popup'});return;}if(popup&&!popup.closed){popup.focus();return;}const url=new URL(location.href);url.searchParams.set('popup','1');popup=window.open(url.href,'baryo-adventure','popup=yes,width=1000,height=620,resizable=yes');if(!popup)notice('Allow popups for this page to open a separate game window.');});
  $('home').addEventListener('click',()=>{action('home');$('game').focus();});$('depart').addEventListener('click',()=>{action('depart');$('game').focus();});document.querySelectorAll<HTMLButtonElement>('[data-recruit]').forEach(b=>b.addEventListener('click',()=>{action('customize',{character:b.dataset.recruit});$('game').focus();}));
  $('customize-open').addEventListener('click',()=>{if(state.area!=='tavern')action('home');$('customize-panel').hidden=!$('customize-panel').hidden;if(!$('customize-panel').hidden)$('customize-panel').scrollIntoView({behavior:'smooth',block:'nearest'});});$('customize-close').addEventListener('click',()=>{$('customize-panel').hidden=true;$('game').focus();});
  for(const [id,c] of Object.entries(core.characters)){const b=document.createElement('button');b.dataset.character=id;b.append(Object.assign(document.createElement('canvas'),{width:48,height:56,id:'sprite-'+id}),Object.assign(document.createElement('b'),{textContent:c.name}),Object.assign(document.createElement('small'),{textContent:c.description}));b.addEventListener('click',()=>action('customize',{character:id}));$('character-choices').append(b);}
  for(const color of Object.keys(core.colors)){const b=document.createElement('button');b.className='swatch color-'+color;b.dataset.color=color;b.setAttribute('aria-label',color+' shirt');b.addEventListener('click',()=>action('customize',{outfit:color}));$('color-options').append(b);}
  $('hat').addEventListener('change',()=>action('customize',{hat:$('hat').value}));$('save-name').addEventListener('click',()=>{action('customize',{name:$('name-input').value});notice('Your adventurer is ready. Tara na!');});
  if(window.mosslightDesktop){document.body.classList.add('desktop');$('desktop-controls').hidden=false;$('popup').hidden=true;for(const [id,command] of [['pin-window','pin'],['minimize-window','minimize'],['close-window','close']] as const)$(id).addEventListener('click',()=>window.mosslightDesktop?.control(command));}
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installEvent=event;$('install').hidden=false;});$('install').addEventListener('click',async()=>{if(installEvent){await installEvent.prompt();installEvent=null;$('install').hidden=true;}});
  if(!vscode&&'serviceWorker' in navigator&&/^https?:$/.test(location.protocol))navigator.serviceWorker.register('./sw.js').catch(()=>{});
  window.addEventListener('storage',event=>{if(event.key===key&&event.newValue&&!state.player.walking){try{state=core.restore(JSON.parse(event.newValue));lastUI='';}catch(_){}}});
  function update(){
    const s=state,p=s.player,n=core.nearest(s),q=core.currentQuest(s);
    const stage=core.stageInfo(s);
    const origin=core.regionOrigin(s.stage),lx=p.x-origin.x,ly=p.y-origin.y;
    const region=s.area==='tavern'?'Bahay Pahinga':lx>960||ly>610?stage.name:s.stage===0?(ly>505?'Tabing-ilog':lx>670?'Palayan':lx>540?'Sari-sari corner':'Barangay Maligaya'):stage.name;
    const signature=JSON.stringify([region,s.area,s.chests,s.stage,s.stageProgress,s.unlocked,s.transition?Math.ceil(s.transition.remaining):null,s.paused,s.character,s.name,s.outfit,s.hat,s.weapon,s.weapons,s.loreSeen,s.xp,s.gear,s.gearOwned,s.coins,s.mango,s.flowers,s.buko,s.beads,s.quest,s.cleared,Math.floor(p.x/30),Math.floor(p.y/30),p.hp,Math.round(p.stamina),Math.round(p.shotCooldown*10),s.paused,s.compact,n?.id,n?.kind]);if(signature===lastUI)return;lastUI=signature;
    document.body.dataset.area=s.area;$('tavern-party').hidden=s.area!=='tavern';$('home').setAttribute('aria-pressed',String(s.area==='tavern'));document.querySelectorAll<HTMLButtonElement>('[data-recruit]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.recruit===s.character));});
    document.body.classList.toggle('compact',s.compact);$('compact').setAttribute('aria-pressed',String(s.compact));$('pause').textContent=s.paused?'▶':'Ⅱ';$('pause').setAttribute('aria-label',s.paused?'Resume':'Pause');$('pause').title=s.paused?'Resume':'Pause';$('pause').setAttribute('aria-pressed',String(s.paused));
    const legend=core.legendFor(s);$('story-symbol').textContent=legend.symbol;$('story-chapter').textContent='CHAPTER '+(s.stage+1)+' · '+s.stageProgress[s.stage]+'/3 FAVORS';$('story-title').textContent=legend.title;$('story-text').textContent=core.chapterFor(s);
    const progress=core.progression(s);
    $('level-number').textContent='Lv '+progress.level;$('level-title').textContent=s.name;$('xp-label').textContent=progress.level===10?'MAX':progress.progress+'/100 XP';$('xp-fill').style.width=progress.progress+'%';
    $('equipment-summary').textContent='Lv '+progress.level+'   ◉ '+s.coins+'   ◇ '+s.beads;
    const weaponKey=JSON.stringify([s.weapon,s.weapons]);if(weaponKey!==lastWeapons){lastWeapons=weaponKey;$('weapon-slots').replaceChildren(...s.weapons.map(id=>{const weapon=core.weaponInfo(id),b=document.createElement('button');b.className='weapon-'+weapon.rarity.toLowerCase();b.textContent=(id===s.weapon?'✓ ':'⚔ ')+weapon.name;b.title=weapon.rarity+' · '+weapon.damage+' damage · '+weapon.range+' reach';b.setAttribute('aria-pressed',String(id===s.weapon));b.addEventListener('click',()=>action('weapon',id));return b;}));}
    for(const [id,button] of gearButtons){const tier=core.ownedTier(s,id),cost=core.upgradeCost(s,id);$('gear-tier-'+id).textContent=core.equipment[id].tiers[s.gear[id]]+' ✓';const select=document.getElementById('gear-equipped-'+id) as HTMLSelectElement;if(select.options.length!==tier+1)select.replaceChildren(...Array.from({length:tier+1},(_,i)=>Object.assign(document.createElement('option'),{value:String(i),textContent:core.equipment[id].tiers[i]})));select.value=String(s.gear[id]);button.disabled=tier===3||s.paused||!!s.transition||progress.level<cost.level||s.coins<cost.coins||s.beads<cost.beads;button.textContent=tier===3?'✓ MAX':progress.level<cost.level?'🔒 Lv '+cost.level:'↑  ◉ '+cost.coins+(cost.beads?'  ◇ '+cost.beads:'');button.title=tier===3?'All upgrades equipped':core.equipment[id].tiers[tier+1];}
    $('player-name').textContent=s.name;for(const id of ['coins','mango','flowers','buko','beads'] as const)$(id).textContent=s[id].toLocaleString();$('snack').disabled=s.buko<=0;const shooting=s.area==='field'&&!s.paused;$('shoot').toggleAttribute('disabled',!shooting);$('touch-shoot').toggleAttribute('disabled',!shooting);$('shoot').classList.toggle('firing',p.shotCooldown>0);
    $('hearts').textContent=Array.from({length:5},(_,i)=>i<p.hp?'♥':'♡').join(' ');$('energy-fill').style.width=p.stamina+'%';
    $('location').textContent=region;
    $('stage-region').textContent=stage.region;$('scene-title').textContent=stage.name;$('scene-architecture').textContent=stage.architecture.toUpperCase();$('architecture-title').textContent=stage.architecture;$('architecture-note').textContent=stage.note;
    $('stage-eyebrow').textContent='STAGE '+String(s.stage+1).padStart(2,'0')+' OF 04 · '+stage.region;$('stage-heading').textContent=['A little closer to home.','Stories set in stone.','Up where the rice fields climb.','By the water, together.'][s.stage];$('stage-subtitle').textContent=['Slow afternoons. Small adventures. A whole barangay to discover.','Capiz windows, cobbled lanes, and a new community to help.','Mountain air, timber homes, and a gathering above the clouds.','A raised hall, a lakeside path, and the last stop of your journey.'][s.stage];
    document.body.dataset.stage=stage.theme;
    const materials=([['mango','flowers','🥭','✿'],['clay','flowers','◒','✿'],['rice','bamboo','♧','╱'],['wood','cloth','▥','▧']] as const)[s.stage];$('mango').textContent=String(s[materials[0]]);$('flowers').textContent=String(s[materials[1]]);$('material-a-label').textContent=core.itemLabels[materials[0]];$('material-b-label').textContent=core.itemLabels[materials[1]];$('material-a-icon').textContent=materials[2];$('material-b-icon').textContent=materials[3];$('material-a-icon').parentElement!.title=core.itemLabels[materials[0]];$('material-b-icon').parentElement!.title=core.itemLabels[materials[1]];
    $('stage-transition').hidden=!s.transition;if(s.transition){const next=core.stages[s.transition.next];$('next-stage-name').textContent=next.name;$('next-stage-detail').textContent=next.architecture+' · '+next.region;$('travel-countdown').textContent=s.paused?'Journey paused':'Travelling in '+Math.ceil(s.transition.remaining)+'…';$('travel-now').disabled=s.paused;}

    if(q){const amount=Math.min(q.goal,core.questAmount(s,q));$('quest-title').textContent=q.item==='cleared'?'Dispel shades':'Collect '+core.itemLabels[q.item];$('quest-description').textContent=q.description;$('quest-count').textContent=String(s.quest+1).padStart(2,'0')+' / 03';$('quest-progress-fill').style.width=amount/q.goal*100+'%';$('quest-progress-text').textContent=amount+' / '+q.goal+' '+core.itemLabels[q.item];const objective=core.stageNpcs(s).find(n=>n.id===q.npc)!,bearing=['→','↘','↓','↙','←','↖','↑','↗'][(Math.round(Math.atan2(objective.y-p.y,objective.x-p.x)/(Math.PI/4))+8)%8];$('quest-hint').textContent=amount>=q.goal?'✓ '+bearing+' '+objective.name:(q.item==='cleared'?'⚔':'✦')+' '+amount+'/'+q.goal+' '+core.itemLabels[q.item];$('quest-tip').textContent=q.item==='cleared'?core.legendFor(s).warning+' Press Space to dispel the shades.':'Find the glowing '+core.itemLabels[q.item]+' spots, then return to the neighbor named above. Press E to gather or talk.';}
    else{const goal=core.regionLocks[s.unlocked+1];$('quest-title').textContent=goal?'Open new paths':'Find rare weapons';$('quest-description').textContent='Explore and farm monster drops.';$('quest-count').textContent='∞';$('quest-progress-fill').style.width=(goal?Math.min(100,s.cleared/goal*100):100)+'%';$('quest-progress-text').textContent=goal?s.cleared+' / '+goal+' shades':'Explore · fight · loot';$('quest-tip').textContent='';$('quest-hint').textContent=goal?'⚔ '+s.cleared+'/'+goal+' · unlock paths':'⚔ Farm gear';}
    $('interaction').hidden=!n||s.paused;if(n)$('interaction-text').textContent=n.kind==='node'?core.itemLabels[n.type]:n.name;
    if(s.area==='tavern')$('quest-hint').textContent='Choose a hero · Head out ↗';
    if(document.activeElement!==$('name-input'))$('name-input').value=s.name;$('hat').value=s.hat;document.querySelectorAll<HTMLButtonElement>('[data-character]').forEach(b=>{b.classList.toggle('selected',b.dataset.character===s.character);b.setAttribute('aria-pressed',String(b.dataset.character===s.character));});document.querySelectorAll<HTMLButtonElement>('[data-color]').forEach(b=>{b.classList.toggle('selected',b.dataset.color===s.outfit);b.setAttribute('aria-pressed',String(b.dataset.color===s.outfit));});
  }
  function frame(now: number){const dt=Math.min(.04,(now-last)/1000);last=now;
    if(loaded&&!document.hidden){let x=(keys.has('right')?1:0)-(keys.has('left')?1:0),y=(keys.has('down')?1:0)-(keys.has('up')?1:0);
      if(target&&!x&&!y){const dx=target.x-state.player.x,dy=target.y-state.player.y,len=Math.hypot(dx,dy);if(len<5)target=route.shift()||null;else{x=dx/len;y=dy/len;}}
      const beforeX=state.player.x,beforeY=state.player.y;if(!$('equipment-panel').open&&!$('lore-panel').open){if(keys.has('attack'))core.action(state,'swing');if(keys.has('shoot'))core.action(state,'shoot');core.step(state,dt,{x,y,run:keys.has('run')});}if(state.area+state.arrival!==lastStage){lastStage=state.area+state.arrival;keys.clear();target=null;route=[];persist();}if(target&&(x||y)&&Math.hypot(state.player.x-beforeX,state.player.y-beforeY)<.05)target=null;
      for(const e of state.events)if(e.id>lastEvent){lastEvent=e.id;if(!['hit','swing','gather','loot'].includes(e.type))notice(e.type==='lore'?'☾ '+core.legendFor(state).name+' · [L]':e.type==='arrival'?core.stageInfo(state).name:e.text);}
      if(toastTimer>0){toastTimer-=dt;if(toastTimer<=0)$('notice').classList.remove('visible');}saveClock+=dt;if(saveClock>4){saveClock=0;persist();}update();
    }requestAnimationFrame(frame);
  }
  update();requestAnimationFrame(frame);
