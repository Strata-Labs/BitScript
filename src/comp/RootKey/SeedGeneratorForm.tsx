import { Check, Copy } from "lucide-react";
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
import { generateRootKey, generateRootKeyFromSeed, generateSeed } from "./utils";
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
  passphrase,
  errors,
  coin: selectedCoin,
}: StepProps) {
  const [wordCount, setWordCount] = useState(15);
  const [coin, setCoin] = useState<"btc" | "testnet">("btc");
  const [seedValue, setSeedValue] = useState(seed);

  const handleGenerateRootKey = () => {
    // const testingSeed =
    //   "65b05b9fca8271142df9d835114757222622fbc1802dc6e86bc2c128139703d6eaa7c20cedf4a5641eb17a619d02b63322f2bcc556b9ebd2830a1cac9315104d";
    // const newData = generateRootKeyFromSeed(
    //   testingSeed,
    //   coin === "btc" ? bitcoin.networks.bitcoin : bitcoin.networks.testnet
    // );
    // console.log("this is the new data: ", newData);
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
            className="mb-2 text-sm font-medium text-gray-500"
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
          className="rounded-lg bg-gray-100 text-sm placeholder:text-gray-400"
          placeholder="Enter your BIP39 mnemonic phrase"
        />
        {errors.mnemonic && (
          <p className="text-sm text-red-500">{errors.mnemonic}</p>
        )}
      </div>
      <div className="space-y mt-3">
        <div className="flex items-center">
          <Label
            htmlFor="passphrase"
            className="mb-2 text-sm font-medium text-gray-500"
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
          className="rounded-lg bg-gray-100 text-sm placeholder:text-gray-400"
          placeholder="Enter your passphrase"
        />
      </div>
      <div className="space-y mt-3">
        <div className="flex items-center">
          <Label
            htmlFor="seed"
            className="mb-2 text-sm font-medium text-gray-500"
          >
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
          className="rounded-lg bg-gray-100 text-sm placeholder:text-gray-400"
          placeholder="Enter your BIP39 seed phrase"
        />
        {errors.seed && <p className="text-sm text-red-500">{errors.seed}</p>}
      </div>
      <div className="space-y mt-3">
        <Label htmlFor="coin" className="text-sm font-medium text-gray-500">
          Coin
        </Label>
        <Select
          value={selectedCoin}
          onValueChange={(value) => {
            setCoin(value as "btc" | "testnet");
            updateForm({ coin: value as "btc" | "testnet" });
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
