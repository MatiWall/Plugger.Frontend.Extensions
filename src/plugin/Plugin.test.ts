//import React from 'react'
import { RouteRef, ExternalRouteRef, Route, createRouteRef } from "@catcode/core-routing";
import { Plugin, createPlugin } from "./Plugin";
import { Extension } from "../extension";
import { ExtensionKind } from "../extension";

import {z} from 'zod';

describe('Create plugin', ()=>{

    test('directly', ()=>{
                // Arrange: Define test values
            const id = "test-plugin-id";
            const extensions: Extension[] = [
                new Extension("ext1", "Test Extension 1", ExtensionKind.Component, false, {namespace: 'test', name: 'test', kind: ExtensionKind.Component}, jest.fn(), {}, [], z.object({}))
            ];
            
            const plugin = new Plugin(id, extensions)

            // Assert: Verify all properties are set correctly
            expect(plugin).toBeInstanceOf(Plugin);
            expect(plugin.id).toBe(id);
            expect(plugin.extensions).toEqual(extensions);
    })

    test('createPlugin function', ()=> {
        
        const routeRef = createRouteRef();

        const plugin = createPlugin({
            id: 'test:id',
        });
    })

}
); 