import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const source=path.join(root,'dist','web'),output=path.join(root,'standalone-site','dist');
fs.mkdirSync(output,{recursive:true});
const files=['index.html','style.css','game.js','game.js.map','sw.js','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png'];
for(const file of files)fs.copyFileSync(path.join(source,file),path.join(output,file));
for(const file of ['idle-core.js','renderer.js'])fs.rmSync(path.join(output,file),{force:true});
const manifestPath=path.join(root,'standalone-site','.openai','hosting.json');
if(fs.existsSync(manifestPath)){const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));manifest.static={directory:'dist'};fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n');}
fs.writeFileSync(path.join(root,'standalone-site','README.md'),'# Baryo standalone\n\nDeploy the contents of dist/ to any static host. Includes installable PWA, offline cache, popup play, Filipino village exploration, and local saves. TypeScript source lives in ../src; regenerate with npm run build:web.\n');
console.log('Standalone game built at '+output);
