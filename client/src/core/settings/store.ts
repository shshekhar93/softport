export class Store {
  private store: StoreData;
  private listeners: StoreListeners;

  constructor() {
    this.store = Object.create(null);
    this.listeners = Object.create(null);
  }

  get(key: string): any {
    return this.store[key];
  }

  set(key: string, value: any): void {
    this.store[key] = value;
    this.fireListerners(key, value);
  }

  private fireListerners(key: string, value: any) {
    const listeners = this.listeners[key] || [];
    listeners.forEach((l: StoreListener) => l(value, key));
  }

  addListener(key: string, listener: StoreListener): void {
    if(this.listeners[key] === undefined) {
      this.listeners[key] = [listener];
    }
    else {
      this.listeners[key].push(listener);
    }
  }

  removeListener(key: string, listener: StoreListener): void {
    if(!this.listeners[key]) {
      return;
    }

    this.listeners[key] = this.listeners[key].filter(l => l !== listener);
  }
}

export interface StoreData {
  [key: string]: any
}

type StoreListener = (value?: any, key?: string) => void;

interface StoreListeners {
  [key: string]: Array<StoreListener>
}

export default new Store();
