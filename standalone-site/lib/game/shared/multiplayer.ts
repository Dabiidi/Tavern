import { WORLD, TAVERN, regionAt } from './world';
import type { CharacterId, CharacterProfile, Direction, GameState } from './types';
import { isRecord, isKey } from './types';
import { restoreProfile } from './profiles';
export interface GuestPose {name:string;character:CharacterId;look:CharacterProfile;area:'field'|'tavern';stage:number;x:number;y:number;dir:Direction;walking:boolean;walkTime:number;swing:number;shot:number;dash:number}
export interface GuestPeer extends GuestPose {id:string;updatedAt:number}
export const ROOM_LIMIT=24,STALE_MS=20_000;
const number=(value:unknown,min:number,max:number,fallback=0)=>typeof value==='number'&&Number.isFinite(value)?Math.max(min,Math.min(max,value)):fallback;
export function roomCode(value:unknown):string|null{return typeof value==='string'&&/^[a-z0-9-]{3,24}$/.test(value)?value:null;}
export function guestName(value:unknown):string{return typeof value==='string'?value.replace(/[<>\u0000-\u001f\u007f]/g,'').trim().slice(0,20)||'Guest':'Guest';}
export function normalizePose(value:unknown):GuestPose|null{
 if(!isRecord(value)||!['tala','isko','amihan'].includes(String(value.character))||!['field','tavern'].includes(String(value.area)))return null;
 const character=value.character as CharacterId,area=value.area as 'field'|'tavern',look=restoreProfile(value.look,character);look.name=guestName(value.name);
 const x=number(value.x,0,area==='tavern'?TAVERN.width:WORLD.width),y=number(value.y,0,area==='tavern'?TAVERN.height:WORLD.height);
 return {name:look.name,character,look,area,stage:area==='tavern'?0:regionAt(x,y),x,y,dir:isKey({up:1,down:1,left:1,right:1},value.dir)?value.dir:'down',walking:value.walking===true,walkTime:number(value.walkTime,0,1e8),swing:number(value.swing,0,.32),shot:number(value.shot,0,.22),dash:number(value.dash,0,.18)};
}
export function toGuestPose(s:GameState,name:string):GuestPose{
 const look:CharacterProfile={name,outfit:s.outfit,hat:s.hat,hair:s.hair,hairColor:s.hairColor,skin:s.skin,armor:s.armor,armors:[s.armor],weapon:s.weapon,weapons:[s.weapon],gear:{...s.gear},gearOwned:{...s.gear},xp:s.xp,hp:s.player.hp,stamina:100};
 return {name,character:s.character,look,area:s.area,stage:s.stage,x:s.player.x,y:s.player.y,dir:s.player.dir,walking:s.player.walking,walkTime:s.player.walkTime,swing:s.player.swing,shot:s.player.shot,dash:s.player.dash};
}
export interface GuestMessage {id:string;room:string;guestId:string;name:string;text:string;createdAt:number}
export function chatText(value:unknown):string|null{if(typeof value!=='string')return null;const text=value.replace(/[\u0000-\u001f\u007f]/g,' ').trim();return text.length&&text.length<=160?text:null;}
export const GUEST_ORIGINS=['https://taverngame.vercel.app','http://127.0.0.1:4173','http://localhost:4173'];
