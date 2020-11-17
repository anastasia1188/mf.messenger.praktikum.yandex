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
    root.innerHTML = block.render();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZHVsZXMvcm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBR0EsU0FBUyxPQUFPLENBQUMsR0FBVyxFQUFFLEdBQVc7SUFDckMsT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxTQUFTLE1BQU0sQ0FBQyxLQUFhLEVBQUUsS0FBWTtJQUN2QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxNQUFNLE9BQU8sS0FBSztJQUtkLFlBQVksUUFBZ0IsRUFBRSxJQUFTLEVBQUUsS0FBYTtRQUp0RCw0QkFBa0I7UUFDbEIsOEJBQWlCO1FBQ2pCLHlCQUFZO1FBQ1oseUJBQVk7UUFFUix1QkFBQSxJQUFJLGFBQWEsUUFBUSxFQUFDO1FBQzFCLHVCQUFBLElBQUksZUFBZSxJQUFJLEVBQUM7UUFDeEIsdUJBQUEsSUFBSSxVQUFVLElBQUksRUFBQztRQUNuQix1QkFBQSxJQUFJLFVBQVUsS0FBSyxFQUFDO0lBQ3hCLENBQUM7SUFFRCxRQUFRLENBQUMsUUFBZ0I7UUFDckIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3RCLHVCQUFBLElBQUksYUFBYSxRQUFRLEVBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQUVELEtBQUs7UUFDRCwwQ0FBaUI7WUFDYixxQ0FBWSxJQUFJLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBZ0I7UUFDbEIsT0FBTyxPQUFPLENBQUMsUUFBUSwwQ0FBaUIsQ0FBQztJQUM3QyxDQUFD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