import { createExtensionDataRef, ExtensionDataRef } from "./ExtensionDataRef";
import { describe, test, expect } from 'vitest'

describe('ExtensionDataRef initialization ', () => {
    test('Create extension data ref', () => {

        const extensionDataRef = createExtensionDataRef();

       
        expect(extensionDataRef).toBeInstanceOf(ExtensionDataRef);
        expect(typeof extensionDataRef.id).toBe('string');
    });


});
