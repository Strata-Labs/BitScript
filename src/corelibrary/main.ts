import { OP_Code } from "./op_code";
import { ScriptData } from "./scriptdata";
import { StackState, TxData } from "./stackstate";

// Main function that takes in a string of space-separated opcodes or data
export function testScriptData(input: string, txData?: TxData) {
  let splitInput = input.split(" ");
  let currentStack: Array<ScriptData> = [];
  // An array of StackState objects, which should be used to animate the stack
  let stackStates: Array<StackState> = [];
  let inIfBlock = false;
  let executeIfBlock = false;
  let isElse = false;
  let testTransactionData: TxData = {
    inputs: [],
    outputs: [],
    version: "1",
    timelock: "0",
    currentInputIndex: 0,
  };

  function shouldPushToStack(
    inIfBlock: boolean,
    executeIfBlock: boolean,
    isElse: boolean
  ): boolean {
    let shouldPush = false;

    if (inIfBlock && executeIfBlock) {
      // inIfBlock is true and executeIfBlock is true
      shouldPush = true;
    } else if (inIfBlock && !executeIfBlock && isElse) {
      // inIfBlock is true, executeIfBlock is false, and isElse is true
      shouldPush = true;
    } else if (!inIfBlock && !executeIfBlock && !isElse) {
      // inIfBlock is false, executeIfBlock is false, and isElse is false
      shouldPush = true;
    }
    return shouldPush;
  }


  let i; // loop index
  try {
    for (let i = 0; i < splitInput.length; i++) {
      let element = splitInput[i];
      let opCode = OP_Code.opCodeMap[element];
      let beforeStack = JSON.parse(JSON.stringify(currentStack));
      let stackData: ScriptData | undefined;

      if (opCode) {
        if (opCode.name === "OP_IF") {
          inIfBlock = true;
          let topValue = currentStack.pop();
          // executeIfBlock = topValue?.dataNumber !== 0;
          if (topValue?.dataNumber === 1) {
            executeIfBlock = true;
          } else {
            executeIfBlock = false;
          }
        } else if (opCode.name === "OP_ELSE") {
          if (inIfBlock && executeIfBlock) {
            executeIfBlock = false;
          } else {
            isElse = true;
          }
        } else if (opCode.name === "OP_ENDIF") {
          inIfBlock = false;
          executeIfBlock = false;
          isElse = false;
        } else if (/PUSH/.test(opCode.name)) {
          // check if the op_code is a push data op_code
          const byteExtraction = opCode.name.match(/\d+/g);
          const bytesExpected = byteExtraction
            ? parseInt(byteExtraction[0])
            : 0;
          // This was a push op_code which means everything should stay the expectedTxBytes field
          const pushToStack = shouldPushToStack(
            inIfBlock,
            executeIfBlock,
            isElse
          );
          if (pushToStack) {
            let [stack, toAdd, toRemove] = opCode.execute(
              currentStack,
              testTransactionData
            );
            currentStack = stack;
            stackStates.push(
              new StackState(
                beforeStack,
                JSON.parse(JSON.stringify(currentStack)),
                bytesExpected,
                undefined,
                opCode,
                testTransactionData
              )
            );
          }
        } else {
          let [stack, toAdd, toRemove] = opCode.execute(
            currentStack,
            testTransactionData
          );
          currentStack = stack;
          stackStates.push(
            new StackState(
              beforeStack,
              JSON.parse(JSON.stringify(currentStack)),
              0,
              undefined,
              opCode,
              testTransactionData
            )
          );
        }
      } else {
        let newElement: ScriptData;
        const decimalRegex = /^-?\d+(\.\d+)?$/;
        const hexRegex = /^(0x)?[0-9A-Fa-f]+$/;


        if (decimalRegex.test(element)) {
          newElement = ScriptData.fromNumber(parseInt(element));
          const pushToStack = shouldPushToStack(
            inIfBlock,
            executeIfBlock,
            isElse
          );
          if (pushToStack) {
            currentStack.push(newElement);
          }
          // if (!inIfBlock || (inIfBlock && executeIfBlock)) {
          //   currentStack.push(newElement);
          // }
        } else if (hexRegex.test(element)) {
          newElement = ScriptData.fromHex(element);
          const pushToStack = shouldPushToStack(
            inIfBlock,
            executeIfBlock,
            isElse
          );
          if (pushToStack) {
            currentStack.push(newElement);
          }
          // if (!inIfBlock || (inIfBlock && executeIfBlock)) {
          //   currentStack.push(newElement);
          // }
        } else {
          element = element.replace(/['"]+/g, "");
          newElement = ScriptData.fromString(element);
          const pushToStack = shouldPushToStack(
            inIfBlock,
            executeIfBlock,
            isElse
          );
          if (pushToStack) {
            currentStack.push(newElement);
          }

        }

        stackStates.push(
          new StackState(
            beforeStack,
            JSON.parse(JSON.stringify(currentStack)),
            0,
            stackData
          )
        );
      }
    }

    // Return the stackStates if there are no errors.
    return stackStates;
  } catch (error) {
    // Return the error & index.
    return { error: error, errorIndex: i };
  }
}

// The third command line argument (index 2) is the first relevant input.
// let input = process.argv[2];

// Call the function with the command line input
// testScriptData(input);
