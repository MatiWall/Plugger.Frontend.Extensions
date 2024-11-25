import { z } from 'zod';
import { Extension, createExtension } from "./Extension";
import { createExtensionDataRef } from "./ExtensionDataRef";
import { ExtensionKind } from "./types";


describe('Extension initialization ', () => {
    test('Create extension instance directly', () => {

        const namespace = "test";
        const name = "Test Extension";
        const kind = ExtensionKind.Component;
        const disabled = false;
        const attachToo = {namespace: 'test', name: 'id', kind: ExtensionKind.Component, input: 'test'};
        const provider = () => 'test'; // Mock function for provider
        const input = [{ key: "value" }];
        const output = ["outputValue"];
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
        const kind: ExtensionKind =  ExtensionKind.Routing; // Replace with actual ExtensionKind
        const disabled = false;
        const attachToo = {namespace: 'test', name: 'id', kind: ExtensionKind.Routing, input: 'test'}; // Replace with actual attachTooType
        const provider = jest.fn(); // Mock provider function
        const input = [{ key: "value" }];
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
