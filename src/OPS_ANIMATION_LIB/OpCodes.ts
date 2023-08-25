import { COLUMN_TYPE, LIB_DATA_TYPE, MOVE_TYPE, OP_CODE, SCRIPT_DATA } from ".";
import { Scene } from "./Scene";

export class OpCodes extends Scene {
  startDrawStack() {
    // check if the there are containers

    if (this.containers) {
      this.containers.forEach((containerIndex) => {
        this.drawStack(containerIndex);
      });
    }

    //
    // draw the before stack
    // there are two possible places for before stack to show up
    // the first and only column
    // the 2nd column out of 4 columns

    this.mainStack.forEach((stackData, index) => {
      let columnIndex = 0;
      if (this.TOTAL_COLUMNS > 1) {
        columnIndex = 1;
      }
      if (stackData.libDataType === LIB_DATA_TYPE.SCRIPT_DATA) {
        this.addInitialDataToStack(
          stackData as SCRIPT_DATA,
          index,
          columnIndex
        );
      } else if (stackData.libDataType === LIB_DATA_TYPE.OP_CODE) {
        this.addInitialDataToStack(stackData as OP_CODE, index, columnIndex);
      }
    });

    this.resultStack.forEach((stackData, index) => {
      const columnIndex = 2;
      if (stackData.libDataType === LIB_DATA_TYPE.SCRIPT_DATA) {
        this.addInitialDataToStack(
          stackData as SCRIPT_DATA,
          index,
          columnIndex
        );
      } else if (stackData.libDataType === LIB_DATA_TYPE.OP_CODE) {
        this.addInitialDataToStack(stackData as OP_CODE, index, columnIndex);
      }
    });

    this.startStack();
  }

  async startStack() {
    try {
      // loop through the actions using the actionStep as the index

      while (this.actions.length - 1 >= this.actionStep) {
        if (this.AUTO_PLAY === false) {
          // should break if we are paused
          break;
        }
        // get the action we're showing
        const action = this.actions[this.actionStep];

        const mainStackIndex = this.TOTAL_COLUMNS > 1 ? 1 : 0;
        const resultStackIndex = this.TOTAL_COLUMNS > 1 ? 2 : 0;

        const i = this.actionStep;

        // check the action by the move type
        if (action.moveType === MOVE_TYPE.ADD_EQUAL) {
          //return await
          await this.drawEqualSign();
        } else if (action.moveType === MOVE_TYPE.ADD) {
          if (action.data.libDataType === LIB_DATA_TYPE.OP_CODE) {
            await this.addOpCodeToStack(
              action.data as OP_CODE,
              this.resultStack.length,
              action.to === COLUMN_TYPE.RESULT_STACK
                ? resultStackIndex
                : mainStackIndex
            );
          } else {
            if (action.to === COLUMN_TYPE.MAIN_STACK) {
              // check if there are any stack data that has been added to the main stack since the scene started
              // if so add the amount of times we have added to the main stack to the index

              const items = this.actions.filter((action, index) => {
                if (index < i && action.to === COLUMN_TYPE.MAIN_STACK) {
                  return true;
                } else {
                  return false;
                }
              });
              await this.addScriptDataToStack(
                action.data as SCRIPT_DATA,
                this.mainStack.length + items.length,
                mainStackIndex
              );
            } else if (action.to === COLUMN_TYPE.RESULT_STACK) {
              const items = this.actions.filter((action, index) => {
                if (index < i && action.to === COLUMN_TYPE.RESULT_STACK) {
                  return true;
                } else {
                  return false;
                }
              });

              await this.addResultDataToStack(
                action.data as SCRIPT_DATA,
                this.resultStack.length + items.length,
                resultStackIndex
              );
            }
          }
        } else if (action.moveType === MOVE_TYPE.MOVE_POP_ARROW) {
          const items = this.actions.filter((action, index) => {
            if (index < i && action.to === COLUMN_TYPE.RESULT_STACK) {
              return true;
            } else {
              return false;
            }
          });

          await this.popStackDataFromColumn(
            this.mainStack.length - 1,
            mainStackIndex,
            this.resultStack.length + items.length,
            resultStackIndex
          );
        } else if (action.moveType === MOVE_TYPE.DUPLICATE) {
          /*
           * if this is duplicating we have to assume some sort of OP_CODE triggered the duplicate s
           * this means we have to assume that the result stack has data in it
           * so we hard code currentStackIndex to 1
           */

          await this.duplicateStackData(
            action.data as SCRIPT_DATA,
            this.mainStack.length,
            mainStackIndex,
            1,
            resultStackIndex
          );
        }
        this.actionStep++;
      }

      // create a 3 second delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (this.AUTO_PLAY === true) {
        await this.goForward();
      } else {
        return false;
      }
    } catch (err) {
      console.log("startStackm - err", err);
    }
  }
  async setNewDataStack(newIndex: number) {
    try {
      this.handleStepFromClass(newIndex);
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

      //4d412760f4be0939fa91cec1b2d635d73ca78355

      const runThing = await removeAnimation();
      const deleteSVG = await deleteAnimation();

      const opCodeStackStep = this.opCodeStackSteps[newIndex];

      this.mainStack = opCodeStackStep.mainStack;
      this.resultStack = opCodeStackStep.resultStack;
      this.actions = opCodeStackStep.actions;
      this.containers = opCodeStackStep.containers;

      this.step = newIndex;
      this.actionStep = 0;
      const hasResultStackDestination =
        opCodeStackStep.actions.filter(
          (action) => action.to === COLUMN_TYPE.RESULT_STACK
        ).length > 0;

      if (opCodeStackStep.resultStack.length > 0 || hasResultStackDestination) {
        // draw 4 columns
        this.COLUMN_WIDTH = this.width / 4;
        this.TOTAL_COLUMNS = 4;
        this.SQUARE_SIZE = this.COLUMN_WIDTH / 1.5;
      } else {
        this.TOTAL_COLUMNS = 1;
        this.COLUMN_WIDTH = this.width;
      }

      this.HALF_COLUMN_WIDTH = this.COLUMN_WIDTH / 2;

      this.startDrawStack();
    } catch (err) {
      console.log(" setNewDataStack err", err);
    }
  }
  async goBack() {
    // ensure we can go back
    if (this.step > 0) {
      // console.log("can go back")

      this.setNewDataStack(this.step - 1);
    }
  }
  async goForward() {
    if (this.step < this.opCodeStackSteps.length - 1) {
      this.setNewDataStack(this.step + 1);
    }
  }
  async goToStep(step: number) {
    // check that the step is valid
    console.log("step", step);
    console.log("this.opCodeStackSteps.length", this.opCodeStackSteps.length);

    if (step >= 0 && step < this.opCodeStackSteps.length) {
      console.log("als;djf");
      this.setNewDataStack(step);
    }
  }

  async handlePause() {
    this.AUTO_PLAY = false;
    this.handleClassPauseCallBack(false);
  }

  async handlePlay() {
    this.AUTO_PLAY = true;
    this.handleClassPauseCallBack(true);
    this.startStack();
  }
}
