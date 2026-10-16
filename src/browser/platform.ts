import type { DesktopBridge, WebviewMessage } from '../shared/types';
export interface InstallPromptEvent extends Event { prompt(): Promise<void> }
export interface VsCodeApi { postMessage(message: WebviewMessage): void }
declare global {
  interface Window { mosslightDesktop?: DesktopBridge }
  interface WindowEventMap { beforeinstallprompt: InstallPromptEvent }
  function acquireVsCodeApi(): VsCodeApi;
}
