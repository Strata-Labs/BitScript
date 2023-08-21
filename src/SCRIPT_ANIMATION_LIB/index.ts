import {
  CORE_OP_CODE,
  CORE_SCRIPT_DATA,
  SATOSHI_ART_BOARD,
} from "@/OPS_ANIMATION_LIB";
import * as d3 from "d3";

export type SCRIPT_DATA_STACK = {
  beforeStack: CORE_SCRIPT_DATA[];
  currentStack: CORE_SCRIPT_DATA[];
  opCode?: CORE_OP_CODE;
  stackData?: CORE_SCRIPT_DATA;
};
export type ScriptAnimationBaselineParams = {
  width: number;
  height: number;
  scriptStackSteps: SCRIPT_DATA_STACK[];
  startStep?: number;
  autoPlay: boolean;
  handleStepFromClass: (step: number) => void;
  handleClassPauseCallBack: (status: boolean) => void;
};

export class ScriptAnimationBaseline {
  scriptStackSteps: SCRIPT_DATA_STACK[];

  beforeStack: CORE_SCRIPT_DATA[];
  currentStack: CORE_SCRIPT_DATA[];

  opCode?: CORE_OP_CODE;
  stackData?: CORE_SCRIPT_DATA;

  step: number;

  width: number;
  height: number;
  svg = d3.select("#" + SATOSHI_ART_BOARD);

  COLUMN_WIDTH: number;
  HALF_COLUMN_WIDTH: number;
  TOTAL_COLUMNS: number;
  SQUARE_SIZE: number;

  AUTO_PLAY: boolean;

  actionStep: number = 0;
  handleStepFromClass: (step: number) => void;
  handleClassPauseCallBack: (status: boolean) => void;

  constructor({
    width,
    height,
    scriptStackSteps,
    startStep,
    autoPlay,
    handleStepFromClass,
    handleClassPauseCallBack,
  }: ScriptAnimationBaselineParams) {
    const svg = d3
      .select("#" + SATOSHI_ART_BOARD)
      .attr("width", width)
      .attr("height", height);

    // Width of and height of the svg
    this.width = width;
    this.height = height;

    // sets the step we are in within the stack
    this.step = startStep || 0;

    this.scriptStackSteps = scriptStackSteps;

    // this current stack before stack
    this.beforeStack = scriptStackSteps[this.step].beforeStack;
    this.currentStack = scriptStackSteps[this.step].currentStack;
    // this current stack OP CODE
    this.opCode = scriptStackSteps[this.step].opCode;
    // this current stack stack data
    this.stackData = scriptStackSteps[this.step].stackData;

    // Helper function to handle the step from the class
    this.handleStepFromClass = handleStepFromClass;
    this.handleClassPauseCallBack = handleClassPauseCallBack;

    this.AUTO_PLAY = autoPlay;

    // if there an op code we can assume that we'll use 4 columns for the stack
    if (this.opCode) {
      this.COLUMN_WIDTH = width / 4;
      this.TOTAL_COLUMNS = 4;
      this.SQUARE_SIZE = this.COLUMN_WIDTH / 1.5;
    } else {
      this.TOTAL_COLUMNS = 1;
      this.COLUMN_WIDTH = width;
      this.SQUARE_SIZE = 200;
    }
    this.HALF_COLUMN_WIDTH = this.COLUMN_WIDTH / 2;
  }
  get BLOCK_ITEM_HEIGHT() {
    return this.SQUARE_SIZE * 0.25;
  }

  get FONT_SIZE() {
    if (this.TOTAL_COLUMNS === 1) {
      return 16;
    } else {
      if (this.width > 500) {
        return 12;
      } else {
        return 8;
      }
    }
  }

  get OPS_FONT_STYLE() {
    return `${this.FONT_SIZE}px sora`;
  }

  get BLOCK_WIDTH() {
    return this.SQUARE_SIZE * 0.8;
  }

  get HALF_SQUARE() {
    return this.SQUARE_SIZE / 2;
  }

  handlePlayClick() {
    this.AUTO_PLAY = !this.AUTO_PLAY;

    //this.play();
  }
}
