import type { Point } from './types';
// Short, local routes keep click-to-move clear of trunks and furniture.
export function findPath(start:Point,end:Point,blocked:(x:number,y:number)=>boolean):Point[]{
  if(blocked(end.x,end.y))return [];
  const clear=(a:Point,b:Point)=>{const n=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/6));for(let i=1;i<=n;i++)if(blocked(a.x+(b.x-a.x)*i/n,a.y+(b.y-a.y)*i/n))return false;return true;};
  if(clear(start,end))return [end];
  const cell=16,padding=9,minX=Math.min(0,Math.floor((end.x-start.x)/cell))-padding,maxX=Math.max(0,Math.ceil((end.x-start.x)/cell))+padding,minY=Math.min(0,Math.floor((end.y-start.y)/cell))-padding,maxY=Math.max(0,Math.ceil((end.y-start.y)/cell))+padding;
  const point=(x:number,y:number)=>({x:start.x+x*cell,y:start.y+y*cell}),key=(x:number,y:number)=>x+','+y;
  interface Node {x:number;y:number;g:number;f:number;parent?:Node}
  const open:Node[]=[{x:0,y:0,g:0,f:Math.hypot(end.x-start.x,end.y-start.y)/cell}],best=new Map<string,number>([['0,0',0]]),closed=new Set<string>(),solid=new Map<string,boolean>();
  const wall=(x:number,y:number)=>{const id=key(x,y);if(!solid.has(id)){const p=point(x,y);solid.set(id,blocked(p.x,p.y));}return solid.get(id)!;};
  for(let visits=0;open.length&&visits<3500;visits++){
    let lowest=0;for(let i=1;i<open.length;i++)if(open[i].f<open[lowest].f)lowest=i;const current=open.splice(lowest,1)[0],id=key(current.x,current.y);if(closed.has(id))continue;closed.add(id);const here=point(current.x,current.y);
    if(Math.hypot(here.x-end.x,here.y-end.y)<cell*1.5&&clear(here,end)){const result:Point[]=[end];let n:Node|undefined=current;while(n?.parent){result.push(point(n.x,n.y));n=n.parent;}result.reverse();const smooth:Point[]=[];let previous=start,index=0;while(index<result.length){let far=index;for(let j=index+1;j<result.length&&clear(previous,result[j]);j++)far=j;smooth.push(result[far]);previous=result[far];index=far+1;}return smooth;}
    for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const x=current.x+dx,y=current.y+dy,next=key(x,y);if(x<minX||x>maxX||y<minY||y>maxY||closed.has(next)||wall(x,y)||dx&&dy&&(wall(current.x+dx,current.y)||wall(current.x,current.y+dy)))continue;const p=point(x,y);if(!clear(here,p))continue;const g=current.g+Math.hypot(dx,dy);if(g>=(best.get(next)??Infinity))continue;best.set(next,g);open.push({x,y,g,f:g+Math.hypot(p.x-end.x,p.y-end.y)/cell,parent:current});}
  }
  return [];
}
