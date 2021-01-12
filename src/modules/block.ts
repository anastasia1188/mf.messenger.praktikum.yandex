import deepEqual from './common';
import EventBus from './eventBus';

export default class Block {
    static EVENTS = {
      INIT: 'init',
      FLOW_CDM: 'flow:component-did-mount',
      FLOW_CDU: 'flow:component-did-update',
      FLOW_RENDER: 'flow:render',
    };

    props: Record<string, any>;

    eventBus: any;

    #element: any = null;

    #meta: any = null;

    constructor(tagName = 'div', props = {}) {
      const eventBus = new EventBus();

      this.#meta = {
        tagName,
        props,
      };

      this.props = this.makePropsProxy(props);

      this.eventBus = () => eventBus;

      this.registerEvents(eventBus);
      eventBus.emit(Block.EVENTS.INIT);
    }

    private registerEvents(eventBus: EventBus) {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this.componentDidMountLocal.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this.componentDidUpdateLocal.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this.render.bind(this));
    }

    private createResources() {
      const { tagName } = this.#meta;
      this.#element = Block.createDocumentElement(tagName);
    }

    init() {
      this.createResources();
      this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private componentDidMountLocal() {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private componentDidUpdateLocal(oldProps: Record<string, any>, newProps: Record<string, any>) {
      const response = this.componentDidUpdate(oldProps, newProps);
      if (!response) {
        return;
      }
      this.render();
    }

    componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
      return deepEqual(oldProps, newProps);
    }

    setProps = (nextProps) => {
      if (!nextProps) {
        return;
      }

      Object.assign(this.props, nextProps);
    };

    get element() {
      return this.#element;
    }

    render(mainElem?: HTMLElement) {
      const block = this.render();
      this.#element.innerHTML = block;
    }

    getContent() {
      return this.element;
    }

    private makePropsProxy(props) {
      const self = this;

      return new Proxy(props, {
          get(target, prop) {
              const value = target[prop];
              return typeof value === "function" ? value.bind(target) : value;
          },
          set(target, prop, value) {
              target[prop] = value;

              self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
              return true;
          },
          deleteProperty() {
              throw new Error("Нет доступа");
          }
      });
    }

    private static createDocumentElement(tagName: string) {
      return document.createElement(tagName);
    }

    show() {
      this.getContent().style.display = 'block';
    }

    hide() {
      this.getContent().style.display = 'none';
    }
}
