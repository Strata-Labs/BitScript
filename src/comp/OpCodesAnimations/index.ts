import * as d3 from "d3";

export const SATOSHI_ART_BOARD = "satoshi-svg-board";
export enum LIB_DATA_TYPE {
  SCRIPT_DATA = "SCRIPT_DATA",
  OP_CODE = "OP_CODE",
}

export type SCRIPT_DATA = {
  dataBinary: any;
  dataBytes: any;
  dataHex: string;
  dataNumber?: number | string;
  dataString?: string;
  className?: string;
  libDataType: LIB_DATA_TYPE.SCRIPT_DATA;
  stackIndex: number;
};

export type OP_CODE = {
  name: string;
  number: number;
  hex: string;
  description: string;
  className?: string;
  libDataType: LIB_DATA_TYPE.OP_CODE;
  stackIndex: number;
};

export enum COLUMN_TYPE {
  MAIN_STACK = "MAIN_STACK",
  RESULT_STACK = "RESULT_STACK",
}

export enum MOVE_TYPE {
  ADD = "ADD",
  MOVE_POP = "POP",
  MOVE_POP_ARROW = "POP_ARROW",
}

export type ACTION = {
  data: SCRIPT_DATA | OP_CODE;
  to: COLUMN_TYPE;
  moveType: MOVE_TYPE;
  stackIndex: number;
};
export type EXECUTION_STEPS = {
  containers?: number[];
  mainStack: (SCRIPT_DATA | OP_CODE)[];
  resultStack: (SCRIPT_DATA | OP_CODE)[];
  actions: ACTION[];
};

export type OpCodesBaseLineParams = {
  width: number;
  height: number;
  opCodeStackSteps: EXECUTION_STEPS[];
  startStep?: number;
  autoPlay?: boolean;
  handleStepFromClass: (step: number) => void;
};

export const STACK_DATA_COLOR = "#1D267D";
export const OP_CODE_COLOR = "#0C134F";

export class OpCodesBaseline {
  opCodeStackSteps: EXECUTION_STEPS[];

  mainStack: (SCRIPT_DATA | OP_CODE)[];
  resultStack: (SCRIPT_DATA | OP_CODE)[];
  actions: ACTION[];

  containers?: number[];
  step: number;

  width: number;
  height: number;
  svg = d3.select("#" + SATOSHI_ART_BOARD);

  COLUMN_WIDTH: number;
  HALF_COLUMN_WIDTH: number;
  TOTAL_COLUMNS: number;
  SQUARE_SIZE: number;

  AUTO_PLAY: boolean = false;

  handleStepFromClass: (step: number) => void;

  constructor({
    width,
    height,
    opCodeStackSteps,
    autoPlay,
    startStep,
    handleStepFromClass,
  }: OpCodesBaseLineParams) {
    const svg = d3
      .select("#" + SATOSHI_ART_BOARD)
      .attr("width", width)
      .attr("height", height);

    this.width = width;
    this.height = height;

    this.step = startStep || 0;

    this.opCodeStackSteps = opCodeStackSteps;

    this.mainStack = opCodeStackSteps[this.step].mainStack;
    this.resultStack = opCodeStackSteps[this.step].resultStack;
    this.actions = opCodeStackSteps[this.step].actions;
    this.containers = opCodeStackSteps[this.step].containers;

    this.handleStepFromClass = handleStepFromClass;
    // if the result stack has nothing in it and there is no item in actions going to result stack we can asssume we are workign on a single container with 1 column
    if (autoPlay) {
      this.AUTO_PLAY = autoPlay;
    }
    const hasResultStackDestination =
      this.actions.filter((action) => action.to === COLUMN_TYPE.RESULT_STACK)
        .length > 0;
    if (this.resultStack.length > 0 && hasResultStackDestination) {
      // draw 4 columns
      this.COLUMN_WIDTH = width / 4;
      this.TOTAL_COLUMNS = 4;
      this.SQUARE_SIZE = this.COLUMN_WIDTH / 1.5;
    } else {
      console.log("should only be showing one column");
      this.TOTAL_COLUMNS = 1;
      this.COLUMN_WIDTH = width;
      this.SQUARE_SIZE = 200;
    }

    this.HALF_COLUMN_WIDTH = this.COLUMN_WIDTH / 2;
  }

  handlePlayClick() {
    this.AUTO_PLAY = !this.AUTO_PLAY;

    //this.play();
  }

  get BLOCK_ITEM_HEIGHT() {
    return this.SQUARE_SIZE * 0.25;
  }

  get BLOCK_WIDTH() {
    return this.SQUARE_SIZE * 0.8;
  }

  get HALF_SQUARE() {
    return this.SQUARE_SIZE / 2;
  }
}
