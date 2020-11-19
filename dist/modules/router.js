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
async function render(query, block) {
    const root = document.querySelector(query);
    root.innerHTML = await block.render();
    block.setEvents();
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
            window.currentBlock = __classPrivateFieldGet(this, _block);
            return;
        }
        window.currentBlock = __classPrivateFieldGet(this, _block);
        render(__classPrivateFieldGet(this, _props).rootQuery, __classPrivateFieldGet(this, _block));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZHVsZXMvcm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBSUEsU0FBUyxPQUFPLENBQUMsR0FBVyxFQUFFLEdBQVc7SUFDckMsT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxLQUFLLFVBQVUsTUFBTSxDQUFDLEtBQWEsRUFBRSxLQUFZO0lBQzdDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0QyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbEIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVELE1BQU0sT0FBTyxLQUFLO0lBS2QsWUFBWSxRQUFnQixFQUFFLElBQVMsRUFBRSxLQUFhO1FBSnRELDRCQUFrQjtRQUNsQiw4QkFBaUI7UUFDakIseUJBQVk7UUFDWix5QkFBWTtRQUVSLHVCQUFBLElBQUksYUFBYSxRQUFRLEVBQUM7UUFDMUIsdUJBQUEsSUFBSSxlQUFlLElBQUksRUFBQztRQUN4Qix1QkFBQSxJQUFJLFVBQVUsSUFBSSxFQUFDO1FBQ25CLHVCQUFBLElBQUksVUFBVSxLQUFLLEVBQUM7SUFDeEIsQ0FBQztJQUVELFFBQVEsQ0FBQyxRQUFnQjtRQUNyQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdEIsdUJBQUEsSUFBSSxhQUFhLFFBQVEsRUFBQztZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDakI7SUFDTCxDQUFDO0lBRUQsS0FBSztRQUNELDBDQUFpQjtZQUNiLHFDQUFZLElBQUksRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFnQjtRQUNsQixP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