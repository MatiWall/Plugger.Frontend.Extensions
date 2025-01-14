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
    provider: ({input, config}) => {
        
        const AppRoot = () => {
            
            const App = input?.app;
            if (App){
                return <App/>
            }
            else{
                return <div> No extensions attached. Create and extension that attaches to namespace=root, name=app and kind=component. Use rootComponentRef for output</div>
            }

        }

        return [
        rootComponentOutputRef.with(AppRoot)
    ]}
})


const RootExtensionBluePrint = createExtensionBluePrint({
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
    provider: ({input, config}) => {

        const AppRoot = () => {
            
            const App = input?.app;

            if (App){
                return <App/>
            }
            else{
                return <div> No extensions attached. Create and extension that attaches to namespace=root, name=app and kind=component. Use rootComponentRef for output</div>
            }

        }
    
    return [
        rootComponentOutputRef.with<React.FC>(AppRoot)
    ]}

})

export {
    rootExtension,
    rootComponentRef, 
    rootComponentOutputRef,
    RootExtensionBluePrint
}
