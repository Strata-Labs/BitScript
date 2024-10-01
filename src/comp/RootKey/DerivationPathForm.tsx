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

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  currentStep: number;
};
export default function DerivationPathForm({ updateForm, currentStep }: StepProps) {
  return (
    <div>
      <div className="flex w-full items-start justify-between space-x-10  pr-5">
        <div className="space-y-2">
          <h1 className="text-sm">Step {currentStep}</h1>
          <p className="font-medium">Derivation Paths</p>
          <div className="flex items-center gap-2 ">
            <p className="text-sm text-gray-500">Choose a derivation path</p>
            <Select>
              <SelectTrigger className="w-24 rounded-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>
        </div>

        <ProgressIndicator currentStep={2} />
      </div>

      <div className="space-y">
        <div className="flex items-center">
          <Label htmlFor="mnemonic" className="text-sm text-gray-500 font-medium">
            Purpose
          </Label>
        </div>
        <Input
          id="mnemonic"
          //   value={value}
          onChange={(e) => {
            // updateForm({ mnemonic: e.target.value });
          }}
          className="rounded-lg bg-gray-100 mt-2 text-sm placeholder:text-black"
          placeholder="purpose"
        />
      </div>
      <div className="space-y mt-3">
        <div className="flex items-center">
          <Label htmlFor="mnemonic" className="text-sm text-gray-500 font-medium">coin</Label>
        </div>
        <Input
          id="mnemonic"
          //   value={value}
          onChange={(e) => {
            // updateForm({ mnemonic: e.target.value });
          }}
          className="rounded-lg mt-2 bg-gray-100 text-sm placeholder:text-black"
          placeholder="0"
        />
      </div>
      <div className="space-y mt-3">
        <div className="flex items-center">
          <Label htmlFor="mnemonic" className="text-sm text-gray-500 font-medium">
            Account
          </Label>
        </div>
        <Input
          id="mnemonic"
          //   value={value}
          onChange={(e) => {
            // updateForm({ mnemonic: e.target.value });
          }}
          className="rounded-lg mt-2 bg-gray-100 text-sm placeholder:text-black"
          placeholder="Account"
        />
      </div>
      <div className="space-y mt-3">
        <div className="flex items-center">
          <Label htmlFor="mnemonic" className="text-sm text-gray-500 font-medium">
            External / internal 
          </Label>
        </div>
        <Input
          id="mnemonic"
          //   value={value}
          onChange={(e) => {
            // updateForm({ mnemonic: e.target.value });
          }}
          className="rounded-lg mt-2 bg-gray-100 text-sm placeholder:text-black"
          placeholder="0"
        />
      </div>
    </div>
  );
}

