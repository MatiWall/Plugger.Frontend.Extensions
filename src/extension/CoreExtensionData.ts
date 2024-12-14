import { createExtensionDataRef } from "./ExtensionDataRef";



const coreRouteRef = createExtensionDataRef();
const corePageRef = createExtensionDataRef();
const coreRoutePath = createExtensionDataRef();

const coreDataRef = {
    corePageRef,
    coreRouteRef,
    coreRoutePath
}

export {
    coreRouteRef,
    corePageRef,
    coreRoutePath,

    coreDataRef
}