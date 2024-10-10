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
import { CopyButton } from "./CopyButton";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  currentStep: number;
};
export default function DerivationPathOutput({ updateForm, currentStep,  extendedPublicKey, extendedPrivateKey, derivationPath,  bip32ExtendedPrivateKey }: StepProps) {
  return (
    <div className="flex flex-col gap-5 sm:gap-0">
      <div className="flex w-full flex-col-reverse items-start justify-between space-x-10 pr-1 sm:flex-row sm:pr-5">
        <div className="space-y-2">
          <h1 className="text-sm">Step {currentStep}</h1>
          <p className="font-medium">Derivation Paths</p>
          {/* <div className="flex items-center gap-2 ">
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

          </div> */}
        </div>

        <ProgressIndicator currentStep={2} />
      </div>

      <div className="space-y">
        <div className="flex items-center">
          <Label
            htmlFor="mnemonic"
            className="text-sm mb-2 font-medium text-gray-500"
          >
            Account Extended Private Key
          </Label>
          <CopyButton textToCopy={extendedPrivateKey || ""} />
        </div>
        <Input
          id="mnemonic"
          value={extendedPrivateKey}
          readOnly={true}
          onChange={(e) => {
            // updateForm({ mnemonic: e.target.value });
          }}
          className="rounded-lg bg-gray-100 text-sm placeholder:text-black"
          //   placeholder="Enter your  mnemonic phrase"
        />
      </div>
      <div className="space-y mt-3">
        <div className="flex items-center">
          <Label
            htmlFor="mnemonic"
            className="text-sm mb-2 font-medium text-gray-500"
          >
            Account Extended Public Key
          </Label>
          <CopyButton textToCopy={extendedPublicKey || ""} />
        </div>
        <Input
          id="extendedPublicKey"
          //   value={value}
          onChange={(e) => {
            // updateForm({ mnemonic: e.target.value });
          }}
          className="rounded-lg bg-gray-100 text-sm placeholder:text-black"
          //   placeholder="Enter your BIP39 mnemonic phrase"
          value={extendedPublicKey || ""}
          readOnly={true}
        />
      </div>
      <div className="space-y mt-3">
        <div className="flex items-center">
          <Label
            htmlFor="mnemonic"
            className="text-sm mb-2 font-medium text-gray-500"
          >
            BIP32 Derivation Path
          </Label>
          <CopyButton textToCopy={derivationPath || ""} />
        </div>
        <Input
          id="bip32DerivationPath"
          value={derivationPath || ""}
          onChange={(e) => {
            // updateForm({ mnemonic: e.target.value });
          }}
          className="rounded-lg bg-gray-100 text-sm placeholder:text-black"
          readOnly={true}
        />
      </div>
      <div className="space-y mt-3">
        <div className="flex items-center">
          <Label
            htmlFor="mnemonic"
            className="text-sm mb-2 font-medium text-gray-500"
          >
            BIP32 Extended private key
          </Label>
          <CopyButton textToCopy={bip32ExtendedPrivateKey || ""} />
        </div>
        <Input
          id="bip32ExtendedPrivateKey"
          value={bip32ExtendedPrivateKey || ""}
          onChange={(e) => {
            // updateForm({ mnemonic: e.target.value });
          }}
          className="rounded-lg bg-gray-100 text-sm placeholder:text-black"
          //   placeholder="Enter your BIP39 mnemonic phrase"
          readOnly={true}
        />
      </div>
    </div>
  );
}
