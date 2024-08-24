import { ScriptInputProps } from "../types";
import { Input } from "../UI/input";

export const ScriptInput = ({
  value,
  onChange,
  label,
  placeholder,
  valid,
  scriptSandBoxInputName,
  width = "w-full",
  touched,
}: ScriptInputProps) => {
  return (
    <div className={`flex flex-col gap-2 ${width}`}>
      <p>
        <label className="text-md font-semibold text-white">{label}</label>
      </p>
      <div className="w-full">
        <Input
          name={scriptSandBoxInputName}
          value={value ?? ''} // Ensure value is always defined
          onChange={onChange}
          placeholder={placeholder}
          className="relative h-14  w-full rounded-full bg-dark-purple px-8 text-lg text-white placeholder:font-light placeholder:text-gray-400"
        />
      </div>

      {/* checks if the input is touched and not valid */}
      {touched && !valid.valid && (
        <p className="text-sm text-red-500">{valid.message}</p>
      )}
    </div>
  );
};