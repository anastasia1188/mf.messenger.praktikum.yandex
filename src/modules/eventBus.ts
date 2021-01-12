interface FuncEvent {
  (): void;
}

interface FuncListener {
  (arg?): void;
}

interface FuncListenerDidMount {
  (oldProps?: Record<string, any>, newProps?: Record<string, any>): void;
}

type Func = FuncListener | FuncListenerDidMount;
interface Listener {
    [key: string]: Func[];
}
export default class EventBus {
    listeners: Listener;

    constructor() {
      this.listeners = {};
    }

    on(event: string, callback: Func) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }

      this.listeners[event].push(callback);
    }

    off(event: string, callback: FuncEvent) {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }

      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== callback,
      );
    }

    emit(event: string, ...args) {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }

      this.listeners[event].forEach((listener) => {
        listener(...args);
      });
    }
}
