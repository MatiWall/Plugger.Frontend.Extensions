import { z, ZodType, ZodTypeAny, infer as zodInfer } from 'zod';
import { ExtensionDataRef, ExtensionDataValue, ExtensionDataValueTypes} from "./ExtensionDataRef";
import { attachTooType } from "./types";
import { ExtensionInputNode } from './ExtensionInputNode';
import { idGenerator } from '@plugger/utils';


type ProviderFunction<TConfig> = ({
    input,
    config,
    params
}: {
    input: {[key: string]: any},
    config: zodInfer<TConfig>;
    params?: { [key: string]: any }; // Optional runtime object

}) => ExtensionDataValue<ExtensionDataValueTypes>[];

class Extension<TConfig extends ZodTypeAny = ZodTypeAny> {
    
    namespace: string;
    kind: string;
    name: string;
    disabled: boolean;
    provider: ProviderFunction<zodInfer<TConfig>>;
    attachToo: attachTooType;
    input: {[key: string]: ExtensionInputNode};
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
        provider: ProviderFunction<zodInfer<TConfig>>,
        input: {[key: string]: ExtensionInputNode},
        output: ExtensionDataRef[],
        configSchema: TConfig
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
        this.config = this.configSchema.parse({});

    }

    get id(): string{
        return idGenerator(this.namespace, this.name, this.kind)
    }

    attachTooId(): string{
        return idGenerator(this.attachToo.namespace, this.attachToo.name, this.attachToo.kind)
    }

    addChild(extension: Extension){
        this.children.push(extension)
    }

    setConfig(config: object){
        this.config = config;
    }

    evaluate(): ExtensionDataValue<ExtensionDataValueTypes>[] {
        if (this.disabled) {
            return [];
        }

        let outputChildren: ExtensionDataValue<ExtensionDataValueTypes>[] = [];
        if (this.children.length > 0){

            outputChildren = this.children.map(child => child.evaluate()).flat()

        }

        const builtInput = this.buildInput(outputChildren);

        let output = this.provider({
            input: builtInput, 
            config: this.configSchema.parse(this.config)
        });
        
        return output;

        
    }

    private buildInput(values: ExtensionDataValue<ExtensionDataValueTypes>[]){
        let input: {[key: string]: any} = {...this.input}
        

        for(const key in input){
            const node: ExtensionInputNode = this.input[key]
            
            const matches = values.filter(item =>item.id === node.ref.id);


            if (node.allowMultiple){
                input[key] = matches.map(item => item.data)
            }
            else{
                if (matches.length > 1){
                    throw new Error(`Multiple matches for input key "${key}".`);
                }
                else if (matches.length === 0){
                    input[key] = undefined;
                }
                else{
                    input[key] = matches[0].data;
                }
            }
        }

        return input;


    }

}

function createExtension<TConfig extends ZodTypeAny>({
    namespace,
    name,
    kind,
    disabled = false, // Default to false if not provided
    attachToo,
    provider,
    input = {},
    output = [],
    configSchema = z.object({}) as TConfig
}: {
    namespace: string;
    name: string;
    kind: string;
    disabled?: boolean;
    attachToo: attachTooType;
    provider: ProviderFunction<zodInfer<TConfig>>; // Use inferred type for provider
    input?: { [key: string]: ExtensionInputNode };
    output?: ExtensionDataRef[];
    configSchema?: TConfig;
}): Extension<TConfig> {
    return new Extension(namespace, name, kind, disabled, attachToo, provider, input, output, configSchema);
}
export {
    Extension,
    createExtension
}

export type {
    ProviderFunction
}