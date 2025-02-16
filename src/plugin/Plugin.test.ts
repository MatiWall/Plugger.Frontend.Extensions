import { Plugin, createPlugin } from "../plugin";
import { Extension, createExtension } from "../extension";
import { vi, describe, it, expect } from 'vitest'

const ext1 = createExtension({
    name: 'ext1', 
    namespace: 'test', 
    kind: 'test', 
    attachToo: {name: 'dummy', namespace: 'dummy', kind: 'dummy'},
    provider: vi.fn()
});
const ext2 = createExtension({
    name: 'ext2', 
    namespace: 'test', 
    kind: 'test', 
    attachToo: {name: 'dummy', namespace: 'dummy', kind: 'dummy'},
    provider: vi.fn()
});

describe("Plugin Class", () => {
    it("should create a plugin with given ID", () => {
        const plugin = new Plugin("test-plugin", [], {}, {});

        expect(plugin.id).toBe("test-plugin");
        expect(plugin.extensions).toEqual([]);
        expect(plugin.routes).toEqual({});
        expect(plugin.externalRoutes).toEqual({});
    });

    it("should store provided extensions", () => {


        const plugin = new Plugin("test-plugin", [ext1, ext2], {}, {});

        expect(plugin.extensions).toHaveLength(2);
        expect(plugin.extensions[0]).toBe(ext1);
        expect(plugin.extensions[1]).toBe(ext2);
    });

    it("should store routes and external routes", () => {
        const routes = { home: "/home", dashboard: "/dashboard" };
        const externalRoutes = { help: "/help" };

        const plugin = new Plugin("test-plugin", [], routes, externalRoutes);

        expect(plugin.routes).toEqual(routes);
        expect(plugin.externalRoutes).toEqual(externalRoutes);
    });
});

describe("createPlugin Function", () => {
    it("should create a plugin with default values", () => {
        const plugin = createPlugin({ id: "test-plugin" });

        expect(plugin.id).toBe("test-plugin");
        expect(plugin.extensions).toEqual([]);
        expect(plugin.routes).toEqual({});
        expect(plugin.externalRoutes).toEqual({});
    });

    it("should create a plugin with provided extensions", () => {

        const plugin = createPlugin({
            id: "test-plugin",
            extensions: [ext1, ext2],
        });

        expect(plugin.extensions).toHaveLength(2);
        expect(plugin.extensions[0]).toBe(ext1);
        expect(plugin.extensions[1]).toBe(ext2);
    });

    it("should create a plugin with routes and external routes", () => {
        const routes = { home: "/home", dashboard: "/dashboard" };
        const externalRoutes = { help: "/help" };

        const plugin = createPlugin({
            id: "test-plugin",
            routes,
            externalRoutes,
        });

        expect(plugin.routes).toEqual(routes);
        expect(plugin.externalRoutes).toEqual(externalRoutes);
    });
});
