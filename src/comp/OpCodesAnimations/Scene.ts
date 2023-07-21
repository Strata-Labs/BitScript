import {
  OpCodesBaseline,
  OP_CODE,
  SCRIPT_DATA,
  LIB_DATA_TYPE,
  OP_CODE_COLOR,
} from ".";
import * as d3 from "d3";

import {
  HALF_SQUARE,
  BLOCK_WIDTH,
  BLOCK_ITEM_HEIGHT,
  STACK_DATA_COLOR,
  SQUARE_SIZE,
} from ".";

type StackDataPosition = {
  x: number;
  y: number;
};

export class Scene extends OpCodesBaseline {
  private calculateStackFinalPosition(
    dataItemsLength: number,
    columnIndex: number
  ): StackDataPosition {
    let x = 0;
    let y = 0;

    let startX = this.COLUMN_WIDTH * columnIndex;
    let finalYPosition = 0;

    const CONTAINER_TOP_LEFT_Y = this.height - SQUARE_SIZE * 1.25;
    const CONTAINER_BOTTOM_LEFT_Y = CONTAINER_TOP_LEFT_Y + SQUARE_SIZE * 1.15;

    y =
      CONTAINER_BOTTOM_LEFT_Y -
      BLOCK_ITEM_HEIGHT * 1.25 * (dataItemsLength + 2);

    x = this.COLUMN_WIDTH / 2 - BLOCK_WIDTH / 2 + startX;

    return { x, y };
  }

  addInitialDataToStack(
    scriptData: SCRIPT_DATA | OP_CODE,
    stackIndex: number,
    columnIndex: number
  ) {
    const { x, y } = this.calculateStackFinalPosition(stackIndex, columnIndex);

    if (scriptData.libDataType === LIB_DATA_TYPE.SCRIPT_DATA) {
      const rec = this.svg
        .append("rect")

        .attr("width", BLOCK_WIDTH)
        .attr("height", BLOCK_ITEM_HEIGHT)
        .attr("fill", STACK_DATA_COLOR)
        .attr("rx", 4)
        .classed(scriptData.className || "", true)

        .attr("x", x)

        .attr("y", y);

      const text = this.svg
        .append("text")
        .text(scriptData?.dataString || scriptData?.dataNumber || "")
        .attr("fill", "white")

        .classed(`${scriptData.className}-text`, true)

        .attr("x", x + BLOCK_WIDTH / 2)

        .attr("y", y + BLOCK_ITEM_HEIGHT / 1.5);
    } else {
      const rec = this.svg
        .append("rect")

        .attr("width", BLOCK_WIDTH)
        .attr("height", BLOCK_ITEM_HEIGHT)
        .attr("fill", OP_CODE_COLOR)
        .attr("rx", 4)
        .classed(scriptData.className || "", true)

        .attr("x", x)

        .attr("y", y);

      const text = this.svg
        .append("text")
        .text(scriptData?.name || "")
        .attr("fill", "white")

        .classed(`${scriptData.className}-text`, true)

        .attr("x", x + BLOCK_WIDTH / 2 - 30)

        .attr("y", y + BLOCK_ITEM_HEIGHT / 1.5);
    }
  }
  async addOpCodeToStack(
    opCode: OP_CODE,
    dataItemsLength: number,
    columnIndex: number
  ) {
    try {
      const stackLength = dataItemsLength;
      const nodeData = {
        ...opCode,
        className: `COLUMN-${columnIndex}-${stackLength}`,
      };

      const { x, y } = this.calculateStackFinalPosition(
        dataItemsLength,
        columnIndex
      );

      const startY = x - 140;
      const startX = y - 100;

      const blockPromise = () => {
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
            .attr("x", x)
            .transition()
            .duration(1000)
            .attr("y", y)
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
            .attr("x", x + BLOCK_WIDTH / 4)
            .transition()
            .duration(1000)
            .attr("y", y + BLOCK_ITEM_HEIGHT / 1.5)
            .on("end", () => {
              resolve(true);
            });
        });
      };

      const getIT = await Promise.all([blockPromise(), textPromise()]);

      return getIT;
    } catch (err) {
      console.log("addOpCodeToStack - err", err);
      return false;
    }
  }
  async addResultDataToStack(
    scriptData: SCRIPT_DATA,

    finalDataItemsLength: number,

    finalColumnIndex: number
  ) {
    try {
      const nodeData = {
        ...scriptData,
        className: `COLUMN-${finalColumnIndex}-${finalDataItemsLength}`,
      };

      const finalPosition = this.calculateStackFinalPosition(
        finalDataItemsLength,
        finalColumnIndex
      );

      const recPromise = () => {
        return new Promise((resolve, reject) => {
          const rec = this.svg
            .append("rect")
            .attr("x", finalPosition.x)
            .attr("y", this.height + finalPosition.y)
            .attr("rx", 4)
            .attr("width", BLOCK_WIDTH)
            .attr("height", BLOCK_ITEM_HEIGHT)
            .attr("fill", STACK_DATA_COLOR)
            .classed(`COLUMN-${finalColumnIndex}-${finalDataItemsLength}`, true)
            .transition()
            .duration(500)
            .attr("x", finalPosition.x)
            .transition()
            .duration(1000)
            .attr("y", finalPosition.y)
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
            .text(scriptData?.dataString || scriptData?.dataNumber || "")
            .attr("fill", "white")
            .attr("x", finalPosition.x - BLOCK_ITEM_HEIGHT / 2)
            .attr("y", this.height + finalPosition.y)

            .classed(
              `COLUMN-${finalColumnIndex}-${finalDataItemsLength}-text`,
              true
            )
            .transition()
            .duration(500)
            .attr("x", finalPosition.x + BLOCK_WIDTH / 2)
            .transition()
            .duration(1000)
            .attr("y", finalPosition.y + BLOCK_ITEM_HEIGHT / 1.5)
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
  async addScriptDataToStack(
    scriptData: SCRIPT_DATA,
    dataItemsLength: number,
    columnIndex: number
  ) {
    const nodeData = {
      ...scriptData,
      className: `COLUMN-${columnIndex}-${dataItemsLength}`,
    };

    const finalPosition = this.calculateStackFinalPosition(
      dataItemsLength,
      columnIndex
    );

    const startY = finalPosition.y - 140;
    const startX = finalPosition.x - 100;

    const recPromise = () => {
      return new Promise((resolve, reject) => {
        const rec = this.svg
          .append("rect")
          .attr("x", startX)
          .attr("y", startY)
          .attr("rx", 4)
          .attr("width", BLOCK_WIDTH)
          .attr("height", BLOCK_ITEM_HEIGHT)
          .attr("fill", STACK_DATA_COLOR)
          .classed(`COLUMN-${columnIndex}-${dataItemsLength}`, true)
          .transition()
          .duration(500)
          .attr("x", finalPosition.x)
          .transition()
          .duration(1000)
          .attr("y", finalPosition.y)
          .on("end", () => {
            resolve(true);
          });
      });
    };

    const textPromise = () => {
      return new Promise((resolve, reject) => {
        const text = this.svg
          .append("text")
          .text(scriptData?.dataString || scriptData?.dataNumber || "")
          .attr("fill", "white")
          .attr("x", startX + BLOCK_ITEM_HEIGHT / 2)
          .attr("y", startY + BLOCK_ITEM_HEIGHT / 1.5)

          .classed(`COLUMN-${columnIndex}-${dataItemsLength}-text`, true)
          .transition()
          .duration(500)
          .attr("x", finalPosition.x + BLOCK_WIDTH / 2)
          .transition()
          .duration(1000)
          .attr("y", finalPosition.y + BLOCK_ITEM_HEIGHT / 1.5)
          .on("end", () => {
            resolve(true);
          });
      });
    };

    const getIT = await Promise.all([recPromise(), textPromise()]);
    return getIT;
  }

  drawStack(columnIndex: number) {
    console.log("drawStack - columnIndex", columnIndex);

    const start = columnIndex * this.COLUMN_WIDTH;

    const other = this.HALF_COLUMN_WIDTH - HALF_SQUARE;

    const startX = start + other;
    const y = this.height - SQUARE_SIZE * 1.25;
    const SquareBottomConWidth = SQUARE_SIZE * 1.15;

    console.log("start", startX);
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

  async popStackDataFromColumn(
    beforeStackIndex: number,
    beforeStackColumnIndex: number,
    currentStackIndex: number,
    currentStackColumnIndex: number
  ) {
    const rec = this.svg.select(
      `.COLUMN-${beforeStackColumnIndex}-${beforeStackIndex}`
    );
    const text = this.svg.select(
      `.COLUMN-${beforeStackColumnIndex}-${beforeStackIndex}-text`
    );
    const beforePosition = this.calculateStackFinalPosition(
      beforeStackIndex,
      beforeStackColumnIndex
    );
    const currentStackPosition = this.calculateStackFinalPosition(
      currentStackIndex,
      currentStackColumnIndex
    );
    const xBuffer = this.COLUMN_WIDTH * (beforeStackColumnIndex + 1);

    const arrowStartX = xBuffer - this.HALF_COLUMN_WIDTH;

    //const yMinusHeight = BLOCK_ITEM_HEIGHT / 2;
    const yMinusHeight = 150;
    const initArrowPathData = `  
    M ${arrowStartX},${beforePosition.y}
    L ${arrowStartX},${beforePosition.y} 
    L ${arrowStartX},${beforePosition.y} 
    L ${arrowStartX},${beforePosition.y}`;

    const init2 = ` 
    M ${arrowStartX},${beforePosition.y}  
    L ${arrowStartX}, ${beforePosition.y - yMinusHeight} 
    L ${arrowStartX}, ${beforePosition.y - yMinusHeight} 
    L ${arrowStartX}, ${beforePosition.y - yMinusHeight} 
  `;

    const init3 = `
      M ${arrowStartX},${beforePosition.y}
      L ${arrowStartX}, ${beforePosition.y - yMinusHeight}
      L ${arrowStartX + this.COLUMN_WIDTH}, ${beforePosition.y - yMinusHeight}
      L ${arrowStartX + this.COLUMN_WIDTH}, ${beforePosition.y - yMinusHeight}
    `;

    const arrowPathData = `
      M ${arrowStartX},${beforePosition.y}
      L ${arrowStartX}, ${beforePosition.y - yMinusHeight}
      L ${arrowStartX + this.COLUMN_WIDTH}, ${beforePosition.y - yMinusHeight}
      L ${arrowStartX + this.COLUMN_WIDTH}, ${currentStackPosition.y}
    `;

    console.log("initArrowPathData", initArrowPathData);
    console.log("init2", init2);
    console.log("init3", init3);
    console.log("arrowPathData", arrowPathData);
    try {
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
            .classed(
              `COLUMN-${beforeStackIndex}-${beforeStackColumnIndex}`,
              false
            )
            .classed(
              `COLUMN-${currentStackIndex}-${currentStackColumnIndex}`,
              true
            )
            .transition()
            .duration(1000)
            .attr("y", beforePosition.y - yMinusHeight)
            .transition()
            .duration(1000)
            .attr("x", currentStackPosition.x)

            .transition()
            .duration(1000)
            .attr("y", currentStackPosition.y)
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
            .classed(
              `COLUMN-${beforeStackIndex}-${beforeStackColumnIndex}-text`,
              false
            )
            .classed(
              `COLUMN-${currentStackIndex}-${currentStackColumnIndex}-text`,
              true
            )
            .transition()
            .duration(1000)
            .attr(
              "y",
              beforePosition.y - yMinusHeight + BLOCK_ITEM_HEIGHT / 1.5
            )
            .transition()
            .duration(1000)
            .attr("x", currentStackPosition.x + BLOCK_WIDTH / 2)

            .transition()
            .duration(1000)
            .attr("y", currentStackPosition.y + BLOCK_ITEM_HEIGHT / 1.5)
            .on("end", () => {
              resolve(true);
            });
        });
      };

      const getIT = await Promise.all([recPromise(), textPromise()]);
      console.log("getIT", getIT);

      return arrow && getIT;
    } catch (err) {
      console.log("err", err);
      return false;
    }
  }
}
