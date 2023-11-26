import OpCodeAnimator from "./OpCodeAnimator";

export class OpAddAnimator extends OpCodeAnimator {
  async animate() {
    await this.scriptControl.popStackData();
    await this.scriptControl.popStackData();
  }
}
