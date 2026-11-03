import type { GameState } from '../shared/types';
import { inTown } from '../shared/world';

// “Hapon sa Plaza”: an original, synthesized 72 BPM lo-fi composition.
// No recordings, third-party samples, or borrowed melodies are used.
// This composition is dedicated to the public domain under CC0-1.0.
const chords=[[50,57,61,66],[47,54,57,62],[43,50,54,59],[45,52,59,61]];
const melody=[
 [78,0,0,76,0,73,0,0],[0,74,0,0,73,0,69,0],
 [71,0,0,74,0,78,0,0],[0,76,0,73,0,71,0,0],
 [0,73,0,0,78,0,76,0],[74,0,0,73,0,69,0,0],
 [0,71,0,74,0,0,78,0],[76,0,73,0,71,0,0,0]
];
export function initMusic(readState:()=>GameState){
 const button=document.getElementById('music-toggle') as HTMLButtonElement;
 const slider=document.getElementById('music-volume') as HTMLInputElement;
 let enabled=true,volume=.3,context:AudioContext|undefined,master:GainNode|undefined,noise:AudioBuffer|undefined;
 let next=0,step=0,timer=0,starting=false;
 try{enabled=localStorage.getItem('baryo-music')!=='off';const saved=Number(localStorage.getItem('baryo-volume')??.3);if(Number.isFinite(saved))volume=Math.max(0,Math.min(.7,saved));}catch{}
 slider.value=String(Math.round(volume*100));
 const update=()=>{button.textContent=enabled?'♫':'♫̸';button.setAttribute('aria-pressed',String(enabled));button.setAttribute('aria-label',enabled?'Mute town music':'Play town music');button.title=enabled?'Hapon sa Plaza · music on':'Town music off';};
 const save=()=>{try{localStorage.setItem('baryo-music',enabled?'on':'off');localStorage.setItem('baryo-volume',String(volume));}catch{}};
 function tone(note:number,time:number,length:number,gain:number,type:OscillatorType='sine'){
  const c=context!,osc=c.createOscillator(),amp=c.createGain(),filter=c.createBiquadFilter();
  osc.type=type;osc.frequency.value=440*Math.pow(2,(note-69)/12);osc.detune.value=Math.sin(step*.7+note)*3;
  filter.type='lowpass';filter.frequency.value=type==='triangle'?900:2400;
  amp.gain.setValueAtTime(.0001,time);amp.gain.exponentialRampToValueAtTime(gain,time+.025);amp.gain.exponentialRampToValueAtTime(.0001,time+length);
  osc.connect(filter);filter.connect(amp);amp.connect(master!);osc.start(time);osc.stop(time+length+.05);
  osc.onended=()=>{osc.disconnect();filter.disconnect();amp.disconnect();};
 }
 function drum(time:number,hat:boolean){
  const c=context!,amp=c.createGain();amp.connect(master!);
  if(hat){const source=c.createBufferSource(),filter=c.createBiquadFilter();source.buffer=noise!;filter.type='highpass';filter.frequency.value=6500;source.connect(filter);filter.connect(amp);amp.gain.setValueAtTime(.022,time);amp.gain.exponentialRampToValueAtTime(.0001,time+.07);source.start(time);source.stop(time+.08);source.onended=()=>{source.disconnect();filter.disconnect();amp.disconnect();};}
  else{const kick=c.createOscillator();kick.frequency.setValueAtTime(110,time);kick.frequency.exponentialRampToValueAtTime(46,time+.12);amp.gain.setValueAtTime(.16,time);amp.gain.exponentialRampToValueAtTime(.0001,time+.22);kick.connect(amp);kick.start(time);kick.stop(time+.24);kick.onended=()=>{kick.disconnect();amp.disconnect();};}
 }
 function schedule(){
  const c=context!;const state=readState(),town=state.area==='tavern'||state.stage===0&&inTown(state.player),audible=enabled&&town&&!document.hidden&&!state.paused;
  master!.gain.setTargetAtTime(audible?volume:0,c.currentTime,.35);
  if(c.state!=='running')return;
  if(next<c.currentTime-.2){next=c.currentTime+.06;step=0;}
  const eighth=60/72/2;
  while(next<c.currentTime+.16){
   if(audible){const bar=Math.floor(step/8)%8,beat=step%8,chord=chords[bar%4],time=next+(beat%2?.025:0);
    if(beat===0){chord.forEach((note,i)=>tone(note+12,time+i*.018,eighth*7.3,.035,'triangle'));tone(chord[0]-12,time,eighth*3.2,.095);}
    if(beat===4)tone(chord[0]-12,time,eighth*2.7,.065);
    const note=melody[bar][beat];if(note)tone(note,time,eighth*1.8,.047);
    if(beat===0||beat===4)drum(time,false);if(beat%2===1)drum(time,true);
    if(beat===2||beat===6){tone(50,time,.06,.035,'triangle');drum(time+.008,true);}
   }
   next+=eighth;step=(step+1)%128;
  }
 }
 async function start(){
  if(!enabled||starting)return;starting=true;
  try{
   if(!context){context=new AudioContext();master=context.createGain();master.gain.value=0;const compressor=context.createDynamicsCompressor();compressor.threshold.value=-18;compressor.ratio.value=3;master.connect(compressor);compressor.connect(context.destination);
    noise=context.createBuffer(1,Math.ceil(context.sampleRate*.12),context.sampleRate);const data=noise.getChannelData(0);let seed=43;for(let i=0;i<data.length;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;data[i]=(seed/0xffffffff)*2-1;}
    next=context.currentTime+.08;timer=window.setInterval(schedule,80);
   }
   if(context.state==='suspended')await context.resume();schedule();button.dataset.audioState=context.state;
  }catch{button.title='Click to start town music';}finally{starting=false;}
 }
 button.addEventListener('click',()=>{enabled=!enabled;save();update();if(enabled)void start();else if(master&&context)master.gain.setTargetAtTime(0,context.currentTime,.15);});
 slider.addEventListener('input',()=>{volume=Number(slider.value)/100;save();if(enabled)void start();});
 const unlock=()=>{if(enabled)void start();};document.addEventListener('pointerdown',unlock,{once:true});document.addEventListener('keydown',unlock,{once:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&context&&master)master.gain.setTargetAtTime(0,context.currentTime,.1);});
 window.addEventListener('pagehide',()=>{clearInterval(timer);void context?.close();},{once:true});
 update();
}
