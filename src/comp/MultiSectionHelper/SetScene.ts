import { DATA_COLUMN_STACKS, SATOSHI_ART_BOARD } from "./DrawScene";
import * as d3 from "d3";

type DRAW_SCENE_PARAMS = {
  scene: DATA_COLUMN_STACKS;
  width: number;
  height: number;
  finalScene: DATA_COLUMN_STACKS;
};

const PLACEHOLDER_CON_COLOR = "#456F97";
export const SQUARE_SIZE = 155;

export const BLOCK_WIDTH = SQUARE_SIZE * 0.8;

export const BLOCK_ITEM_HEIGHT = SQUARE_SIZE * 0.2;

export const HALF_SQUARE = SQUARE_SIZE / 2;

class SetScene {
  scene: DATA_COLUMN_STACKS;
  finalScene: DATA_COLUMN_STACKS;

  width: number;
  height: number;
  svg = d3.select("#" + SATOSHI_ART_BOARD);

  COLUMN_WIDTH: number;
  HALF_COLUMN_WIDTH: number;

  constructor({ scene, width, height, finalScene }: DRAW_SCENE_PARAMS) {
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.finalScene = finalScene;

    const svg = d3
      .select("#" + SATOSHI_ART_BOARD)
      .attr("width", width)
      .attr("height", height);

    // need to check how many columns are in the scene so

    // loop through finalScene & check how many keys have a length greater than 0

    const columns = Object.keys(this.finalScene).reduce((acc, key: string) => {
      return finalScene[key].length > 0 ? acc + 1 : acc;
    }, 0);
    console.log(columns);
    this.COLUMN_WIDTH = columns > 1 ? width / 4 : width;
    this.HALF_COLUMN_WIDTH = this.COLUMN_WIDTH / 2;

    this.startScene();
  }

  async startScene() {
    // we need to determine how many columns are in the scene
    // first possibility is that there is just one column of an empty container
    // draw a basic scene with just one container
    // first we draw all the containers
    this.drawContainers();
    this.renderData();
    // then we draw all the blocks
  }

  resetScene(scene: DATA_COLUMN_STACKS) {
    this.svg.selectAll("*").remove();
    this.scene = scene;
    this.startScene();
  }
  async renderData() {
    const dataKeys = Object.keys(this.scene);

    dataKeys.forEach((key, i) => {
      const data = this.scene[key];
      const startX = this.COLUMN_WIDTH * i;
      data.forEach((item, index) => {
        const finalXPosition = this.COLUMN_WIDTH / 2 - BLOCK_WIDTH / 2 + startX;
        let finalYPosition = 0;

        const CONTAINER_TOP_LEFT_Y = this.height - SQUARE_SIZE * 1.25;
        const CONTAINER_BOTTOM_LEFT_Y =
          CONTAINER_TOP_LEFT_Y + SQUARE_SIZE * 1.15;

        finalYPosition =
          CONTAINER_BOTTOM_LEFT_Y - BLOCK_ITEM_HEIGHT * 1.25 * (index + 2);

        const rec = this.svg
          .append("rect")

          .attr("width", BLOCK_WIDTH)
          .attr("height", BLOCK_ITEM_HEIGHT)
          .attr("fill", "blue")
          .classed(item.className, true)

          .attr("x", finalXPosition)

          .attr("y", finalYPosition);

        const text = this.svg
          .append("text")
          .text(item.text)
          .attr("fill", "white")

          .classed(`${item.className}-text`, true)

          .attr("x", finalXPosition + BLOCK_WIDTH / 2)

          .attr("y", finalYPosition + BLOCK_ITEM_HEIGHT / 1.5);
      });
    });
  }
  async drawContainers() {
    // there's really only two options or maybe 3
    // 1. there's a single container with a single block
    // theres 4
    // check how many columns are have items in final scene

    const columns = Object.keys(this.finalScene).reduce((acc, key: string) => {
      return this.finalScene[key].length > 0 ? acc + 1 : acc;
    }, 0);

    if (columns === 1) {
      // draw single column
      this.drawConHelper([true]);
    } else {
      this.drawConHelper([true, false, false, true]);
      // only other option atm is that there is 4 columns and 2 have visual containers
    }
  }

  private async drawConHelper(containers: boolean[]) {
    containers.forEach((container, index) => {
      if (!container) return;
      let startX = 0;
      if (index > 1) {
        const start = this.COLUMN_WIDTH * index;
        const other = this.HALF_COLUMN_WIDTH - HALF_SQUARE;

        startX = start + other;
      } else {
        startX = this.HALF_COLUMN_WIDTH - HALF_SQUARE;
      }

      const y = this.height - SQUARE_SIZE * 1.25;

      const SquareBottomConWidth = SQUARE_SIZE * 1.15;
      const halfSquareBottom = SquareBottomConWidth / 2;

      const startXBottom = this.HALF_COLUMN_WIDTH;

      const temp = this.COLUMN_WIDTH * index;

      const _startXBottom =
        index > 0
          ? startXBottom + this.COLUMN_WIDTH * index
          : startXBottom - halfSquareBottom;

      const _SquareBottomConWidth =
        index > 1 ? SquareBottomConWidth : SquareBottomConWidth;

      // Define the path data

      // Calculate the total length of the path

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
    });
  }
}

export default SetScene;
