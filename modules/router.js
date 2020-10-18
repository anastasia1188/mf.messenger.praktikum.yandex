export function isEqual(lhs, rhs) {
    return lhs === rhs;
}

function render(query, block) {
    const root = document.querySelector(query);
    root.innerHtml = block.render();
    //console.log('root', root);
    //console.log('root', root);
    //console.log('innerhtml', root.innerHtml);
    return root;
}

export class Route {
    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        //console.log('block', this._block);        
        if (!this._block) {
            //console.log('rourter');
            this._block = new this._blockClass();
            console.log('rourter', this._block);
            render(this._props.rootQuery, this._block);
            this._block.show();
            this._block.setEvents()
            window.currentBlock = this._block;
            return;
        }
        window.currentBlock = this._block;
        render(this._props.rootQuery, this._block);
        this._block.setEvents()
            //this._block.show();//TODO

    }
}

export default class Router {
    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        this._currentBlock = null;

        Router.__instance = this;
    }

    use(pathname, block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event => {
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);

        //console.log(window.location.pathname);
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        route.render(route, pathname);
        this._currentRoute = route;
        console.log('route', route);
    }

    go(pathname) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        console.log(this.history);
        this.history.back();
    }

    forward() {
        console.log(this.history);
        this.history.forward();
    }

    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}