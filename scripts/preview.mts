import { guestRequest, MemoryGuestStore } from '../src/server/guests';
import * as http from 'node:http';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
const rootDir=fileURLToPath(new URL('..',import.meta.url));
const arg=(name:string)=>{const index=process.argv.indexOf(name);return index>=0?process.argv[index+1]:null;};
const root=path.resolve(arg('--root')||path.join(rootDir,'dist','web'));
const port=Number(arg('--port'))||4173;
const types: Record<string,string> = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png':'image/png', '.webmanifest':'application/manifest+json' };
const guests=new MemoryGuestStore();
http.createServer(async (req, res) => {
  if((req.url||'').startsWith('/api/guest/')){try{let body='';for await(const chunk of req){body+=chunk;if(body.length>8192){res.writeHead(413);res.end();return;}}const headers=new Headers();for(const [name,value] of Object.entries(req.headers))if(typeof value==='string')headers.set(name,value);const response=await guestRequest(new Request('http://'+req.headers.host+req.url,{method:req.method,headers,body:req.method==='POST'?body:undefined}),guests);res.writeHead(response.status,Object.fromEntries(response.headers.entries()));res.end(await response.text());}catch{res.writeHead(500);res.end('Guest service unavailable');}return;}

  const name = (req.url||'/').split('?')[0] === '/' ? 'index.html' : (req.url||'/').split('?')[0].slice(1);
  const file = path.resolve(root, name);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
}).listen(port, '127.0.0.1', () => console.log('Baryo adventure preview: http://127.0.0.1:'+port));
