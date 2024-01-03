import { classNames } from "@/utils";
import { CheckIcon } from "@heroicons/react/20/solid";

type SignaturePastSteps = {
  step: number;
  setStep: (value: number) => void;
};

type thing = {
  [key: number]: string;
};
const SignaturePastSteps = ({ step, setStep }: SignaturePastSteps) => {
  // create an array of steps from numbers to the current step starting at 1
  // if the step is less than the current step, render the step number

  // create an array of numbers who values are all the steps from 0 to the current step

  const title: thing = {
    3: "1. Generate Random Number ",
    4: "2. Provide Private Signing Key",
    5: "3. Provide Message To Sign",
  };

  if (step < 3) {
    return null;
  }

  const items = Object.keys(title)
    .filter((d) => parseInt(d) < step + 1)
    .map((d) => title[parseInt(d)]);

  return (
    <div className="flex flex-col rounded-xl bg-[#ffffff] p-6 py-6">
      {items.map((d, i) => {
        const showBottomBorder = i !== items.length - 1;
        return (
          <div
            onClick={() => setStep(i + 1)}
            className={classNames(
              "flex flex-row items-center justify-between    py-4",
              showBottomBorder && "border-b border-[#E0E0E0]"
            )}
          >
            <p className="text-[20px] font-semibold">{d}</p>
            <div
              className={classNames(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 border-dark-orange"
              )}
            >
              <CheckIcon className="h-6 w-6 font-bold text-dark-orange" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default SignaturePastSteps;
