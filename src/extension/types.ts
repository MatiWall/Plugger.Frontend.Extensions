

type attachTooType = {
    namespace: string,
    name: string, 
    kind: ExtensionKind,
    input: string
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