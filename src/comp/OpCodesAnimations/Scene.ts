import {
  OpCodesBaseline,
  OP_CODE,
  SCRIPT_DATA,
  LIB_DATA_TYPE,
  OP_CODE_COLOR,
} from ".";
import * as d3 from "d3";

import { STACK_DATA_COLOR } from ".";

type StackDataPosition = {
  x: number;
  y: number;
};

export const BLOCK_BORDER_RADIUS = 3;

export const SQUARE_BORDER_COLOR = "#456F974D";

export class Scene extends OpCodesBaseline {
  private calculateStackFinalPosition(
    dataItemsLength: number,
    columnIndex: number
  ): StackDataPosition {
    let x = 0;
    let y = 0;

    const startX = this.COLUMN_WIDTH * columnIndex;
    const CONTAINER_TOP_LEFT_Y = this.height - this.SQUARE_SIZE * 1.25;
    const CONTAINER_BOTTOM_LEFT_Y =
      CONTAINER_TOP_LEFT_Y + this.SQUARE_SIZE * 1.15;

    y =
      CONTAINER_BOTTOM_LEFT_Y -
      this.BLOCK_ITEM_HEIGHT * 1.1 * (dataItemsLength + 2);

    x = this.COLUMN_WIDTH / 2 - this.BLOCK_WIDTH / 2 + startX;

    return { x, y };
  }

  updateDimensions(width: number, height: number) {}

  drawStack(columnIndex: number) {
    const start = columnIndex * this.COLUMN_WIDTH;

    const other = this.HALF_COLUMN_WIDTH - this.HALF_SQUARE;

    const startX = start + other;
    const y = this.height - this.SQUARE_SIZE * 1.25;

    const otherY =
      this.height - this.SQUARE_SIZE * 1.25 + this.SQUARE_SIZE * 1.15;
    //const SquareBottomConWidth = this.SQUARE_SIZE * 1.15;
    const SquareBottomConWidth = this.SQUARE_SIZE;

    // 1 Draw the container (white)
    this.svg
      .append("rect")
      .attr("x", startX)
      .attr("y", y)
      .attr("width", this.SQUARE_SIZE)
      .attr("height", this.SQUARE_SIZE * 0.95)
      .attr("fill", "white");

    // 2 Draw the bottom border of the container
    // this.svg
    //   .append("rect")
    //   .attr("x", startX)
    //   .attr("y", y + this.SQUARE_SIZE * 0.92)
    //   .attr("width", this.SQUARE_SIZE)
    //   .attr("height", 10)
    //   .attr("fill", SQUARE_BORDER_COLOR);
    const squareSize = 100;
    const borderRadius = 20;

    console.log("y", y);
    console.log("otherY", otherY);
    const pathData = `
      M ${startX},  ${y} 
      L ${startX}, ${y + this.SQUARE_SIZE * 0.95 - 10} 
      
      Q ${startX}, ${y + this.SQUARE_SIZE * 0.95} ${startX + 10}, ${
        y + this.SQUARE_SIZE * 0.95
      }
      L ${startX + SquareBottomConWidth - 10},${y + this.SQUARE_SIZE * 0.95}
      Q ${startX + SquareBottomConWidth}, ${y + this.SQUARE_SIZE * 0.95} ${
        startX + SquareBottomConWidth
      }, ${y + this.SQUARE_SIZE * 0.95 - 10} 
      L ${startX + SquareBottomConWidth}, ${y}
  `;
    /*
  Q ${70 + this.SQUARE_SIZE} , ${20 + this.SQUARE_SIZE * 0.95} ${
    70 + this.SQUARE_SIZE
  }, ${10 + this.SQUARE_SIZE * 0.95}
  L ${70 + this.SQUARE_SIZE}, 10
  */
    this.svg
      .append("path")
      .attr("d", pathData)
      .attr("fill", "none")
      .attr("stroke", SQUARE_BORDER_COLOR)
      .attr("stroke-width", this.width < 400 ? 4 : 10);

    // 3 Draw the left side of the container
    const leftSidePathData = `
      M ${startX},${y + this.SQUARE_SIZE * 0.95}
      L ${startX},${y}
    `;
    // this.svg
    //   .append("path")
    //   .attr("d", leftSidePathData)
    //   .attr("width", 20)
    //   .attr("stroke", SQUARE_BORDER_COLOR)
    //   .attr("stroke-width", 10)
    //   .attr("stroke-linecap", "round");

    // 4 Draw the right border of the container
    const rightSidePathData = `
      M ${startX + SquareBottomConWidth},${y + this.SQUARE_SIZE * 0.95}
      L ${startX + SquareBottomConWidth},${y}
    `;
    // this.svg
    //   .append("path")
    //   .attr("d", rightSidePathData)

    //   .attr("stroke", SQUARE_BORDER_COLOR)
    //   .attr("stroke-width", 8)
    //   .attr("stroke-linecap", "round");
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

        .attr("width", this.BLOCK_WIDTH)
        .attr("height", this.BLOCK_ITEM_HEIGHT)
        .attr("fill", STACK_DATA_COLOR)
        .attr("rx", BLOCK_BORDER_RADIUS)
        .classed(scriptData.className || "", true)

        .attr("x", x)

        .attr("y", y);

      const text = this.svg
        .append("text")
        .text(scriptData?.dataString || scriptData?.dataNumber || "")
        .attr("fill", "white")
        .classed(`${scriptData.className}-text`, true)
        .attr("x", x + this.BLOCK_WIDTH / 2)
        .attr("y", y + this.BLOCK_ITEM_HEIGHT / 1.5)
        .style("font", this.OPS_FONT_STYLE);

      const textWidth = text.node()?.getBBox().width;

      if (textWidth) {
        text
          .attr("x", x + this.BLOCK_WIDTH / 2 - textWidth / 2)
          .style("opacity", 1);
      }
    } else {
      const rec = this.svg
        .append("rect")
        .attr("width", this.BLOCK_WIDTH)
        .attr("height", this.BLOCK_ITEM_HEIGHT)
        .attr("fill", OP_CODE_COLOR)
        .attr("rx", BLOCK_BORDER_RADIUS)
        .classed(scriptData.className || "", true)

        .attr("x", x)

        .attr("y", y);

      const text = this.svg
        .append("text")
        .text(scriptData?.name || "")
        .attr("fill", "white")

        .classed(`${scriptData.className}-text`, true)

        .attr("x", x + this.BLOCK_WIDTH / 2 - 30)

        .attr("y", y + this.BLOCK_ITEM_HEIGHT / 1.5)
        .style("font", this.OPS_FONT_STYLE)
        .style("opacity", 0);

      const textWidth = text.node()?.getBBox().width;

      if (textWidth) {
        text
          .attr("x", x + this.BLOCK_WIDTH / 2 - textWidth / 2)
          .style("opacity", 1);
      }
    }
  }
  async drawEqualSign() {
    try {
      const startX = this.COLUMN_WIDTH / 2;

      const equalSignWidth = 20;
      const equalSignHeight = 5;

      const topEqualSign = () => {
        return new Promise((resolve, reject) => {
          this.svg
            .append("rect")
            .attr("x", this.width / 2 - equalSignWidth / 2)
            .attr("y", this.height - this.height / 3 + 40)
            .attr("width", equalSignWidth)
            .attr("height", equalSignHeight)
            .attr("fill", "black")
            .style("opacity", 0)
            .transition()
            .duration(750)
            .style("opacity", 1)
            .on("end", () => {
              resolve(true);
            });
        });
      };

      const bottomEqualSign = () => {
        return new Promise((resolve, reject) => {
          this.svg
            .append("rect")
            .attr("x", this.width / 2 - equalSignWidth / 2)
            .attr("y", this.height - this.height / 3 + 50)
            .attr("width", equalSignWidth)
            .attr("height", equalSignHeight)
            .attr("fill", "black")
            .style("opacity", 0)
            .transition()
            .duration(750)
            .style("opacity", 1)
            .on("end", () => {
              resolve(true);
            });
        });
      };

      const getIT = await Promise.all([topEqualSign(), bottomEqualSign()]);
      return getIT;
    } catch (err) {
      console.log("drawEqualSign - err", err);
      return false;
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

      const blockPromise = () => {
        return new Promise((resolve, reject) => {
          const rec = this.svg
            .append("rect")
            .attr("x", x)
            .attr("y", y + 150)
            .attr("width", this.BLOCK_WIDTH)
            .attr("height", this.BLOCK_ITEM_HEIGHT)
            .attr("fill", OP_CODE_COLOR)
            .attr("rx", BLOCK_BORDER_RADIUS)
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

            .classed(`COLUMN-0-${stackLength}-text`, true)
            .attr("x", x + this.BLOCK_ITEM_HEIGHT / 4)
            .attr("y", y - 100 + this.BLOCK_ITEM_HEIGHT / 1.5)
            .style("font", this.OPS_FONT_STYLE)
            .style("opacity", 0);

          const textWidth = text.node()?.getBBox().width;

          if (textWidth) {
            text
              .attr("x", x + this.BLOCK_WIDTH / 2 - textWidth / 2)
              .attr("y", y + 150 + this.BLOCK_ITEM_HEIGHT / 1.5)
              .style("opacity", 1);
            text

              .transition()
              .duration(500)
              .attr("x", x + this.BLOCK_WIDTH / 2 - textWidth / 2)
              .transition()
              .duration(1000)
              .attr("y", y + this.BLOCK_ITEM_HEIGHT / 1.5)
              .on("end", () => {
                resolve(true);
              });
          }
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
            .attr("rx", BLOCK_BORDER_RADIUS)
            .attr("width", this.BLOCK_WIDTH)
            .attr("height", this.BLOCK_ITEM_HEIGHT)
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
          const text = this.svg
            .append("text")
            .text(scriptData?.dataString || scriptData?.dataNumber || "")
            .attr("fill", "white")
            .attr("x", finalPosition.x - this.BLOCK_ITEM_HEIGHT / 2)
            .attr("y", this.height + finalPosition.y)
            .style("font", this.OPS_FONT_STYLE)
            .classed(
              `COLUMN-${finalColumnIndex}-${finalDataItemsLength}-text`,
              true
            )
            .style("opacity", 0);

          const textWidth = text.node()?.getBBox().width;
          const textHeight = text.node()?.getBBox().height;
          if (textWidth && textHeight) {
            text.attr(
              "x",
              finalPosition.x + this.BLOCK_WIDTH / 2 - textWidth / 2
            );
            //.attr("y", y + this.BLOCK_ITEM_HEIGHT / 2 - textHeight / 2)
          }
          text
            .style("opacity", 1)
            .transition()
            .duration(500)
            .transition()
            .duration(1000)
            .attr("y", finalPosition.y + this.BLOCK_ITEM_HEIGHT / 1.5)
            .on("end", () => {
              return resolve(true);
            });
        });
      };

      const getIT = await Promise.all([recPromise(), textPromise()]);

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
          .attr("rx", BLOCK_BORDER_RADIUS)
          .attr("width", this.BLOCK_WIDTH)
          .attr("height", this.BLOCK_ITEM_HEIGHT)
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
          .attr("x", startX + this.BLOCK_ITEM_HEIGHT / 2)
          .attr("y", startY + this.BLOCK_ITEM_HEIGHT / 1.5)
          .style("font", this.OPS_FONT_STYLE)
          .classed(`COLUMN-${columnIndex}-${dataItemsLength}-text`, true)
          .transition()
          .duration(500)
          .attr("x", finalPosition.x + this.BLOCK_WIDTH / 2)
          .transition()
          .duration(1000)
          .attr("y", finalPosition.y + this.BLOCK_ITEM_HEIGHT / 1.5)
          .on("end", () => {
            resolve(true);
          });
      });
    };

    const getIT = await Promise.all([recPromise(), textPromise()]);
    return getIT;
  }

  async duplicateStackData(
    scriptData: SCRIPT_DATA,
    beforeStackIndex: number,
    beforeStackColumnIndex: number,
    currentStackIndex: number,
    currentStackColumnIndex: number
  ) {
    try {
      /* 
      * 1. Move "Duplicated" value to the main stack 
      * 2. Move "Duplicated" value to the result stack
     
      */
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

      const yMinusHeight = this.SQUARE_SIZE;

      /*
       * animate the "duplicated value in
       */

      const { x, y } = this.calculateStackFinalPosition(
        beforeStackIndex,
        beforeStackColumnIndex
      );

      const recPromise = () => {
        return new Promise((resolve, reject) => {
          const rec = this.svg
            .append("rect")
            .attr("x", x)
            .attr("y", y)
            .attr("rx", BLOCK_BORDER_RADIUS)
            .attr("width", this.BLOCK_WIDTH)
            .attr("height", this.BLOCK_ITEM_HEIGHT)
            .attr("fill", STACK_DATA_COLOR)
            .style("opacity", 0)
            .classed(
              `COLUMN-${currentStackColumnIndex}-${currentStackIndex}`,
              true
            )
            .classed("dashed-border", true)
            .transition()
            .duration(500)
            .style("opacity", 1)
            .on("end", () => {
              return resolve(true);
            });
        });
      };
      const textPromise = () => {
        return new Promise((resolve, reject) => {
          const text = this.svg
            .append("text")
            .text(scriptData?.dataString || scriptData?.dataNumber || "")
            .attr("fill", "black")
            .attr("x", x - this.BLOCK_ITEM_HEIGHT / 2)
            .attr("y", y + this.BLOCK_ITEM_HEIGHT / 1.5)
            .style("font", this.OPS_FONT_STYLE)
            .style("opacity", 0)
            .classed(
              `COLUMN-${currentStackColumnIndex}-${currentStackIndex}-text`,
              true
            );

          const textWidth = text.node()?.getBBox().width;
          const textHeight = text.node()?.getBBox().height;

          if (textWidth && textHeight) {
            text.attr("x", x + this.BLOCK_WIDTH / 2 - textWidth / 2);
            //.attr("y", y + this.BLOCK_ITEM_HEIGHT / 2 - textHeight / 2)
          }
          text
            .transition()
            .duration(500)
            .style("opacity", 1)
            .on("end", () => {
              return resolve(true);
            });
        });
      };

      const getIT = await Promise.all([recPromise(), textPromise()]);
      // animate the arrow
      const arrow = await this.showArrowAnimationToResultStack(
        arrowStartX,
        beforePosition,
        currentStackPosition
      );

      // animate the rec and text following the arrow
      const rec = this.svg.select(
        `.COLUMN-${currentStackColumnIndex}-${currentStackIndex}`
      );
      const text = this.svg.select(
        `.COLUMN-${currentStackColumnIndex}-${currentStackIndex}-text`
      );

      const recDupChange = () => {
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

      const textDupChange = () => {
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
              beforePosition.y - yMinusHeight + this.BLOCK_ITEM_HEIGHT / 1.5
            )
            .transition()
            .duration(1000)
            .attr("x", currentStackPosition.x + this.BLOCK_WIDTH / 2)

            .transition()
            .duration(1000)
            .attr("y", currentStackPosition.y + this.BLOCK_ITEM_HEIGHT / 1.5)
            .on("end", () => {
              resolve(true);
            });
        });
      };

      const dupIt = await Promise.all([recDupChange(), textDupChange()]);

      return dupIt;
    } catch (err) {
      console.log("duplicateStackData - err", err);
      return false;
    }
  }
  async showArrowAnimationToResultStack(
    arrowStartX: number,
    beforePosition: StackDataPosition,
    currentStackPosition: StackDataPosition
  ) {
    try {
      const yMinusHeight = this.SQUARE_SIZE;
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

      return arrow;
    } catch (err) {
      console.log("showArrowAnimationToResultStack", err);
      return false;
    }
  }
  /* 
    beforeStackIndex: number,
    beforeStackColumnIndex: number,
    currentStackIndex: number,
    currentStackColumnIndex: number
  */
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

    const yMinusHeight = this.SQUARE_SIZE;

    try {
      const arrow = await this.showArrowAnimationToResultStack(
        arrowStartX,
        beforePosition,
        currentStackPosition
      );

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
              beforePosition.y - yMinusHeight + this.BLOCK_ITEM_HEIGHT / 1.5
            );

          console.log("_text", _text);
          if (_text) {
            console.log("_text", _text);
            const textNode = _text.node();
            if (textNode) {
              const textWidth = (text.node() as any).getBBox().width;
              console.log("textWidth", textWidth);

              _text
                .transition()
                .duration(1000)
                .attr(
                  "x",
                  currentStackPosition.x + this.BLOCK_WIDTH / 2 - textWidth / 2
                )

                .transition()
                .duration(1000)
                .attr(
                  "y",
                  currentStackPosition.y + this.BLOCK_ITEM_HEIGHT / 1.5
                )
                .on("end", () => {
                  resolve(true);
                });
            }
          }
        }).catch((err) => {
          console.log("err", err);
        });
      };

      const getIT = await Promise.all([recPromise(), textPromise()]);

      return arrow && getIT;
    } catch (err) {
      console.log("err", err);
      return false;
    }
  }
}
