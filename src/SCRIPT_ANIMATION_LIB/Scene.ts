import * as d3 from "d3";

import { ScriptAnimationBaseline } from ".";
import {
  BLOCK_BORDER_RADIUS,
  SQUARE_BORDER_COLOR,
  StackDataPosition,
} from "@/comp/OpCodesAnimations/Scene";
import {
  CORE_SCRIPT_DATA,
  OP_CODE_COLOR,
  STACK_DATA_COLOR,
} from "@/comp/OpCodesAnimations";
export class Scene extends ScriptAnimationBaseline {
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

    // 4 Draw the right border of the container
    const rightSidePathData = `
      M ${startX + SquareBottomConWidth},${y + this.SQUARE_SIZE * 0.95}
      L ${startX + SquareBottomConWidth},${y}
    `;
  }

  drawInitialStackData() {
    // we have to loop through the before stack and draw the data
    this.beforeStack.forEach((stackData, stackIndex) => {
      this.drawStackData(stackData, stackIndex, 0);
    });
  }
  async addOpCodeToStack(stackLength: number, columnIndex: number) {
    try {
      const { x, y } = this.calculateStackFinalPosition(
        stackLength,
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
            .text(this.opCode?.name || "")
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
      console.log("addOpCodeToStack -err", err);
    }
  }
  async duplicateStackData(
    stackData: CORE_SCRIPT_DATA,
    beforeStackIndex: number,
    beforeStackColumnIndex: number,
    currentStackIndex: number,
    currentStackColumnIndex: number
  ) {
    try {
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
              this.createBlockItemClass(
                currentStackColumnIndex,
                currentStackIndex
              ),
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
            .text(stackData?.dataString || stackData?.dataNumber || "")
            .attr("fill", "black")
            .attr("x", x - this.BLOCK_ITEM_HEIGHT / 2)
            .attr("y", y + this.BLOCK_ITEM_HEIGHT / 1.5)
            .style("font", this.OPS_FONT_STYLE)
            .style("opacity", 0)
            .classed(
              `${this.createBlockItemClass(
                currentStackColumnIndex,
                currentStackIndex
              )}-text`,
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

      console.log("arrow completed", arrow);
      const bareClassId = this.createBlockItemClass(
        currentStackColumnIndex,
        currentStackIndex
      );
      console.log("bareClassId", bareClassId);
      // animate the rec and text following the arrow
      const rec = this.svg.select(`.${bareClassId}`);
      const text = this.svg.select(`.${bareClassId}-text`);

      const recDupChange = () => {
        return new Promise((resolve, reject) => {
          const _blockItem = rec
            .classed(bareClassId, false)
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
              console.log("rec done moving");
              const elements = this.svg.selectAll(".ArrowPop");
              if (elements) {
                elements.remove();
              }
              console.log("did this run");
              return resolve(true);
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
            );

          const textWidth = (text.node() as any).getBBox().width;
          console.log("textWidth", textWidth);
          if (textWidth) {
            text
              .transition()
              .duration(1000)
              .attr(
                "y",
                beforePosition.y - yMinusHeight + this.BLOCK_ITEM_HEIGHT / 1.5
              )
              .transition()
              .duration(1000)
              .attr(
                "x",
                currentStackPosition.x + this.BLOCK_WIDTH / 2 - textWidth / 2
              )

              .transition()
              .duration(1000)
              .attr("y", currentStackPosition.y + this.BLOCK_ITEM_HEIGHT / 1.5)
              .on("end", () => {
                return resolve(true);
              });
          }
        });
      };
      const dupIt = await Promise.all([recDupChange(), textDupChange()]);
      console.log("dupIt - ", dupIt);
      return dupIt;
    } catch (err) {
      console.log("duplicateStackData err - ", err);
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
  drawStackData(
    stackData: CORE_SCRIPT_DATA,
    stackIndex: number,
    columnIndex: number
  ) {
    const { x, y } = this.calculateStackFinalPosition(stackIndex, columnIndex);
    const rec = this.svg
      .append("rect")
      .attr("width", this.BLOCK_WIDTH)
      .attr("height", this.BLOCK_ITEM_HEIGHT)
      .attr("rx", BLOCK_BORDER_RADIUS)
      .classed(this.createBlockItemClass(stackIndex, columnIndex) || "", true)
      .attr("x", x)
      .attr("y", y);
    // all the above items will always be the same no matter the style type
    // the below items will change depending on the style type
    if (false) {
      rec.classed("dashed-border", true).attr("fill", STACK_DATA_COLOR);
    } else {
      rec.attr("fill", STACK_DATA_COLOR);
    }

    const text = this.svg
      .append("text")
      .text(stackData?.dataString || stackData?.dataNumber || "")
      .classed(
        `${this.createBlockItemClass(stackIndex, columnIndex)}-text`,
        true
      )
      .attr("x", x + this.BLOCK_WIDTH / 2)
      .attr("y", y + this.BLOCK_ITEM_HEIGHT / 1.5)
      .style("font", this.OPS_FONT_STYLE);

    // same logic as above but for the text styling

    if (false) {
      text.attr("fill", "black");
    } else {
      text.attr("fill", "white");
    }

    const textWidth = text.node()?.getBBox().width;

    if (textWidth) {
      text
        .attr("x", x + this.BLOCK_WIDTH / 2 - textWidth / 2)
        .style("opacity", 1);
    }
  }
  createBlockItemClass(stackIndex: number, columnIndex: number) {
    return `COLUMN-${columnIndex}-${stackIndex}`;
  }
  async addScriptDataToStack() {
    try {
      const finalPosition = this.calculateStackFinalPosition(
        this.beforeStack.length,
        0
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
            .classed(
              this.createBlockItemClass(this.beforeStack.length, 0),
              true
            )
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
            .text(
              this.stackData?.dataString || this.stackData?.dataNumber || ""
            )
            .attr("fill", "white")
            .attr("x", startX + this.BLOCK_ITEM_HEIGHT / 2)
            .attr("y", startY + this.BLOCK_ITEM_HEIGHT / 1.5)
            .style("font", this.OPS_FONT_STYLE)
            .style("opacity", 0)
            .classed(
              `${this.createBlockItemClass(this.beforeStack.length, 0)}-text`,
              true
            );

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
            .transition()
            .duration(500)
            .style("opacity", 1)
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
    } catch (err) {
      console.log("addScriptDataToStack- err", err);
      return false;
    }
  }
}
