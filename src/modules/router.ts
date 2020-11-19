declare class Block {
   public render(): string; 
   public setEvents(); 
}
function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

async function render(query: string, block: Block) {
    const root = document.querySelector(query);
    root.innerHTML = await block.render();
    block.setEvents();
    return root;
}

export class Route {
    #pathName: string;
    #blockClass: any;
    #block: any;
    #props: any;
    constructor(pathName: string, view: any, props: Object) {
        this.#pathName = pathName;
        this.#blockClass = view;
        this.#block = null;
        this.#props = props;
    }

    navigate(pathName: string) {
        if (this.match(pathName)) {
            this.#pathName = pathName;
            this.render();
        }
    }

    leave() {
        if (this.#block) {
            this.#block.hide();
        }
    }

    match(pathName: string) {
        return isEqual(pathName, this.#pathName);
    }

    render() {
        if (!this.#block) {
            this.#block = new this.#blockClass();
            render(this.#props.rootQuery, this.#block);
            this.#block.show();
            (<any>window).currentBlock = this.#block;
            return;
        }
        (<any>window).currentBlock = this.#block;
        render(this.#props.rootQuery, this.#block);
    }
}

export default class Router {
    static __instance: any;
    routes: any[];
    history: History;
    #currentRoute: any;
    #rootQuery: any;
    #currentBlock: any;
    constructor(rootQuery: string) {
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

    use(pathName: string, block: Block) {
        const route = new Route(pathName, block, { rootQuery: this.#rootQuery });
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event => {
            this.onRoute(event.currentTarget.location.pathname);
        }).bind(this);

        this.onRoute(window.location.pathname);
    }

    private onRoute(pathName: string) {
        const route = this.getRoute(pathName);
        if (!route) {
            return;
        }

        if (this.#currentRoute) {
            this.#currentRoute.leave();
        }

        route.render(route, pathName);
        this.#currentRoute = route;
    }

    go(pathName: string) {
        this.history.pushState({}, "", pathName);
        this.onRoute(pathName);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathName: string) {
        return this.routes.find(route => route.match(pathName));
    }
}