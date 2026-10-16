interface Elements {
  'lore-panel': HTMLDialogElement;
  'equipment-panel': HTMLDialogElement;
  'equipment-open': HTMLButtonElement;
  'equipment-close': HTMLButtonElement;
  'popup': HTMLElementTagNameMap['button'];
  'compact': HTMLElementTagNameMap['button'];
  'install': HTMLElementTagNameMap['button'];
  'desktop-controls': HTMLElementTagNameMap['div'];
  'pin-window': HTMLElementTagNameMap['button'];
  'minimize-window': HTMLElementTagNameMap['button'];
  'close-window': HTMLElementTagNameMap['button'];
  'stage-eyebrow': HTMLElementTagNameMap['div'];
  'stage-subtitle': HTMLElementTagNameMap['p'];
  'customize-open': HTMLElementTagNameMap['button'];
  'portrait': HTMLElementTagNameMap['canvas'];
  'player-name': HTMLElementTagNameMap['b'];
  'journey': HTMLElementTagNameMap['nav'];
  'location': HTMLElementTagNameMap['b'];
  'stage-region': HTMLElementTagNameMap['small'];
  'coins': HTMLElementTagNameMap['b'];
  'game': HTMLElementTagNameMap['canvas'];
  'hearts': HTMLElementTagNameMap['span'];
  'energy-fill': HTMLElementTagNameMap['span'];
  'quest-hint': HTMLElementTagNameMap['div'];
  'notice': HTMLElementTagNameMap['div'];
  'interaction': HTMLElementTagNameMap['div'];
  'interaction-text': HTMLElementTagNameMap['span'];
  'scene-title': HTMLElementTagNameMap['span'];
  'scene-architecture': HTMLElementTagNameMap['small'];
  'stage-transition': HTMLElementTagNameMap['div'];
  'next-stage-detail': HTMLElementTagNameMap['p'];
  'travel-now': HTMLElementTagNameMap['button'];
  'travel-countdown': HTMLElementTagNameMap['small'];
  'pause': HTMLElementTagNameMap['button'];
  'architecture-title': HTMLElementTagNameMap['b'];
  'architecture-note': HTMLElementTagNameMap['p'];
  'touch-dash': HTMLElementTagNameMap['button'];
  'touch-swing': HTMLElementTagNameMap['button'];
  'touch-interact': HTMLElementTagNameMap['button'];
  'quest-count': HTMLElementTagNameMap['span'];
  'quest-description': HTMLElementTagNameMap['p'];
  'quest-progress-fill': HTMLElementTagNameMap['span'];
  'quest-progress-text': HTMLElementTagNameMap['small'];
  'quest-tip': HTMLElementTagNameMap['p'];
  'material-a-icon': HTMLElementTagNameMap['span'];
  'mango': HTMLElementTagNameMap['b'];
  'material-a-label': HTMLElementTagNameMap['small'];
  'material-b-icon': HTMLElementTagNameMap['span'];
  'flowers': HTMLElementTagNameMap['b'];
  'material-b-label': HTMLElementTagNameMap['small'];
  'buko': HTMLElementTagNameMap['b'];
  'beads': HTMLElementTagNameMap['b'];
  'snack': HTMLElementTagNameMap['button'];
  'customize-panel': HTMLElementTagNameMap['section'];
  'customize-close': HTMLElementTagNameMap['button'];
  'character-choices': HTMLElementTagNameMap['div'];
  'name-input': HTMLElementTagNameMap['input'];
  'color-options': HTMLElementTagNameMap['div'];
  'hat': HTMLElementTagNameMap['select'];
  'save-name': HTMLElementTagNameMap['button'];
  'save-status': HTMLElementTagNameMap['span'];
}
export function element<K extends keyof Elements>(id: K): Elements[K];
export function element(id: string): HTMLElement;
export function element(id: string): HTMLElement {
  const result=document.getElementById(id);
  if (!(result instanceof HTMLElement)) throw new Error(`Missing element: ${id}`);
  return result;
}
export function canvasElement(id: string): HTMLCanvasElement {
  const result=element(id);
  if (!(result instanceof HTMLCanvasElement)) throw new Error(`Expected canvas: ${id}`);
  return result;
}
export function context2d(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const context=canvas.getContext('2d');
  if (!context) throw new Error('Canvas 2D rendering is unavailable.');
  return context;
}
