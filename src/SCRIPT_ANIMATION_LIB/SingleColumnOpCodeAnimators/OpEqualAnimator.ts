import OpCodeAnimator from "./OpCodeAnimator";

export class OpEqualAnimator extends OpCodeAnimator {
  async animate() {
    await this.scriptControl.popStackData()
    await this.scriptControl.popStackData()
  }
}
