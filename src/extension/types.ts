

type attachTooType = {
    namespace: string,
    name: string, 
    kind: ExtensionKind
}

enum ExtensionKind {
    Component = 'Component',
    Routing = 'Routing'
}

export type {
    attachTooType, 
}

export {
    ExtensionKind
}