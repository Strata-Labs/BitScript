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
import {
  generateRootKey,
  generateSeed,
} from "./utils";
import { useState } from "react";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  currentStep: number;
  errors: Partial<FormItems>;
};

export default function SeedGeneratorForm({
  updateForm,
  currentStep,
  mnemonic,
  seed,
  passphrase,
}: StepProps) {
  const [wordCount, setWordCount] = useState(15);

  const handleGenerateRootKey = () => {
    const data = generateRootKey(wordCount, passphrase);

    updateForm({
      mnemonic: data.mnemonic,
      seed: data.seed.toString(),
      rootKey: data.rootKey,
      passphrase: passphrase,
    });
    // generateAddresses(
    //   "30ecfe71ba71f9c4fba8d1d0480a41160ae2792e6ba418ce2d6f3e7273cc637c0e0768fc9f8bc60f69ec0a3d712a3afdc1197307bbd073268de5f6cbbcb899d2",
    //   "m/44'/0'/0'",
    //   10
    // );
  };

  return (
    <div>
      <div className="flex w-full items-start justify-between space-x-10  pr-5">
        <div className="space-y-2">
          <h1 className="text-sm">Step {currentStep}</h1>
          <p className="font-medium">Create a seed</p>
          <div className="flex items-center gap-2 ">
            <p className="text-sm text-gray-500">Gerate a random mnemonic </p>
            <Select
              onValueChange={(value) => {
                setWordCount(parseInt(value));
              }}
              value={wordCount.toString()}
            >
              <SelectTrigger className="w-24 rounded-full">
                <SelectValue placeholder="word count" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem defaultChecked value="15">
                    15
                  </SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="18">18</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              type="button"
              onClick={handleGenerateRootKey}
              className="rounded-full"
            >
              Generate
            </Button>
          </div>
        </div>

        <ProgressIndicator currentStep={1} />
      </div>

      <div className="space-y">
        <div className="flex items-center">
          <Label
            htmlFor="mnemonic"
            className="text-sm font-medium text-gray-500"
          >
            BIP39 Mnemonic
          </Label>
          <Button
            variant="link"
            type="button"
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
          value={mnemonic}
          onChange={(e) => {
            updateForm({ mnemonic: e.target.value });
          }}
          className="rounded-lg bg-gray-100 text-sm placeholder:text-black"
          placeholder="Enter your BIP39 mnemonic phrase"
        />
      </div>
      <div className="space-y mt-3">
        <div className="flex items-center">
          <Label
            htmlFor="passphrase"
            className="text-sm font-medium text-gray-500"
          >
            BIP39 Passphrase(optional)
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
          id="passphrase"
          value={passphrase}
          onChange={(e) => {
            updateForm({ passphrase: e.target.value });
          }}
          className="rounded-lg bg-gray-100 text-sm placeholder:text-black"
          placeholder="Key_secure_123"
        />
      </div>
      <div className="space-y mt-3">
        <div className="flex items-center">
          <Label htmlFor="seed" className="text-sm font-medium text-gray-500">
            BIP39 Seed
          </Label>
          <Button
            variant="link"
            size="sm"
            className="h-8 px-2"
            onClick={() => {
              // navigator.clipboard.writeText("test");
              console.log("copy");
            }}
          >
            <Copy className="h-4 w-4 text-black" />
          </Button>
        </div>
        <Input
          id="seed"
          value={seed}
          onChange={(e) => {
            updateForm({ seed: e.target.value });
          }}
          className="rounded-lg bg-gray-100 text-sm placeholder:text-black"
          placeholder="Enter your BIP39 seed phrase"
        />
      </div>
      <div className="space-y mt-3">
        <Label htmlFor="coin" className="text-sm font-medium text-gray-500">
          Coin
        </Label>
        <Select
          onValueChange={(value) => {
            updateForm({ coin: value as "btc" | "testnet" | "regtest" });
          }}
        >
          <SelectTrigger className="w-full rounded-md">
            <SelectValue placeholder="BTC - bitcoin" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem defaultChecked value="btc">
                BTC - bitcoin
              </SelectItem>
              <SelectItem value="testnet">BTC - testnet</SelectItem>
              <SelectItem value="regtest">BTC - regtest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
