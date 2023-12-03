import { OP_Code } from "./op_code";
import { ScriptData } from "./scriptdata";
import { StackState, TxData } from "./stackstate";

// Main function that takes in a string of space-separated opcodes or data
export function testScriptData(input: string, txData?: TxData) {
  let splitInput = input.split(" ");
  console.log('running code through', splitInput)
  let currentStack: Array<ScriptData> = [];
  // An array of StackState objects, which should be used to animate the stack
  let stackStates: Array<StackState> = [];
  let inIfBlock = false;
  let executeIfBlock = false;
  let testTransactionData: TxData = {
    inputs: [],
    outputs: [],
    version: "1",
    timelock: "0",
    currentInputIndex: 0,
  };

  //console.log("testTransactionData: ", testTransactionData);

  let i; // loop index
  try {
    for (let i = 0; i < splitInput.length; i++) {
      //console.log("hi");
      let element = splitInput[i];
      //console.log("element: " + element);
      let opCode = OP_Code.opCodeMap[element];
      let beforeStack = JSON.parse(JSON.stringify(currentStack));
      let stackData: ScriptData | undefined;

      if (opCode) {
        //console.log("opCode loop is running: " + i);
        if (opCode.name === "OP_IF") {
          inIfBlock = true;
          let topValue = currentStack.pop();
          executeIfBlock = topValue?.dataNumber !== 0;
        } else if (opCode.name === "OP_ELSE") {
          executeIfBlock = !executeIfBlock;
        } else if (opCode.name === "OP_ENDIF") {
          inIfBlock = false;
          executeIfBlock = false;
        } else if (/PUSH/.test(opCode.name)) {
          const byteExtraction = opCode.name.match(/\d+/g);
          const bytesExpected = byteExtraction
            ? parseInt(byteExtraction[0])
            : 0;
          // This was a push op_code which means everything should stay the expectedTxBytes field
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
        //console.log("other loop is running: " + i);
        let newElement: ScriptData;
        const decimalRegex = /^-?\d+(\.\d+)?$/;
        const hexRegex = /^(0x)?[0-9A-Fa-f]+$/;

        if (beforeStack.expectedTxBytes > 0) {
          console.log(
            "expecting item of bytes pushdata size " +
              beforeStack.expectedTxBytes
          );
        } else {
          console.log("not expecting any item, should return an error...");
          //throw Error("Data Push not preceded by any variation OP_PUSHDATA.");
        }

        if (decimalRegex.test(element)) {
          newElement = ScriptData.fromNumber(parseInt(element));
          if (!inIfBlock || (inIfBlock && executeIfBlock)) {
            currentStack.push(newElement);
          }
        } else if (hexRegex.test(element)) {
          newElement = ScriptData.fromHex(element);
          if (!inIfBlock || (inIfBlock && executeIfBlock)) {
            currentStack.push(newElement);
          }
        } else {
          newElement = ScriptData.fromString(element);
          if (!inIfBlock || (inIfBlock && executeIfBlock)) {
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
