import * as d3 from "d3";

const PLACEHOLDER_CON_COLOR = "#456F97";
const SQUARE_SIZE = 155;
const COLUMN_WIDTH = 200;
const BLOCK_WIDTH = SQUARE_SIZE * 0.8;

const BLOCK_ITEM_HEIGHT = SQUARE_SIZE * 0.2;

const HALF_COLUMN_WIDTH = COLUMN_WIDTH / 2;
const HALF_SCORE = SQUARE_SIZE / 2;

enum LANG_TYPE {
  OPERATORS = "OPERATORS",
  LANG_TYPE = "LANG_TYPE",
}
type DATA_NODE = {
  text: string | null;
  value: number;
  type: LANG_TYPE;
  className: string;
};

type DRAW_SCENE_PARAMS = {
  scene: DATA_COLUMN_STACKS;
  width: number;
  height: number;
};

type DATA_COLUMN_STACKS = {
  queStack: DATA_NODE[];
  processStack: DATA_NODE[];
  processResultStack: DATA_NODE[];
  resultStack: DATA_NODE[];
};

type CREATE_STACK_NODE = {
  text: string;
  value: number;
  type: LANG_TYPE;
};
export const SATOSHI_ART_BOARD = "SATOSHI_ART_BOARD";

class DrawScene {
  scene: DATA_COLUMN_STACKS;

  width: number;
  height: number;

  containers = [true, false, false, true];

  svg = d3.select("#" + SATOSHI_ART_BOARD);

  constructor({ scene, width, height }: DRAW_SCENE_PARAMS) {
    this.scene = scene;
    this.width = width;
    this.height = height;

    const svg = d3
      .select("#" + SATOSHI_ART_BOARD)
      .attr("width", width)
      .attr("height", height);

    svg
      .append("rect")
      .attr("x", COLUMN_WIDTH)
      .attr("y", 0)
      .attr("width", COLUMN_WIDTH)
      .attr("height", height)
      .attr("fill", "orange");

    svg
      .append("rect")
      .attr("x", COLUMN_WIDTH * 2)
      .attr("y", 0)
      .attr("width", COLUMN_WIDTH)
      .attr("height", height)
      .attr("fill", "gray");

    svg
      .append("rect")
      .attr("x", COLUMN_WIDTH * 3)
      .attr("y", 0)
      .attr("width", COLUMN_WIDTH)
      .attr("height", height)
      .attr("fill", "pink");

    this.drawStack();
  }

  private drawStack() {
    this.containers.forEach((container, index) => {
      if (!container) return;
      let startX = 0;
      if (index > 1) {
        const start = COLUMN_WIDTH * index;
        const other = HALF_COLUMN_WIDTH - HALF_SCORE;

        startX = start + other;
      } else {
        startX = HALF_COLUMN_WIDTH - HALF_SCORE;
      }

      const y = this.height - SQUARE_SIZE * 1.25;

      const SquareBottomConWidth = SQUARE_SIZE * 1.15;
      const halfSquareBottom = SquareBottomConWidth / 2;
      const startXBottom = HALF_COLUMN_WIDTH - halfSquareBottom + 10;

      // Define the path data

      // Calculate the total length of the path

      const pathData = `
        M ${startXBottom},${y + SQUARE_SIZE * 0.95}
        L ${SquareBottomConWidth},${y + SQUARE_SIZE * 0.95}
      `;

      this.svg
        .append("path")
        .attr("d", pathData)

        .attr("stroke", "#456F974D")
        .attr("stroke-width", 10)
        .attr("stroke-linecap", "round");

      const leftSidePathData = `
        M ${startXBottom},${y + SQUARE_SIZE * 0.95}
        L ${startXBottom},${y}
      `;

      this.svg
        .append("path")
        .attr("d", leftSidePathData)

        .attr("stroke", "#456F974D")
        .attr("stroke-width", 8)
        .attr("stroke-linecap", "round");

      const rightSidePathData = `

        M ${SquareBottomConWidth},${y + SQUARE_SIZE * 0.95}
        L ${SquareBottomConWidth},${y}
      `;

      this.svg
        .append("path")
        .attr("d", rightSidePathData)

        .attr("stroke", "#456F974D")
        .attr("stroke-width", 8)
        .attr("stroke-linecap", "round");

      this.svg
        .append("rect")
        .attr("x", startX)
        .attr("y", y)
        .attr("width", SQUARE_SIZE)
        .attr("height", SQUARE_SIZE * 0.95)
        .attr("fill", "white");
    });
  }

  async addDataToStack(node: CREATE_STACK_NODE) {
    const stackLength = this.scene.queStack.length;

    console.log("stackLength", stackLength);
    const nodeData = {
      ...node,
      className: `COLUMN-0-${stackLength}`,
    };

    const finalXPosition = COLUMN_WIDTH / 2 - BLOCK_WIDTH / 2;
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
    this.scene.queStack.push(nodeData);
    try {
      const status = await new Promise((resolve, reject) => {
        const rec = this.svg
          .append("rect")
          .attr("x", startX)
          .attr("y", startY)
          .attr("width", BLOCK_WIDTH)
          .attr("height", BLOCK_ITEM_HEIGHT)
          .attr("fill", "blue")
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
      return status;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async popFromQueStack() {
    const processStackLength = this.scene.processStack.length;
    const queStackLength = this.scene.queStack.length;
    if (queStackLength === 0) return;

    const rec = this.svg.select(`.COLUMN-0-${queStackLength - 1}`);
    if (rec) {
      const finalXPosition = COLUMN_WIDTH / 2 - BLOCK_WIDTH / 2 + 200;

      const CONTAINER_TOP_LEFT_Y = this.height - SQUARE_SIZE * 1.25;
      const CONTAINER_BOTTOM_LEFT_Y = CONTAINER_TOP_LEFT_Y + SQUARE_SIZE * 0.95;

      let finalYPosition = 0;

      if (processStackLength === 0) {
        finalYPosition = CONTAINER_BOTTOM_LEFT_Y - BLOCK_ITEM_HEIGHT * 1.4;
      } else {
        finalYPosition =
          CONTAINER_BOTTOM_LEFT_Y -
          BLOCK_ITEM_HEIGHT * 1.4 * (processStackLength + 1);
      }

      const lastItem = this.scene.queStack[queStackLength - 1];

      const latestItem = {
        ...lastItem,
        className: `COLUMN-1-${processStackLength}`,
      };
      this.scene.processStack.push(latestItem);

      const oldY = +rec.attr("y");

      const startY = oldY - SQUARE_SIZE * 0.95;
      const initArrowPathData = `  
      M ${HALF_COLUMN_WIDTH},${oldY}, 
      L ${HALF_COLUMN_WIDTH},${oldY} 
      L ${HALF_COLUMN_WIDTH},${oldY} 
      L ${HALF_COLUMN_WIDTH},${oldY}`;

      const init2 = ` 
      M ${HALF_COLUMN_WIDTH},${oldY}  
      L ${HALF_COLUMN_WIDTH}, ${startY + BLOCK_ITEM_HEIGHT / 2} 
      L ${HALF_COLUMN_WIDTH}, ${startY + BLOCK_ITEM_HEIGHT / 2} 
      L ${HALF_COLUMN_WIDTH}, ${startY}  
    `;

      const init3 = `  
      M ${HALF_COLUMN_WIDTH},${oldY} 
      L ${HALF_COLUMN_WIDTH}, ${startY + BLOCK_ITEM_HEIGHT / 2} 
      L ${HALF_COLUMN_WIDTH + 200}, ${startY + BLOCK_ITEM_HEIGHT / 2} 
      L ${HALF_COLUMN_WIDTH + 200}, ${startY} 
    `;

      const arrowPathData = `
      M ${HALF_COLUMN_WIDTH},${oldY} 
      L ${HALF_COLUMN_WIDTH}, ${startY + BLOCK_ITEM_HEIGHT / 2} 
      L ${HALF_COLUMN_WIDTH + 200}, ${startY + BLOCK_ITEM_HEIGHT / 2} 
      L ${HALF_COLUMN_WIDTH + 200}, ${finalYPosition}
    `;
      try {
        const arrow = await new Promise((resolve, reject) => {
          const arrowPath = this.svg
            .append("path")
            .attr("d", initArrowPathData)
            .classed("ArrowPop", true)
            .attr("fill", "none")
            .attr("stroke", "blue")
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

        console.log("arrow", arrow);
        const blockItem = await new Promise((resolve, reject) => {
          const _blockItem = rec
            .classed(`COLUMN-0-${this.scene.queStack.length}`, false)
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
              this.scene.queStack.pop();
              const elements = this.svg.selectAll(".ArrowPop");
              if (elements) {
                elements.remove();
              }
              resolve(true);
            });
        });

        console.log("blockItem", blockItem);
        return arrow && blockItem;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  }
  async addOpCodeToProcessStack() {
    try {
      if (this.scene.processStack.length <= 1) return;

      // check if any items in the stack are operators
      // if not then return
      const hasOperators = this.scene.processStack.some(
        (d) => d.type === LANG_TYPE.OPERATORS
      );

      const processStackLength = this.scene.processStack.length;

      const finalXPosition = COLUMN_WIDTH / 2 - BLOCK_WIDTH / 2 + 200;
      let finalYPosition = 0;

      const CONTAINER_TOP_LEFT_Y = this.height - SQUARE_SIZE * 1.25;
      const CONTAINER_BOTTOM_LEFT_Y = CONTAINER_TOP_LEFT_Y + SQUARE_SIZE * 0.95;

      if (processStackLength === 0) {
        finalYPosition = CONTAINER_BOTTOM_LEFT_Y - BLOCK_ITEM_HEIGHT * 1.4;
      } else {
        finalYPosition =
          CONTAINER_BOTTOM_LEFT_Y -
          BLOCK_ITEM_HEIGHT * 1.4 * (processStackLength + 1);
      }

      const opAni = await new Promise((resolve, reject) => {
        const rec = this.svg
          .append("rect")
          .attr("x", finalXPosition)
          .attr("y", 0)
          .attr("width", BLOCK_WIDTH)
          .attr("height", BLOCK_ITEM_HEIGHT)
          .attr("fill", "purple")
          .classed(`COLUMN-1-${processStackLength}`, true)
          // .transition()
          // .duration(1000)
          // .attr("x", finalXPosition)
          .transition()
          .duration(1000)
          .attr("y", finalYPosition)
          .on("end", () => {
            this.scene.processStack.push({
              text: "OP_ADD",
              value: 1,
              type: LANG_TYPE.OPERATORS,
              className: `COLUMN-1-${processStackLength}`,
            });
            resolve(true);
          });
      });

      return opAni;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async startOp() {
    try {
      const first = await this.addDataToStack({
        text: "1",
        value: 1,
        type: LANG_TYPE.LANG_TYPE,
      });

      const two = await this.addDataToStack({
        text: "2",
        value: 1,
        type: LANG_TYPE.LANG_TYPE,
      });

      const popOne = await this.popFromQueStack();
      console.log("one", popOne);

      const popTwo = await this.popFromQueStack();
      console.log(popTwo);

      console.log("2", two);

      const addOp = await this.addOpCodeToProcessStack();
    } catch (err) {
      console.log(err);
    }
  }
}

export default DrawScene;
