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
var _pathName, _blockClass, _block, _props, _currentRoute, _rootQuery, _currentBlock;
function isEqual(lhs, rhs) {
    return lhs === rhs;
}
function render(query, block) {
    const root = document.querySelector(query);
    root.innerHtml = block.render();
    return root;
}
export class Route {
    constructor(pathName, view, props) {
        _pathName.set(this, void 0);
        _blockClass.set(this, void 0);
        _block.set(this, void 0);
        _props.set(this, void 0);
        __classPrivateFieldSet(this, _pathName, pathName);
        __classPrivateFieldSet(this, _blockClass, view);
        __classPrivateFieldSet(this, _block, null);
        __classPrivateFieldSet(this, _props, props);
    }
    navigate(pathName) {
        if (this.match(pathName)) {
            __classPrivateFieldSet(this, _pathName, pathName);
            this.render();
        }
    }
    leave() {
        if (__classPrivateFieldGet(this, _block)) {
            __classPrivateFieldGet(this, _block).hide();
        }
    }
    match(pathName) {
        return isEqual(pathName, __classPrivateFieldGet(this, _pathName));
    }
    render() {
        if (!__classPrivateFieldGet(this, _block)) {
            __classPrivateFieldSet(this, _block, new (__classPrivateFieldGet(this, _blockClass))());
            render(__classPrivateFieldGet(this, _props).rootQuery, __classPrivateFieldGet(this, _block));
            __classPrivateFieldGet(this, _block).show();
            __classPrivateFieldGet(this, _block).setEvents();
            window.currentBlock = __classPrivateFieldGet(this, _block);
            return;
        }
        window.currentBlock = __classPrivateFieldGet(this, _block);
        render(__classPrivateFieldGet(this, _props).rootQuery, __classPrivateFieldGet(this, _block));
        __classPrivateFieldGet(this, _block).setEvents();
    }
}
_pathName = new WeakMap(), _blockClass = new WeakMap(), _block = new WeakMap(), _props = new WeakMap();
export default class Router {
    constructor(rootQuery) {
        _currentRoute.set(this, void 0);
        _rootQuery.set(this, void 0);
        _currentBlock.set(this, void 0);
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        __classPrivateFieldSet(this, _currentRoute, null);
        __classPrivateFieldSet(this, _rootQuery, rootQuery);
        __classPrivateFieldSet(this, _currentBlock, null);
        Router.__instance = this;
    }
    use(pathName, block) {
        const route = new Route(pathName, block, { rootQuery: __classPrivateFieldGet(this, _rootQuery) });
        this.routes.push(route);
        return this;
    }
    start() {
        window.onpopstate = (event => {
            this.onRoute(event.currentTarget.location.pathname);
        }).bind(this);
        this.onRoute(window.location.pathname);
    }
    onRoute(pathName) {
        const route = this.getRoute(pathName);
        if (!route) {
            return;
        }
        if (__classPrivateFieldGet(this, _currentRoute)) {
            __classPrivateFieldGet(this, _currentRoute).leave();
        }
        route.render(route, pathName);
        __classPrivateFieldSet(this, _currentRoute, route);
    }
    go(pathName) {
        this.history.pushState({}, "", pathName);
        this.onRoute(pathName);
    }
    back() {
        this.history.back();
    }
    forward() {
        this.history.forward();
    }
    getRoute(pathName) {
        return this.routes.find(route => route.match(pathName));
    }
}
_currentRoute = new WeakMap(), _rootQuery = new WeakMap(), _currentBlock = new WeakMap();
