## Stack Visualizer
A instance of SV will be created on every "compile" of the latest imputed script.

When the SV class is created we save the class in order to call certain function to either manipulate the SV or visual represent new step (ex: we high light the line that is currently being executed)

## Externally accessible functions required

goToStep
- Allows the user to skip steps. (User clicks on `>>` moving the user two steps ahead or they click on `<<` going 2 steps back.
```ts
goToStep(step: number)
```

handlePause
- Allows the user to pause the SV at the current step
```ts
handlePause()
```

handlePlay
- Inverse of pause, allow user to resume the SV (turn back on autoplay)
```ts
handlePlay()
```


## Expected props passed to SV
```ts
type SVType = {
  // width of the svg container that d3 will adjust to
  width: number;
  // height
  height: number;
  // holds the execution steps of the user generated script
  scriptStackSteps: SCRIPT_DATA_STACK[];
  // start at step
  startStep?: number;
  // should autoplay at start (will almost always be true)
  autoPlay: boolean;
  // call back function for the front end to know when a new step has started
  handleStepFromClass: (step: number) => void;
 // call back function to confirm that SV has paused so the front end can visually update the controls
  handleClassPauseCallBack: (status: boolean) => void;
};
```
You can view examples of how this was initiated [before](https://github.com/Strata-Labs/BitScript/blob/bern/src/SCRIPT_ANIMATION_LIB/index.ts)

## What is the expected behavior of SV & why are we rebuilding this
There is a major change to the previous way this was displayed before hand in our /scripts & /ops pages
- The SV will only have one column, before we had either one column or up to 4 columns to move data around which caused some confusing janky code.

The SV will only have one column and be limited to the motion of moving data and ops around.

Stack Data (either OP or Data) will only move in a vertical manner.

For example with the script
```
# tells the script the next data type is length is 1
OP_PUSH_1
// hex value of 1 decimal
0x01
# tells the script the next data type is length is 1
OP_PUSH_1
// hex value of 2 decimal
0x02
OP_ADD
```

The visual representation of this would go as follows
1) OP_PUSH_1 op is added to the view (does not fall all the way to bottom of the stack since it's an OP and not a core data type) [link](https://www.figma.com/file/vDFNb7PuX37gJl7nzxFooU/BitScript-(latest)?type=design&node-id=5423-5621&mode=design&t=vCx3pZABGh34sqvw-4)
2) 0x01 hex value is added to the stack (does fall all the way to the bottom of the stack) [link](https://www.figma.com/file/vDFNb7PuX37gJl7nzxFooU/BitScript-(latest)?type=design&node-id=5423-6309&mode=design&t=vCx3pZABGh34sqvw-4)
3) OP_PUSH_1 op is added [link](https://www.figma.com/file/vDFNb7PuX37gJl7nzxFooU/BitScript-(latest)?type=design&node-id=5423-6603&mode=design&t=vCx3pZABGh34sqvw-4)
4) 0x02 hex value is added to the stack [link](https://www.figma.com/file/vDFNb7PuX37gJl7nzxFooU/BitScript-(latest)?type=design&node-id=5423-15482&mode=design&t=vCx3pZABGh34sqvw-4)
5) OP_ADD is added above the stack & then the top two data items on the stack are raised [link](https://www.figma.com/file/vDFNb7PuX37gJl7nzxFooU/BitScript-(latest)?type=design&node-id=5423-15930&mode=design&t=vCx3pZABGh34sqvw-4)
5.1) Once the data types are floating above the stack under the OP all there stack data items dissapear and the result of the function is returned vertically to the bottom of the stack [link](https://www.figma.com/file/vDFNb7PuX37gJl7nzxFooU/BitScript-(latest)?type=design&node-id=5423-16081&mode=design&t=vCx3pZABGh34sqvw-4)








