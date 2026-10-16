import * as vscode from 'vscode';
import * as fs from 'node:fs';
import { randomBytes } from 'node:crypto';
import * as core from './shared/core';
import { isRecord } from './shared/types';

export function activate(context: vscode.ExtensionContext): void {
  const views = new Set<vscode.Webview>();
  let state = core.restore(context.globalState.get<unknown>('baryoSave'));
  const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 10);
  status.command='mosslight.open'; status.tooltip='Return to your little Philippine adventure'; status.text='$(sun) Baryo'; status.show();
  const persist = () => context.globalState.update('baryoSave', state);
  function mount(webview: vscode.Webview): void {
    const assets=vscode.Uri.joinPath(context.extensionUri,'dist','web');
    webview.options={enableScripts:true,localResourceRoots:[assets]};
    const nonce=randomBytes(16).toString('hex');
    const resource=(name:string)=>webview.asWebviewUri(vscode.Uri.joinPath(assets,name)).toString();
    webview.html=fs.readFileSync(vscode.Uri.joinPath(assets,'index.html').fsPath,'utf8')
      .replace('<!-- CSP -->',`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} data:; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">`)
      .replace('href="style.css"',`href="${resource('style.css')}"`).replace('href="icon.svg"',`href="${resource('icon.svg')}"`).replace('<link rel="manifest" href="manifest.webmanifest">','')
      .replace('src="game.js"',`nonce="${nonce}" src="${resource('game.js')}"`);
    views.add(webview);
    context.subscriptions.push(webview.onDidReceiveMessage((message:unknown)=>{
      if(!isRecord(message))return;
      if(message.type==='ready')void webview.postMessage({type:'load',save:state});
      if(message.type==='save'&&isRecord(message.save)&&message.save.version===4){
        state=core.restore(message.save);void persist();status.text=`$(sun) Baryo · ${state.coins} coins`;
        for(const other of views)if(other!==webview)void other.postMessage({type:'load',save:state});
      }
      if(message.type==='popup')void vscode.commands.executeCommand('mosslight.popout');
    }));
  }
  context.subscriptions.push(vscode.window.registerWebviewViewProvider('mosslight.meadow',{
    resolveWebviewView(view){mount(view.webview);context.subscriptions.push(view.onDidDispose(()=>views.delete(view.webview)));}
  },{webviewOptions:{retainContextWhenHidden:true}}));
  context.subscriptions.push(vscode.commands.registerCommand('mosslight.open',()=>vscode.commands.executeCommand('mosslight.meadow.focus')));
  let panel:vscode.WebviewPanel|undefined;
  context.subscriptions.push(vscode.commands.registerCommand('mosslight.popout',()=>{
    if(panel)return panel.reveal();
    const current=vscode.window.createWebviewPanel('baryoAdventure','Baryo · A Philippine Adventure',vscode.ViewColumn.Beside,{enableScripts:true,retainContextWhenHidden:true});
    panel=current;mount(current.webview);context.subscriptions.push(current.onDidDispose(()=>{views.delete(current.webview);panel=undefined;}));
  }));
  context.subscriptions.push(vscode.commands.registerCommand('mosslight.browser',()=>vscode.env.openExternal(vscode.Uri.parse(vscode.workspace.getConfiguration('mosslight').get<string>('standaloneUrl','http://127.0.0.1:4173')))));
  context.subscriptions.push(status,{dispose(){void persist();}});
}
export function deactivate(): void {}
