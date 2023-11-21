import { SingleColumnScriptControl } from "../SingleColumnScriptControl";

abstract class OpCodeAnimator {
  scriptControl: SingleColumnScriptControl

  constructor(scriptControl: SingleColumnScriptControl) {
    this.scriptControl = scriptControl
  }

  abstract animate(): Promise<void>

  async pushRemainingStackData() {
    const currentStackLength = this.scriptControl.currentStack.length
    const finalStack = this.scriptControl.scriptSteps[this.scriptControl.currentStepIndex].currentStack
  
    for (let i = currentStackLength; i < finalStack.length; i++) {
      await this.scriptControl.pushStackDataFromOpCode(finalStack[i])
    }
  }
}

export default OpCodeAnimator
