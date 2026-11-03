import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const source=path.join(root,'dist','web'),hosted=fs.existsSync(path.join(root,'standalone-site','vite.config.ts')),output=path.join(root,'standalone-site',hosted?'public/game':'dist');
fs.mkdirSync(output,{recursive:true});
const files=['index.html','style.css','game.js','game.js.map','sw.js','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png'];
for(const file of files)fs.copyFileSync(path.join(source,file),path.join(output,file));
for(const file of ['idle-core.js','renderer.js'])fs.rmSync(path.join(output,file),{force:true});
const manifestPath=path.join(root,'standalone-site','.openai','hosting.json');
if(fs.existsSync(manifestPath)){const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));if(hosted)delete manifest.static;else manifest.static={directory:'dist'};fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n');}
if(hosted){for(const folder of ['shared','server'])fs.cpSync(path.join(root,'src',folder),path.join(root,'standalone-site','lib','game',folder),{recursive:true});}
fs.writeFileSync(path.join(root,'standalone-site','README.md'),hosted?'# Baryo guest multiplayer\n\nBrowser assets are exported from the parent TypeScript game with npm run build:web. This hosting project serves /game/index.html plus /api/guest/:action using Cloudflare D1. Run npm run dev locally after applying drizzle migrations; publish through Sites. Guest sessions expire after 20 seconds without a heartbeat. Adventures remain device-local.\n':'# Baryo standalone\n\nDeploy dist/ to a static host. Regenerate from the parent with npm run build:web.\n');
console.log('Standalone game built at '+output);
