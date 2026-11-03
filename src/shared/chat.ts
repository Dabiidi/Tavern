import type { GuestMessage } from './multiplayer';
/** Short-lived speech, separate from the persistent room log. */
export class SpeechBubbles {
 private bubbles=new Map<string,{text:string;until:number}>();
 private seen=new Set<string>();
 say(guestId:string,text:string,now:number){this.bubbles.set(guestId,{text,until:now+5500});}
 receive(messages:GuestMessage[],now:number,serverNow:number){
  for(const m of messages){if(this.seen.has(m.id))continue;this.seen.add(m.id);if(serverNow-m.createdAt>=0&&serverNow-m.createdAt<5500)this.say(m.guestId,m.text,now);}
  if(this.seen.size>256)this.seen=new Set([...this.seen].slice(-128));
  for(const [id,b] of this.bubbles)if(b.until<=now)this.bubbles.delete(id);
 }
 get(id:string,now:number){const b=this.bubbles.get(id);return b&&b.until>now?b.text:'';}
 clear(){this.bubbles.clear();this.seen.clear();}
}
