import React, {ReactElement} from 'react'
import { 
    createExtensionDataRef
} from "./ExtensionDataRef"

import { 
    createExtension, 
} from "./Extension"

import { createExtensionInputNode } from './ExtensionInputNode';
import { createExtensionBluePrint } from '../blueprint/Blueprint';



const rootComponentRef = createExtensionDataRef();
const rootComponentOutputRef = createExtensionDataRef();

const rootExtension = createExtension({
    namespace: 'root',
    name: 'app',
    kind: 'component',
    attachToo: {namespace: 'ignored', name: 'ignored', kind: 'component'},
    input: {
        app: createExtensionInputNode({
            ref: rootComponentRef
        })
    }, 
    output: [
        rootComponentOutputRef
    ],
    provider: ({input, config}) => [
        rootComponentOutputRef.with<ReactElement>(input?.app || <div> No extensions attached</div>)
    ]
})


const rootExtensionBluePrint = createExtensionBluePrint({
    namespace: 'root',
    name: 'app',
    kind: 'component',
    attachToo: {namespace: 'ignored', name: 'ignored', kind: 'component'},
    input: {
        app: createExtensionInputNode({
            ref: rootComponentRef
        })
    }, 
    output: [
        rootComponentOutputRef
    ],
    provider: ({input, config}) => [
        rootComponentOutputRef.with<ReactElement>(input?.app || <div> No extensions attached</div>)
    ]

})

export {
    rootExtension,
    rootComponentRef, 
    rootComponentOutputRef,
    rootExtensionBluePrint
}
