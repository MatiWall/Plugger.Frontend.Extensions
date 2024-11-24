# Extension System Overview

In this system, the extension is the core entity that manages various components like `ExtensionDataRef`, `ExtensionDataInput`, and `ExtensionDataValue`. These components help manage the behavior, data, and configuration of an extension.

## Mindmap
```mermaid

mindmap
  root((Plugin))
    Extension
      Output
      Input
        Multiple Attachments?
          Specify when creating inputs
          Takes ExtensionDataRef and metadata
    Extensions
      Provide data or components to frontend
    Plugin Grouping
      Namespace and collection of extensions

               

```

## Class and Relationship Explanation
An app will be build up of a set of plugins which them self will consists of any number of extensions. An extension is a stand alone component that provide either, either data or react components to the frontend. There are multiple different types of extensions that are used to build up the entire frontend. 

### Extension
   - The core entity representing an extension.

```mermaid
classDiagram
  class Extension {
     namespace: string
     name: string
     kind: ExtensionKind
     attachmentPoint: AttachmentPointType
     output: List~ExtensionDataRef~
     input: TExtensionInput
     disabled: bool
     configSchema: Schema "zod"
     config: object
     factory(): List~ExtensionDataValue~
  }

  class ExtensionKind {
     <<enumeration>>
     Component
     Routing
  }
  note for ExtensionKind "The different types of extensions"
  Extension <-- ExtensionKind

  class AttachmentPointType {
     <<type>>
     namespace: string
     name: string
     kind: ExtensionKind
  }
  Extension "1" --> "1" AttachmentPointType : attachmentPoint

  class TExtensionInput {
     <<type>>
     [key: string]: ExtensionInputNode
  }
  note for Extension "Attributes:
     - input: Mapping between keys to use in Factory and ExtensionDataRefs. Format decided by developer.
  "

  class ExtensionDataRef {
     id: string
     +with<TData>(data: TData): ExtensionDataValue~TData~
  }

  class ExtensionDataValue {
     id: string
     data: TData
  }

  Extension "1" --> "*" ExtensionDataRef : references
  ExtensionDataRef "1" --> "*" ExtensionDataValue : creates

  class ExtensionInputNode {
      ref: ExtensionDataRef
      allowMultiple: bool
  }
  TExtensionInput "1" --> "*" ExtensionInputNode : nodes

```   

### Plugin
Namespace grouping of extensions (A collection of extensions). A collection of plugins constitute an app.

```mermaid

classDiagram
  class Plugin {
     name: string
     extensions: Array~Extension~
  }

  Plugin --> Extension : contains
  Plugin --> App : provides
  note for Plugin "A collection of extensions that belong to a plugin"

```

### ExtensionDataRef and ExtensionDataValue

   **ExtensionDataRef**
   - A reference to data used in the extension.
   
   **ExtensionDataValue**
   - Refers to values tied to `ExtensionDataRef`. It can be iterable, meaning multiple values can be related to an extension’s input/output.

   ```mermaid
   
classDiagram
  class ExtensionDataRef {
     id: string
     +with<TData>(data: TData): ExtensionDataValue<TData>
  }

  class ExtensionDataValue {
     id: string
     data: TData
  }

  ExtensionDataRef "1" --> "*" ExtensionDataValue : creates
  note for ExtensionDataRef "References data used by the extension"
  note for ExtensionDataValue "Contains the actual data tied to the reference"


   ```