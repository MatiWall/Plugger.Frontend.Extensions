import { Extension, ExtensionKind, createExtension } from "..";
import { createExtensionDataRef, ExtensionDataRef } from "./ExtensionDataRef";


describe('ExtensionDataRef initialization ', () => {
    test('Create extension data ref', () => {

        const extensionDataRef = createExtensionDataRef();

       
        expect(extensionDataRef).toBeInstanceOf(ExtensionDataRef);
        expect(typeof extensionDataRef.id).toBe('string');
    });


});
