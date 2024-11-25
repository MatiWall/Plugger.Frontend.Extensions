import { z, ZodType } from 'zod';
import { idGenerator } from "../Id";
import { ExtensionDataRef } from "./ExtensionDataRef";
import { ExtensionKind, attachTooType } from "./types";


class Extension {
    
    namespace: string;
    kind: ExtensionKind;
    name: string;
    disabled: boolean;
    provider: CallableFunction;
    attachToo: attachTooType;
    input: object;
    output: any[];
    configSchema: object;

    constructor(
        namespace: string,
        name: string,
        kind: ExtensionKind,
        disabled: boolean,
        attachToo: attachTooType,
        provider: CallableFunction,
        input: any[],
        output: any[],
        configSchema: ZodType
    ){
        this.namespace = namespace;
        this.name = name;
        this.kind = kind;
        this.disabled = disabled;
        this.provider = provider;
        this.attachToo = attachToo;

        this.input = input;
        this.output = output;
        this.configSchema = configSchema;

    }

    get id(): string{
        return idGenerator(this.namespace, this.name, this.kind.toString())
    }

    attachTooId(): string{
        return idGenerator(this.attachToo.namespace, this.attachToo.name, this.attachToo.kind.toString())
    }
}

function createExtension({
    namespace,
    name,
    kind,
    disabled = false, // Default to false if not provided
    attachToo,
    provider,
    input = [],
    output = [],
    configSchema = z.object({})
}: {
    namespace: string;
    name: string;
    kind: ExtensionKind;
    disabled?: boolean;
    attachToo: attachTooType;
    provider: CallableFunction;
    input?: any[];
    output?: ExtensionDataRef[];
    configSchema?: ZodType;
}): Extension {
    return new Extension(namespace, name, kind, disabled, attachToo, provider, input, output, configSchema);
}

export {
    Extension,
    createExtension
}