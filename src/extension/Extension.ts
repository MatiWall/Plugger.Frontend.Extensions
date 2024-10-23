import { ExtensionKind, attachTooType } from "./types";



class Extension {
    
    id: string;
    kind: ExtensionKind;
    name: string;
    disabled: boolean;
    provider: CallableFunction;
    attachToo: attachTooType;
    input: object;
    output: any[];
    configSchema: object;

    constructor(
        id: string,
        name: string,
        kind: ExtensionKind,
        disabled: boolean,
        attachToo: attachTooType,
        provider: CallableFunction,
        input: any[],
        output: any[],
        configSchema: object
    ){
        this.id = id;
        this.kind = kind;
        this.name = name;
        this.disabled = disabled;
        this.provider = provider;
        this.attachToo = attachToo;

        this.input = input;
        this.output = output;
        this.configSchema = configSchema;

    }
}


export {
    Extension
}