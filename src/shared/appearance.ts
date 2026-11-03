export const armors={
  linen:{name:'Linen tunic',hearts:5,level:1,coins:0,beads:0},
  abaca:{name:'Abaca vest',hearts:6,level:1,coins:0,beads:0},
  leather:{name:'Trail leather',hearts:7,level:3,coins:65,beads:3},
  moonweave:{name:'Moonweave coat',hearts:8,level:5,coins:140,beads:8}
} as const;
export type ArmorId=keyof typeof armors;
export const hairStyles={natural:'Character style',crop:'Short crop',bob:'Soft bob',ponytail:'Ponytail',long:'Long hair'} as const;
export type HairStyle=keyof typeof hairStyles;
export const skinTones={natural:'Character tone',sunlit:'Sunlit',morena:'Morena',deep:'Deep'} as const;
export type SkinTone=keyof typeof skinTones;
export const hairColors={ink:'#34382f',chestnut:'#70503c',ash:'#8a8979'} as const;
export type HairColor=keyof typeof hairColors;
