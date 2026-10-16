export const weapons = {
  tirador:{name:'Tirador',kind:'slingshot',rarity:'Common',damage:1,range:270,cooldown:.5,color:'#c3a16c'},
  sunshot:{name:'Araw tirador',kind:'slingshot',rarity:'Rare',damage:2,range:320,cooldown:.42,color:'#e9c76e'},
  yantok:{name:'Yantok',kind:'stick',rarity:'Common',damage:1,range:48,cooldown:.4,color:'#d9b57a'},
  kamagong:{name:'Kamagong arnis',kind:'stick',rarity:'Uncommon',damage:2,range:48,cooldown:.48,color:'#745347'},
  bolo:{name:'Trail bolo',kind:'blade',rarity:'Uncommon',damage:2,range:46,cooldown:.52,color:'#bbd2ce'},
  sibat:{name:'Bamboo sibat',kind:'spear',rarity:'Rare',damage:2,range:78,cooldown:.62,color:'#b3d8c3'},
  moonbolo:{name:'Moonlit bolo',kind:'blade',rarity:'Epic',damage:3,range:58,cooldown:.48,color:'#dcc1f3'}
} as const;
export type WeaponId=keyof typeof weapons;
export function weaponInfo(id:string){return Object.prototype.hasOwnProperty.call(weapons,id)?weapons[id as WeaponId]:weapons.yantok;}
