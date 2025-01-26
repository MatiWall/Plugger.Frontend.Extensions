//import React from 'react'
import { Plugin, createPlugin } from "./Plugin";
import { Extension } from "../extension";

import {z} from 'zod';

describe('Create plugin', ()=>{

    test('directly', ()=>{
                // Arrange: Define test values
            const id = "test-plugin-id";
            const extensions: Extension[] = [
                new Extension("ext1", "Test Extension 1", 'component', false, {namespace: 'test', name: 'test', kind: 'component'}, jest.fn(), {}, [], z.object({}))
            ];
            
            const plugin = new Plugin(id, extensions)

            // Assert: Verify all properties are set correctly
            expect(plugin).toBeInstanceOf(Plugin);
            expect(plugin.id).toBe(id);
            expect(plugin.extensions).toEqual(extensions);
    })

}
); 