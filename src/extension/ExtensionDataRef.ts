


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