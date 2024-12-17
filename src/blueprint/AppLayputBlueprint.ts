import { ReactElement } from "react";
import { ExtensionKind, coreDataRef, createExtensionBluePrint, createExtensionDataRef, createExtensionInputNode } from "../extension"
import { coreRouteRef } from "../extension/CoreExtensionData";



const appLayoutRef = createExtensionDataRef();


const AppLayoutBlueprint = createExtensionBluePrint({
    kind: ExtensionKind.Component,
    attachToo: {namespace: 'app', name: 'app', kind: ExtensionKind.Component}, 
    output: [appLayoutRef],
    input: {
        navbar: null,
        header: null,
        content: createExtensionInputNode({ref: coreDataRef.coreRouterRef})
    },
    provider: ({inputs, config}) => [
        appLayoutRef.with<ReactElement>(inputs.app), 
    ]

})


export {
    AppLayoutBlueprint, 
    appLayoutRef
}