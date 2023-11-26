import OpCodeAnimator from "./OpCodeAnimator";

export class OpCheckSigAnimator extends OpCodeAnimator {
  async animate() {
    await this.scriptControl.popStackData()
    await this.scriptControl.popStackData()
  }
}
