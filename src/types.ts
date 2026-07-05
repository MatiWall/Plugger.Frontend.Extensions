import { ZodObject, ZodType, infer as zodInfer, } from "zod";
import { ExtensionInputNode } from "./extension/ExtensionInputNode";
import { ExtensionDataRef, ExtensionDataValue } from "./extension/ExtensionDataRef";


export type NodeSpec = {
    input: Record<string, ExtensionInputNode>;
    config: ZodType<any>;
    params: any;
};

export type ProviderInput<TSpec extends NodeSpec> =
    TSpec extends { input: infer I }
        ? I extends Record<string, ExtensionInputNode>
            ? {
                  [K in keyof I]:
                      I[K] extends { allowMultiple: true }
                          ? any[]
                          : any;
              }
            : {}
        : {};


 export type Provider<TSpec extends NodeSpec> = (args: {
    input: ProviderInput<TSpec>;
    config: zodInfer<TSpec['config']>;
    params?: TSpec['params'];

}) => ExtensionDataValue<any>[];