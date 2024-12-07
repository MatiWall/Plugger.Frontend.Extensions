import React from 'react'
import { render } from '@testing-library/react';
import { z } from 'zod';
import { Extension, createExtension } from "./Extension";
import { ExtensionDataRef, createExtensionDataRef } from "./ExtensionDataRef";
import { ExtensionKind } from "./types";
import { ExtensionInputNode, createExtensionInputNode } from './ExtensionInputNode';


describe('Extension initialization ', () => {
    test('Create extension instance directly', () => {

        const namespace = "test";
        const name = "Test Extension";
        const kind = ExtensionKind.Component;
        const disabled = false;
        const attachToo = { namespace: 'test', name: 'id', kind: ExtensionKind.Component, input: 'test' };
        const provider = ({ }) => []; // Mock function for provider
        const input: {[key: string]: ExtensionInputNode} = {};
        const output: ExtensionDataRef[] = [];
        const configSchema = z.object({
            test1: z.string().default('test')
        });

        // Act: Create an instance of Extension
        const extension = new Extension(namespace, name, kind, disabled, attachToo, provider, input, output, configSchema);

        // Assert: Verify all properties are set correctly
        expect(extension.id).toBe(`${kind.toString()}:${namespace}/${name}`);
        expect(extension.namespace).toBe(namespace);
        expect(extension.name).toBe(name);
        expect(extension.kind).toBe(kind);
        expect(extension.disabled).toBe(disabled);
        expect(extension.attachToo).toBe(attachToo);
        expect(extension.provider).toBe(provider);
        expect(extension.input).toEqual(input);
        expect(extension.output).toEqual(output);
        expect(extension.configSchema).toEqual(configSchema);
    });

    test("should create an Extension instance with the provided properties", () => {
        // Arrange: Define the test values

        const extensionDataRef = createExtensionDataRef();
        const namespace = "test";
        const name = "Test Extension";
        const kind: ExtensionKind = ExtensionKind.Routing; // Replace with actual ExtensionKind
        const disabled = false;
        const attachToo = { namespace: 'test', name: 'id', kind: ExtensionKind.Routing, input: 'test' }; // Replace with actual attachTooType
        const provider = jest.fn(); // Mock provider function
        const input = {};
        const output = [extensionDataRef];
        const configSchema = z.object({
            test1: z.string().default('test')
        });;

        // Act: Create an Extension instance
        const extension = createExtension({
            namespace,
            name,
            kind,
            disabled,
            attachToo,
            provider,
            input,
            output,
            configSchema
        });

        // Assert: Verify all properties are set correctly
        expect(extension).toBeInstanceOf(Extension);
        expect(extension.id).toBe(`${kind.toString()}:${namespace}/${name}`);
        expect(extension.name).toBe(name);
        expect(extension.kind).toBe(kind);
        expect(extension.disabled).toBe(disabled);
        expect(extension.attachToo).toBe(attachToo);
        expect(extension.attachTooId()).toBe(`${ExtensionKind.Routing.toString()}:test/id`);
        expect(extension.provider).toBe(provider);
        expect(extension.input).toEqual(input);
        expect(extension.output).toEqual(output);
        expect(extension.configSchema).toEqual(configSchema);
    });


});


describe('Extension app building', () => {
    test('Nested Extensions', () => {

        const innerDataRef = createExtensionDataRef();
        const inner = createExtension({
            namespace: 'test',
            name: 'inner',
            kind: ExtensionKind.Component,
            provider: () => {
                return [
                    innerDataRef.with(<div>inner</div>)
                ]
            },
            attachToo: { namespace: 'test', name: 'outer', kind: ExtensionKind.Component }
        })

        const outerDataRef = createExtensionDataRef();
        const innerInputNode = createExtensionInputNode({
            ref: innerDataRef
        });

        const outer = createExtension({
            namespace: 'test',
            name: 'outer',
            kind: ExtensionKind.Component,
            input: { inner: innerInputNode },
            provider: ({ inputs, config }) => {

                const context = (
                    <div>
                        {inputs.inner}
                        <div>outer</div>
                    </div>
                )

                return [
                    outerDataRef.with(context)
                ]
            },
            attachToo: { namespace: 'test', name: 'parent', kind: ExtensionKind.Component }
        })


        outer.addChild(inner)

        const result = outer.evaluate()

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(1);
        expect(result[0]).toEqual(outerDataRef.with(
            <div>
                <div>inner</div>
                <div>outer</div>
            </div>
        ));

        expect(outer.input).toHaveProperty('inner');

    })

    test('Multiple Nested Extensions', () => {
        const innerMostDataRef = createExtensionDataRef();
        const innerMost = createExtension({
            namespace: 'test',
            name: 'inner-most',
            kind: ExtensionKind.Component,
            provider: () => {
                return [
                    innerMostDataRef.with(<div>inner-most</div>)
                ];
            },
            attachToo: { namespace: 'test', name: 'inner', kind: ExtensionKind.Component },
        });

        const innerDataRef = createExtensionDataRef();
        const innerInputNode = createExtensionInputNode({
            ref: innerMostDataRef,
        });

        const inner = createExtension({
            namespace: 'test',
            name: 'inner',
            kind: ExtensionKind.Component,
            input: { 'inner-most': innerInputNode },
            provider: ({ inputs }) => {
                return [
                    innerDataRef.with(
                        <div>
                            {inputs['inner-most']}
                            <div>inner</div>
                        </div>
                    ),
                ];
            },
            attachToo: { namespace: 'test', name: 'outer', kind: ExtensionKind.Component },
        });

        const outerDataRef = createExtensionDataRef();
        const outerInputNode = createExtensionInputNode({
            ref: innerDataRef,
        });

        const outer = createExtension({
            namespace: 'test',
            name: 'outer',
            kind: ExtensionKind.Component,
            input: { inner: outerInputNode },
            provider: ({ inputs }) => {
                return [
                    outerDataRef.with(
                        <div>
                            {inputs.inner}
                            <div>outer</div>
                        </div>
                    ),
                ];
            },
            attachToo: { namespace: 'test', name: 'parent', kind: ExtensionKind.Component },
        });

        // Build hierarchy
        inner.addChild(innerMost);
        outer.addChild(inner);

        // Evaluate outer extension
        const result = outer.evaluate();

        // Assertions
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(1);

        const expectedData = (
            <div>
                <div>
                    <div>inner-most</div>
                    <div>inner</div>
                </div>
                <div>outer</div>
            </div>
        );

        expect(result[0].data).toEqual(expectedData);

        // Validate children relationships
        expect(outer.input).toHaveProperty('inner');
    });
})



describe('Extension Config Schema', () => {
    test('Validates configSchema during evaluation', () => {
        // Define the config schema
        const configSchema = z.object({
            enabled: z.boolean(),
            threshold: z.number().min(0).max(100),
        });

        const config = {
            enabled: true,
            threshold: 50,
        };

        const invalidConfig = {
            enabled: 'yes', // Invalid type
            threshold: 150, // Out of range
        };

        const dataRef = { id: 'test-data-ref', data: {} };
        const provider = jest.fn(({ config }) => {
            // Provider logic, returning processed output
            return [{ id: 'output', data: { config } }];
        });

        const extension = createExtension({
            namespace: 'test',
            name: 'config-extension',
            kind: ExtensionKind.Component,
            attachToo: { namespace: 'test', name: 'parent', kind: ExtensionKind.Component },
            provider,
            configSchema,
        });

        // Attach valid config and evaluate
        extension.configSchema.parse(config); // Manually validate for the test
        extension.setConfig(config);
        const result = extension.evaluate();

        // Validate provider was called with the correct parsed config
        expect(provider).toHaveBeenCalledWith(
            expect.objectContaining({
                config,
            })
        );
        expect(result).toEqual([{ id: 'output', data: { config } }]);

        // Test with invalid config
        expect(() => extension.configSchema.parse(invalidConfig)).toThrow();
    });

    test('Defaults in configSchema are applied', () => {
        const configSchemaWithDefaults = z.object({
            enabled: z.boolean().default(true),
            threshold: z.number().default(10),
        });

        const provider = jest.fn(({ config }) => {
            return [{ id: 'output', data: { config } }];
        });

        const extension = createExtension({
            namespace: 'test',
            name: 'default-config-extension',
            kind: ExtensionKind.Component,
            attachToo: { namespace: 'test', name: 'parent', kind: ExtensionKind.Component },
            provider,
            configSchema: configSchemaWithDefaults,
        });

        // Evaluate without providing explicit config
        const result = extension.evaluate();

        // Validate defaults are applied
        expect(provider).toHaveBeenCalledWith(
            expect.objectContaining({
                config: { enabled: true, threshold: 10 },
            })
        );

        // @ts-ignore
        expect(result[0].data.config).toEqual({ enabled: true, threshold: 10 });
    });
});



// Helper function to create a valid config
function createValidConfig() {
    return { enabled: true, threshold: 10 };
}

describe('Multiple Extensions with the Same Parent and Shared Data Ref', () => {
    test('Parent allows multiple extensions to attach and share the same data reference', () => {
        // Create the shared data ref for children
        const sharedDataRef = createExtensionDataRef();

        // Create the parent extension that allows multiple children
        const parentDataRef = createExtensionDataRef();
        const parent = createExtension({
            namespace: 'test',
            name: 'parent',
            kind: ExtensionKind.Component,
            disabled: false,
            attachToo: { namespace: 'test', name: 'parent', kind: ExtensionKind.Component },
            provider: ({ inputs, config }) => {
                const context = (
                    <div>
                        {inputs.children.map((child: any, index: any) => (
                            <React.Fragment key={index}>{child}</React.Fragment>
                        ))}
                        <div>Parent Component</div>
                    </div>
                );
                return [parentDataRef.with(context)];
            },
            input: {
                children: createExtensionInputNode({
                    ref: sharedDataRef,
                    allowMultiple: true
                })
            },  // Placeholder for children input
            output: [],
            configSchema: z.object({
                enabled: z.boolean(),
                threshold: z.number(),
            }),
        });

        // Create the child extensions, both using the same sharedDataRef
        const child1 = createExtension({
            namespace: 'test',
            name: 'child1',
            kind: ExtensionKind.Component,
            disabled: false,
            attachToo: { namespace: 'test', name: 'parent', kind: ExtensionKind.Component },
            provider: ({ inputs, config }) => {
                return [sharedDataRef.with(<div>Child 1</div>)];
            },
            input: {},
            output: [],
            configSchema: z.object({
                enabled: z.boolean(),
                threshold: z.number(),
            }),
        });

        const child2 = createExtension({
            namespace: 'test',
            name: 'child2',
            kind: ExtensionKind.Component,
            disabled: false,
            attachToo: { namespace: 'test', name: 'parent', kind: ExtensionKind.Component },
            provider: ({ inputs, config }) => {
                return [sharedDataRef.with(<div>Child 2</div>)];
            },
            input: {},
            output: [],
            configSchema: z.object({
                enabled: z.boolean(),
                threshold: z.number(),
            }),
        });

        // Add children to the parent (both using the shared data ref)
        parent.addChild(child1);
        parent.addChild(child2);

        // Set valid config for parent and children
        parent.setConfig(createValidConfig());
        child1.setConfig(createValidConfig());
        child2.setConfig(createValidConfig());

        // Simulate evaluation
        const result = parent.evaluate();

        // Test the output
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(1);  // Parent only has one output ref

        // @ts-ignore
        const { container } = render(result[0].data);

        // Define the expected output as an HTML string
        const expectedOutput = (
            "<div><div>Child 1</div><div>Child 2</div><div>Parent Component</div></div>"
        );

        // Compare the serialized output
        expect(container.innerHTML).toBe(expectedOutput);
    });
});