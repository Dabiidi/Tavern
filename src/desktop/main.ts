import { app, BrowserWindow, ipcMain, screen as electronScreen } from 'electron';
import type { WindowCommand } from '../shared/types';
import * as path from 'node:path';
import { pathToFileURL } from 'node:url';
let window: BrowserWindow | null = null;
app.setName('Baryo');
if(!app.requestSingleInstanceLock())app.quit();
else{
  app.on('second-instance',()=>{if(window){if(window.isMinimized())window.restore();window.show();window.focus();}});
  app.whenReady().then(()=>{
    const screen=electronScreen.getPrimaryDisplay().workArea;
    window=new BrowserWindow({width:1000,height:680,minWidth:340,minHeight:400,x:Math.max(screen.x,screen.x+screen.width-1020),y:Math.max(screen.y,screen.y+screen.height-700),frame:false,alwaysOnTop:true,resizable:true,backgroundColor:'#141d19',icon:path.join(__dirname,'../../dist/web/icon-512.png'),webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:true,backgroundThrottling:false}});
    const file=path.join(__dirname,'../../dist/web/index.html'),origin=pathToFileURL(file).href;
    window.webContents.setWindowOpenHandler(()=>({action:'deny'}));
    window.webContents.on('will-navigate',(event,url)=>{if(!url.startsWith(origin))event.preventDefault();});
    window.webContents.session.setPermissionRequestHandler((_contents,_permission,callback)=>callback(false));
    window.loadFile(file,{query:{desktop:'1'}});
    window.on('closed',()=>{window=null;});
  });
  ipcMain.handle('mosslight:window',(event,action: WindowCommand)=>{
    if(!window||event.sender!==window.webContents)return;
    if(action==='pin'){window.setAlwaysOnTop(!window.isAlwaysOnTop());return window.isAlwaysOnTop();}
    if(action==='minimize')window.minimize();
    if(action==='close')window.close();
    if(action==='expand')window.setSize(window.getSize()[0],window.getSize()[1]<550?780:440);
  });
  app.on('window-all-closed',()=>app.quit());
}
