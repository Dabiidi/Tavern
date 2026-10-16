import { build } from 'esbuild';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const nodeOptions={bundle:true,platform:'node' as const,target:'node18',format:'cjs' as const,sourcemap:true,logLevel:'info' as const,banner:{js:'// Generated from TypeScript. Run npm run build to regenerate.'},absWorkingDir:root};
await Promise.all([
  build({...nodeOptions,entryPoints:['src/extension.ts'],outfile:'dist/extension.js',external:['vscode']}),
  build({...nodeOptions,entryPoints:['src/desktop/main.ts'],outfile:'desktop/dist/main.cjs',external:['electron']}),
  build({...nodeOptions,entryPoints:['src/desktop/preload.ts'],outfile:'desktop/dist/preload.cjs',external:['electron']}),
  build({...nodeOptions,entryPoints:['test/game.test.ts','test/extension.test.ts'],outdir:'dist/test',outExtension:{'.js':'.cjs'}}),
  build({absWorkingDir:root,entryPoints:['src/browser/main.ts'],outfile:'dist/web/game.js',bundle:true,platform:'browser',format:'iife',target:'es2022',sourcemap:true,logLevel:'info',banner:{js:'// Generated from TypeScript. Run npm run build to regenerate.'}}),
  build({absWorkingDir:root,entryPoints:['src/worker/sw.ts'],outfile:'dist/web/sw.js',bundle:true,platform:'browser',format:'iife',target:'es2022',logLevel:'info',banner:{js:'// Generated from TypeScript. Run npm run build to regenerate.'}})
]);

const assets=['index.html','style.css','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png'];
await Promise.all(assets.map(file=>fs.copyFile(path.join(root,'media',file),path.join(root,'dist/web',file))));
