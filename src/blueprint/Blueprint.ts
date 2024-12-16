import { ZodType, z } from "zod";
import { createExtension } from "../extension/Extension";
import { ExtensionKind, attachTooType } from "../extension/types";
import { ProviderFunction } from "../extension/Extension";
import { ExtensionDataRef } from "../extension/ExtensionDataRef";
import { ExtensionInputNode } from "../extension/ExtensionInputNode";

class ExtensionBluePrint {
    id?: string;
    kind?: ExtensionKind;
    namespace?: string;
    name?: string;
    disabled?: boolean;
    provider?: ProviderFunction;
    attachToo?: attachTooType;
    input?: {[key: string]: ExtensionInputNode};
    output?: ExtensionDataRef[];
    configSchema: ZodType = z.object({});

    constructor(
        namespace?: string,
        name?: string,
        kind?: ExtensionKind,
        disabled: boolean = false,
        attachToo?: attachTooType,
        provider?: ProviderFunction,
        input: {[key: string]: ExtensionInputNode} = {},
        output: ExtensionDataRef[] = [],
        configSchema: ZodType = z.object({})
    ) {
        this.kind = kind;
        this.namespace = namespace;
        this.name = name;
        this.disabled = disabled;
        this.provider = provider
        this.attachToo = attachToo;
        this.input = input;
        this.output = output;
        this.configSchema = configSchema;
    }

    make(args: {
        kind?: ExtensionKind;
        namespace?: string;
        name?: string;
        disabled?: boolean;
        provider?: ProviderFunction;
        attachToo?: attachTooType;
        input?: {[key: string]: ExtensionInputNode};
        outputs?: ExtensionDataRef[];
        configSchema?: ZodType, 
        params?: {[key: string]: any};
    } = {}) {
        const kind = args.kind ?? this.kind;
        const namespace = args.namespace ?? this.namespace;
        const name = args.name ?? this.name;
        const disabled = args.disabled ?? this.disabled;
        const provider = args.provider ?? this.provider;
        const attachToo = args.attachToo ?? this.attachToo;
        const input = args.input ?? this.input;
        const output = args.outputs ?? this.output;
        const configSchema = args.configSchema ?? this.configSchema;

        const params = args.params;

        // Throw errors if any parameter is missing
        if (kind === undefined) throw new Error("The 'kind' parameter must be specified either in the constructor or in make arguments.");
        if (namespace === undefined) throw new Error("The 'namespace' parameter must be specified either in the constructor or in make arguments.");
        if (name === undefined) throw new Error("The 'name' parameter must be specified either in the constructor or in make arguments.");
        if (provider === undefined) throw new Error("The 'provider' parameter must be specified either in the constructor or in make arguments.");
        if (attachToo === undefined) throw new Error("The 'attachToo' parameter must be specified either in the constructor or in make arguments.");
        if (output === undefined) throw new Error("The 'output' parameter must be specified either in the constructor or in make arguments.");
        if (configSchema === undefined) throw new Error("The 'configSchema' parameter must be specified either in the constructor or in make arguments.");
 

        return createExtension({
            namespace,
            name,
            kind,
            disabled: disabled,
            provider: ({inputs, config}) => provider({inputs, config, params}),
            attachToo: attachToo,
            input: input || {},
            output: output,
            configSchema: configSchema,
        });
    }
}

function createExtensionBluePrint({
    namespace,
    name,
    kind,
    disabled = false,
    attachToo,
    provider,
    input = {},
    output = [],
    configSchema = z.object({}),
}: {
    namespace?: string;
    name?: string;
    kind?: ExtensionKind;
    disabled?: boolean;
    attachToo?: attachTooType;
    provider?: ProviderFunction;
    input?: {[key: string]: ExtensionInputNode};
    output?: ExtensionDataRef[];
    configSchema?: ZodType;
} = {}) {
    return new ExtensionBluePrint(
        namespace,
        name,
        kind,
        disabled,
        attachToo,
        provider,
        input,
        output,
        configSchema
    );
}

export { createExtensionBluePrint };
