export type Direction = 'up' | 'down' | 'left' | 'right';
export type CharacterId = 'tala' | 'isko' | 'amihan';
export type Outfit = 'terracotta' | 'ocean' | 'ube' | 'mango';
export type Hat = 'salakot' | 'bandana' | 'none';
export type Resource = 'mango' | 'flowers' | 'buko' | 'clay' | 'rice' | 'bamboo' | 'wood' | 'cloth';
export type QuestItem = Resource | 'cleared';
export type NpcId = 'lola' | 'nena' | 'benji';
export type Action = 'interact' | 'swing' | 'pause' | 'compact' | 'dash' | 'snack' | 'customize' | 'travel';
export type EventType = 'notice' | 'gather' | 'hit' | 'loot' | 'swing' | 'hurt' | 'quest' | 'arrival' | 'departure';
export interface Point { x: number; y: number }
export interface Character { name: string; description: string; shirt: string; skin: string }
export interface Building extends Point { w: number; h: number; type: 'kubo' | 'store' | 'bato' | 'bale' | 'torogan' | 'pavilion' }
export interface Npc extends Point { id: NpcId; name: string; shirt: string }
export interface HarvestNode extends Point { id: number; type: Resource }
export type Interaction = (Npc & { kind: 'npc' }) | (HarvestNode & { kind: 'node' });
export interface Quest { title: string; description: string; goal: number; item: QuestItem; npc: NpcId; reward: number }
export interface Stage { name: string; region: string; architecture: string; note: string; theme: string; tasks: Quest[] }
export interface Player extends Point { dir: Direction; hp: number; stamina: number; walking: boolean; walkTime: number; swing: number; cooldown: number; dash: number; dashCooldown: number; invincible: number }
export interface Spirit extends Point { hp: number; dead: number; phase: number; flash: number }
export interface GameEvent extends Point { id: number; text: string; type: EventType }
export interface GameState extends Record<Resource, number> {
  version: 4; stage: number; stageProgress: number[]; clearStart: number[]; unlocked: number; arrival: number;
  transition: { next: number; remaining: number } | null;
  character: CharacterId; name: string; outfit: Outfit; hat: Hat;
  coins: number; beads: number; cleared: number; quest: number; completed: number[];
  player: Player; nodes: number[]; spirits: Spirit[]; time: number; paused: boolean; compact: boolean;
  eventId: number; events: GameEvent[]; savedAt: number;
}
export interface MovementInput { x?: number; y?: number; run?: boolean }
export type HostMessage = { type: 'load'; save: unknown } | { type: 'notice'; text: string };
export type WebviewMessage = { type: 'ready' } | { type: 'save'; save: GameState } | { type: 'popup' };
export type WindowCommand = 'pin' | 'minimize' | 'close' | 'expand';
export interface DesktopBridge { control(action: WindowCommand): Promise<boolean | undefined> }
export function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === 'object' && value !== null; }
export function isKey<T extends object>(object: T, key: unknown): key is Extract<keyof T, string> { return typeof key === 'string' && Object.prototype.hasOwnProperty.call(object, key); }
