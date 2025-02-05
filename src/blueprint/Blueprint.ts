import { ZodObject, ZodType, z, infer as zodInfer } from "zod";
import { createExtension } from "../extension/Extension";
import { attachTooType } from "../extension/types";
import { ProviderFunction, ResolvedProviderInput } from "../extension/Extension";
import { ExtensionDataRef, ExtensionDataValueTypes } from "../extension/ExtensionDataRef";
import { ExtensionInputNode } from "../extension/ExtensionInputNode";

type ZodObjectLike = ZodObject<any, any>;

class ExtensionBluePrint<
    TConfig extends ZodObjectLike = ZodObject<{}>,
    TInput extends Record<string, ExtensionInputNode> = Record<string, ExtensionInputNode>
> {
    id?: string;
    kind?: string;
    namespace?: string;
    name?: string;
    disabled?: boolean;
    provider?: ProviderFunction<zodInfer<TConfig>, ResolvedProviderInput<TInput>>;
    attachToo?: attachTooType;
    input?: TInput;
    output?: ExtensionDataRef[];
    configSchema: TConfig

    constructor(
        namespace?: string,
        name?: string,
        kind?: string,
        disabled: boolean = false,
        attachToo?: attachTooType,
        provider?: ProviderFunction<zodInfer<TConfig>, ResolvedProviderInput<TInput>>,
        input: TInput = {} as TInput,
        output: ExtensionDataRef[] = [],
        configSchema: TConfig = z.object({}) as TConfig
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
        kind?: string;
        namespace?: string;
        name?: string;
        disabled?: boolean;
        provider?: ProviderFunction<zodInfer<TConfig>, ResolvedProviderInput<TInput>>;
        attachToo?: attachTooType;
        input?: TInput;
        outputs?: ExtensionDataRef[];
        configSchema?: TConfig,
        params?: Record<string, any>;
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


        return createExtension<
            TConfig,
            TInput
        >({
            namespace,
            name,
            kind,
            disabled: disabled,
            provider: ({ input, config }) => provider({ input, config, params }),
            attachToo: attachToo,
            input: (input || {}) as TInput,
            output: output,
            configSchema: configSchema as TConfig,
        });
    }
}

function createExtensionBluePrint<
    TConfig extends ZodObjectLike = ZodObject<{}>,
    TInput extends Record<string, ExtensionInputNode> = Record<string, ExtensionInputNode>,
>({
    namespace,
    name,
    kind,
    disabled = false,
    attachToo,
    provider,
    input = {} as TInput,
    output = [],
    configSchema = z.object({}) as TConfig,
}: {
    namespace?: string;
    name?: string;
    kind?: string;
    disabled?: boolean;
    attachToo?: attachTooType;
    provider?: ProviderFunction<zodInfer<TConfig>, ResolvedProviderInput<TInput>>;
    input?: TInput;
    output?: ExtensionDataRef[];
    configSchema?: TConfig;
} = {}) {
    return new ExtensionBluePrint<TConfig, TInput>(
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
