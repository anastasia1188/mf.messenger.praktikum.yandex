function isEqual(lhs, rhs) {
    return lhs === rhs;
}

function render(query, block) {
    const root = document.querySelector(query);
    root.innerHtml = block.render();
    return root;
}

export class Route {
    #pathname: any;
    #blockClass: any;
    #block: any;
    #props: any;
    constructor(pathname, view, props) {
        this.#pathname = pathname;
        this.#blockClass = view;
        this.#block = null;
        this.#props = props;
    }

    navigate(pathname) {
        if (this.match(pathname)) {
            this.#pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this.#block) {
            this.#block.hide();
        }
    }

    match(pathname) {
        return isEqual(pathname, this.#pathname);
    }

    render() {       
        if (!this.#block) {
            this.#block = new this.#blockClass();
            render(this.#props.rootQuery, this.#block);
            this.#block.show();
            this.#block.setEvents();
            (<any>window).currentBlock = this.#block;
            return;
        }
        (<any>window).currentBlock = this.#block;
        render(this.#props.rootQuery, this.#block);
        this.#block.setEvents();
    }
}

export default class Router {
    static __instance: any;
    routes: any[];
    history: History;
    #currentRoute: any;
    #rootQuery: any;
    #currentBlock: any;
    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this.#currentRoute = null;
        this.#rootQuery = rootQuery;
        this.#currentBlock = null;

        Router.__instance = this;
    }

    use(pathname, block) {
        const route = new Route(pathname, block, { rootQuery: this.#rootQuery });
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event => {
            this.onRoute(event.currentTarget.location.pathname);
        }).bind(this);

        this.onRoute(window.location.pathname);
    }

    private onRoute(pathname) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this.#currentRoute) {
            this.#currentRoute.leave();
        }

        route.render(route, pathname);
        this.#currentRoute = route;
    }

    go(pathname) {
        this.history.pushState({}, "", pathname);
        this.onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}