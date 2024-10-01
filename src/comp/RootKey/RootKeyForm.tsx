import { AnimatePresence } from "framer-motion";
import { useMultiplestepForm } from "./hooks/useMultiStepForm";
import { Button } from "../Ui/button";
import { useState } from "react";
import SeedGeneratorForm from "./SeedGeneratorForm";
import ProgressIndicator from "./ProgressIndicator";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { classNames as cn } from "@/utils";
import DerivationPathForm from "./DerivationPathForm";
import DerivationPathOutput from "./DerivationPathOutput";
import DerivedAddressesOutput from "./DerivedAddressesOutput";

export type FormItems = {
  name: string;
  email: string;
  phone: string;
  plan: "arcade" | "advanced" | "pro";
  yearly: boolean;
};

const initialValues: FormItems = {
  name: "",
  email: "",
  phone: "",
  plan: "arcade",
  yearly: false,
};

export default function RootKeyForm() {
  const [formData, setFormData] = useState(initialValues);
  const updateForm = (fieldToUpdate: Partial<FormItems>) => {
    // setFormData((prev) => ({ ...prev, ...fieldToUpdate }));
    console.log("this is the field to update");
  };
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    steps,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(4);
  return (
    <form className="mb-5 ml-[260px] mr-10 mt-5 justify-center rounded-lg bg-white p-4 pb-10 text-black">
      <AnimatePresence mode="wait">
        {/* {currentStepIndex === 0 && (
          <SeedGeneratorForm
            key="step1"
            currentStep={currentStepIndex + 1}
            {...formData}
            updateForm={updateForm}
          />
        )} */}
        {/* {currentStepIndex === 1 && (
            <DerivationPathForm currentStep={currentStepIndex + 1}  key="step2" {...formData} updateForm={updateForm} />
          )}  */}
        {/* {currentStepIndex === 2 && (
            <DerivationPathOutput key="step3" currentStep={currentStepIndex + 1} {...formData} updateForm={updateForm} />
         )} */}
        {/* {currentStepIndex === 3 && ( */}
          <DerivedAddressesOutput
            key="step4"
            currentStep={currentStepIndex + 1}
            updateForm={updateForm}
            {...formData}
          />
        {/* )} */}
      </AnimatePresence>
      <div className="mt-8 flex items-center justify-between">
        <div className="">
          <Button
            onClick={previousStep}
            type="button"
            variant="destructive"
            className={cn(
              "",
              !isFirstStep ? "invisible" : "visible p-0 text-black"
            )}
          >
            Reset
            <span className="ml-2">
              <div className="h-4 w-4 ">
                <img src="/arrow-refresh.svg" alt="reset" />
              </div>
            </span>
          </Button>
        </div>

        <div className=" flex items-center justify-between gap-4">
          <div className="">
            <Button
              onClick={previousStep}
              type="button"
              variant="secondary"
              className={cn(
                "",
                !isFirstStep
                  ? "invisible"
                  : "visible p-0 text-black hover:text-white"
              )}
            >
              <span>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
              </span>
              prev
            </Button>
          </div>
          <div className="flex items-center">
            <div className="after:shadow-highlight relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-white/10 after:transition focus-within:after:shadow-[#77f6aa]">
              <Button
                type="submit"
                variant="next"
                className="shadow-input relative rounded-md border border-black/20 bg-black text-neutral-200 shadow-black/10 hover:text-white"
              >
                {/* {isLastStep ? "Confirm" : "Next Step"} */}
                Next
                <span>
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
