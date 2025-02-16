import { ExtensionInputNode, createExtensionInputNode } from "./ExtensionInputNode";
import { createExtensionDataRef } from "./ExtensionDataRef";
import { describe, test, expect } from 'vitest'

describe("ExtensionInputNode", () => {
    test("should create an ExtensionInputNode instance with correct properties", () => {
        const ref = createExtensionDataRef();
        const allowMultiple = true;

        const node = new ExtensionInputNode(ref, allowMultiple);

        expect(node).toBeInstanceOf(ExtensionInputNode);
        expect(node.ref).toBe(ref);
        expect(node.allowMultiple).toBe(allowMultiple);
    });

    test("createExtensionInputNode should create an ExtensionInputNode instance with default allowMultiple as false", () => {
        const ref = createExtensionDataRef();

        const node = createExtensionInputNode({ 
            ref
        });

        expect(node).toBeInstanceOf(ExtensionInputNode);
        expect(node.ref).toBe(ref);
        expect(node.allowMultiple).toBe(false); // Default value
    });

    test("createExtensionInputNode should create an ExtensionInputNode instance with specified allowMultiple", () => {
        const ref = createExtensionDataRef();
        const allowMultiple = true;

        const node = createExtensionInputNode({ ref, allowMultiple });

        expect(node).toBeInstanceOf(ExtensionInputNode);
        expect(node.ref).toBe(ref);
        expect(node.allowMultiple).toBe(allowMultiple);
    });
});
