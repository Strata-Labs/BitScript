import OpCodeAnimator from "./OpCodeAnimator";

export class OpRotAnimator extends OpCodeAnimator {
  async animate() {
    await this.scriptControl.popStackData();
    await this.scriptControl.popStackData();
    await this.scriptControl.popStackData();
  }
}