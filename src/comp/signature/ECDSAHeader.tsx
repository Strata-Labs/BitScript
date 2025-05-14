import { classNames } from "@/utils";

const stepsBasicStyling = `font-thin text-[#5A5765] text-[48px]`;

const activeStepStyling = "!font-bold text-[50px] !text-dark-orange";
type ECDSAHeader = {
  currentStep: number;
};
const ECDSAGenerateHeader = ({ currentStep }: ECDSAHeader) => {
  const isSelected = (step: number) => {
    if (currentStep === 5) {
      if (step === 4 || step === 5) {
        return true;
      }
    }
    if (currentStep === 6) {
      if (step === 4 || step === 5) {
        return true;
      }
    }
    if (currentStep === 3 && step === 3) return true;
    if (currentStep === 2) {
      if (step === 1 || step === 2) {
        return true;
      }
    }

    if (currentStep === 1) {
      if (step === 1) {
        return true;
      }
    }
    if (currentStep === 7) {
      return true;
    }
    // if (currentStep === 2) {
    //   if (step === 1 || step === 2) {
    //     return true;
    //   }
    // }
    // if (step === currentStep) {
    //   return true;
    // }

    // if (step < currentStep) {
    //   return true;
    // }

    return false;
  };

  return (
    <div className="flex w-full flex-row items-center">
      <div className="flex  flex-col ">
        <p className="text-[48px] font-semibold tracking-wide	 text-black">
          ECDSA
        </p>
        <p className="-mt-5 text-[24px] font-extralight text-[#0C071D]">
          Generate Sig
        </p>
      </div>
      <p className="mx-3 w-min text-[48px] font-semibold text-black">=</p>
      <div className=" flex  flex-row gap-2">
        <p
          className={classNames(
            stepsBasicStyling,
            "relative",
            isSelected(1) && activeStepStyling
          )}
        >
          k{" "}
          <span className="-top-0.1 absolute -right-4 text-[23px] font-bold">
            -1
          </span>
        </p>
        <p
          className={classNames(
            stepsBasicStyling,
            "ml-2",
            isSelected(-1) && activeStepStyling
          )}
        >
          {"("}
        </p>
        <p
          className={classNames(
            stepsBasicStyling,
            "",
            isSelected(4) && activeStepStyling
          )}
        >
          H(m)
        </p>
        <p
          className={classNames(
            stepsBasicStyling,
            isSelected(-1) && activeStepStyling
          )}
        >
          +
        </p>
        <p
          className={classNames(
            stepsBasicStyling,
            "",
            isSelected(3) && activeStepStyling
          )}
        >
          e
        </p>
        <p
          className={classNames(
            stepsBasicStyling,
            isSelected(-1) && activeStepStyling
          )}
        >
          *
        </p>
        <p
          className={classNames(
            stepsBasicStyling,
            "",
            isSelected(2) && activeStepStyling
          )}
        >
          r
        </p>
        <p
          className={classNames(
            stepsBasicStyling,
            isSelected(-1) && activeStepStyling
          )}
        >
          {")"}
        </p>
      </div>
    </div>
  );
};

export default ECDSAGenerateHeader;

export const ECDSAVerifyHeader = ({}) => {
  return (
    <div className="flex w-full flex-row">
      <div className="flex  flex-col ">
        <p className="text-[48px] font-semibold tracking-widest	 text-black">
          ECDSA
        </p>
        <p className="text-[18px] font-light text-black">Verify Signature</p>
      </div>
      <p className="w-min text-[48px] font-semibold text-black">=</p>
      <div className="ml-4 flex  flex-row gap-2">
        <p className={classNames(stepsBasicStyling, "relative")}>
          S{" "}
          <span className="absolute -right-4 -top-1.5 text-[23px] font-bold">
            -1
          </span>
        </p>
        <p className={classNames(stepsBasicStyling, "ml-2")}>{"("}</p>
        <p className={classNames(stepsBasicStyling, "")}>H(m)</p>
        <p className={classNames(stepsBasicStyling)}>+</p>
        <p className={classNames(stepsBasicStyling, "")}>P</p>
        <p className={classNames(stepsBasicStyling)}>*</p>
        <p className={classNames(stepsBasicStyling, "")}>r</p>
        <p className={classNames(stepsBasicStyling)}>{")"}</p>
      </div>
    </div>
  );
};
