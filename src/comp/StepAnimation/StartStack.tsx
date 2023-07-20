import { BaseLine, OP_CODE, SCRIPT_DATA } from ".";

import * as d3 from "d3";
export const SQUARE_SIZE = 100;
export const STACK_DATA_COLOR = "#1D267D";
export const BLOCK_ITEM_HEIGHT = SQUARE_SIZE * 0.25;
export const BLOCK_WIDTH = SQUARE_SIZE * 0.8;
export const HALF_SQUARE = SQUARE_SIZE / 2;

export class StartStack extends BaseLine {
  drawBeforeStack() {
    // check if op code
    if (this.opCode) {
      this.beforeStack.forEach((stackData, index) => {
        this.addInitialDataToStack(stackData, index);
      });
    }
  }
  addInitialDataToStack(stackData: SCRIPT_DATA, dataItemsLength: number) {
    let startX = this.COLUMN_WIDTH * dataItemsLength;
    let finalYPosition = 0;

    const CONTAINER_TOP_LEFT_Y = this.height - SQUARE_SIZE * 1.25;
    const CONTAINER_BOTTOM_LEFT_Y = CONTAINER_TOP_LEFT_Y + SQUARE_SIZE * 1.15;

    finalYPosition =
      CONTAINER_BOTTOM_LEFT_Y -
      BLOCK_ITEM_HEIGHT * 1.25 * (dataItemsLength + 2);
    const finalXPosition = this.COLUMN_WIDTH / 2 - BLOCK_WIDTH / 2 + startX;

    const rec = this.svg
      .append("rect")

      .attr("width", BLOCK_WIDTH)
      .attr("height", BLOCK_ITEM_HEIGHT)
      .attr("fill", STACK_DATA_COLOR)
      .classed(stackData.className || "", true)

      .attr("x", finalXPosition)

      .attr("y", finalYPosition);

    const text = this.svg
      .append("text")
      .text(stackData?.dataString || stackData?.dataNumber || "")
      .attr("fill", "white")

      .classed(`${stackData.className}-text`, true)

      .attr("x", finalXPosition + BLOCK_WIDTH / 2)

      .attr("y", finalYPosition + BLOCK_ITEM_HEIGHT / 1.5);
  }

  async addOpCodeToStack(opCode: OP_CODE, dataItemsLength: number) {
    try {
      const stackLength = dataItemsLength;
      const nodeData = {
        ...opCode,
        className: `COLUMN-1-${stackLength}`,
      };
      const finalXPosition =
        this.COLUMN_WIDTH / 2 - BLOCK_WIDTH / 2 + this.width / 4;
      let finalYPosition = 0;

      const CONTAINER_TOP_LEFT_Y = this.height - SQUARE_SIZE * 1.25;
      const CONTAINER_BOTTOM_LEFT_Y = CONTAINER_TOP_LEFT_Y + SQUARE_SIZE * 0.95;

      if (stackLength === 0) {
        finalYPosition = CONTAINER_BOTTOM_LEFT_Y - BLOCK_ITEM_HEIGHT * 1.4;
      } else {
        finalYPosition =
          CONTAINER_BOTTOM_LEFT_Y - BLOCK_ITEM_HEIGHT * 1.4 * (stackLength + 1);
      }

      const startY = finalYPosition - 140;
      const startX = finalXPosition - 100;

      const blockProimse = () => {
        return new Promise((resolve, reject) => {
          const rec = this.svg
            .append("rect")
            .attr("x", startX)
            .attr("y", startY)
            .attr("width", BLOCK_WIDTH)
            .attr("height", BLOCK_ITEM_HEIGHT)
            .attr("fill", "#5C469C")
            .classed(`COLUMN-0-${stackLength}`, true)
            .transition()
            .duration(500)
            .attr("x", finalXPosition)
            .transition()
            .duration(1000)
            .attr("y", finalYPosition)
            .on("end", () => {
              resolve(true);
            });
        });
      };

      const textPromise = () => {
        return new Promise((resolve, reject) => {
          const text = this.svg
            .append("text")
            .text(opCode?.name)
            .attr("fill", "white")
            .attr("x", startX + BLOCK_ITEM_HEIGHT / 4)
            .attr("y", startY + BLOCK_ITEM_HEIGHT / 1.5)

            .classed(`COLUMN-0-${stackLength}-text`, true)
            .transition()
            .duration(500)
            .attr("x", finalXPosition + BLOCK_WIDTH / 4)
            .transition()
            .duration(1000)
            .attr("y", finalYPosition + BLOCK_ITEM_HEIGHT / 1.5)
            .on("end", () => {
              resolve(true);
            });
        });
      };

      const getIT = await Promise.all([blockProimse(), textPromise()]);
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }
  async addResultDataToStack(scriptData: SCRIPT_DATA, dataItemsLength: number) {
    /*
     should be almost identical to addDataToStack
     * biggest change is no arrow to the data stack
     * instead of coming in from the left it comes directly from the bottom
     * 
    */
    try {
      const stackData = scriptData;
      const stackLength = dataItemsLength;

      const nodeData = {
        ...stackData,
        className: `COLUMN-2-${stackLength}`,
      };

      const finalXPosition =
        this.COLUMN_WIDTH / 2 - BLOCK_WIDTH / 2 + this.COLUMN_WIDTH * 2;
      let finalYPosition = 0;

      const CONTAINER_TOP_LEFT_Y = this.height - SQUARE_SIZE * 1.25;
      const CONTAINER_BOTTOM_LEFT_Y = CONTAINER_TOP_LEFT_Y + SQUARE_SIZE * 0.95;

      if (stackLength === 0) {
        finalYPosition = CONTAINER_BOTTOM_LEFT_Y - BLOCK_ITEM_HEIGHT * 1.4;
      } else {
        finalYPosition =
          CONTAINER_BOTTOM_LEFT_Y - BLOCK_ITEM_HEIGHT * 1.4 * (stackLength + 1);
      }

      const startY = finalYPosition - 140;
      const startX = finalXPosition;

      const recPromise = () => {
        return new Promise((resolve, reject) => {
          const rec = this.svg
            .append("rect")
            .attr("x", startX)
            .attr("y", startY)
            .attr("width", BLOCK_WIDTH)
            .attr("height", BLOCK_ITEM_HEIGHT)
            .attr("fill", STACK_DATA_COLOR)
            .classed(`COLUMN-2-${stackLength}`, true)
            .transition()
            .duration(500)
            .attr("x", finalXPosition)
            .transition()
            .duration(1000)
            .attr("y", finalYPosition)
            .on("end", () => {
              return resolve(true);
            });
        });
      };

      const textPromise = () => {
        return new Promise((resolve, reject) => {
          console;
          const text = this.svg
            .append("text")
            .text(stackData?.dataString || stackData?.dataNumber || "")
            .attr("fill", "white")
            .attr("x", startX + BLOCK_ITEM_HEIGHT / 2)
            .attr("y", startY + BLOCK_ITEM_HEIGHT / 1.5)

            .classed(`COLUMN-2-${stackLength}-text`, true)
            .transition()
            .duration(500)
            .attr("x", finalXPosition + BLOCK_WIDTH / 2)
            .transition()
            .duration(1000)
            .attr("y", finalYPosition + BLOCK_ITEM_HEIGHT / 1.5)
            .on("end", () => {
              return resolve(true);
            });
        });
      };
      console.log("does it run");
      const getIT = await Promise.all([recPromise(), textPromise()]);
      console.log("getIT", getIT);
      return getIT;
    } catch (err) {
      console.log("addResultDataToStack - err", err);
      return false;
    }
  }
  async addDataToStack(scriptData: SCRIPT_DATA, dataItemsLength: number) {
    try {
      const stackData = scriptData;

      const stackLength = dataItemsLength;
      const nodeData = {
        ...stackData,
        className: `COLUMN-0-${stackLength}`,
      };

      const finalXPosition = this.COLUMN_WIDTH / 2 - BLOCK_WIDTH / 2;
      let finalYPosition = 0;

      const CONTAINER_TOP_LEFT_Y = this.height - SQUARE_SIZE * 1.25;
      const CONTAINER_BOTTOM_LEFT_Y = CONTAINER_TOP_LEFT_Y + SQUARE_SIZE * 0.95;

      if (stackLength === 0) {
        finalYPosition = CONTAINER_BOTTOM_LEFT_Y - BLOCK_ITEM_HEIGHT * 1.4;
      } else {
        finalYPosition =
          CONTAINER_BOTTOM_LEFT_Y - BLOCK_ITEM_HEIGHT * 1.4 * (stackLength + 1);
      }

      const startY = finalYPosition - 140;
      const startX = finalXPosition - 100;

      const recPromise = () => {
        return new Promise((resolve, reject) => {
          const rec = this.svg
            .append("rect")
            .attr("x", startX)
            .attr("y", startY)
            .attr("width", BLOCK_WIDTH)
            .attr("height", BLOCK_ITEM_HEIGHT)
            .attr("fill", STACK_DATA_COLOR)
            .classed(`COLUMN-0-${stackLength}`, true)
            .transition()
            .duration(500)
            .attr("x", finalXPosition)
            .transition()
            .duration(1000)
            .attr("y", finalYPosition)
            .on("end", () => {
              resolve(true);
            });
        });
      };

      const textPromise = () => {
        return new Promise((resolve, reject) => {
          const text = this.svg
            .append("text")
            .text(stackData?.dataString || stackData?.dataNumber || "")
            .attr("fill", "white")
            .attr("x", startX + BLOCK_ITEM_HEIGHT / 2)
            .attr("y", startY + BLOCK_ITEM_HEIGHT / 1.5)

            .classed(`COLUMN-0-${stackLength}-text`, true)
            .transition()
            .duration(500)
            .attr("x", finalXPosition + BLOCK_WIDTH / 2)
            .transition()
            .duration(1000)
            .attr("y", finalYPosition + BLOCK_ITEM_HEIGHT / 1.5)
            .on("end", () => {
              resolve(true);
            });
        });
      };

      const getIT = await Promise.all([recPromise(), textPromise()]);
      return getIT;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }
  drawStack(_startX: number) {
    const start = _startX;
    const other = this.HALF_COLUMN_WIDTH - HALF_SQUARE;

    const startX = start + other;
    const y = this.height - SQUARE_SIZE * 1.25;

    const SquareBottomConWidth = SQUARE_SIZE * 1.15;
    const halfSquareBottom = SquareBottomConWidth / 2;

    const startXBottom = this.HALF_COLUMN_WIDTH;

    this.svg
      .append("rect")
      .attr("x", startX)
      .attr("y", y)
      .attr("width", SQUARE_SIZE)
      .attr("height", SQUARE_SIZE * 0.95)
      .attr("fill", "white");

    const pathData = `
      M ${startX},${y + SQUARE_SIZE * 0.95}
      L ${startX + SquareBottomConWidth - 20},${y + SQUARE_SIZE * 0.95}
    `;

    this.svg
      .append("path")
      .attr("d", pathData)

      .attr("fill", "#456F974D")
      .attr("stroke", "#456F974D")
      .attr("stroke-width", 10)
      .attr("stroke-linecap", "round");

    const leftSidePathData = `
      M ${startX},${y + SQUARE_SIZE * 0.95}
      L ${startX},${y}
    `;

    this.svg
      .append("path")
      .attr("d", leftSidePathData)

      .attr("stroke", "#456F974D")
      .attr("stroke-width", 8)
      .attr("stroke-linecap", "round");

    const rightSidePathData = `

      M ${startX + SquareBottomConWidth - 20},${y + SQUARE_SIZE * 0.95}
      L ${startX + SquareBottomConWidth - 20},${y}
    `;

    this.svg
      .append("path")
      .attr("d", rightSidePathData)

      .attr("stroke", "#456F974D")
      .attr("stroke-width", 8)
      .attr("stroke-linecap", "round");
  }

  async popStackData(
    queStackLength: number,
    processStackLength: number,
    columnId: number,
    xBuffer: number
  ) {
    const rec = this.svg.select(`.COLUMN-${columnId}-${queStackLength}`);
    const text = this.svg.select(`.COLUMN-${columnId}-${queStackLength}-text`);

    try {
      if (rec) {
        const finalXPosition =
          this.COLUMN_WIDTH / 2 - BLOCK_WIDTH / 2 + xBuffer;

        const CONTAINER_TOP_LEFT_Y = this.height - SQUARE_SIZE * 1.25;
        const CONTAINER_BOTTOM_LEFT_Y =
          CONTAINER_TOP_LEFT_Y + SQUARE_SIZE * 0.95;

        let finalYPosition = 0;

        if (processStackLength === 0) {
          finalYPosition = CONTAINER_BOTTOM_LEFT_Y - BLOCK_ITEM_HEIGHT * 1.4;
        } else {
          finalYPosition =
            CONTAINER_BOTTOM_LEFT_Y -
            BLOCK_ITEM_HEIGHT * 1.4 * (processStackLength + 1);
        }

        const oldY = +rec.attr("y");

        const startY = oldY - SQUARE_SIZE * 0.95;

        const arrowStartX = xBuffer - this.HALF_COLUMN_WIDTH;

        console.log("arrowStartX", arrowStartX);
        const initArrowPathData = `  
        M ${arrowStartX},${oldY}, 
        L ${arrowStartX},${oldY} 
        L ${arrowStartX},${oldY} 
        L ${arrowStartX},${oldY}`;

        const init2 = ` 
        M ${arrowStartX},${oldY}  
        L ${arrowStartX}, ${startY + BLOCK_ITEM_HEIGHT / 2} 
        L ${arrowStartX}, ${startY + BLOCK_ITEM_HEIGHT / 2} 
        L ${arrowStartX}, ${startY}  
      `;

        const init3 = `  
        M ${arrowStartX},${oldY} 
        L ${arrowStartX}, ${startY + BLOCK_ITEM_HEIGHT / 2} 
        L ${arrowStartX + this.COLUMN_WIDTH}, ${startY + BLOCK_ITEM_HEIGHT / 2} 
        L ${arrowStartX + this.COLUMN_WIDTH}, ${startY} 
      `;

        const arrowPathData = `
        M ${arrowStartX},${oldY} 
        L ${arrowStartX}, ${startY + BLOCK_ITEM_HEIGHT / 2} 
        L ${arrowStartX + this.COLUMN_WIDTH}, ${startY + BLOCK_ITEM_HEIGHT / 2} 
        L ${arrowStartX + this.COLUMN_WIDTH}, ${finalYPosition}
      `;
        const arrow = await new Promise((resolve, reject) => {
          const arrowPath = this.svg
            .append("path")
            .attr("d", initArrowPathData)
            .classed("ArrowPop", true)
            .attr("fill", "none")
            .attr("stroke", STACK_DATA_COLOR)
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "10,5") // Set the dash pattern
            .attr("marker-end", "url(#arrow-marker)") // Add an arrow marker at the end
            .transition()

            .duration(1000) // Set the duration of the animation in milliseconds
            .attrTween("d", function () {
              const interpolator = d3.interpolate(initArrowPathData, init2);
              return function (t) {
                return interpolator(t);
              };
            })
            .transition()

            .duration(1000) // Set the duration of the animation in milliseconds
            .attrTween("d", function () {
              const interpolator = d3.interpolate(init2, init3);
              return function (t) {
                return interpolator(t);
              };
            })
            .transition()

            .duration(1000) // Set the duration of the animation in milliseconds
            .attrTween("d", function () {
              const interpolator = d3.interpolate(init3, arrowPathData);
              return function (t) {
                return interpolator(t);
              };
            })
            .on("end", () => {
              resolve(true);
            });
        });

        const recPromise = () => {
          return new Promise((resolve, reject) => {
            const _blockItem = rec
              .classed(`COLUMN-0-${queStackLength}`, false)
              .classed(`COLUMN-1-${processStackLength}`, true)
              .transition()
              .duration(1000)
              .attr("y", oldY - SQUARE_SIZE * 0.95)
              .transition()
              .duration(1000)
              .attr("x", finalXPosition)

              .transition()
              .duration(1000)
              .attr("y", finalYPosition)
              .on("end", () => {
                const elements = this.svg.selectAll(".ArrowPop");
                if (elements) {
                  elements.remove();
                }
                resolve(true);
              });
          });
        };

        const textPromise = () => {
          return new Promise((resolve, reject) => {
            const _text = text
              .classed(`COLUMN-0-${queStackLength}-text`, false)
              .classed(`COLUMN-1-${processStackLength}-text`, true)
              .transition()
              .duration(1000)
              .attr("y", oldY - SQUARE_SIZE * 0.95 + BLOCK_ITEM_HEIGHT / 1.5)
              .transition()
              .duration(1000)
              .attr("x", finalXPosition + BLOCK_WIDTH / 2)

              .transition()
              .duration(1000)
              .attr("y", finalYPosition + BLOCK_ITEM_HEIGHT / 1.5)
              .on("end", () => {
                resolve(true);
              });
          });
        };

        const getIT = await Promise.all([recPromise(), textPromise()]);
        console.log("getIT", getIT);

        return arrow && getIT;
      }
    } catch (err) {
      console.log("err", err);
    }
  }
}
