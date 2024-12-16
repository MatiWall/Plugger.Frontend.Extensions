import React from 'react'
import { ExtensionKind, coreDataRef, createExtensionBluePrint, createExtensionInputNode } from "../extension"

import {AppRouter, Routes, createRoutableComponent} from '@catcode/core-routing'



const RouterBlueprint = createExtensionBluePrint({
    kind: ExtensionKind.Routing,
    namespace: 'app',
    name: 'routing',
    attachToo: {namespace: 'root', name: 'app', kind: ExtensionKind.Component}, 
    output: [
        coreDataRef.coreRouterRef
    ],
    input: {
        path: createExtensionInputNode({ref: coreDataRef.coreRoutePath, allowMultiple: true}),
        routeRef: createExtensionInputNode({ref:coreDataRef.coreRouteRef, allowMultiple: true}),
        component: createExtensionInputNode({ref: coreDataRef.corePageRef, allowMultiple: true})
    },

    provider: ({inputs, config}) => {
        const paths = inputs.path

        const routableComponents = [];
        for (let i=0; i <  paths.length; i++){
            routableComponents.push(
                createRoutableComponent({
                    mountPoint: inputs.routeRef[i],
                    path: inputs.path[i],
                    component: inputs.component[i]
                })
                )
        }

        return [
            coreDataRef.coreRouterRef.with(<Routes routeBinds={routableComponents}/>)
        ]
    }

})

export {
    RouterBlueprint
}