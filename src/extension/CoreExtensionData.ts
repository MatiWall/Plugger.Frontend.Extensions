import { createExtensionDataRef } from "./ExtensionDataRef";



const coreRouteRef = createExtensionDataRef();
const corePageRef = createExtensionDataRef();
const coreRoutePath = createExtensionDataRef();

const coreRoutesRef = createExtensionDataRef();


const coreDataRef = {
    corePageRef,
    coreRouteRef,
    coreRoutePath,
    coreRoutesRef
}

export {
    coreRouteRef,
    corePageRef,
    coreRoutePath,

    coreDataRef
}