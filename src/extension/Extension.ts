import { z, ZodType } from 'zod';
import { idGenerator } from "../Id";
import { ExtensionDataRef, ExtensionDataValue, ExtensionDataValueTypes} from "./ExtensionDataRef";
import { ExtensionKind, attachTooType } from "./types";
import { ExtensionInputNode } from './ExtensionInputNode';


type ProviderFunction = ({
    inputs,
    config,
}: {
    inputs: {[key: string]: any};
    config: object;
}) => ExtensionDataValue<ExtensionDataValueTypes>[];

class Extension {
    
    namespace: string;
    kind: ExtensionKind;
    name: string;
    disabled: boolean;
    provider: ProviderFunction;
    attachToo: attachTooType;
    input: {[key: string]: ExtensionInputNode};
    output: ExtensionDataRef[];
    configSchema: ZodType<any> = z.object({})
    config: object = {}

    children: Extension[] = [];

    constructor(
        namespace: string,
        name: string,
        kind: ExtensionKind,
        disabled: boolean,
        attachToo: attachTooType,
        provider: ProviderFunction,
        input: {[key: string]: ExtensionInputNode},
        output: ExtensionDataRef[],
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
            inputs: builtInput, 
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

function createExtension({
    namespace,
    name,
    kind,
    disabled = false, // Default to false if not provided
    attachToo,
    provider,
    input = {},
    output = [],
    configSchema = z.object({})
}: {
    namespace: string;
    name: string;
    kind: ExtensionKind;
    disabled?: boolean;
    attachToo: attachTooType;
    provider: ProviderFunction;
    input?: {[key: string]: ExtensionInputNode};
    output?: ExtensionDataRef[];
    configSchema?: ZodType;
}): Extension {
    return new Extension(namespace, name, kind, disabled, attachToo, provider, input, output, configSchema);
}

export {
    Extension,
    createExtension
}

export type {
    ProviderFunction
}