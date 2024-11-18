# Extension System Overview

In this system, the extension is the core entity that manages various components like `ExtensionDataRef`, `ExtensionDataInput`, and `ExtensionDataValue`. These components help manage the behavior, data, and configuration of an extension.

## Class and Relationship Explanation

### 1. **Extension**
   - The core entity representing an extension.
   - Contains:
     - **ID** (composed of `Kind`, `Namespace`, and `Name`).
     - **Outputs**: Defines the data the extension produces.
     - **Inputs**: Defines the data the extension requires.
     - **Attachment Point**: Where the extension is attached in the system.
     - **Disabled State**: Controls whether the extension is enabled.
     - **Configuration**: Defines the extension’s configuration schema, validation, and defaults.
     - **Factory**: A function responsible for creating the output of the extension.

### 2. **ExtensionDataRef**
   - A reference to data used in the extension.
   - May contain references to **Core Extension Data** or other external data sources.

### 3. **ExtensionDataInput**
   - Represents the inputs the extension accepts.
   - Includes constraints, validation checks, and whether the input is optional or required.

### 4. **ExtensionDataValue**
   - Refers to values tied to `ExtensionDataRef`. It can be iterable, meaning multiple values can be related to an extension’s input/output.

### 5. **Output**
   - The result produced by the extension after processing inputs.

### 6. **Provider**
   - A function that takes the input as input and returns an iterable list of `ExtensionDataValue` for a given extension.

### 7. **Input**
   - Maps input names to `ExtensionDataInput`, linking inputs to the data required for processing.

---

## Mermaid Diagram

```mermaid
graph TD
    A[Frontend Extension] --> B[ID]
    A --> C[Output]
    A --> D[Inputs]
    A --> E[Attachment Point]
    A --> F[Disabled State]
    A --> G[Configuration]
    A --> H[Factory]
    
    B --> B1[Kind]
    B --> B2[Namespace]
    B --> B3[Name]

    C --> C1[Extension Data]
    C1 --> C2[Extension Data References]
    C2 --> C3[Core Extension Data]

    D --> D1[Extension Inputs]
    D1 --> D2[Input Constraints]
    D2 --> D3[Optional Inputs]

    E --> E1[Parent Extension ID]
    E --> E2[Input Name]
    
    F --> F1[Default Disabled]
    F --> F2[Enabled Order]
    
    G --> G1[Configuration Schema]
    G1 --> G2[Validation]
    G1 --> G3[Defaults]

    H --> H1[Factory Function]
    H --> H2[Generator Function]
    H1 --> H3[Produces Output]
    H2 --> H4[Conditional Output]

    C3 --> C4[React.JSX.Element]
    C3 --> C5[RouteRef]

    style A fill:#f9f,stroke:#333,stroke-width:2px;
```

# Objects
Extension
ExtensionDataRef
ExtensionDataValue
ExtensionDataInput