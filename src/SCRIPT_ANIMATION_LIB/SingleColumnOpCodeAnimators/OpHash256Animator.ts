import OpCodeAnimator from "./OpCodeAnimator";

export class OpHash256Animator extends OpCodeAnimator {
  async animate() {
    await this.scriptControl.popStackData();
  }
}
