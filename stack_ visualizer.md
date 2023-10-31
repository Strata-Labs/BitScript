## Goal with the visualizer
Bitcoin script being a stack based language makes it difficult for the user to visualize and conceptually understand what exactly is going on in terms of execution of "lines of code".
We want to create a visual representation of the execution stack of the "script" that is being created.

A "script" is created and managed many ways in the actual bitcoin environment.

For the sake of our environment and IDE we are starting off with the assumption that the whole script is in one executable file.
What exactly gets "executed"
- At the end of the process the user will have a valid hex presentation of their "script" (if it compiles and has the right data is up to the user and the amount of pre validation we'll have for this is not set)

What role does the visualizer have in this?
- Given the simplicity and strict rules of bitcoin scripting we are able to emulate the bitcoin scripting executable environment locally.
- We think visualizing and seeing the actual actions of the script will allow the user to better understand what is going on and even more debug.


Rest of the document will refer to `"SV" as stack visualizer`
```
SV = stack visualizer
```

## Primer on Bitcoin Scripting in regards towards the stack visualizer
At a super high level we are displaying a array of actions and keeping the previous state of result of "executing" previous action (if there was one)

The user will type
`OP_ADD`
and the library will give the `SV` an array of "stack states"
- schema for the stack states are going to be updated to a certain degree, this is being actively worked on to finalize
```ts
type CORE_SCRIPT_DATA = {
  dataBinary?: any;
  dataBytes?: any;
  dataHex?: string;
  dataNumber?: number | string;
  dataString?: string;
};

type CORE_OP_CODE = {
  name: string;
  number: number;
  hex: string;
  description: string;
};

type SCRIPT_DATA_STACK = {
  beforeStack: CORE_SCRIPT_DATA[];
  currentStack: CORE_SCRIPT_DATA[];
  opCode?: CORE_OP_CODE;
  stackData?: CORE_SCRIPT_DATA;
};

const STACK_DATA: SCRIPT_DATA_STACK[] = [...]
```
Each step of the "script" is index within the `STACK_DATA`
Each step will have one of two actions
1) a data type is added to the stack (any data that is not an `OP` code)
2) a `OP` code is added to the stack stack

The action for (1) is almost always adding a tile to the main stack

The action for (2) is where the magic happens
- Each OP code manipulate the stack in some way ergo we must visualize these actions with movement of the tiles.

For Example
```
OP_ADD
<1>
<2>

```

Visualizing this would show `OP_ADD` being added to the stack and then popping the next two items from the stack, which then adds their added value to the main stack and disposes of the `OP_ADD<4><4>` values.

[We have a example of `OP_ADD`](https://www.bitscript.app/OPS/OP_ADD)
- note: this is example is extended into multi steps, in the our new version all these movements would be a single "step"  (op_add = [add op code, pop the top two items, dispose of previous values, add new value back to stack])


So each OP will have a set of actions that can manipulate the stack
- Note: We won't have to worry about the actual computation of the result since Jesus library will do all the heavy lifting. We are in charge of visualizing these changes.

## What will the visualizer show?
