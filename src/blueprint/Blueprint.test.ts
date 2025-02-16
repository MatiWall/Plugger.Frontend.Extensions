import {createExtensionBluePrint } from "..";
import { describe, test, expect, vi } from 'vitest'

describe('Extension Blueprint', ()=>{

    test('Create extension blue print', ()=>{

        const name: string = 'test';
        const namespace: string = 'test';
        const kind: string = 'component'

        const blueprint = createExtensionBluePrint({
            name: name,
            namespace: namespace,
            kind: kind,
        })
        const testConfig = {};
        expect(blueprint).toBeDefined();
        expect(blueprint.name).toBe(name);
        expect(blueprint.namespace).toBe(namespace);
        expect(blueprint.kind).toBe(kind);
        expect(blueprint.disabled).toBe(false);
        expect(blueprint.attachToo).toBeUndefined();
        expect(blueprint.input).toEqual({});
        expect(blueprint.output).toEqual([]);
        expect(blueprint.configSchema.parse(testConfig)).toEqual({});
    })

    test('Throw error if required parameters are missing', ()=>{
        const blueprint = createExtensionBluePrint({
            namespace: "test-namespace",
            name: "test-name",
            kind: 'component', // Replace with actual kind from ExtensionKind
        });

        expect(() => {
            blueprint.make({});
        }).toThrow("The 'provider' parameter must be specified either in the constructor or in make arguments.");
    })

    test("should create an extension using make method", () => {
        const blueprint = createExtensionBluePrint({
            namespace: "test-namespace",
            name: "test-name",
            kind: 'component', // Replace with actual kind from ExtensionKind
            provider: vi.fn(),
            attachToo: {namespace: 'test', name: 'test', kind: 'component'}, // Replace with actual attachToo type
        });

        const extension = blueprint.make({
            // You can provide additional parameters here if needed
        });

        expect(extension).toBeDefined();
        // Add more assertions based on what createExtension returns
    });

})