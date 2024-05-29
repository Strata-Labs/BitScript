import OpCodeAnimator from "./OpCodeAnimator";

export class OpCatAnimator extends OpCodeAnimator {
  async animate() {
    await this.scriptControl.popStackData();
    await this.scriptControl.popStackData();
  }
}