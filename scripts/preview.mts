import * as http from 'node:http';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
const rootDir=fileURLToPath(new URL('..',import.meta.url));
const arg=(name:string)=>{const index=process.argv.indexOf(name);return index>=0?process.argv[index+1]:null;};
const root=path.resolve(arg('--root')||path.join(rootDir,'dist','web'));
const port=Number(arg('--port'))||4173;
const types: Record<string,string> = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png':'image/png', '.webmanifest':'application/manifest+json' };
http.createServer((req, res) => {
  const name = (req.url||'/').split('?')[0] === '/' ? 'index.html' : (req.url||'/').split('?')[0].slice(1);
  const file = path.resolve(root, name);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
}).listen(port, '127.0.0.1', () => console.log('Baryo adventure preview: http://127.0.0.1:'+port));
