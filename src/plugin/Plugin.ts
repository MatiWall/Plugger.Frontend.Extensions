import { Extension } from "../extension";

class Plugin {
    id: string;
    extensions: Extension[];

    constructor(
        id: string,
        extensions: Extension[]
    ) {
        this.id = id;
        this.extensions = extensions;
    }
}

function createPlugin({
    id,
    extensions = []
}: {
    id: string;
    extensions?: Extension[]; // Optional array
}): Plugin {
    return new Plugin(
        id,
        extensions
    );
}

export {
    Plugin,
    createPlugin
};
