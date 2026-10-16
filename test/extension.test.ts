import test from 'node:test';
import assert from 'node:assert/strict';
import * as vm from 'node:vm';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { create } from '../src/shared/core';
import type { GameState } from '../src/shared/types';
interface TestUri { fsPath:string; toString():string }
interface Webview {
  html:string; cspSource:string; options?:unknown;
  asWebviewUri(uri:TestUri):TestUri;
  onDidReceiveMessage(handler:(message:unknown)=>void):object;
  postMessage(message:unknown):void;
}
interface TestView { webview:Webview; onDidDispose(handler:()=>void):void }
interface Provider { resolveWebviewView(view:TestView):void }
interface MockContext { extensionUri:TestUri; subscriptions:unknown[]; globalState:{get():undefined;update(key:string,save:GameState):void} }

test('VS Code serves the typed game bundle with safe script nonces and persistent saves',()=>{
  const root=path.resolve(__dirname,'../..');
  const updates:{key:string;save:GameState}[]=[],messages:{type:string;save:GameState}[]=[],commands:Record<string,()=>unknown>={};
  let provider:Provider|undefined,handler:((message:unknown)=>void)|undefined;
  const uri=(p:string):TestUri=>({fsPath:p,toString:()=>p});
  const vscode={Uri:{joinPath:(base:TestUri,...parts:string[])=>uri(path.join(base.fsPath,...parts))},StatusBarAlignment:{Right:1},window:{createStatusBarItem:()=>({show(){}}),registerWebviewViewProvider:(_id:string,p:Provider)=>{provider=p;return{};}},commands:{registerCommand:(id:string,fn:()=>unknown)=>{commands[id]=fn;return{};},executeCommand:(id:string)=>id}};
  const extensionModule={exports:{} as {activate(context:MockContext):void}};
  vm.runInNewContext(fs.readFileSync(path.join(root,'dist/extension.js'),'utf8'),{module:extensionModule,require:(name:string)=>name==='vscode'?vscode:require(name)});
  extensionModule.exports.activate({extensionUri:uri(root),subscriptions:[],globalState:{get:()=>undefined,update:(key,save)=>{updates.push({key,save});}}});
  const webview:Webview={html:'',cspSource:'vscode-resource:',asWebviewUri:u=>u,onDidReceiveMessage:fn=>{handler=fn;return{};},postMessage:m=>messages.push(m as {type:string;save:GameState})};
  assert.ok(provider);provider.resolveWebviewView({webview,onDidDispose(){return{};}});
  assert.ok(handler);handler({type:'ready'});
  assert.equal(messages[0].save.version,4);
  assert.equal((webview.html.match(/nonce="[a-f0-9]{32}"/g)||[]).length,1);
  assert.ok(webview.html.includes("default-src 'none'"));
  assert.ok(webview.html.includes(path.join(root,'dist/web/game.js')));
  const save=create();save.coins=25;handler({type:'save',save});
  assert.equal(updates.at(-1)!.save.coins,25);assert.equal(updates.at(-1)!.key,'baryoSave');assert.equal(commands['mosslight.open'](),'mosslight.meadow.focus');
});
