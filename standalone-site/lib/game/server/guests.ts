import { normalizePose, roomCode, ROOM_LIMIT, STALE_MS, chatText, GUEST_ORIGINS } from '../shared/multiplayer';
import type { GuestPose, GuestPeer, GuestMessage } from '../shared/multiplayer';
import { isRecord } from '../shared/types';
export interface GuestRow {id:string;token:string;room:string;pose:GuestPose;updatedAt:number}
export interface GuestStore {create(row:GuestRow):Promise<boolean>;get(token:string):Promise<GuestRow|null>;update(row:GuestRow):Promise<void>;list(room:string,since:number):Promise<GuestRow[]>;remove(token:string):Promise<void>;prune(before:number):Promise<void>;messages(room:string,since:number):Promise<GuestMessage[]>;chat(message:GuestMessage):Promise<boolean>}
export class MemoryGuestStore implements GuestStore {
 private rows=new Map<string,GuestRow>();private chatRows:GuestMessage[]=[];
 async create(row:GuestRow){if(this.rows.size>=512||[...this.rows.values()].filter(r=>r.room===row.room&&r.updatedAt>row.updatedAt-STALE_MS).length>=ROOM_LIMIT)return false;this.rows.set(row.token,row);return true;}
 async get(token:string){return this.rows.get(token)||null;}
 async update(row:GuestRow){this.rows.set(row.token,row);}
 async list(room:string,since:number){return [...this.rows.values()].filter(r=>r.room===room&&r.updatedAt>since).sort((a,b)=>a.id.localeCompare(b.id));}
 async remove(token:string){this.rows.delete(token);}
 async messages(room:string,since:number){return this.chatRows.filter(m=>m.room===room&&m.createdAt>since).slice(-30);}
 async chat(message:GuestMessage){if(this.chatRows.some(m=>m.guestId===message.guestId&&m.createdAt>message.createdAt-1200))return false;this.chatRows.push(message);this.chatRows=this.chatRows.filter(m=>m.createdAt>message.createdAt-300_000).slice(-1500);return true;}
 async prune(before:number){for(const [token,row] of this.rows)if(row.updatedAt<before)this.rows.delete(token);}
}
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
async function digest(token:string){return [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token)))].map(v=>v.toString(16).padStart(2,'0')).join('');}
async function guestAction(request:Request,store:GuestStore,now=Date.now()):Promise<Response>{
 if(request.method!=='POST')return json({error:'Method not allowed'},405);
 const url=new URL(request.url),origin=request.headers.get('origin');if(origin&&origin!==url.origin&&!GUEST_ORIGINS.includes(origin))return json({error:'Origin not allowed'},403);
 if(Number(request.headers.get('content-length'))>8192)return json({error:'Request too large'},413);
 let raw:unknown;try{let text='';const reader=request.body?.getReader(),decoder=new TextDecoder();if(reader){let total=0;while(true){const chunk=await reader.read();if(chunk.done)break;total+=chunk.value.byteLength;if(total>8192){await reader.cancel();return json({error:'Request too large'},413);}text+=decoder.decode(chunk.value,{stream:true});}text+=decoder.decode();}raw=JSON.parse(text);}catch{return json({error:'Invalid request'},400);}if(!isRecord(raw))return json({error:'Invalid request'},400);
 const action=url.pathname.split('/').pop();
 if(action==='join'){
  const room=roomCode(raw.room),pose=normalizePose(raw.pose);if(!room||!pose)return json({error:'Invalid guest or room'},400);
  await store.prune(now-STALE_MS);const secret=crypto.randomUUID()+crypto.randomUUID(),token=await digest(secret),row={id:crypto.randomUUID(),token,room,pose,updatedAt:now};
  if(!await store.create(row))return json({error:'Room is full. Try another room.'},409);
  return json({id:row.id,token:secret,room,limit:ROOM_LIMIT});
 }
 if(action!=='update'&&action!=='leave'&&action!=='chat')return json({error:'Not found'},404);
 const secret=request.headers.get('authorization')?.replace(/^Bearer /,'');if(!secret||secret.length>128)return json({error:'Guest expired'},401);
 const token=await digest(secret),row=await store.get(token);if(!row||row.updatedAt<now-STALE_MS)return json({error:'Guest expired'},401);
 if(action==='chat'){const text=chatText(raw.text);if(!text)return json({error:'Use 1–160 characters'},400);const message={id:crypto.randomUUID(),room:row.room,guestId:row.id,name:row.pose.name,text,createdAt:now};if(!await store.chat(message))return json({error:'Wait a moment before chatting again'},429);return json({message});}
 if(action==='leave'){await store.remove(token);return json({ok:true});}
 if(now-row.updatedAt<250)return json({error:'Slow down'},429);
 const pose=normalizePose(raw.pose);if(!pose)return json({error:'Invalid position'},400);row.pose=pose;row.updatedAt=now;await store.update(row);
 const peers:GuestPeer[]=(await store.list(row.room,now-STALE_MS)).slice(0,ROOM_LIMIT).map(r=>({...r.pose,id:r.id,updatedAt:r.updatedAt}));
 return json({room:row.room,peers,messages:await store.messages(row.room,now-300_000),now});
}

export async function guestRequest(request:Request,store:GuestStore,now=Date.now()):Promise<Response>{
 const origin=request.headers.get('origin'),allowed=!!origin&&(origin===new URL(request.url).origin||GUEST_ORIGINS.includes(origin));
 const response=request.method==='OPTIONS'?(allowed?new Response(null,{status:204}):json({error:'Origin not allowed'},403)):await guestAction(request,store,now);
 if(allowed){response.headers.set('Access-Control-Allow-Origin',origin!);response.headers.set('Access-Control-Allow-Methods','POST, OPTIONS');response.headers.set('Access-Control-Allow-Headers','Content-Type, Authorization');response.headers.set('Access-Control-Max-Age','600');response.headers.set('Vary','Origin');}
 return response;
}
