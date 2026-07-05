import { z, infer as zodInfer } from 'zod';
import { ExtensionDataRef, ExtensionDataValue, ExtensionDataValueTypes } from "./ExtensionDataRef";
import { attachTooType } from "./types";
import { idGenerator } from '@plugger/utils';
import {NodeSpec, ProviderInput, Provider} from '../types'




 


class Extension<TSpec extends NodeSpec> {

    namespace: string;
    kind: string;
    name: string;
    disabled: boolean;
    provider: Provider<TSpec>;
    attachToo: attachTooType;
    input: TSpec['input'];
    output: ExtensionDataRef[];
    configSchema: TSpec['config'];
    config: zodInfer<TSpec['config']>;

    children: Array<Extension<TSpec>> = [];

    constructor(
        namespace: string,
        name: string,
        kind: string,
        disabled: boolean,
        attachToo: attachTooType,
        provider: Provider<TSpec>,
        input: TSpec['input'],
        output: ExtensionDataRef[],
        configSchema: TSpec['config']
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

    addChild(extension: Extension<TSpec>) {
        this.children.push(extension)
    }

    setConfig(config: Partial<zodInfer<TSpec['config']>>) {
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
            input: builtInput as ProviderInput<TSpec>,
            config: this.config
        });

        return output;


    }

    private buildInput(values: ExtensionDataValue<ExtensionDataValueTypes>[]): ProviderInput<TSpec> {
        const input = this.input;
        const resolved: Record<string, any> = {};

        for (const key in input) {
            const node = this.input[key]

            const matches = values.filter(item => item.id === node.ref.id);


            if (node.allowMultiple) {
                resolved[key] = matches.map(m => m.data);
            } else {
                resolved[key] = matches[0]?.data;
            }
        }

        return resolved as ProviderInput<TSpec>;


    }

}

function createExtension<TSpec extends NodeSpec>({
    namespace,
    name,
    kind,
    disabled = false, // Default to false if not provided
    attachToo,
    provider,
    input = {} as TSpec['input'],
    output = [],
    configSchema
}: {
    namespace: string;
    name: string;
    kind: string;
    disabled?: boolean;
    attachToo: attachTooType;
    provider: Provider<TSpec>; // Use inferred type for provider
    input?: TSpec['input'];
    output?: ExtensionDataRef[];
    configSchema?: TSpec['config'];
}): Extension<TSpec> {
    const schema: TSpec['config'] = configSchema ?? (z.object({}) as unknown as  TSpec['config']);
    return new Extension<TSpec>(namespace, name, kind, disabled, attachToo, provider, input, output, schema);
}
export {
    Extension,
    createExtension
}