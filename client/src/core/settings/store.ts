export class Store {
  private store: StoreData;
  private listeners: StoreListeners;

  constructor() {
    this.store = Object.create(null);
    this.listeners = Object.create(null);
  }

  get(key: string, defaultVal?: any): any {
    const val = this.store[key];
    if(val === undefined) {
      return defaultVal;
    }
    return val;
  }

  set(key: string, value: any): void {
    this.store[key] = value;
    this.fireListerners(key, value);
  }

  setSilent(key: string, value: any): void {
    this.store[key] = value;
  }

  private fireListerners(key: string, value: any) {
    const listeners = this.listeners[key] || [];
    const globalListeners = this.listeners['*'] || [];
    [
      ...listeners, 
      ...globalListeners
    ].forEach((l: StoreListener) => l(value, key));
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

  serialize() {
    return JSON.stringify(this.store);
  }

  deserialize(obj: object) {
    Object.assign(this.store, obj);
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
