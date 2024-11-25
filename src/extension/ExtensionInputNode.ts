import { ExtensionDataRef } from "./ExtensionDataRef";



class ExtensionInputNode {
    
    ref: ExtensionDataRef
    allowMultiple: boolean;
    
    constructor(
        ref: ExtensionDataRef,
        allowMultiple: boolean
    ){
        this.ref = ref;
        this.allowMultiple = allowMultiple;
    }

}


function createExtensionInputNode({
    ref,
    allowMultiple = false 
}: {
    ref: ExtensionDataRef,
    allowMultiple?: boolean
}){
    return new ExtensionInputNode(
        ref,
        allowMultiple
    )
}

export {
    ExtensionInputNode,
    createExtensionInputNode
}