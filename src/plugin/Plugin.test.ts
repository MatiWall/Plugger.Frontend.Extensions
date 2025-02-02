//import React from 'react'
import { Plugin } from "./Plugin";
import { Extension, createExtension } from "../extension";

import {z} from 'zod';

describe('Create plugin', ()=>{

    test('directly', ()=>{
                // Arrange: Define test values
            const id = "test-plugin-id";
            const extensions: Extension[] = [
                createExtension({
                    namespace: 'test',
                    name: 'test',
                    kind: 'test',
                    attachToo: {namespace: 'test', name: 'test', kind: 'test2'},
                    provider: jest.fn()
                })
            ];
            
            const plugin = new Plugin(id, extensions)

            // Assert: Verify all properties are set correctly
            expect(plugin).toBeInstanceOf(Plugin);
            expect(plugin.id).toBe(id);
            expect(plugin.extensions).toEqual(extensions);
    })

}
); 