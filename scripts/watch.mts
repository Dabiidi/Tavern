import { watch } from 'node:fs';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
let building=false,queued=false,debounce:ReturnType<typeof setTimeout>|undefined;
function rebuild(){
  if(building){queued=true;return;}
  building=true;
  const child=spawn('npm',['run','build'],{cwd:root,stdio:'inherit',shell:process.platform==='win32'});
  child.once('exit',()=>{building=false;if(queued){queued=false;rebuild();}});
  child.once('error',error=>{building=false;console.error(error.message);});
}
for(const folder of ['src','test','scripts'])watch(new URL('../'+folder+'/',import.meta.url),{recursive:true},()=>{
  clearTimeout(debounce);debounce=setTimeout(rebuild,150);
});
console.log('Watching TypeScript sources. Browser previews can be reloaded after each successful build.');
rebuild();
