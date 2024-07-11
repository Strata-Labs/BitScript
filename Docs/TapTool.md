# TapTool

:::mermaid
flowchart TD
01[User prompted to selected Key Path or Script Path]
subgraph SG1[Key Path]
21[User Inputs Public Key to create tap key]
end

subgraph SG2[Script Path]
31[User Is shown empty Merkle Tree]
31 --> 32[User is prompted to select a custom output template]
32 --> 33[User inputs parameters required for output template]
33 --> 34[New node added to tree]
34 --> 35[Able X amount of nodes to tree ]
end

01 --> SG1
01 --> SG2
SG1 --> 41[User complete tap tool creation and a tapped tweak key is outputted]
SG2 --> 41

:::

The user can only select key path or script path, after selection they are moved towards the next perspective step.

## Key Path Creation

Straight forward, user is shown the intro screen which show two tiles of either Key Path or Script Path.
The user is shown a input that indicates to add a public key which would be able to unlock the funds.

After user confirms input and basic validation the script should output a output for a txd

## Script Path Creation

A bit more complicated than Key Path. This involves 2 major actions based on their user actions flows.

1. Adding a Node
2. Editing a Node

### Adding a Node

This encapsulates adding a new Node to the merkle tree

1. Select a output template (ex P2Sh)
2. Add data needed to create output template (ex Title & hashed value)
3. Confirm

### Editing a Node

This holds the ability to be able ot change the data requirements for a existing Node.
As well the ability to delete a node
