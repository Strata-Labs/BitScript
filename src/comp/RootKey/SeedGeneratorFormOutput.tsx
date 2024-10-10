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
import { generateRootKey, generateSeed } from "./utils";
import { useState } from "react";
import * as bitcoin from "bitcoinjs-lib";
import { useCopy } from "./hooks/useCopy";
import { CopyButton } from "./CopyButton";

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
  rootKey,
  passphrase,
  errors
}: StepProps) {
  const [wordCount, setWordCount] = useState(15);
  const [coin, setCoin] = useState<"btc" | "testnet">("btc");

  const handleGenerateRootKey = () => {
    const network =
      coin === "btc" ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
    const data = generateRootKey(wordCount, passphrase, network);

    // update the form after generating the root key
    updateForm({
      mnemonic: data.mnemonic,
      seed: data.seed.toString(),
      rootKey: data.rootKey,
      passphrase: passphrase,
    });
  };

  // const handleGenerateSeed = () => {
  //   const data = generateSeed(mnemonic, passphrase);
  //   updateForm({
  //     seed: data,
  //   });
  // };

  return (
    <div className="flex flex-col gap-5 sm:gap-0">
      <div className="flex flex-col-reverse sm:flex-row w-full items-start justify-between space-x-10 pr-1 sm:pr-5">
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
                <SelectValue />
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
            className="text-sm mb-2 font-medium text-gray-500"
          >
            BIP39 Mnemonic
          </Label>
          <CopyButton textToCopy={mnemonic} />
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
        {errors.mnemonic && <p className="text-sm text-red-500">{errors.mnemonic}</p>}
      </div>
      <div className="space-y mt-3">
        <div className="flex items-center">
          <Label
            htmlFor="passphrase"
            className="text-sm mb-2 font-medium text-gray-500"
          >
            BIP39 Passphrase(optional)
          </Label>
          <CopyButton textToCopy={passphrase} />
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
          <Label htmlFor="seed" className="text-sm mb-2 font-medium text-gray-500">
            BIP39 Seed
          </Label>
          <CopyButton textToCopy={seed} />
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
        <div className="flex items-center">
          <Label htmlFor="seed" className="text-sm mb-2 font-medium text-gray-500">
            BIP39 Root Key
          </Label>
          <CopyButton textToCopy={rootKey} />
        </div>
        <Input
          id="seed"
          value={rootKey}
          onChange={(e) => {
            updateForm({ rootKey: e.target.value });
          }}
          readOnly
          className="rounded-lg bg-gray-100 text-sm placeholder:text-black"
        />
      </div>
      <div className="space-y mt-3">
        <Label htmlFor="coin" className="text-sm font-medium text-gray-500">
          Coin
        </Label>
        <Select
          value={coin}
          onValueChange={(value) => {
            setCoin(value as "btc" | "testnet");
            updateForm({ coin: value as "btc" | "testnet" | "regtest" });
          }}
        >
          <SelectTrigger className="w-full rounded-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="btc">BTC - bitcoin</SelectItem>
              <SelectItem value="testnet">BTC - testnet</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
