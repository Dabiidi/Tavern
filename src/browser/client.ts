import * as core from '../shared/core';
import { isRecord } from '../shared/types';
import type { Action, Point, WindowCommand } from '../shared/types';
import { element as $ } from './dom';
import type { InstallPromptEvent, VsCodeApi } from './platform';
import './platform';
const vscode: VsCodeApi | null=typeof acquireVsCodeApi==='function'?acquireVsCodeApi():null;
  const keys=new Set<string>();let state=core.create(),loaded=!vscode,last=performance.now(),lastUI='',lastEvent=0,saveClock=0,target: Point | null=null,toastTimer=0,installEvent: InstallPromptEvent | null=null,popup: Window | null=null,lastStage=-1,lastJourney='';
  const key='baryo-adventure-v4';
  if(!vscode){try{state=core.restore(JSON.parse(localStorage.getItem(key)||'null'));}catch(_){}if(new URLSearchParams(location.search).has('popup'))state.compact=true;}
export function getState(){return state;}
export function setTarget(x:number,y:number){target={x,y};$('game').focus();}
  function notice(text: string){if(!text)return;$('notice').textContent=text;$('notice').classList.add('visible');toastTimer=4;}
  function persist(){if(!loaded)return;state.savedAt=Date.now();if(vscode)vscode.postMessage({type:'save',save:state});else try{localStorage.setItem(key,JSON.stringify(state));}catch(_){$('save-status').textContent='Storage unavailable — session only';}}
  if(vscode){window.addEventListener('message',(event: MessageEvent<unknown>)=>{if(!isRecord(event.data))return;if(event.data.type==='load'){state=core.restore(event.data.save);loaded=true;lastUI='';update();}if(event.data.type==='notice'&&typeof event.data.text==='string')notice(event.data.text);});vscode.postMessage({type:'ready'});}
  export function action(type: Action,value?: unknown){if(!loaded)return;core.action(state,type,value);if(type==='pause'){keys.clear();target=null;}update();persist();}
  const bindings: Record<string,string>={w:'up',W:'up',ArrowUp:'up',s:'down',S:'down',ArrowDown:'down',a:'left',A:'left',ArrowLeft:'left',d:'right',D:'right',ArrowRight:'right',Shift:'run'};
  window.addEventListener('keydown',event=>{
    if(event.target instanceof HTMLElement&&['INPUT','SELECT','TEXTAREA','BUTTON'].includes(event.target.tagName))return;
    const k=bindings[event.key];if(k){event.preventDefault();keys.add(k);target=null;}
    if(!event.repeat){if(event.code==='Space'){event.preventDefault();action('swing');}if(event.code==='KeyE'){event.preventDefault();action('interact');}if(event.code==='KeyQ'){event.preventDefault();action('dash');}if(event.code==='Escape')action('pause');}
  });
  window.addEventListener('keyup',event=>{if(bindings[event.key])keys.delete(bindings[event.key]);});
  function clear(){keys.clear();target=null;state.player.walking=false;persist();}
  window.addEventListener('blur',clear);window.addEventListener('pagehide',clear);
  document.addEventListener('visibilitychange',()=>{clear();last=performance.now();});
  document.querySelectorAll<HTMLButtonElement>('[data-key]').forEach(b=>{b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);keys.add(b.dataset.key!);target=null;});for(const ev of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(ev,()=>keys.delete(b.dataset.key!));});
  $('travel-now').addEventListener('click',()=>{if(state.transition)action('travel',state.transition.next);});
  $('touch-interact').addEventListener('click',()=>action('interact'));$('touch-swing').addEventListener('click',()=>action('swing'));$('touch-dash').addEventListener('click',()=>action('dash'));
  $('game').addEventListener('pointerdown',()=>{$('game').focus();});
  $('pause').addEventListener('click',()=>{action('pause');$('game').focus();});$('snack').addEventListener('click',()=>action('snack'));$('compact').addEventListener('click',()=>{action('compact');window.mosslightDesktop?.control('expand');});
  $('popup').addEventListener('click',()=>{persist();if(vscode){vscode.postMessage({type:'popup'});return;}if(popup&&!popup.closed){popup.focus();return;}const url=new URL(location.href);url.searchParams.set('popup','1');popup=window.open(url.href,'baryo-adventure','popup=yes,width=1000,height=620,resizable=yes');if(!popup)notice('Allow popups for this page to open a separate game window.');});
  $('customize-open').addEventListener('click',()=>{$('customize-panel').hidden=!$('customize-panel').hidden;if(!$('customize-panel').hidden)$('customize-panel').scrollIntoView({behavior:'smooth',block:'nearest'});});$('customize-close').addEventListener('click',()=>{$('customize-panel').hidden=true;$('game').focus();});
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
    const region=s.stage===0?(p.y>505?'Tabing-ilog':p.x>670?'Palayan':p.x>540?'Sari-sari corner':'Barangay Maligaya'):stage.name;
    const signature=JSON.stringify([region,s.stage,s.stageProgress,s.unlocked,s.transition?Math.ceil(s.transition.remaining):null,s.paused,s.character,s.name,s.outfit,s.hat,s.coins,s.mango,s.flowers,s.buko,s.beads,s.quest,s.cleared,p.hp,Math.round(p.stamina),s.paused,s.compact,n?.id,n?.kind]);if(signature===lastUI)return;lastUI=signature;
    document.body.classList.toggle('compact',s.compact);$('compact').setAttribute('aria-pressed',String(s.compact));$('pause').textContent=s.paused?'▶ Resume':'Ⅱ Pause';$('pause').setAttribute('aria-pressed',String(s.paused));
    $('player-name').textContent=s.name;for(const id of ['coins','mango','flowers','buko','beads'] as const)$(id).textContent=s[id].toLocaleString();$('snack').disabled=s.buko<=0;
    $('hearts').textContent=Array.from({length:5},(_,i)=>i<p.hp?'♥':'♡').join(' ');$('energy-fill').style.width=p.stamina+'%';
    $('location').textContent=region;
    $('stage-region').textContent=stage.region;$('scene-title').textContent=stage.name;$('scene-architecture').textContent=stage.architecture.toUpperCase();$('architecture-title').textContent=stage.architecture;$('architecture-note').textContent=stage.note;
    $('stage-eyebrow').textContent='STAGE '+String(s.stage+1).padStart(2,'0')+' OF 04 · '+stage.region;$('stage-heading').textContent=['A little closer to home.','Stories set in stone.','Up where the rice fields climb.','By the water, together.'][s.stage];$('stage-subtitle').textContent=['Slow afternoons. Small adventures. A whole barangay to discover.','Capiz windows, cobbled lanes, and a new community to help.','Mountain air, timber homes, and a gathering above the clouds.','A raised hall, a lakeside path, and the last stop of your journey.'][s.stage];
    document.body.dataset.stage=stage.theme;
    const materials=([['mango','flowers','🥭','✿'],['clay','flowers','◒','✿'],['rice','bamboo','♧','╱'],['wood','cloth','▥','▧']] as const)[s.stage];$('mango').textContent=String(s[materials[0]]);$('flowers').textContent=String(s[materials[1]]);$('material-a-label').textContent=core.itemLabels[materials[0]];$('material-b-label').textContent=core.itemLabels[materials[1]];$('material-a-icon').textContent=materials[2];$('material-b-icon').textContent=materials[3];
    const journeyKey=JSON.stringify([s.stage,s.stageProgress,s.unlocked,s.paused]);if(journeyKey!==lastJourney){lastJourney=journeyKey;$('journey').replaceChildren(...core.stages.map((st,i)=>{const b=document.createElement('button');b.className='journey-stop'+(i===s.stage?' current':'')+(s.stageProgress[i]===3?' complete':'');b.disabled=i>s.unlocked||s.paused;b.setAttribute('aria-current',i===s.stage?'step':'false');b.title=i>s.unlocked?'Complete the previous stage to unlock':st.architecture;b.append(Object.assign(document.createElement('span'),{textContent:i>s.unlocked?'◇':s.stageProgress[i]===3?'✓':String(i+1).padStart(2,'0')}),Object.assign(document.createElement('b'),{textContent:st.name}),Object.assign(document.createElement('small'),{textContent:i>s.unlocked?'LOCKED':i===s.stage?'EXPLORING':s.stageProgress[i]===3?'REVISIT':'UNLOCKED'}));b.addEventListener('click',()=>{action('travel',i);$('game').focus();});return b;}));}
    $('stage-transition').hidden=!s.transition;if(s.transition){const next=core.stages[s.transition.next];$('next-stage-name').textContent=next.name;$('next-stage-detail').textContent=next.architecture+' · '+next.region;$('travel-countdown').textContent=s.paused?'Journey paused':'Travelling in '+Math.ceil(s.transition.remaining)+'…';$('travel-now').disabled=s.paused;}

    if(q){const amount=Math.min(q.goal,core.questAmount(s,q));$('quest-title').textContent=q.title;$('quest-description').textContent=q.description;$('quest-count').textContent=String(s.quest+1).padStart(2,'0')+' / 03';$('quest-progress-fill').style.width=amount/q.goal*100+'%';$('quest-progress-text').textContent=amount+' / '+q.goal+' '+core.itemLabels[q.item];$('quest-hint').textContent=amount>=q.goal?'Return to '+core.stageNpcs(s).find(n=>n.id===q.npc)!.name:q.description;$('quest-tip').textContent=q.item==='cleared'?'Face the playful sprites in the eastern part of this stage and press Space. Each region needs its own clear path.':'Find the glowing '+core.itemLabels[q.item]+' spots, then return to the neighbor named above. Press E to gather or talk.';}
    else{const allDone=s.stageProgress.every(q=>q===3);$('quest-title').textContent=allDone?'A journey worth sharing.':'Stage complete!';$('quest-description').textContent=allDone?'Four places, twelve favors, and new friends along the way.':'Salamat! This community is ready. Your next destination awaits.';$('quest-count').textContent='03 / 03 ✓';$('quest-progress-fill').style.width='100%';$('quest-progress-text').textContent='All favors complete';$('quest-tip').textContent='Revisit unlocked places using Our Journey. Your coins, finds, and outfit travel with you.';$('quest-hint').textContent=allDone?'All four stages complete!':'All favors complete · explore or continue your journey.';}
    $('interaction').hidden=!n||s.paused;if(n)$('interaction-text').textContent=n.kind==='npc'?'Talk to '+n.name:'Gather '+core.itemLabels[n.type];
    if(document.activeElement!==$('name-input'))$('name-input').value=s.name;$('hat').value=s.hat;document.querySelectorAll<HTMLButtonElement>('[data-character]').forEach(b=>{b.classList.toggle('selected',b.dataset.character===s.character);b.setAttribute('aria-pressed',String(b.dataset.character===s.character));});document.querySelectorAll<HTMLButtonElement>('[data-color]').forEach(b=>{b.classList.toggle('selected',b.dataset.color===s.outfit);b.setAttribute('aria-pressed',String(b.dataset.color===s.outfit));});
  }
  function frame(now: number){const dt=Math.min(.04,(now-last)/1000);last=now;
    if(loaded&&!document.hidden){let x=(keys.has('right')?1:0)-(keys.has('left')?1:0),y=(keys.has('down')?1:0)-(keys.has('up')?1:0);
      if(target&&!x&&!y){const dx=target.x-state.player.x,dy=target.y-state.player.y,len=Math.hypot(dx,dy);if(len<5)target=null;else{x=dx/len;y=dy/len;}}
      const beforeX=state.player.x,beforeY=state.player.y;core.step(state,dt,{x,y,run:keys.has('run')});if(state.stage!==lastStage){lastStage=state.stage;keys.clear();target=null;persist();}if(target&&(x||y)&&Math.hypot(state.player.x-beforeX,state.player.y-beforeY)<.05)target=null;
      for(const e of state.events)if(e.id>lastEvent){lastEvent=e.id;if(!['hit','swing','gather','loot'].includes(e.type))notice(e.text);}
      if(toastTimer>0){toastTimer-=dt;if(toastTimer<=0)$('notice').classList.remove('visible');}saveClock+=dt;if(saveClock>4){saveClock=0;persist();}update();
    }requestAnimationFrame(frame);
  }
  update();requestAnimationFrame(frame);
