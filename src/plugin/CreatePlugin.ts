import { RouteRef } from "@catcode/core-routing"
import { Extension } from "../extension/Extension"


type PluginConfig = {
    id: string,
    mountPath: RouteRef,
    extensions: Extension[]
}


class Plugin {

    id: string; 
    extensions: Extension[]

    constructor(
        id: string,
        extensions: Extension[]
    ){
        this.id = id;
        this.extensions = extensions;

    }
}


export {
    Plugin
}