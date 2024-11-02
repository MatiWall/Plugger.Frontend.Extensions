import { Extension, ExtensionKind, createExtension } from "../../src";


describe('Extension initialization ', () => {
    test('Create extension instance directly', () => {

        const id = "test-id";
        const name = "Test Extension";
        const kind = ExtensionKind.Component;
        const disabled = false;
        const attachToo = {id: 'test:id', input: 'test'};
        const provider = () => 'test'; // Mock function for provider
        const input = [{ key: "value" }];
        const output = ["outputValue"];
        const configSchema = { schemaKey: "schemaValue" };

        // Act: Create an instance of Extension
        const extension = new Extension(id, name, kind, disabled, attachToo, provider, input, output, configSchema);

        // Assert: Verify all properties are set correctly
        expect(extension.id).toBe(id);
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
        const id = "test-extension-id";
        const name = "Test Extension";
        const kind: ExtensionKind =  ExtensionKind.Routing; // Replace with actual ExtensionKind
        const disabled = false;
        const attachToo = {id: 'test:id', input: 'test'}; // Replace with actual attachTooType
        const provider = jest.fn(); // Mock provider function
        const input = [{ key: "value" }];
        const output = ["outputValue"];
        const configSchema = { schemaKey: "schemaValue" };

        // Act: Create an Extension instance
        const extension = createExtension({
            id,
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
        expect(extension.id).toBe(id);
        expect(extension.name).toBe(name);
        expect(extension.kind).toBe(kind);
        expect(extension.disabled).toBe(disabled);
        expect(extension.attachToo).toBe(attachToo);
        expect(extension.provider).toBe(provider);
        expect(extension.input).toEqual(input);
        expect(extension.output).toEqual(output);
        expect(extension.configSchema).toEqual(configSchema);
    });


});
