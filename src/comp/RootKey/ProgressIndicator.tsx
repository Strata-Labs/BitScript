import React from "react";
import { classNames as cn } from "@/utils";

interface ProgressIndicatorProps {
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
}) => {
  const steps = [
    { number: 1, label: "Create seed" },
    { number: 2, label: "derivation paths" },
    { number: 3, label: "derived addresses" },
  ];

  return (
    <div className="mb-20 mt-2 flex w-[40%] max-w-2xl items-center justify-between">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="relative flex flex-col items-center text-xs">
            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full p-4 text-xs font-bold",
                currentStep >= step.number
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {step.number}
            </div>
            <span className="absolute top-7 mt-2 text-xs">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex flex-grow items-center">
              <div
                className={cn(
                  "h-0.5 w-full",
                  currentStep > step.number ? "bg-yellow-500" : "bg-gray-200"
                )}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressIndicator;
