export default class Router {
    constructor() {
        this.routes = new Map()
        this.active = []
        window.onpopstate = this.routeUpdated.bind(this)
    }

    page() {
        return window.location.pathname.split("/").filter(x => x != "")
    }

    routeUpdated() {
        const page = this.page()

        if (page.length == 0) {
            this.routes.get("/")(page)
            return
        }

        if (this.active.join() === page.join()) return
        this.active = page;

        for (let [route, callback] of this.routes) {
            const routes = route.split("/").filter(x => x != "")
            let matches = routes.map((path, index) => {
                if (path == "*") return true
                if (path == page[index]) return true
                return false
            }).filter(x => x)

            if (matches.length == routes.length && routes.length > 0) callback(page)
        }
    }

    on(route, callback) {
        this.routes.set(route, callback)
    }

    change(route) {
        window.history.pushState({ action: "changeRoute" }, null, route);
        window.dispatchEvent(new Event("popstate"));
    }
}