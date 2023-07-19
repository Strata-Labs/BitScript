import * as d3 from "d3";
import { SATOSHI_ART_BOARD } from "../MultiSectionHelper/DrawScene";

export type SCRIPT_DATA = {
  dataBinary: any;
  dataBytes: any;
  dataHex: string;
  dataNumber?: number;
  dataString?: string;
  className?: string;
};

export type OP_CODE = {
  name: string;
  number: number;
  hex: string;
  description: string;
  className?: string;
};

export type EXECUTION_STEPS = {
  beforeStack: SCRIPT_DATA[];
  currentStack: SCRIPT_DATA[];
  stackData?: SCRIPT_DATA;
  opCode?: OP_CODE;
};

export type BaseLineParams = {
  width: number;
  height: number;
  scriptStackSteps: EXECUTION_STEPS[];
  startStep?: number;
};

export class BaseLine {
  scriptStackSteps: EXECUTION_STEPS[];

  // we're on the fence about just always pointing to scriptStackSteps[0] or if we should have a beforeStep out side as a duplicate value
  // one is more code but a bit easier to read and interact with
  // we'll see
  beforeStack: SCRIPT_DATA[];
  currentStack: SCRIPT_DATA[];
  stackData?: SCRIPT_DATA;
  opCode?: OP_CODE;

  step: number;

  width: number;
  height: number;
  svg = d3.select("#" + SATOSHI_ART_BOARD);

  COLUMN_WIDTH: number;
  HALF_COLUMN_WIDTH: number;

  constructor({ width, height, scriptStackSteps }: BaseLineParams) {
    this.width = width;
    this.height = height;

    this.step = 0;

    const scriptStack = scriptStackSteps[this.step];

    this.scriptStackSteps = scriptStackSteps;
    this.beforeStack = scriptStack.beforeStack;
    this.currentStack = scriptStack.currentStack;

    this.stackData = scriptStack.stackData;
    this.opCode = scriptStack.opCode;

    const svg = d3
      .select("#" + SATOSHI_ART_BOARD)
      .attr("width", width)
      .attr("height", height);

    // need to check how many columns are in the scene so

    // loop through finalScene & check how many keys have a length greater than 0

    const columns = this.currentStack.length;
    console.log(columns);

    if (scriptStack.opCode) {
      this.COLUMN_WIDTH = width / 4;
    } else {
      this.COLUMN_WIDTH = width;
    }

    this.HALF_COLUMN_WIDTH = this.COLUMN_WIDTH / 2;

    console.log(this.COLUMN_WIDTH);
    console.log(this.HALF_COLUMN_WIDTH);

    //this.startScene();
  }
}
