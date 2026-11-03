import { companions } from './world';
import type { CharacterId, CharacterProfile, GameState } from './types';
import { isKey, isRecord } from './types';
import { armors, hairStyles, hairColors, skinTones } from './appearance';
import { weapons } from './weapons';

export function defaultProfile(id:CharacterId):CharacterProfile {
  return {name:{tala:'Tala',isko:'Isko',amihan:'Amihan'}[id],outfit:{tala:'terracotta',isko:'ocean',amihan:'ube'}[id] as CharacterProfile['outfit'],hat:id==='tala'?'salakot':id==='amihan'?'bandana':'none',hair:'natural',hairColor:'ink',skin:'natural',armor:id==='isko'?'abaca':'linen',armors:['linen','abaca'],weapon:'yantok',weapons:['yantok','tirador'],gear:{arnis:0,sandals:0,agimat:0},gearOwned:{arnis:0,sandals:0,agimat:0},xp:0,hp:id==='isko'?6:5,stamina:100};
}
export function createProfiles(){return {tala:defaultProfile('tala'),isko:defaultProfile('isko'),amihan:defaultProfile('amihan')};}
export function snapshotProfile(s:GameState):CharacterProfile {return {name:s.name,outfit:s.outfit,hat:s.hat,hair:s.hair,hairColor:s.hairColor,skin:s.skin,armor:s.armor,armors:[...s.armors],weapon:s.weapon,weapons:[...s.weapons],gear:{...s.gear},gearOwned:{...s.gearOwned},xp:s.xp,hp:s.player.hp,stamina:s.player.stamina};}
export function saveProfile(s:GameState){s.profiles[s.character]=snapshotProfile(s);}
export function characterProfile(s:GameState,id:CharacterId){return id===s.character?snapshotProfile(s):s.profiles[id];}
export function switchCharacter(s:GameState,id:CharacterId){
  if(id===s.character)return;saveProfile(s);const profile=structuredClone(s.profiles[id]);s.character=id;
  for(const key of ['name','outfit','hat','hair','hairColor','skin','armor','armors','weapon','weapons','gear','gearOwned','xp'] as const)Object.assign(s,{[key]:profile[key]});
  s.player.hp=profile.hp;s.player.stamina=profile.stamina;s.player.swing=0;s.player.shot=0;s.player.dash=0;s.player.cooldown=0;s.player.shotCooldown=0;s.player.walking=false;s.projectiles=[];if(s.area==='tavern'){const station=companions.find(c=>c.id===id)!;s.player.x=station.x;s.player.y=station.y;}
}
export function restoreProfile(raw:unknown,id:CharacterId):CharacterProfile {
  const p=defaultProfile(id);if(!isRecord(raw))return p;
  if(typeof raw.name==='string')p.name=raw.name.trim().slice(0,20)||p.name;
  if(['terracotta','ocean','ube','mango'].includes(String(raw.outfit)))p.outfit=raw.outfit as CharacterProfile['outfit'];
  if(['salakot','bandana','rattan','none'].includes(String(raw.hat)))p.hat=raw.hat as CharacterProfile['hat'];
  if(isKey(hairStyles,raw.hair))p.hair=raw.hair;if(isKey(hairColors,raw.hairColor))p.hairColor=raw.hairColor;if(isKey(skinTones,raw.skin))p.skin=raw.skin;
  if(Array.isArray(raw.armors))p.armors=[...new Set([...p.armors,...raw.armors.filter((id):id is keyof typeof armors=>isKey(armors,id))])];
  if(isKey(armors,raw.armor)&&p.armors.includes(raw.armor))p.armor=raw.armor;
  if(Array.isArray(raw.weapons))p.weapons=[...new Set([...p.weapons,...raw.weapons.filter((id):id is keyof typeof weapons=>isKey(weapons,id))])];
  if(typeof raw.weapon==='string'&&p.weapons.includes(raw.weapon))p.weapon=raw.weapon;
  for(const key of ['arnis','sandals','agimat'] as const){const value=isRecord(raw.gear)?raw.gear[key]:0,owned=isRecord(raw.gearOwned)?raw.gearOwned[key]:0;p.gear[key]=typeof value==='number'&&Number.isFinite(value)?Math.floor(Math.max(0,Math.min(3,value))):0;p.gearOwned[key]=typeof owned==='number'&&Number.isFinite(owned)?Math.max(p.gear[key],Math.floor(Math.max(0,Math.min(3,owned)))):p.gear[key];}
  p.xp=typeof raw.xp==='number'&&Number.isFinite(raw.xp)?Math.floor(Math.max(0,Math.min(900,raw.xp))):0;
  p.hp=typeof raw.hp==='number'&&Number.isFinite(raw.hp)?Math.max(1,Math.min(armors[p.armor].hearts,raw.hp)):armors[p.armor].hearts;
  p.stamina=typeof raw.stamina==='number'&&Number.isFinite(raw.stamina)?Math.max(0,Math.min(100,raw.stamina)):100;return p;
}
