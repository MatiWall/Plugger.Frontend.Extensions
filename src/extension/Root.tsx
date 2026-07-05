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

const RootFallback: React.FC = () => {
    return (
        <div>
            No extensions attached. Create an extension that attaches to namespace=root,
            name=app, kind=component. Use rootComponentRef for output.
        </div>
    );
};

const rootProvider = ({ input }: any) => {
    const AppRoot: React.FC = () => {
        const App = input?.app;
        return App ? <App /> : <RootFallback />;
    };

    return [
        rootComponentOutputRef.with<React.FC>(AppRoot),
    ];
};

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
    provider: rootProvider
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
    provider: rootProvider

})

export {
    rootExtension,
    rootComponentRef, 
    rootComponentOutputRef,
    RootExtensionBluePrint
}
