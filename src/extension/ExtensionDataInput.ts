import {ExtensionDataRef} from './ExtensionDataRef'


class ExtensionDataInput {

    dataRefs: ExtensionDataRef[]
    
    constructor(
        dataRefs: ExtensionDataRef[]
        ){
        this.dataRefs = dataRefs;
    }

}


function createExtensionDataInput({
    dataRefs
}:{
    dataRefs:  ExtensionDataRef[]
}){

    return new ExtensionDataInput(dataRefs)
}


export {
    ExtensionDataInput,
    createExtensionDataInput
}