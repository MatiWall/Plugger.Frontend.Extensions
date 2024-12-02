import React, {ReactElement} from 'react'
import { 
    createExtension, 
    createExtensionDataRef, 
    ExtensionKind, 
    createExtensionInputNode
} from ".."



const rootComponentRef = createExtensionDataRef();
const rootComponentOutputRef = createExtensionDataRef();

const rootExtension = createExtension({
    namespace: 'root',
    name: 'app',
    kind: ExtensionKind.Component,
    attachToo: {namespace: 'ignored', name: 'ignored', kind: ExtensionKind.Component},
    input: {
        app: createExtensionInputNode({
            ref: rootComponentRef
        })
    }, 
    output: [
        rootComponentOutputRef
    ],
    provider: ({inputs, config}) => [
        rootComponentOutputRef.with<ReactElement>(inputs?.app || <div> No Extensions attached</div>)
    ]
})


export {
    rootExtension,
    rootComponentRef, 
    rootComponentOutputRef
}
