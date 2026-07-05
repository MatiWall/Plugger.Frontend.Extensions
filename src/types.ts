import { ZodObject, infer as zodInfer, } from "zod";
import { ExtensionInputNode } from "./extension/ExtensionInputNode";
import { ExtensionDataRef, ExtensionDataValue } from "./extension/ExtensionDataRef";


export type NodeSpec = {
    input: Record<string, ExtensionInputNode>;
    config: ZodObject<any>;
    params: any;
    output: ExtensionDataRef[];
};

export type ProviderInput<TInput> = TInput extends Record<string, ExtensionInputNode> ? {
    [K in keyof TInput]: TInput[K] extends { allowMultiple: true }
        ? any[]
        : any;
 } : never;


 export type Provider<TSpec extends NodeSpec> = (args: {
    input: ProviderInput<TSpec>;
    config: zodInfer<TSpec['config']>;
    params?: TSpec['params'];

}) => ExtensionDataValue<any>[];