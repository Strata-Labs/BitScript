import { COLUMN_TYPE, LIB_DATA_TYPE, MOVE_TYPE, OP_CODE, SCRIPT_DATA } from ".";
import { Scene } from "./Scene";

export class OpCodes extends Scene {
  startDrawStack() {
    // check if the there are containers

    console.log("draw stack");
    if (this.containers) {
      console.log("this.COLUMN_WIDTH;", this.COLUMN_WIDTH);
      this.containers.forEach((containerIndex) => {
        this.drawStack(containerIndex);
      });
    }

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
      const actions = this.actions.map((action, i) => {
        const mainStackIndex = this.TOTAL_COLUMNS > 1 ? 1 : 0;
        const resultStackIndex = this.TOTAL_COLUMNS > 1 ? 2 : 0;
        if (action.moveType === MOVE_TYPE.ADD) {
          if (action.data.libDataType === LIB_DATA_TYPE.OP_CODE) {
            this.addOpCodeToStack(
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
              this.addScriptDataToStack(
                action.data as SCRIPT_DATA,
                this.mainStack.length + items.length,
                mainStackIndex
              );
            } else {
              if (action.to === COLUMN_TYPE.RESULT_STACK) {
                const items = this.actions.filter((action, index) => {
                  if (index < i && action.to === COLUMN_TYPE.RESULT_STACK) {
                    return true;
                  } else {
                    return false;
                  }
                });
                console.log("items", items);

                this.addScriptDataToStack(
                  action.data as SCRIPT_DATA,
                  this.resultStack.length + items.length,
                  resultStackIndex
                );
              }
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
          console.log("items", items);
          this.popStackDataFromColumn(
            this.mainStack.length - 1,
            mainStackIndex,

            this.resultStack.length + items.length,
            resultStackIndex
          );
        }
      });
      // start whatever op  needs to run
      // in our initial it's going to be dup
      // move to the next step "auto next"
      //this.goForward();
      const getIT = await Promise.all(actions);
      //await this.goForward();
    } catch (err) {
      console.log("startStackm - err", err);
    }
  }

  async setNewDataStack(newIndex: number) {
    this.svg.selectAll("*").remove();
    const opCodeStackStep = this.opCodeStackSteps[newIndex];

    this.mainStack = opCodeStackStep.mainStack;
    this.resultStack = opCodeStackStep.resultStack;
    this.actions = opCodeStackStep.actions;
    this.containers = opCodeStackStep.containers;

    this.step = newIndex;

    const hasResultStackDestination =
      opCodeStackStep.actions.filter(
        (action) => action.to === COLUMN_TYPE.RESULT_STACK
      ).length > 0;
    console.log("hasResultStackDestination", hasResultStackDestination);
    console.log(
      "opCodeStackStep.resultStack.length",
      opCodeStackStep.resultStack.length
    );
    if (opCodeStackStep.resultStack.length > 0 || hasResultStackDestination) {
      // draw 4 columns
      this.COLUMN_WIDTH = this.width / 4;
      this.TOTAL_COLUMNS = 4;
    } else {
      console.log("should only be showing one column");
      this.TOTAL_COLUMNS = 1;
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
    if (this.step < this.opCodeStackSteps.length - 1) {
      console.log("can go forward");

      this.setNewDataStack(this.step + 1);
    }
  }
}
