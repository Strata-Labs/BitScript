import OpCodeAnimator from "./OpCodeAnimator";

export class OpHash160Animator extends OpCodeAnimator {
  async animate() {
    await this.scriptControl.popStackData()
    await this.pushRemainingStackData()
  }
}
