import { classNames } from "@/utils";

const stepsBasicStyling = `font-thin  text-[48px]`;

type ECDSAHeader = {
  currentStep: number;
};
const ECDSAGenerateHeader = ({ currentStep }: ECDSAHeader) => {
  const isSelected = (step: number) => {
    if (currentStep === 5) {
      if (step === 4 || step === 5) {
        return "!font-bold text-[50px] text-dark-orange";
      }
    }
    if (currentStep === 6) {
      if (step === 4 || step === 5) {
        return "!font-bold text-[50px] text-dark-orange";
      }
    }
    if (currentStep == 2 && step == 1) {
      return "!font-bold text-[50px] text-dark-orange";
    }

    if (step === currentStep) {
      return "!font-bold text-[50px] text-dark-orange";
    }

    if (step < currentStep) {
      return "!font-semibold text-[50px] text-black";
    }
  };

  return (
    <div className="flex w-full flex-row">
      <div className="flex  flex-col ">
        <p className="text-[48px] font-semibold tracking-widest	 text-black">
          ECDSA
        </p>
        <p className="text-[18px] font-light text-black">Generate Signature</p>
      </div>
      <p className="w-min text-[48px] font-semibold text-black">=</p>
      <div className="ml-4 flex  flex-row gap-2">
        <p className={classNames(stepsBasicStyling, "relative", isSelected(1))}>
          K{" "}
          <span className="absolute -right-4 -top-1.5 text-[23px] font-bold">
            -1
          </span>
        </p>
        <p className={classNames(stepsBasicStyling, "ml-2")}>{"("}</p>
        <p className={classNames(stepsBasicStyling, "", isSelected(4))}>H(m)</p>
        <p className={classNames(stepsBasicStyling, "")}>+</p>
        <p className={classNames(stepsBasicStyling, "", isSelected(3))}>e</p>
        <p className={classNames(stepsBasicStyling, "")}>*</p>
        <p className={classNames(stepsBasicStyling, "", isSelected(2))}>r</p>
        <p className={classNames(stepsBasicStyling, "")}>{")"}</p>
      </div>
    </div>
  );
};

export default ECDSAGenerateHeader;
