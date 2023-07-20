import { OP_CODE } from ".";
import { StartStack } from "./StartStack";
import { StartStackV2 } from "./StartStackV2";

export class OpCodes extends StartStackV2 {
  startDrawStack() {
    // we need to check if there is a op code in the stack
    // if there is an op code than we can assume that we need two containers
    // if there is no op code than we can assume that we need one container
    // we need to check if there is a op code in the stack

    if (this.opCode) {
      // need to draw two containers
      this.drawStack(0);
      this.drawStack(3);

      // need to draw anything in before stack
      this.drawBeforeStack();

      // start the animation of whatever starts
      this.startStack();
    } else {
      this.drawStack(0);
      this.startStack();
      // need to draw just one
    }
  }

  private async dupOpCode(opCode: OP_CODE) {
    try {
      // first step show for the opCOde
      // animate op in
      const one = await this.addOpCodeToStack(opCode, 0, 1);

      // since this is a dup we need to pop the top item from stack
      const two = await this.popStackDataFromColumn(
        this.beforeStack.length - 1,
        0,
        1,
        1
      );

      // then add the next two to the "result stack"
      const three = await this.addResultDataToStack(this.currentStack[0], 0, 2);
      const four = await this.addResultDataToStack(this.currentStack[1], 1, 2);

      // then we need to pop the last two back result back to the current container
      const five = await this.popStackDataFromColumn(1, 2, 0, 3);
      const six = await this.popStackDataFromColumn(0, 2, 1, 3);
    } catch (err) {
      console.log("err  ", err);
    }
  }
  async startStack() {
    // we need to check what we are putting into what

    // check if there an op or stack data
    try {
      if (this.opCode) {
        // start whatever op  needs to run
        // in our initial it's going to be dup

        await this.dupOpCode(this.opCode);
        // move to the next step "auto next"
        //this.goForward();
      } else {
        // we are adding data to our initial stack
        const stackData = this.stackData;

        if (stackData) {
          // ensure there is a stack data to add to the stack
          await this.addScriptDataToStack(stackData, 0, 0);
          // move to next step
          //this.goForward();
        } else {
          console.log("there is not an op code or stack data???");
        }
      }
    } catch (err) {
      console.log("startStackm - err", err);
    }
  }

  async setNewDataStack(newIndex: number) {
    this.svg.selectAll("*").remove();
    const scriptStack = this.scriptStackSteps[newIndex];

    this.beforeStack = scriptStack.beforeStack;
    this.currentStack = scriptStack.currentStack;

    this.stackData = scriptStack.stackData;
    this.opCode = scriptStack.opCode;
    this.step = newIndex;

    const columns = this.currentStack.length;
    console.log(columns);

    if (scriptStack.opCode) {
      this.COLUMN_WIDTH = this.width / 4;
    } else {
      this.COLUMN_WIDTH = this.width;
    }

    this.HALF_COLUMN_WIDTH = this.COLUMN_WIDTH / 2;

    this.startDrawStack();
  }
  async goBack() {
    // ensure we can go back
    if (this.step > 0) {
      // console.log("can go back")

      this.setNewDataStack(this.step - 1);
    }
  }
  async goForward() {
    if (this.step < this.scriptStackSteps.length - 1) {
      console.log("can go forward");

      this.setNewDataStack(this.step + 1);
    }
  }
}
