import { ExternalRouteRef, RouteRef } from "@catcode/core-routing";
import { Extension } from "../extension/Extension";

class Plugin {
    id: string;
    routeRef: RouteRef;
    externalRouteRefs: { [key: string]: ExternalRouteRef }; // Changed to mapping
    extensions: Extension[];

    constructor(
        id: string,
        routeRef: RouteRef,
        externalRouteRefs: { [key: string]: ExternalRouteRef }, // Mapping type
        extensions: Extension[]
    ) {
        this.id = id;
        this.routeRef = routeRef;
        this.externalRouteRefs = externalRouteRefs;
        this.extensions = extensions;
    }
}

function createPlugin({
    id,
    routeRef,
    externalRouteRefs = {}, // Default to an empty mapping
    extensions = []
}: {
    id: string;
    routeRef: RouteRef;
    externalRouteRefs?: { [key: string]: ExternalRouteRef }; // Optional mapping
    extensions?: Extension[]; // Optional array
}): Plugin {
    return new Plugin(
        id,
        routeRef,
        externalRouteRefs,
        extensions
    );
}

export {
    Plugin,
    createPlugin
};
