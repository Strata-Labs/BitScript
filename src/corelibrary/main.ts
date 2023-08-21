import { OP_Code } from './op_code';
import { ScriptData } from './scriptdata';
import { StackState, TxData } from './stackstate';

// Main function that takes in a string of space-separated opcodes or data
function testScriptData(input: string, txData?: TxData) {
    let splitInput = input.split(' ');
    let currentStack: Array<ScriptData> = [];
    // An array of StackState objects, which should be used to animate the stack
    let stackStates: Array<StackState> = [];
    let inIfBlock = false;
    let executeIfBlock = false;
    let testTransactionData: TxData = {
        inputs: [],
        outputs: [],
        version: '1',
        timelock: '0',
        currentInputIndex: 0
    }

    for (let i = 0; i < splitInput.length; i++) {
        let element = splitInput[i];
        let opCode = OP_Code.opCodeMap[element];
        let beforeStack = JSON.parse(JSON.stringify(currentStack));
        let stackData: ScriptData | undefined;
        
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
                let [stack, toAdd, toRemove] = opCode.execute(currentStack, testTransactionData);
                currentStack = stack;
                stackStates.push(new StackState(beforeStack, JSON.parse(JSON.stringify(currentStack)), undefined, opCode, testTransactionData));
            }
        } else {
            let newElement: ScriptData;
            if (typeof element === 'string') {
                newElement = ScriptData.fromString(element);
                if (!inIfBlock || (inIfBlock && executeIfBlock)) {
                    currentStack.push(newElement);
                }
            } else if (typeof element === 'number') {
                newElement = ScriptData.fromNumber(element);
                if (!inIfBlock || (inIfBlock && executeIfBlock)) {
                    currentStack.push(newElement);
                }
            }
            stackStates.push(new StackState(beforeStack, JSON.parse(JSON.stringify(currentStack)), stackData));
        }
    }
    
    for(let i = 0; i < stackStates.length; i++) {
        if(i === stackStates.length - 1) {
            console.log(stackStates[i]);
          //console.log(JSON.stringify(stackStates[i], null, 2));
        } else {
          console.log(stackStates[i]);
        }
      }
}

// // The third command line argument (index 2) is the first relevant input.
// let input = process.argv[2];

// // Call the function with the command line input
// testScriptData(input);
