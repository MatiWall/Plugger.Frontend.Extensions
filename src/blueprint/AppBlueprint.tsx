

import React, { ReactElement } from "react";
import { ExtensionKind, coreDataRef, createExtensionBluePrint, createExtensionDataRef, createExtensionInputNode } from "../extension"
import { coreRouteRef } from "../extension/CoreExtensionData"
import { appLayoutRef } from './AppLayputBlueprint'
import { AppRouter } from "@catcode/core-routing";
AppRouter

const appDataRef = createExtensionDataRef();

const AppBlueprint = createExtensionBluePrint({
    kind: ExtensionKind.Component,
    namespace: 'app',
    name: 'app',
    attachToo: {namespace: 'root', name: 'app', kind: ExtensionKind.Component}, 
    output: [appDataRef],
    input: {
        app: createExtensionInputNode({ref: appLayoutRef})
    },
    provider: ({inputs, config}) => [
        appDataRef.with<ReactElement>(
            <AppRouter>
                {inputs.app}
            </AppRouter>
            ), 
    ]

})


export {
    AppBlueprint
}