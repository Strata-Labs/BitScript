import OpCodeAnimator from "./OpCodeAnimator";

export class OpDupAnimator extends OpCodeAnimator {
  async animate() {
    await this.scriptControl.ghostPopStackData()
  }
}