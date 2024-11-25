import { v4 as uuidv4} from 'uuid';


class ExtensionDataRef {

    id: string

    constructor(
        id: string
    ){
        this.id = id

    }

    with<TData>(
        data: TData
    ): ExtensionDataValue<TData>{
        return new ExtensionDataValue<TData>(
            this.id,
            data
        )
    }



}

function createExtensionDataRef({
        id
    }:{
        id?: string
    } = {}){
        if (id === undefined){
            id = uuidv4()
        }

    return new ExtensionDataRef(id);

}


class ExtensionDataValue<TData>{
    id: string
    data: TData

    constructor(
        id: string,
        data: TData
    ){
        this.id = id;
        this.data = data;

    }

}

export {
    ExtensionDataRef,
    ExtensionDataValue,
    createExtensionDataRef
}