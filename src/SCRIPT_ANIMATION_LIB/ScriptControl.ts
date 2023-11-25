import { OPS } from "./OPS";

export class ScriptControl extends OPS {
  drawBeforeStack() {
    this.drawStack(0);

    if (this.opCode) {
      this.drawStack(3, true);
    }
  }

  async start() {
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
      if (this.step <= this.scriptStackSteps.length - 2) {
        if (this.AUTO_PLAY === false) {
          // should break if we are paused
          return false;
        }

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

      console.log('setting script step to', step)
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
    console.log('hitting pause')
    this.AUTO_PLAY = false;
    this.handleClassPauseCallBack(false);
  }

  async handlePlay() {
    console.log('hitting play')
    this.AUTO_PLAY = true;
    this.handleClassPauseCallBack(true);
    this.start();
  }
}
