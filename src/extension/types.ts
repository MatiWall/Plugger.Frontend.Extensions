

type attachTooType = {
    namespace: string,
    name: string, 
    kind: ExtensionKind,
    input: string
}

enum ExtensionKind {
    Component,
    Routing
}

export type {
    attachTooType, 
}

export {
    ExtensionKind
}