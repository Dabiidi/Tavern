import { contextBridge, ipcRenderer } from 'electron';
import type { DesktopBridge, WindowCommand } from '../shared/types';
const bridge: DesktopBridge = {control:(action: WindowCommand)=>['pin','minimize','close','expand'].includes(action)?ipcRenderer.invoke('mosslight:window',action):Promise.resolve()};
contextBridge.exposeInMainWorld('mosslightDesktop',bridge);
