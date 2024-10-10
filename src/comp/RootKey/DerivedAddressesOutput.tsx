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
import DerivedKeysTable from "./DerivedKeysTable";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  currentStep: number;
};

const keys = [
  {
    path: "m/44'/1839'/3'/0/0",
    address: "bc1q34567890abcdefghijklmnopqrstuvwxyz",
    publicKey: "02a34567890abcdefghijklmnopqrstuvwxyz",
    privateKey: "51234567890abcdefghijklmnopqrstuvwxyz",
  },
  {
    path: "m/44'/1839'/3'/0/1",
    address: "bc1q34567890abcdefghijklmnopqrstuvwxyz",
    publicKey: "02a34567890abcdefghijklmnopqrstuvwxyz",
    privateKey: "51234567890abcdefghijklmnopqrstuvwxyz",
  },
  {
    path: "m/44'/1839'/3'/0/2",
    address: "bc1q34567890abcdefghijklmnopqrstuvwxyz",
    publicKey: "02a34567890abcdefghijklmnopqrstuvwxyz",
    privateKey: "51234567890abcdefghijklmnopqrstuvwxyz",
  },
  {
    path: "m/44'/1839'/3'/0/3",
    address: "bc1q34567890abcdefghijklmnopqrstuvwxyz",
    publicKey: "02a34567890abcdefghijklmnopqrstuvwxyz",
    privateKey: "51234567890abcdefghijklmnopqrstuvwxyz",
  },
  {
    path: "m/44'/1839'/3'/0/3",
    address: "bc1q34567890abcdefghijklmnopqrstuvwxyz",
    publicKey: "02a34567890abcdefghijklmnopqrstuvwxyz",
    privateKey: "51234567890abcdefghijklmnopqrstuvwxyz",
  },
  {
    path: "m/44'/1839'/3'/0/3",
    address: "bc1q34567890abcdefghijklmnopqrstuvwxyz",
    publicKey: "02a34567890abcdefghijklmnopqrstuvwxyz",
    privateKey: "51234567890abcdefghijklmnopqrstuvwxyz",
  },
  {
    path: "m/44'/1839'/3'/0/3",
    address: "bc1q34567890abcdefghijklmnopqrstuvwxyz",
    publicKey: "02a34567890abcdefghijklmnopqrstuvwxyz",
    privateKey: "51234567890abcdefghijklmnopqrstuvwxyz",
  },
  {
    path: "m/44'/1839'/3'/0/3",
    address: "bc1q34567890abcdefghijklmnopqrstuvwxyz",
    publicKey: "02a34567890abcdefghijklmnopqrstuvwxyz",
    privateKey: "51234567890abcdefghijklmnopqrstuvwxyz",
  },
  {
    path: "m/44'/1839'/3'/0/3",
    address: "bc1q34567890abcdefghijklmnopqrstuvwxyz",
    publicKey: "02a34567890abcdefghijklmnopqrstuvwxyz",
    privateKey: "51234567890abcdefghijklmnopqrstuvwxyz",
  },
];
export default function DerivedAddressesOutput({
  updateForm,
  currentStep,
  addresses, 
}: StepProps) {
  return (
    <div className="flex flex-col gap-5 sm:gap-0">
      <div className="flex flex-col-reverse sm:flex-row w-full items-start justify-between space-x-10 pr-1 sm:pr-5">
        <div className="space-y-2">
          <h1 className="text-sm">Step {currentStep}</h1>
          <p className="font-medium">Derived Addresses</p>
          <div className="flex items-center gap-2 ">
            <p className="text-sm text-gray-500">
              A list of addresses derived from your BIP32 Extended Key
            </p>
          </div>
        </div>

        <ProgressIndicator currentStep={3} />
      </div>

      <DerivedKeysTable keys={addresses || []} />
    </div>
  );
}
