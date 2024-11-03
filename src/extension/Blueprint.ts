import { createExtension } from "./Extension";
import { ExtensionKind, attachTooType } from "./types";




class ExtensionBluePrint {
    kind: ExtensionKind;
    name: string;
    disabled: boolean;
    provider: CallableFunction;
    attachToo: attachTooType;
    input: any[];
    output: any[];
    configSchema: object;


    constructor(
        name: string,
        kind: ExtensionKind,
        disabled: boolean,
        attachToo: attachTooType,
        provider: CallableFunction,
        input: any[],
        output: any[],
        configSchema: object
    ){
        this.kind = kind;
        this.name = name;
        this.disabled = disabled;
        this.provider = provider;
        this.attachToo = attachToo;

        this.input = input;
        this.output = output;
        this.configSchema = configSchema;

    }

    make(args: {
        id: string;
        disabled?: boolean;
        provider?: CallableFunction;
        attachToo?: attachTooType;
        inputs?: any[],
        outputs?: any[],
        configSchema?: object
      }) {
        return createExtension({
          id: args.id,
          name: this.name,
          kind: this.kind,
          disabled: args.disabled ?? this.disabled,
          provider: args.provider ?? this.provider,
          attachToo: args.attachToo ?? this.attachToo,
          input: args.inputs ?? this.input,
          output: args.outputs ?? this.output,
          configSchema: args.configSchema ?? this.configSchema,
        });
      }
}

function createExtensionBluePrint({
    name,
    kind,
    disabled = false,
    attachToo,
    provider,
    input = [],
    output = [],
    configSchema = {},
  }: {
    name: string;
    kind: ExtensionKind;
    disabled?: boolean;
    attachToo: attachTooType;
    provider: CallableFunction;
    input?: any[];
    output?: any[];
    configSchema?: object;
  }) {
    return new ExtensionBluePrint(
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
    createExtensionBluePrint
}