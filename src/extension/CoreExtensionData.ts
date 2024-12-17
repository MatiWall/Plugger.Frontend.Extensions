import { createExtensionDataRef } from "./ExtensionDataRef";



const coreRouteRef = createExtensionDataRef();
const corePageRef = createExtensionDataRef();
const coreRoutePath = createExtensionDataRef();

const coreRouterRef = createExtensionDataRef();


const coreDataRef = {
    corePageRef,
    coreRouteRef,
    coreRoutePath,
    coreRouterRef
}

export {
    coreRouteRef,
    corePageRef,
    coreRoutePath,

    coreDataRef
}