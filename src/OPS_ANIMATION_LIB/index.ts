import { ScriptData } from "@/corelibrary/scriptdata";
import * as d3 from "d3";

export const SATOSHI_ART_BOARD = "satoshi-svg-board";
export enum LIB_DATA_TYPE {
  SCRIPT_DATA = "SCRIPT_DATA",
  OP_CODE = "OP_CODE",
}

export enum SCRIPT_DATA_STYLE_TYPE {
  BASIC = "BASIC",
  SECONDARY = "SECONDARY",
  DUPLICATE = "DUPLICATE",
  HASH = "HASH",
  BOOLEAN_FALSE = "BOOLEAN_FALSE",
  BOOLEAN_TRUE = "BOOLEAN_TRUE",
  EQUAL = "EQUAL",
}

export type CORE_SCRIPT_DATA = ScriptData & {
  // dataBinary?: any;
  // dataBytes?: any;
  // dataHex?: string;
  // dataNumber?: number | string;
  // dataString?: string;
};

export type OLD_CORE_SCRIPT_DATA = {
  dataBinary?: any;
  dataBytes?: any;
  dataHex?: string;
  dataNumber?: number | string;
  dataString?: string;
};
export type SCRIPT_DATA = CORE_SCRIPT_DATA & {
  // everything below this was added
  // i think at this point we may as well change the data model
  className?: string;
  libDataType: LIB_DATA_TYPE.SCRIPT_DATA;
  stackIndex: number;
  styleType: SCRIPT_DATA_STYLE_TYPE;
};

export type OLD_SCRIPT_DATA = OLD_CORE_SCRIPT_DATA & {
  className?: string;
  libDataType: LIB_DATA_TYPE.SCRIPT_DATA;
  stackIndex: number;
  styleType: SCRIPT_DATA_STYLE_TYPE;
};
export type CORE_OP_CODE = {
  name: string;
  number: number;
  hex: string;
  description: string;
};
export type OP_CODE = CORE_OP_CODE & {
  className?: string;
  libDataType: LIB_DATA_TYPE.OP_CODE;
  stackIndex: number;
};

export enum COLUMN_TYPE {
  MAIN_STACK = "MAIN_STACK",
  RESULT_STACK = "RESULT_STACK",
  END_STACK = "END_STACK",
}

export enum MOVE_TYPE {
  ADD = "ADD",
  MOVE_POP = "POP",
  MOVE_POP_ARROW = "POP_ARROW",
  ADD_EQUAL = "ADD_EQUAL",
  DUPLICATE = "DUPLICATE",
}

export type ACTION = {
  data: OLD_SCRIPT_DATA | OP_CODE;
  to: COLUMN_TYPE;
  moveType: MOVE_TYPE;
  stackIndex: number;
};
export type EXECUTION_STEPS = {
  containers?: number[];
  mainStack: (OLD_SCRIPT_DATA | OP_CODE)[];
  resultStack: (OLD_SCRIPT_DATA | OP_CODE)[];
  actions: ACTION[];
};

export type OpCodesBaseLineParams = {
  width: number;
  height: number;
  opCodeStackSteps: EXECUTION_STEPS[];
  startStep?: number;
  autoPlay: boolean;
  handleStepFromClass: (step: number) => void;
  handleClassPauseCallBack: (status: boolean) => void;
};

export const STACK_DATA_COLOR = "#1D267D";
export const OP_CODE_COLOR = "#0C134F";

export class OpCodesBaseline {
  opCodeStackSteps: EXECUTION_STEPS[];

  mainStack: (OLD_SCRIPT_DATA | OP_CODE)[];
  resultStack: (OLD_SCRIPT_DATA | OP_CODE)[];
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

  AUTO_PLAY: boolean;

  actionStep: number = 0;
  handleStepFromClass: (step: number) => void;
  handleClassPauseCallBack: (status: boolean) => void;

  constructor({
    width,
    height,
    opCodeStackSteps,
    autoPlay,
    startStep,
    handleStepFromClass,
    handleClassPauseCallBack,
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
    this.handleClassPauseCallBack = handleClassPauseCallBack;

    this.AUTO_PLAY = autoPlay;
    // if the result stack has nothing in it and there is no item in actions going to result stack we can asssume we are workign on a single container with 1 column

    const hasResultStackDestination =
      this.actions.filter((action) => action.to === COLUMN_TYPE.RESULT_STACK)
        .length > 0;
    if (this.resultStack.length > 0 && hasResultStackDestination) {
      // draw 4 columns
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

  getStackDataFill(type: SCRIPT_DATA_STYLE_TYPE) {
    if (type === SCRIPT_DATA_STYLE_TYPE.BASIC) {
      return STACK_DATA_COLOR;
    } else if (type === SCRIPT_DATA_STYLE_TYPE.SECONDARY) {
      return "#5C469C";
    } else {
      return STACK_DATA_COLOR;
    }
  }
}
