import type { GameState } from '../shared/types';
import type { GuestPeer,GuestPose } from '../shared/multiplayer';
import { normalizePose,roomCode,toGuestPose } from '../shared/multiplayer';
import { isRecord } from '../shared/types';
import { element as $ } from './dom';
interface Tracked {from:GuestPeer;to:GuestPeer;at:number;duration:number}
const tracked=new Map<string,Tracked>();
const configuredOrigin=document.querySelector<HTMLMetaElement>('meta[name="baryo-guest-origin"]')?.content.trim()||'';
const apiBase=(location.hostname==='127.0.0.1'||location.hostname==='localhost'?'':configuredOrigin)+'/api/guest/';
let guestId='',token='',room='',name='',enabled=false,desired=false,pendingEpoch=-1,failures=0,timer=0,lastReply=0,epoch=0,getState:()=>GameState;
function status(text:string){$('online-status').textContent=text;$('online-open').textContent=token?'♟ '+(tracked.size+1):'♟';$('online-open').title=text;$('online-open').setAttribute('aria-label',text);$('online-copy').toggleAttribute('disabled',!token);$('online-leave').toggleAttribute('disabled',!token);$('chat-send').toggleAttribute('disabled',!token);}
async function post(action:string,body:unknown,auth=true){const response=await fetch(apiBase+action,{method:'POST',headers:{'Content-Type':'application/json',...(auth?{Authorization:'Bearer '+token}:{})},body:JSON.stringify(body),cache:'no-store',signal:AbortSignal.timeout(7000)});let data:unknown;try{data=await response.json();}catch{throw new Error('Guest server unavailable');}if(!response.ok)throw new Error(response.status===401?'expired':isRecord(data)&&typeof data.error==='string'?data.error:'Guest server unavailable');if(!isRecord(data))throw new Error('Invalid guest response');return data;}
function schedule(delay:number){clearTimeout(timer);if(desired)timer=window.setTimeout(tick,delay);}
async function connect(){const generation=epoch;const data=await post('join',{room,name,pose:toGuestPose(getState(),name)},false);if(generation!==epoch)return;if(typeof data.id!=='string'||typeof data.token!=='string')throw new Error('Guest server unavailable');guestId=data.id;token=data.token;tracked.clear();failures=0;status('Online · '+room);sessionStorage.setItem('baryo-online',JSON.stringify({room,name}));}
async function tick(){
 if(!desired||pendingEpoch===epoch)return;const generation=epoch;pendingEpoch=generation;
 try{
  if(!token){await connect();return;}
  const pose=toGuestPose(getState(),name);if(document.hidden)pose.walking=false;
  const data=await post('update',{pose});if(generation!==epoch)return;if(!Array.isArray(data.peers))throw new Error('Invalid guest response');
  const now=performance.now(),interval=lastReply?Math.min(1200,Math.max(400,now-lastReply)):550;lastReply=now;const present=new Set<string>();
  for(const raw of data.peers.slice(0,24)){if(!isRecord(raw)||typeof raw.id!=='string'||raw.id===guestId)continue;const normalized=normalizePose(raw);if(!normalized)continue;const peer={...normalized,id:raw.id,updatedAt:typeof raw.updatedAt==='number'?raw.updatedAt:Date.now()};present.add(peer.id);const existing=tracked.get(peer.id),current=existing?interpolate(existing,now):peer;tracked.set(peer.id,{from:current.area===peer.area?current:peer,to:peer,at:now,duration:interval});}
  for(const id of tracked.keys())if(!present.has(id))tracked.delete(id);failures=0;status('Online · '+room+' · '+(tracked.size+1)+' guests');
  if(Array.isArray(data.messages))showMessages(data.messages);
  $('online-players').textContent=[name,...[...tracked.values()].map(p=>p.to.name)].join(' · ');
 }catch(error){if(generation!==epoch)return;failures++;if(error instanceof Error&&error.message==='expired')token='';if(failures>=3)tracked.clear();status((error instanceof Error&&error.message==='Guest server unavailable'?'Server unavailable': 'Reconnecting')+' · '+room);}
 finally{if(pendingEpoch===generation)pendingEpoch=-1;if(generation===epoch)schedule(failures?Math.min(8000,1000*failures):document.hidden?2500:550);}
}
function interpolate(peer:Tracked,now:number):GuestPeer{const t=Math.min(1,Math.max(0,(now-peer.at)/peer.duration));if(peer.from.area!==peer.to.area||Math.hypot(peer.to.x-peer.from.x,peer.to.y-peer.from.y)>350)return peer.to;return {...peer.to,x:peer.from.x+(peer.to.x-peer.from.x)*t,y:peer.from.y+(peer.to.y-peer.from.y)*t,walkTime:peer.to.walkTime+(peer.to.walking?Math.min(1,(now-peer.at)/1000):0)};}
export function isMultiplayerActive(){return desired;}
export function remoteGuests(area:GameState['area']):GuestPeer[]{if(!token||performance.now()-lastReply>6000)return [];return [...tracked.values()].map(p=>interpolate(p,performance.now())).filter(p=>p.area===area);}
async function leave(){epoch++;desired=false;clearTimeout(timer);const previous=token;token='';tracked.clear();$('chat-messages').replaceChildren();chatSignature='';sessionStorage.removeItem('baryo-online');$('online-players').textContent='';status('Play as guest');if(previous)try{await fetch(apiBase+'leave',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+previous},body:'{}',keepalive:true});}catch{}}
let chatSignature='';
function showMessages(messages:unknown[]){const signature=JSON.stringify(messages);if(signature===chatSignature)return;chatSignature=signature;const list=$('chat-messages'),nearBottom=list.scrollHeight-list.scrollTop-list.clientHeight<40;list.replaceChildren(...messages.slice(-30).flatMap(raw=>{if(!isRecord(raw)||typeof raw.name!=='string'||typeof raw.text!=='string')return [];const item=document.createElement('p'),name=document.createElement('b');name.textContent=raw.name+': ';item.append(name,document.createTextNode(raw.text));return [item];}));if(nearBottom)list.scrollTop=list.scrollHeight;}
export function initMultiplayer(readState:()=>GameState,available:boolean){
 getState=readState;enabled=available;status(enabled?'Play as guest':'Guest multiplayer · play in browser');$('online-open').toggleAttribute('disabled',!enabled);
 const roomInput=$('guest-room') as HTMLInputElement,nameInput=$('guest-name') as HTMLInputElement;roomInput.value=roomCode(new URLSearchParams(location.search).get('room'))||'baryo';nameInput.value=getState().name;
 $('chat-toggle').addEventListener('click',()=>{const panel=$('room-chat');panel.hidden=!panel.hidden;if(!panel.hidden)(document.getElementById('chat-input') as HTMLInputElement).focus();});
 (document.getElementById('chat-form') as HTMLFormElement).addEventListener('submit',async event=>{event.preventDefault();const input=$('chat-input') as HTMLInputElement,text=input.value.trim();if(!text||!token)return;const button=$('chat-send') as HTMLButtonElement;button.disabled=true;try{await post('chat',{text});input.value='';$('chat-error').textContent='';schedule(300);}catch(error){$('chat-error').textContent=error instanceof Error?error.message:'Message not sent';}finally{button.disabled=!token;}});
 const panel=$('online-panel') as HTMLDialogElement;
 $('online-open').addEventListener('click',()=>panel.showModal());$('online-close').addEventListener('click',()=>panel.close());$('online-leave').addEventListener('click',leave);
 const joinWorld=async()=>{const nextRoom=roomCode(roomInput.value.trim().toLowerCase());if(!nextRoom){status('Use 3–24 letters, numbers or dashes');return;}const button=$('online-join') as HTMLButtonElement;button.disabled=true;await leave();room=nextRoom;name=nameInput.value.trim().slice(0,20)||getState().name;desired=true;status('Joining…');try{await connect();panel.close();lastReply=0;schedule(300);}catch(error){desired=false;status(error instanceof Error?error.message:'Guest server unavailable');}finally{button.disabled=false;}};
 $('online-join').addEventListener('click',joinWorld);
 $('online-new-room').addEventListener('click',async()=>{roomInput.value='baryo-'+crypto.randomUUID().slice(0,8);await joinWorld();});
 $('online-copy').addEventListener('click',async()=>{const url=new URL(location.href);url.searchParams.set('room',room);try{await navigator.clipboard.writeText(url.href);$('online-copy').textContent='Copied ✓';}catch{$('online-status').textContent=url.href;}});
 window.addEventListener('pagehide',()=>{if(token)void fetch(apiBase+'leave',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:'{}',keepalive:true});});
 if(enabled)try{const previous=JSON.parse(sessionStorage.getItem('baryo-online')||'null');if(isRecord(previous)&&roomCode(previous.room)&&typeof previous.name==='string'){room=previous.room as string;name=previous.name;desired=true;schedule(300);}}catch{}
}
