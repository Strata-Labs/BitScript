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
export default function SeedGeneratorForm({ updateForm, currentStep }: StepProps) {
  return (
    <div>
      <div className="flex w-full items-start justify-between space-x-10  pr-5">
        <div className="space-y-2">
          <h1 className="text-sm">Step {currentStep}</h1>
          <p className="font-medium">Create a seed</p>
          <div className="flex items-center gap-2 ">
            <p className="text-sm text-gray-500">Gerate a random mnemonic </p>
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

            <Button className="rounded-full">Generate</Button>
          </div>
        </div>

        <ProgressIndicator currentStep={1} />
      </div>

      <div className="space-y">
        <div className="flex items-center">
          <Label htmlFor="mnemonic" className="text-sm text-gray-500 font-medium">
            BIP39 Mnemonic
          </Label>
          <Button
            variant="link"
            size="sm"
            className="h-8 px-2"
            onClick={() => {
              //   navigator.clipboard.writeText("test");
              console.log("copy");
            }}
          >
            <Copy className="h-4 w-4 text-black" />
          </Button>
        </div>
        <Input
          id="mnemonic"
          //   value={value}
          onChange={(e) => {
            // updateForm({ mnemonic: e.target.value });
          }}
          className="rounded-lg bg-gray-100 text-sm placeholder:text-black"
          placeholder="Enter your BIP39 mnemonic phrase"
        />
      </div>
      <div className="space-y mt-3">
        <div className="flex items-center">
          <Label htmlFor="mnemonic" className="text-sm text-gray-500 font-medium">
            BIP39 Mnemonic
          </Label>
          <Button
            variant="link"
            size="sm"
            className="h-8 px-2"
            onClick={() => {
              //   navigator.clipboard.writeText("test");
              console.log("copy");
            }}
          >
            <Copy className="h-4 w-4 text-black" />
          </Button>
        </div>
        <Input
          id="mnemonic"
          //   value={value}
          onChange={(e) => {
            // updateForm({ mnemonic: e.target.value });
          }}
          className="rounded-lg bg-gray-100 text-sm placeholder:text-black"
          placeholder="Enter your BIP39 mnemonic phrase"
        />
      </div>
      <div className="space-y mt-3">
        <div className="flex items-center">
          <Label htmlFor="mnemonic" className="text-sm text-gray-500 font-medium">
            BIP39 Mnemonic
          </Label>
          <Button
            variant="link"
            size="sm"
            className="h-8 px-2"
            onClick={() => {
              //   navigator.clipboard.writeText("test");
              console.log("copy");
            }}
          >
            <Copy className="h-4 w-4 text-black" />
          </Button>
        </div>
        <Input
          id="mnemonic"
          //   value={value}
          onChange={(e) => {
            // updateForm({ mnemonic: e.target.value });
          }}
          className="rounded-lg bg-gray-100 text-sm placeholder:text-black"
          placeholder="Enter your BIP39 mnemonic phrase"
        />
      </div>
      <div className="space-y mt-3">
        <Label htmlFor="mnemonic" className="text-sm text-gray-500 font-medium">
          Coin
        </Label>
        <Select>
          <SelectTrigger className="w-full rounded-md">
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
  );
}
