import { z, ZodType, ZodRawShape, ZodTypeAny, infer as zodInfer, ZodObject } from 'zod';
import { ExtensionDataRef, ExtensionDataValue, ExtensionDataValueTypes } from "./ExtensionDataRef";
import { attachTooType } from "./types";
import { ExtensionInputNode } from './ExtensionInputNode';
import { idGenerator } from '@plugger/utils';

type ZodObjectLike = ZodObject<ZodRawShape>;

type ResolvedProviderInput<TInput = Record<string, ExtensionInputNode>> = {
    [InputName in keyof TInput]: true extends (TInput[InputName] extends { allowMultiple: true } ? true : false)
    ? Array<TInput[InputName]>
    : TInput[InputName]
}


type ProviderFunction<
    TConfig,
    TInput = Record<string, ExtensionDataValueTypes>,
    TParams = Record<string, any>, 
    TReturn = ExtensionDataValue<ExtensionDataValueTypes>[]
> = ({
    input,
    config,
    params
}: {
    input: TInput,
    config: TConfig;
    params?: TParams; // Optional runtime object

}) => TReturn;

class Extension<
    TConfig extends ZodObjectLike = ZodObject<{}>,
    TInput extends Record<string, ExtensionInputNode> = Record<string, ExtensionInputNode>
> {

    namespace: string;
    kind: string;
    name: string;
    disabled: boolean;
    provider: ProviderFunction<zodInfer<TConfig>, ResolvedProviderInput<TInput>>;
    attachToo: attachTooType;
    input: TInput;
    output: ExtensionDataRef[];
    configSchema: TConfig;
    config: zodInfer<TConfig>;

    children: Extension[] = [];

    constructor(
        namespace: string,
        name: string,
        kind: string,
        disabled: boolean,
        attachToo: attachTooType,
        provider: ProviderFunction<zodInfer<TConfig>, ResolvedProviderInput<TInput>>,
        input: TInput = {} as TInput,
        output: ExtensionDataRef[],
        configSchema: TConfig
    ) {
        this.namespace = namespace;
        this.name = name;
        this.kind = kind;
        this.disabled = disabled;
        this.provider = provider;
        this.attachToo = attachToo;

        this.input = input;
        this.output = output;
        this.configSchema = configSchema;
        this.config = this.configSchema.parse({}); // Default values if no external config is added.

    }

    get id(): string {
        return idGenerator(this.namespace, this.name, this.kind)
    }

    attachTooId(): string {
        return idGenerator(this.attachToo.namespace, this.attachToo.name, this.attachToo.kind)
    }

    addChild(extension: Extension) {
        this.children.push(extension)
    }

    setConfig(config: Partial<z.infer<TConfig>>) {
        this.config = this.configSchema.parse(config);
    }

    evaluate(): ExtensionDataValue<ExtensionDataValueTypes>[] {
        if (this.disabled) {
            return [];
        }

        let outputChildren: ExtensionDataValue<ExtensionDataValueTypes>[] = [];
        if (this.children.length > 0) {

            outputChildren = this.children.map(child => child.evaluate()).flat()

        }

        const builtInput = this.buildInput(outputChildren);

        let output = this.provider({
            input: builtInput,
            config: this.config
        });

        return output;


    }

    private buildInput(values: ExtensionDataValue<ExtensionDataValueTypes>[]) {
        let input: { [key: string]: any } = { ...this.input }


        for (const key in input) {
            const node: ExtensionInputNode = this.input[key]

            const matches = values.filter(item => item.id === node.ref.id);


            if (node.allowMultiple) {
                input[key] = matches.map(item => item.data)
            }
            else {
                if (matches.length > 1) {
                    throw new Error(`Multiple matches for input key "${key}".`);
                }
                else if (matches.length === 0) {
                    input[key] = undefined;
                }
                else {
                    input[key] = matches[0].data;
                }
            }
        }

        return input;


    }

}

function createExtension<
    TConfig extends ZodObjectLike = ZodObject<{}>,
    TInput extends Record<string, ExtensionInputNode> = Record<string, ExtensionInputNode>
>({
    namespace,
    name,
    kind,
    disabled = false, // Default to false if not provided
    attachToo,
    provider,
    input = {} as TInput,
    output = [],
    configSchema
}: {
    namespace: string;
    name: string;
    kind: string;
    disabled?: boolean;
    attachToo: attachTooType;
    provider: ProviderFunction<zodInfer<TConfig>, ResolvedProviderInput<TInput>>; // Use inferred type for provider
    input?: TInput;
    output?: ExtensionDataRef[];
    configSchema?: TConfig;
}): Extension<TConfig, TInput> {
    const schema = (configSchema ?? (z.object({}) as TConfig));
    return new Extension(namespace, name, kind, disabled, attachToo, provider, input, output, schema);
}
export {
    Extension,
    createExtension
}

export type {
    ProviderFunction,
    ResolvedProviderInput
}