import { Scene } from "./Scene";

export class ScriptControl extends Scene {
  drawBeforeStack() {
    this.drawStack(0);

    if (this.opCode) {
      this.drawStack(3, true);
    }
  }
  async timeout(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
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

    // this is where it's kinda tricky becuase we need to show the new stack con and add all the previous data to it
    // we need to select the hidden container and bring it back
    const rec = this.svg.selectAll(`.STACK-${3}`);
    rec.style("opacity", 1);

    this.beforeStack.forEach((stackData, stackIndex) => {
      this.drawStackData(stackData, stackIndex, 3);
    });
    // wait 1 seconds after shwoing the stack
    await this.timeout(1000);
    // create a simple async wait function
    // then pop the stack data from the before stack
    // mamke a basic async timeout

    await this.popStackDataFromColumn(0, 2, 2, 3);

    return true;
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
        this.drawStackData(stackData, stackIndex, 3);
      });
      // wait 1 seconds after shwoing the stack
      await this.timeout(1000);

      await this.popStackDataFromColumn(0, 2, currentStackCopy.length, 3);

      return true;
    } catch (err) {
      console.log("OP_HASH160 - err", err);
    }
  }

  async OP_EQUALVERIFY() {
    try {
      await this.addOpCodeToStack(0, 1);

      await this.popStackDataFromColumn(this.beforeStack.length - 1, 0, 1, 1);
      await this.popStackDataFromColumn(this.beforeStack.length - 2, 0, 2, 1);

      await this.drawEqualSign();

      await this.addResultDataToStack(
        {
          dataBinary: "any",
          dataBytes: "any",
          dataHex: "string",
          dataNumber: "TRUE",
          dataString: "TRUE",
        },
        0,
        2
      );

      const rec = this.svg.selectAll(`.STACK-${3}`);
      rec.style("opacity", 1);

      const currentStackCopy = [...this.currentStack];
      //remove the last item from the stack
      currentStackCopy.pop();
      currentStackCopy.pop();

      currentStackCopy.forEach((stackData, stackIndex) => {
        this.drawStackData(stackData, stackIndex, 3);
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
      return true;
    } catch (err) {
      console.log("handleOpCode - err", err);
    }
  }
  async start() {
    console.log("start step: ", this.step);
    try {
      this.drawBeforeStack();
      if (this.beforeStack.length > 0) {
        this.drawInitialStackData();
      }

      if (this.stackData) {
        await this.addScriptDataToStack();
      }
      if (this.opCode) {
        await this.handleOpCode();
      }
      if (this.step < 4) {
        await this.setScriptStep(this.step + 1);
      }
    } catch (err) {
      console.log("start - err", err);
    }
  }
  async setScriptStep(step: number) {
    try {
      this.handleStepFromClass(step);

      const removeAnimation = () => {
        return new Promise((resolve) => {
          this.svg
            .selectAll("*")
            .transition() // Apply transitions to smoothly change the properties
            .duration(750) // Duration of the animation in milliseconds (e.g., 1000ms = 1 second)
            .style("opacity", 0)
            .on("end", () => {
              resolve(true);
            });
        });
      };

      const deleteAnimation = () => {
        return new Promise((resolve) => {
          this.svg.selectAll("*").remove();

          resolve(true);
        });
      };

      const runRemoveAnimation = await removeAnimation();
      const runDeleteAnimation = await deleteAnimation();

      const scriptStack = this.scriptStackSteps[step];

      this.beforeStack = scriptStack.beforeStack;
      this.currentStack = scriptStack.currentStack;
      // this current stack OP CODE
      this.opCode = scriptStack.opCode;
      // this current stack stack data
      this.stackData = scriptStack.stackData;

      this.step = step;

      if (scriptStack.opCode) {
        this.COLUMN_WIDTH = this.width / 4;
        this.TOTAL_COLUMNS = 4;
        this.SQUARE_SIZE = this.COLUMN_WIDTH / 1.5;
      } else {
        this.TOTAL_COLUMNS = 1;
        this.COLUMN_WIDTH = this.width;
        this.SQUARE_SIZE = 200;
      }
      this.HALF_COLUMN_WIDTH = this.COLUMN_WIDTH / 2;

      this.start();
    } catch (err) {
      console.log("ScriptControls - setScriptStep - err", err);
    }
  }

  async goBack() {
    // ensure we can go back
    if (this.step > 0) {
      // console.log("can go back")

      this.setScriptStep(this.step - 1);
    }
  }
  async goForward() {
    if (this.step < this.scriptStackSteps.length - 1) {
      this.setScriptStep(this.step + 1);
    }
  }
  async goToStep(step: number) {
    // check that the step is valid
    if (step >= 0 && step < this.scriptStackSteps.length) {
      this.setScriptStep(step);
    }
  }

  async handlePause() {
    this.AUTO_PLAY = false;
    this.handleClassPauseCallBack(false);
  }

  async handlePlay() {
    this.AUTO_PLAY = true;
    this.handleClassPauseCallBack(true);
    //this.startStack();
  }
}
