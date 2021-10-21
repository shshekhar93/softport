export type EventHandler = (evt: Event) => void;

export function addGlobalEventHandler(event: string, listener: EventHandler) {
  document.addEventListener(event, listener);
}

export function removeGlobalEventHandler(event: string, listener: EventHandler) {
  document.removeEventListener(event, listener);
}
