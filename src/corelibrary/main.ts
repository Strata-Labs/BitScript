import { OP_Code } from './op_code';
import { ScriptData } from './scriptdata';
import { StackState } from './stackstate';

// Main function that takes in a string of space-separated opcodes or data
function testScriptData(input: string) {
    let splitInput = input.split(' ');
    let currentStack: Array<ScriptData> = [];
    // An array of StackState objects, which should be used to animate the stack
    let stackStates: Array<StackState> = [];
    let inIfBlock = false;
    let executeIfBlock = false;

    for (let i = 0; i < splitInput.length; i++) {
        let element = splitInput[i];
        let opCode = OP_Code.opCodeMap[element];
        let beforeStack = [...currentStack];
        
        if (opCode) {
            if (opCode.name === 'OP_IF') {
                inIfBlock = true;
                let topValue = currentStack.pop();
                executeIfBlock = topValue?.dataNumber !== 0;
            } else if (opCode.name === 'OP_ELSE') {
                executeIfBlock = !executeIfBlock;
            } else if (opCode.name === 'OP_ENDIF') {
                inIfBlock = false;
                executeIfBlock = false;
            } else {
                let [stack, toAdd, toRemove] = opCode.execute(currentStack);
                currentStack = stack;
                let stackState = new StackState(beforeStack, currentStack, undefined, opCode);
                stackStates.push(stackState);
            }
        } else {
            let processedElement = isNaN(Number(element)) ? element : Number(element);
            let stackData = new ScriptData(processedElement);
            if (!inIfBlock || (inIfBlock && executeIfBlock)) {
                currentStack.push(stackData);
            }
            let stackState = new StackState(beforeStack, currentStack, stackData);
            stackStates.push(stackState);
        }
    }
    console.log(JSON.stringify(stackStates, null, 2));
}

// The third command line argument (index 2) is the first relevant input.
//let input = process.argv[2];

// Call the function with the command line input
//testScriptData(input);
