import { ExtensionKind, createExtensionBluePrint } from "../../src";


describe('Extension Blueprint', ()=>{

    test('Create extension blue print', ()=>{

        const name: string = 'test';
        const namespace: string = 'test';
        const kind: ExtensionKind = ExtensionKind.Component

        const blueprint = createExtensionBluePrint({
            name: name,
            namespace: namespace,
            kind: kind,
        })

        expect(blueprint).toBeDefined();
        expect(blueprint.name).toBe(name);
        expect(blueprint.namespace).toBe(namespace);
        expect(blueprint.kind).toBe(kind);
        expect(blueprint.disabled).toBe(false);
        expect(blueprint.attachToo).toBeUndefined();
        expect(blueprint.input).toEqual([]);
        expect(blueprint.output).toEqual([]);
        expect(blueprint.configSchema).toEqual({});
    })

    test('Throw error if required parameters are missing', ()=>{
        const blueprint = createExtensionBluePrint({
            namespace: "test-namespace",
            name: "test-name",
            kind: ExtensionKind.Component, // Replace with actual kind from ExtensionKind
        });

        expect(() => {
            blueprint.make({
                // Missing required parameters like provider, attachToo, etc.
            });
        }).toThrow("The 'provider' parameter must be specified either in the constructor or in make arguments.");
    })

    test("should create an extension using make method", () => {
        const blueprint = createExtensionBluePrint({
            namespace: "test-namespace",
            name: "test-name",
            kind: ExtensionKind.Component, // Replace with actual kind from ExtensionKind
            provider: jest.fn(),
            attachToo: {namespace: 'test', name: 'test', kind: ExtensionKind.Component, input: 'yes'}, // Replace with actual attachToo type
        });

        const extension = blueprint.make({
            // You can provide additional parameters here if needed
        });

        expect(extension).toBeDefined();
        // Add more assertions based on what createExtension returns
    });

})