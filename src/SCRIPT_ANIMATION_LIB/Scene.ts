import * as d3 from "d3";

import { ScriptAnimationBaseline } from ".";
import { StackDataPosition } from "@/comp/OpCodesAnimations/Scene";
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

  //drawStack
}
