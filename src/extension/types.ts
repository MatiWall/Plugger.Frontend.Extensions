

type attachTooType = {
    namespace: string,
    name: string, 
    kind: ExtensionKind
}

enum ExtensionKind {
    Component = 'Component',
    Routing = 'NavItem',
    Page = 'Page'
}

export type {
    attachTooType, 
}

export {
    ExtensionKind
}