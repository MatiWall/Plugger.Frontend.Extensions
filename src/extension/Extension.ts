import { attachTooType } from "./types";

enum Kind {
    Component,
    Routing
}

class Extension {
    
    id: string;
    kind: Kind;
    disabled: boolean;
    provider: CallableFunction;
    attachToo: attachTooType;
    input: any[];
    output: any[];
    config: object;
    configSchema: object;

    constructor(
        id: string,
        kind: Kind,
        disabled: boolean,
        attachToo: attachTooType,
        provider: CallableFunction,
        input: any[],
        output: any[],
        config: object,
        configSchema: object
    ){
        this.id = id;
        this.kind = kind;
        this.disabled = disabled;
        this.provider = provider;
        this.attachToo = attachToo;

        this.input = input;
        this.output = output;
        this.config = config;
        this.configSchema = configSchema;

    }
}


export {
    ComponentExtension
}