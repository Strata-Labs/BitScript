## Goal with the visualizer 
Bitcoin script being a stack based language makes it difficult for the user to visualize and conceptrually understand what exactly is going on in terms of execution of "lines of code". 
We want to create a visual representation of the execution stack of the "script" that is being created. 

A "script" is created and managed many ways in the actual bitcoin enviroment.

For the sake of our enviroment and IDE we are starting off with the assumtion that the whole script is in one executable file.
What exactly get's "executed"
- At the end of the process the user will have a valid hex presentation of their "script" (if it compiles and has the right data is up to the user and the amount of pre validation we'll have for this is not set)

What role does the visualizer have in this?
- Given the simplicity and strict rules of bitcoin scripting we are able to emulate the bitcion scripting executable enviroment locally.
- We think visualizing and seeing the actual actions of the script will allow the user to better understand what is going on and even more debug.


Rest of the document will refer to `"SV" as stack visualizer`
```
SV = stack visualizer
```

## Primer on Bitcoin Scripting in regards towards the stack visualizer 
At a super high level we are displaying a array of actions and keeping the previous state of the previous action (if there was one)

The user will type 
`OP_ADD` 
and the library will give the `SV` an array of "stack states"
(schema for the stack states are going to be updated to a certain degree, this is being activley worked on to finalize)
```ts
export type SCRIPT_DATA_STACK = {
  beforeStack: CORE_SCRIPT_DATA[];
  currentStack: CORE_SCRIPT_DATA[];
  opCode?: CORE_OP_CODE;
  stackData?: CORE_SCRIPT_DATA;
};

const STACK_DATA: SCRIPT_DATA_STACK[] = [...]
```

## What will the visualizer show?
