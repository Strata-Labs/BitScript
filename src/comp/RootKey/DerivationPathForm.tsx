import { Copy } from "lucide-react";
import { Button } from "../Ui/button";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectValue,
} from "../Ui/select";
import ProgressIndicator from "./ProgressIndicator";
import { FormItems } from "./RootKeyForm";
import { Label } from "../Ui/Label";
import { Input } from "../TaprootGen/UI/input";
import { useState } from "react";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  currentStep: number;
};
export default function DerivationPathForm({
  updateForm,
  currentStep,
}: StepProps) {
  const [derivationPath, setDerivationPath] = useState<number>(44);
  return (
    <div>
      <div className="flex w-full items-start justify-between space-x-10  pr-5">
        <div className="space-y-2">
          <h1 className="text-sm">Step {currentStep}</h1>
          <p className="font-medium">Derivation Paths</p>
          <div className="flex items-center gap-2 ">
            <p className="text-sm text-gray-500">Choose a derivation path</p>
            <Select
              onValueChange={(value) => {
                setDerivationPath(parseInt(value));
              }}
            >
              <SelectTrigger className="w-24 rounded-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  <SelectItem defaultChecked value="44">
                    44
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ProgressIndicator currentStep={2} />
      </div>

      <div className="space-y">
        <div className="flex items-center">
          <Label
            htmlFor="purpose"
            className="text-sm font-medium text-gray-500"
          >
            Purpose
          </Label>
        </div>
        <Input
          id="purpose"
          defaultValue={44}
          type="number"
          // value={derivationPath}
          onChange={(e) => {
            updateForm({ purpose: parseInt(e.target.value) });
          }}
          // className="mt-2 rounded-lg bg-gray-100 text-sm placeholder:text-black"
          className="mt-2 rounded-lg bg-gray-100 text-sm [appearance:textfield] placeholder:text-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="purpose"
        />
      </div>
      <div className="space-y mt-3">
        <div className="flex items-center">
          <Label htmlFor="coin" className="text-sm font-medium text-gray-500">
            coin
          </Label>
        </div>
        <Input
          type="number"
          id="coin"
          defaultValue={0}
          onChange={(e) => {
            updateForm({ coinValue: parseInt(e.target.value) });
          }}
          className="mt-2 rounded-lg bg-gray-100 text-sm [appearance:textfield] placeholder:text-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="0"
        />
      </div>
      <div className="space-y mt-3">
        <div className="flex items-center">
          <Label
            htmlFor="account"
            className="text-sm font-medium text-gray-500"
          >
            Account
          </Label>
        </div>
        <Input
          id="account"
          defaultValue={0}
          type="number"
          // value={value}
          onChange={(e) => {
            updateForm({ account: parseInt(e.target.value) });
          }}
          className="mt-2 rounded-lg bg-gray-100 text-sm [appearance:textfield] placeholder:text-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="Account"
        />
      </div>
      <div className="space-y mt-3">
        <div className="flex items-center">
          <Label
            htmlFor="external"
            className="text-sm font-medium text-gray-500"
          >
            External / internal
          </Label>
        </div>
        <Input
          id="external"
          type="number"
          defaultValue={0}
          //   value={value}
          onChange={(e) => {
            updateForm({ external: parseInt(e.target.value) });
          }}
          className="mt-2 rounded-lg bg-gray-100 text-sm [appearance:textfield] placeholder:text-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="0"
        />
      </div>
    </div>
  );
}
