import { ZodObject, ZodType, z, infer as zodInfer } from "zod";
import { createExtension } from "../extension/Extension";
import { attachTooType } from "../extension/types";
import { ExtensionDataRef } from "../extension/ExtensionDataRef";
import { NodeSpec, Provider } from "../types";

type ZodObjectLike = ZodObject<any, any>;

class ExtensionBluePrint<TSpec extends NodeSpec> {
    id?: string;
    kind?: string;
    namespace?: string;
    name?: string;
    disabled?: boolean;
    provider?: Provider<TSpec>;
    attachToo?: attachTooType;
    input?: TSpec['input'];
    output?: ExtensionDataRef[];
    configSchema: zodInfer<TSpec['config']> 
    
    constructor(
        namespace?: string,
        name?: string,
        kind?: string,
        disabled: boolean = false,
        attachToo?: attachTooType,
        provider?: Provider<TSpec>,
        input: TSpec['input'] = {} as TSpec['input'],
        output: ExtensionDataRef[] = [],
        configSchema: zodInfer<TSpec['config']> = z.object({}) as zodInfer<TSpec['config']>
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

    make<TMakeConfig extends ZodObjectLike>(args: {
        kind?: string;
        namespace?: string;
        name?: string;
        disabled?: boolean;
        provider?: Provider<TSpec>;
        attachToo?: attachTooType;
        input?: TSpec['input'];
        outputs?: ExtensionDataRef[];
        configSchema?: TMakeConfig,
        params?: TSpec['params'];
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


        return createExtension<TSpec>({
            namespace,
            name,
            kind,
            disabled: disabled,
            provider: ({ input, config }) => provider({ input, config, params }),
            attachToo: attachToo,
            input: (input || {}) as TSpec['input'],
            output: output,
            configSchema: configSchema as TMakeConfig,
        });
    }
}

function createExtensionBluePrint<TSpec extends NodeSpec>({
    namespace,
    name,
    kind,
    disabled = false,
    attachToo,
    provider,
    input = {} as TSpec['input'],
    output = [],
    configSchema = z.object({}) as TSpec['config'],
}: {
    namespace?: string;
    name?: string;
    kind?: string;
    disabled?: boolean;
    attachToo?: attachTooType;
    provider?: Provider<TSpec>;
    input?: TSpec['input'];
    output?: ExtensionDataRef[];
    configSchema?: TSpec['config'];
} = {}) {
    return new ExtensionBluePrint<TSpec>(
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

export {
    createExtensionBluePrint,
    ExtensionBluePrint
};
