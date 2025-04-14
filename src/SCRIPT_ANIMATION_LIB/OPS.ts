import { ScriptData } from "@/corelibrary/scriptdata";
import { Scene } from "./Scene";

export class OPS extends Scene {
  private async timeout(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async handleOpCode() {
    try {
      const opCode = this.opCode;
      if (!opCode) return false;

      if (opCode.name === "OP_DUP") {
        // here is where we have to call the OP_DUP animation
        await this.OP_DUP();
      }
      if (opCode.name === "OP_HASH160") {
        // here is where we have to call the OP_DUP animation
        await this.OP_HASH160();
      }

      if (opCode.name === "OP_EQUALVERIFY") {
        await this.OP_EQUALVERIFY();
      }

      if (opCode.name === "OP_CHECKSIG") {
        await this.OP_CHECKSIG();
      }
      if (opCode.name === "OP_EQUAL") {
        await this.OP_EQUAL();
      }
      if (opCode.name === "OP_20") {
        await this.OP_20();
      }
      if (opCode.name === "OP_DECODE") {
        await this.decodeWitness("witness");
      }
      if (opCode.name === "OP_DECODEWITNESSSCRIPT") {
        await this.decodeWitness("WitnessScript");
      }
      if (opCode.name === "OP_DECODESCRIPTPUBKEY") {
        await this.decodeScriptPubkey();
      }
      if (opCode.name === "OP_SHA256") {
        await this.OP_SHA256();
      }
      if (opCode.name === "OP_HASH256") {
        await this.OP_HASH256();
      }
      if (opCode.name === "OP_DESERIALIZE") {
        await this.OP_TAPROOT();
      }
      if (opCode.name === "OP_VALIDATE") {
        await this.OP_VALIDATE();
      }
      if (opCode.name === "OP_EXECUTE") {
        await this.OP_EXECUTE();
      }
      if (opCode.name === "OP_CHECKLOCKTIMEVERIFY") {
        await this.OP_CHECKLOCKTIMEVERIFY();
      }
      if (opCode.name === "OP_CHECKMULTISIG") {
        await this.OP_CHECKMULTISIG();
      }
      return true;
    } catch (err) {
      console.log("handleOpCode - err", err);
    }
  }

  async OP_HASH160() {
    try {
      await this.addOpCodeToStack(0, 1);

      await this.popStackDataFromColumn(this.beforeStack.length - 1, 0, 1, 1);

      await this.drawEqualSign();

      await this.addResultDataToStack(
        this.currentStack[this.currentStack.length - 1],
        0,
        2
      );

      const rec = this.svg.selectAll(`.STACK-${3}`);
      rec.style("opacity", 1);

      const currentStackCopy = [...this.currentStack];
      //remove the last item from the stack
      currentStackCopy.pop();

      currentStackCopy.forEach((stackData, stackIndex) => {
        this.drawResultStack(stackData, stackIndex, 3);
      });
      // wait 1 seconds after shwoing the stack
      await this.timeout(1000);

      await this.popStackDataFromColumn(0, 2, currentStackCopy.length, 3);

      return true;
    } catch (err) {
      console.log("OP_HASH160 - err", err);
    }
  }

  async OP_SHA256() {
    try {
      await this.addOpCodeToStack(0, 1);

      await this.popStackDataFromColumn(this.beforeStack.length - 1, 0, 1, 1);
      // await this.popStackDataFromColumn(this.beforeStack.length - 2, 0, 2, 1);

      await this.drawEqualSign();

      await this.addResultDataToStack(
        this.currentStack[this.currentStack.length - 1],
        0,
        2
      );

      const rec = this.svg.selectAll(`.STACK-${3}`);
      rec.style("opacity", 1);

      const currentStackCopy = [...this.beforeStack];
      //remove the last item from the stack
      currentStackCopy.pop();
      // currentStackCopy.pop();

      currentStackCopy.forEach((stackData, stackIndex) => {
        this.drawResultStack(stackData, stackIndex, 3);
      });
      // wait 1 seconds after shwoing the stack
      await this.timeout(1000);

      await this.popStackDataFromColumn(0, 2, currentStackCopy.length, 3);

      return true;
    } catch (err) {
      console.log("OP_HASH160 - err", err);
    }
  }

  async OP_HASH256() {
    try {
      await this.addOpCodeToStack(0, 1);

      await this.popStackDataFromColumn(this.beforeStack.length - 1, 0, 1, 1);

      await this.drawEqualSign();

      await this.addResultDataToStack(
        this.currentStack[this.currentStack.length - 1],
        0,
        2
      );

      const rec = this.svg.selectAll(`.STACK-${3}`);
      rec.style("opacity", 1);

      const currentStackCopy = [...this.beforeStack];
      //remove the last item from the stack
      currentStackCopy.pop();

      currentStackCopy.forEach((stackData, stackIndex) => {
        this.drawResultStack(stackData, stackIndex, 3);
      });
      // wait 1 seconds after shwoing the stack
      await this.timeout(1000);

      await this.popStackDataFromColumn(0, 2, currentStackCopy.length, 3);

      return true;
    } catch (err) {
      console.log("OP_HASH160 - err", err);
    }
  }

  // for the time being we'll have the OP DUP animation here
  async OP_DUP() {
    // create a copy of the top item in the stack and then add it to the stack
    await this.addOpCodeToStack(0, 1);

    // then duplicate the value from the top and add it to the "result stack"
    await this.duplicateStackData(
      this.beforeStack[this.beforeStack.length - 1],
      this.beforeStack.length,
      0,
      1,
      1
    );

    await this.drawEqualSign();

    await this.addResultDataToStack(
      this.beforeStack[this.beforeStack.length - 1],
      0,
      2
    );

    // this is where it's kinda tricky because we need to show the new stack con and add all the previous data to it
    // we need to select the hidden container and bring it back
    const rec = this.svg.selectAll(`.STACK-${3}`);
    rec.transition().duration(750).style("opacity", 1);
    //rec.style("opacity", 1);

    this.beforeStack.forEach((stackData, stackIndex) => {
      this.drawResultStack(stackData, stackIndex, 3);
    });
    // wait 1 seconds after showing the stack
    await this.timeout(1000);
    // create a simple async wait function
    // then pop the stack data from the before stack
    // mamke a basic async timeout

    await this.popStackDataFromColumn(0, 2, 2, 3);

    return true;
  }

  async OP_EQUALVERIFY() {
    try {
      await this.addOpCodeToStack(0, 1);

      await this.popStackDataFromColumn(this.beforeStack.length - 1, 0, 1, 1);
      await this.popStackDataFromColumn(this.beforeStack.length - 2, 0, 2, 1);

      await this.drawEqualSign();

      await this.addResultDataToStack(
        this.currentStack[this.currentStack.length - 1],

        0,
        2
      );

      const rec = this.svg.selectAll(`.STACK-${3}`);
      rec.style("opacity", 1);

      const currentStackCopy = [...this.currentStack];
      //remove the last item from the stack
      currentStackCopy.pop();
      currentStackCopy.pop();
      currentStackCopy.pop();

      currentStackCopy.forEach((stackData, stackIndex) => {
        this.drawResultStack(stackData, stackIndex, 3);
      });
      // wait 1 seconds after shwoing the stack
      await this.timeout(1000);

      await this.popStackDataFromColumn(0, 2, currentStackCopy.length, 3);

      return true;
    } catch (err) {
      console.log("OP_EQUALVERIFY - err", err);
      return false;
    }
  }
  async OP_CHECKSIG() {
    try {
      await this.addOpCodeToStack(0, 1);
      await this.popStackDataFromColumn(this.beforeStack.length - 1, 0, 1, 1);
      await this.popStackDataFromColumn(this.beforeStack.length - 2, 0, 2, 1);

      await this.drawEqualSign();

      await this.addResultDataToStack(ScriptData.fromString("1") as any, 0, 2);

      const rec = this.svg.selectAll(`.STACK-${3}`);
      rec.style("opacity", 1);

      const currentStackCopy = [...this.currentStack];
      //remove the last item from the stack
      currentStackCopy.pop();
      currentStackCopy.pop();

      currentStackCopy.forEach((stackData, stackIndex) => {
        this.drawResultStack(stackData, stackIndex, 3);
      });

      // wait 1 seconds after shwoing the stack
      await this.timeout(1000);

      await this.popStackDataFromColumn(0, 2, currentStackCopy.length, 3);
    } catch (err) {
      console.log("OP_CHECKSIG - err", err);
    }
  }
  async OP_EQUAL() {
    try {
      await this.addOpCodeToStack(0, 1);

      await this.popStackDataFromColumn(this.beforeStack.length - 1, 0, 1, 1);
      await this.popStackDataFromColumn(this.beforeStack.length - 2, 0, 2, 1);

      await this.drawEqualSign();

      await this.addResultDataToStack(ScriptData.fromString("1") as any, 0, 2);

      const rec = this.svg.selectAll(`.STACK-${3}`);
      rec.style("opacity", 1);

      const currentStackCopy = [...this.currentStack];
      //remove the last item from the stack
      currentStackCopy.pop();
      currentStackCopy.pop();

      currentStackCopy.forEach((stackData, stackIndex) => {
        this.drawResultStack(stackData, stackIndex, 3);
      });
      // wait 1 seconds after shwoing the stack
      await this.timeout(1000);

      await this.popStackDataFromColumn(0, 2, currentStackCopy.length, 3);

      return true;
    } catch (err) {
      console.log("OP_EQUAL - err", err);
      return false;
    }
  }
  async OP_20() {
    try {
      await this.addOpCodeToStack(0, 1);

      await this.drawEqualSign();

      await this.addResultDataToStack(
        this.currentStack[this.currentStack.length - 1],
        0,
        2
      );

      const rec = this.svg.selectAll(`.STACK-${3}`);
      rec.style("opacity", 1);

      const currentStackCopy = [...this.currentStack];
      //remove the last item from the stack
      currentStackCopy.pop();

      currentStackCopy.forEach((stackData, stackIndex) => {
        this.drawResultStack(stackData, stackIndex, 3);
      });
      // wait 1 seconds after shwoing the stack
      await this.timeout(1000);

      await this.popStackDataFromColumn(0, 2, currentStackCopy.length, 3);

      return true;
    } catch (err) {
      console.log("OP_EQUAL - err", err);
      return false;
    }
  }
  async OP_DECODEWITNESS() {
    try {
      await this.addOpCodeToStack(0, 1);

      await this.popStackDataFromColumn(this.beforeStack.length - 1, 0, 1, 1);

      await this.drawEqualSign();

      // try to find a way to keep track of the items that were added.
      // then you design the stack to accomodate them.

      await this.addResultDataToStack(
        this.currentStack[this.currentStack.length - 1],
        0,
        2
      );
      await this.addResultDataToStack(
        this.currentStack[this.currentStack.length - 2],
        1,
        2
      );

      const rec = this.svg.selectAll(`.STACK-${3}`);
      rec.style("opacity", 1);

      const currentStackCopy = [...this.currentStack];
      console.log("this is the stack copy: ", currentStackCopy);
      //remove the last item from the stack
      currentStackCopy.pop();
      currentStackCopy.pop();

      currentStackCopy.forEach((stackData, stackIndex) => {
        this.drawResultStack(stackData, stackIndex, 3);
      });
      // wait 1 seconds after shwoing the stack
      await this.timeout(1000);

      await this.popStackDataFromColumn(1, 2, currentStackCopy.length, 3);
      await this.popStackDataFromColumn(0, 2, currentStackCopy.length + 1, 3);

      return true;
    } catch (err) {
      console.log("OP_EQUAL - err", err);
      return false;
    }
  }

  async OP_TAPROOT() {
    try {
      await this.addOpCodeToStack(0, 1);

      await this.popStackDataFromColumn(this.beforeStack.length - 1, 0, 1, 1);

      await this.drawEqualSign();

      // try to find a way to keep track of the items that were added.
      // then you design the stack to accomodate them.

      await this.addResultDataToStack(
        this.currentStack[this.currentStack.length - 1],
        0,
        2
      );
      await this.addResultDataToStack(
        this.currentStack[this.currentStack.length - 2],
        1,
        2
      );

      const rec = this.svg.selectAll(`.STACK-${3}`);
      rec.style("opacity", 1);

      const currentStackCopy = [...this.currentStack];
      //remove the last item from the stack
      currentStackCopy.pop();
      currentStackCopy.pop();

      currentStackCopy.forEach((stackData, stackIndex) => {
        this.drawResultStack(stackData, stackIndex, 3);
      });
      // wait 1 seconds after shwoing the stack
      await this.timeout(1000);

      await this.popStackDataFromColumn(1, 2, currentStackCopy.length, 3);

      return true;
    } catch (err) {
      console.log("OP_EQUAL - err", err);
      return false;
    }
  }

  async OP_VALIDATE() {
    try {
      await this.addOpCodeToStack(0, 1);

      await this.popStackDataFromColumn(this.beforeStack.length - 1, 0, 1, 1);
      await this.popStackDataFromColumn(this.beforeStack.length - 2, 0, 2, 1);
      await this.popStackDataFromColumn(this.beforeStack.length - 3, 0, 3, 1);

      await this.drawEqualSign();

      await this.addResultDataToStack(
        this.currentStack[this.currentStack.length - 1],
        0,
        2
      );

      const rec = this.svg.selectAll(`.STACK-${3}`);
      rec.style("opacity", 1);

      const currentStackCopy = [...this.beforeStack];
      //remove the last item from the stack
      currentStackCopy.pop();
      currentStackCopy.pop();

      currentStackCopy.forEach((stackData, stackIndex) => {
        this.drawResultStack(stackData, stackIndex, 3);
      });
      // wait 1 seconds after shwoing the stack
      await this.timeout(1000);

      await this.popStackDataFromColumn(0, 2, currentStackCopy.length, 3);

      return true;
    } catch (err) {
      console.log("OP_EQUAL - err", err);
      return false;
    }
  }
  async OP_EXECUTE() {
    try {
      await this.addOpCodeToStack(0, 1);

      await this.popStackDataFromColumn(this.beforeStack.length - 1, 0, 1, 1);

      await this.drawEqualSign();

      await this.addResultDataToStack(
        this.currentStack[this.currentStack.length - 1],
        0,
        2
      );

      const rec = this.svg.selectAll(`.STACK-${3}`);
      rec.style("opacity", 1);

      const currentStackCopy = [...this.beforeStack];
      //remove the last item from the stack
      currentStackCopy.pop();

      currentStackCopy.forEach((stackData, stackIndex) => {
        this.drawResultStack(stackData, stackIndex, 3);
      });
      // wait 1 seconds after shwoing the stack
      await this.timeout(1000);

      await this.popStackDataFromColumn(0, 2, currentStackCopy.length, 3);

      return true;
    } catch (err) {
      console.log("OP_EQUAL - err", err);
      return false;
    }
  }

  async OP_CHECKLOCKTIMEVERIFY() {
    try {
      await this.addOpCodeToStack(0, 1);

      await this.popStackDataFromColumn(this.beforeStack.length - 1, 0, 1, 1);

      await this.drawEqualSign();

      await this.addResultDataToStack(
        this.currentStack[this.currentStack.length - 1],
        0,
        2
      );

      const rec = this.svg.selectAll(`.STACK-${3}`);
      rec.style("opacity", 1);

      const currentStackCopy = [...this.beforeStack];
      //remove the last item from the stack
      currentStackCopy.pop();

      currentStackCopy.forEach((stackData, stackIndex) => {
        this.drawResultStack(stackData, stackIndex, 3);
      });
      // wait 1 seconds after shwoing the stack
      await this.timeout(1000);

      await this.popStackDataFromColumn(0, 2, currentStackCopy.length, 3);

      return true;
    } catch (err) {
      console.log("OP_EQUAL - err", err);
      return false;
    }
  }

  async OP_CHECKMULTISIG() {
    try {
      await this.addOpCodeToStack(0, 1);

      await this.addItemToColumn(1, 1, "3");
      await this.addItemToColumn(2, 1, "publickey3");
      await this.addItemToColumn(3, 1, "publickey2");
      await this.addItemToColumn(4, 1, "publickey1");
      await this.addItemToColumn(5, 1, "2");

      await this.popStackDataFromColumn(this.beforeStack.length - 1, 0, 6, 1);
      await this.popStackDataFromColumn(this.beforeStack.length - 2, 0, 7, 1);

      await this.drawEqualSign();

      await this.addResultDataToStack(
        this.currentStack[this.currentStack.length - 1],
        0,
        2
      );

      const rec = this.svg.selectAll(`.STACK-${3}`);
      rec.style("opacity", 1);

      const currentStackCopy = [...this.currentStack];
      //remove the last item from the stack
      currentStackCopy.pop();

      currentStackCopy.forEach((stackData, stackIndex) => {
        this.drawResultStack(stackData, stackIndex, 3);
      });
      // wait 1 seconds after shwoing the stack
      await this.timeout(1000);

      await this.popStackDataFromColumn(0, 2, currentStackCopy.length, 3);

      return true;
    } catch (err) {
      console.log("OP_EQUAL - err", err);
      return false;
    }
  }

  async decodeWitness(item: string) {
    try {
      await this.addOpCodeToStack(0, 1, "decode");

      await this.addItemToColumn(1, 1, item);

      await this.drawEqualSign();

      await this.addResultDataToStack(
        this.currentStack[this.currentStack.length - 1],
        0,
        2
      );
      await this.addResultDataToStack(
        this.currentStack[this.currentStack.length - 2],
        1,
        2
      );

      const rec = this.svg.selectAll(`.STACK-${3}`);
      rec.style("opacity", 1);

      const currentStackCopy = [...this.currentStack];
      //remove the last item from the stack
      currentStackCopy.pop();
      currentStackCopy.pop();

      currentStackCopy.forEach((stackData, stackIndex) => {
        this.drawResultStack(stackData, stackIndex, 3);
      });
      // wait 1 seconds after shwoing the stack
      await this.timeout(1000);

      await this.popStackDataFromColumn(1, 2, currentStackCopy.length, 3);
      await this.popStackDataFromColumn(0, 2, currentStackCopy.length + 1, 3);

      return true;
    } catch (err) {
      console.log("OP_EQUAL - err", err);
      return false;
    }
  }

  async decodeScriptPubkey() {
    try {
      await this.addOpCodeToStack(0, 1, "decode");

      await this.addItemToColumn(1, 1, "ScriptPubKey");

      await this.drawEqualSign();

      await this.addResultDataToStack(
        this.currentStack[this.currentStack.length - 1],
        0,
        2
      );
      await this.addResultDataToStack(
        this.currentStack[this.currentStack.length - 2],
        1,
        2
      );

      const rec = this.svg.selectAll(`.STACK-${3}`);
      rec.style("opacity", 1);

      const currentStackCopy = [...this.currentStack];
      //remove the last item from the stack
      currentStackCopy.pop();
      currentStackCopy.pop();

      currentStackCopy.forEach((stackData, stackIndex) => {
        this.drawResultStack(stackData, stackIndex, 3);
      });
      // wait 1 seconds after shwoing the stack
      await this.timeout(1000);

      await this.popStackDataFromColumn(1, 2, currentStackCopy.length, 3);

      return true;
    } catch (err) {
      console.log("OP_EQUAL - err", err);
      return false;
    }
  }
}
