import type { GameState } from './types';
export interface Legend { name: string; shade: string; symbol: string; title: string; tradition: string; warning: string; fragments: string[] }
export const legends: Legend[] = [
  {name:'Kapre',shade:'Kapre ember',symbol:'♨',title:'The ember in the balete',tradition:'Kapre stories describe a great tree-dwelling figure, often associated with tobacco smoke. Accounts vary between storytellers.',warning:'Watch the slow ember shadows. Keep a little distance, then face them with your arnis.',fragments:[
    'At dusk, Lola notices a coal glowing in a tree where nobody has climbed. Beneath it, three long shadows cross the palayan. The fiesta lanterns have gone cold.',
    'Inside the mango basket lies a singed scrap: “Carry the light onward.” Lola remembers a traveler who vanished before the last fiesta.',
    'Sampaguita sweetens the air, but smoke still curls against the wind. Aling Nena says the traveler carried a lantern with four missing panes.',
    'The ember shadows scatter. In their place rests a warm lantern pane. Scratched into its frame is a street of capiz windows. Your next clue waits in the heritage town.'
  ]},
  {name:'Tikbalang',shade:'Tikbalang shadow',symbol:'♞',title:'Hoofbeats with no rider',tradition:'The tikbalang is commonly pictured as a horse-headed humanoid associated with bewildering travelers. This encounter is an original adaptation.',warning:'These shadows move in quick, crooked steps. Face the hoofbeats and leave room to dash.',fragments:[
    'A kalesa stands empty. Hoofbeats pass behind you, yet every window reflects an empty street. The lantern pane clouds over, showing the same corner again and again.',
    'The potter finds a hoof mark pressed into yesterday’s clay. Beside it, a child has drawn four panes around a small sun.',
    'A garland marks the real road. Mang Tomas whispers: “Count the houses, not the echoes.” Beyond the last roof, a second lantern pane glints.',
    'The false hoofbeats fade. A second pane slips into the lantern, revealing a mountain path. Above its terraces, something enormous beats its wings without making a sound.'
  ]},
  {name:'Manananggal',shade:'Manananggal shade',symbol:'⋏',title:'Wings over the terraces',tradition:'Manananggal tales describe a nocturnal being whose winged upper body separates from its lower half. Our shadow creatures are stylized, non-graphic interpretations.',warning:'Watch the wings rise and fall. Step aside from the drifting shades before swinging.',fragments:[
    'Rice bends beneath a wind you cannot feel. A winged silhouette crosses the moon, then another. Ate Laya lights a lamp and asks you to stay where the paths are clear.',
    'Tucked into the rice bundle is the traveler’s ribbon. Its stitched words read: “I followed a light that was not a star.”',
    'Fresh bamboo lantern poles line the footpath. Their shadows point toward a third pane caught beneath dark wings. Your lantern answers with a faint, steady glow.',
    'The winged shades dissolve into mist. The third pane reveals the truth: the traveler was chasing the moon’s reflection. The last light waits beside a distant lake.'
  ]},
  {name:'Bakunawa',shade:'Moon-serpent echo',symbol:'☾',title:'The moon beneath the water',tradition:'Bakunawa is a moon-swallowing serpent in Visayan traditions. Its appearance here is a traveling tale, not a claim about Maranao belief or this architectural setting.',warning:'These small serpent echoes coil along the shore. Keep to dry paths and watch their glowing eyes.',fragments:[
    'The lake holds two moons. One shines above; the other moves beneath the water. A story brought by a traveler speaks of Bakunawa. Tonight, small echoes coil along the bank.',
    'Carved wood bears the traveler’s final mark: a lantern lowered into water. The lake kept the reflection, and the traveler kept walking after it.',
    'Woven cloth becomes a lantern sail. Three panes glow, but the fourth is dark. Kuya Amir asks you to clear the echoes so the community can carry the light together.',
    'The final pane returns. Four lights become one, and the false moon sinks away. On the far bank, a familiar traveler lifts a hand. The road home was there all along.'
  ]}
];
export function legendFor(s: Pick<GameState,'stage'>): Legend {return legends[s.stage];}
export function chapterFor(s: GameState, index=s.stage) {return legends[index].fragments[Math.min(3,s.stageProgress[index])];}
