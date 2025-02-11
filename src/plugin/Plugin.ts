import { Extension } from "../extension";

class Plugin<TRoutes = {}, TExternalRoutes = {}> {
    id: string;
    extensions: Extension<any, any>[];  // Keeping any since extensions may be heterogeneous
    routes: TRoutes;
    externalRoutes: TExternalRoutes;

    constructor(
        id: string,
        extensions: Extension<any, any>[] = [],
        routes: TRoutes,
        externalRoutes: TExternalRoutes
    ) {
        this.id = id;
        this.extensions = extensions;
        this.routes = routes;
        this.externalRoutes = externalRoutes;
    }
}

// Factory function to simplify plugin creation
function createPlugin<TRoutes = {}, TExternalRoutes = {}>({
    id,
    extensions = [],
    routes = {} as TRoutes,
    externalRoutes = {} as TExternalRoutes
}: {
    id: string;
    extensions?: Extension<any, any>[]; 
    routes?: TRoutes;
    externalRoutes?: TExternalRoutes;
}): Plugin<TRoutes, TExternalRoutes> {
    return new Plugin(id, extensions, routes, externalRoutes);
}

export {
    Plugin,
    createPlugin
};
