import * as React from "react";

import { classNames as cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "border-dark-orange bg-light-purple placeholder:text-white flex w-full rounded-3xl border px-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        default: "h-10 py-2",
        padded: "h-14 py-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type InputVariantProps = VariantProps<typeof inputVariants>;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    InputVariantProps {
  size?: InputVariantProps["size"];
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={inputVariants({size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";


export { Input };
