import { SingleColumnScriptControl } from "../SingleColumnScriptControl";

abstract class OpCodeAnimator {
  scriptControl: SingleColumnScriptControl

  constructor(scriptControl: SingleColumnScriptControl) {
    this.scriptControl = scriptControl
  }

  abstract animate(): Promise<void>
}

export default OpCodeAnimator
