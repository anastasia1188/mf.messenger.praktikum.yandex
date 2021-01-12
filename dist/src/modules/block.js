var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _element, _meta;
import deepEqual from './common';
import EventBus from './eventBus';
export default class Block {
    constructor(tagName = 'div', props = {}) {
        _element.set(this, null);
        _meta.set(this, null);
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
        };
        const eventBus = new EventBus();
        __classPrivateFieldSet(this, _meta, {
            tagName,
            props,
        });
        this.props = this.makePropsProxy(props);
        this.eventBus = () => eventBus;
        this.registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
    registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this.componentDidMountLocal.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this.componentDidUpdateLocal.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this.render.bind(this));
    }
    createResources() {
        const { tagName } = __classPrivateFieldGet(this, _meta);
        __classPrivateFieldSet(this, _element, Block.createDocumentElement(tagName));
    }
    init() {
        this.createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    componentDidMountLocal() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    componentDidUpdateLocal(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this.render();
    }
    componentDidUpdate(oldProps, newProps) {
        return deepEqual(oldProps, newProps);
    }
    get element() {
        return __classPrivateFieldGet(this, _element);
    }
    render(mainElem) {
        const block = this.render();
        __classPrivateFieldGet(this, _element).innerHTML = block;
    }
    getContent() {
        return this.element;
    }
    makePropsProxy(props) {
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
    static createDocumentElement(tagName) {
        return document.createElement(tagName);
    }
    show() {
        this.getContent().style.display = 'block';
    }
    hide() {
        this.getContent().style.display = 'none';
    }
}
_element = new WeakMap(), _meta = new WeakMap();
Block.EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
};
