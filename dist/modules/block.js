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
/// <reference path="references.d.ts" />
import { EventBus } from "./eventBus.js";
export default class Block {
    constructor(tagName = "div", props = {}) {
        _element.set(this, null);
        _meta.set(this, null);
        this.setProps = nextProps => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
        };
        const eventBus = new EventBus();
        __classPrivateFieldSet(this, _meta, {
            tagName,
            props
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
        __classPrivateFieldSet(this, _element, this.createDocumentElement(tagName));
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
    render() {
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
    createDocumentElement(tagName) {
        return document.createElement(tagName);
    }
    show() {
        this.getContent().style.display = "block";
    }
    hide() {
        this.getContent().style.display = "none";
    }
}
_element = new WeakMap(), _meta = new WeakMap();
Block.EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kdWxlcy9ibG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUF3QztBQUN4QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sS0FBSztJQWF0QixZQUFZLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBSyxHQUFHLEVBQUU7UUFIdkMsbUJBQWdCLElBQUksRUFBQztRQUNyQixnQkFBYSxJQUFJLEVBQUM7UUFtRGxCLGFBQVEsR0FBRyxTQUFTLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNaLE9BQU87YUFDVjtZQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUM7UUF0REUsTUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUVoQyx1QkFBQSxJQUFJLFNBQVM7WUFDVCxPQUFPO1lBQ1AsS0FBSztTQUNSLEVBQUM7UUFFRixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFFL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVPLGNBQWMsQ0FBQyxRQUFrQjtRQUNyQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckQs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