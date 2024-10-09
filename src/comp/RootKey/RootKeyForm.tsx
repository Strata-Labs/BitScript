import { AnimatePresence } from "framer-motion";
import { useMultiplestepForm } from "./hooks/useMultiStepForm";
import { Button } from "../Ui/button";
import { useMemo, useState } from "react";
import SeedGeneratorForm from "./SeedGeneratorForm";
import * as bitcoin from "bitcoinjs-lib";
import ProgressIndicator from "./ProgressIndicator";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { classNames as cn } from "@/utils";
import DerivationPathForm from "./DerivationPathForm";
import DerivationPathOutput from "./DerivationPathOutput";
import DerivedAddressesOutput from "./DerivedAddressesOutput";
import {
  DerivedAddress,
  generateAddresses,
  generateRootKey,
  generateRootKeyFromMnemonic,
  getDerivationPath,
  validateMnemonic,
} from "./utils";

export type FormItems = {
  mnemonicWords: number;
  mnemonic: string;
  passphrase: string;
  seed: string;
  coin: "btc" | "testnet" | "regtest";
  coinValue: number;
  rootKey: string;
  purpose: number;
  account: number;
  external: number;
  derivationPath: string;
  extendedPublicKey: string | undefined;
  extendedPrivateKey: string | undefined;
  bip32ExtendedPrivateKey: string | undefined;
  addresses: DerivedAddress[] | undefined;
};

const initialValues: FormItems = {
  mnemonicWords: 160,
  mnemonic: "",
  passphrase: "",
  seed: "",
  coin: "btc",
  coinValue: 0,
  rootKey: "",
  purpose: 44,
  account: 0,
  external: 0,
  derivationPath: "m/44'/0'/0'",
  extendedPublicKey: "",
  extendedPrivateKey: "",
  bip32ExtendedPrivateKey: "",
  addresses: [],
};

export default function RootKeyForm() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const updateForm = (fieldToUpdate: Partial<FormItems>) => {
    setFormData((prev) => {
      const updatedData = { ...prev, ...fieldToUpdate };
      return updatedData;
    });
  };

  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    steps,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(4);

  const handleReset = () => {
    setFormData(initialValues);
    goTo(0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStepIndex === 0) {
      // check for errors

      if (formData.mnemonic === "") {
        setErrors({ ...errors, mnemonic: "Mnemonic is required" });
        return;
      }
      const isValid = validateMnemonic(formData.mnemonic);
      if (!isValid) {
        setErrors({ ...errors, mnemonic: "Mnemonic is not valid" });
        return;
      }
      const rootKey = generateRootKeyFromMnemonic(
        formData.mnemonic,
        formData.passphrase,
        formData.coin === "btc"
          ? bitcoin.networks.bitcoin
          : bitcoin.networks.testnet
      );
      setFormData({ ...formData, rootKey });
    }

    if (currentStepIndex === 1) {
      // this is the derivation path form
      // after the form has been submitted, do some checks before going to the next step
      // check if the derivation path is valid
      console.log("this is the form data: ", JSON.stringify(formData, null, 2));
      const derivationPath = getDerivationPath(
        formData.coinValue,
        formData.purpose,
        formData.account
      );
      console.log("this is the derivation path: ", derivationPath);
      const {
        receivingAddresses,
        accountExtendedPublicKey,
        accountExtendedPrivateKey,
        bip32ExtendedPrivateKey,
      } = generateAddresses(formData.seed, derivationPath, 5);
      console.log(
        "this is the addresses: ",
        JSON.stringify(receivingAddresses, null, 2)
      );
      setFormData({
        ...formData,
        addresses: receivingAddresses,
        extendedPublicKey: accountExtendedPublicKey,
        extendedPrivateKey: accountExtendedPrivateKey,
        bip32ExtendedPrivateKey,
      });
    }

    console.log("form submitted");
    nextStep();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-5 ml-[260px] mr-10 mt-5 justify-center rounded-lg bg-white p-4 pb-10 text-black"
    >
      <AnimatePresence mode="wait">
        {currentStepIndex === 0 && (
          <SeedGeneratorForm
            key="step1"
            currentStep={currentStepIndex + 1}
            {...formData}
            updateForm={updateForm}
            errors={errors}
          />
        )}
        {currentStepIndex === 1 && (
          <DerivationPathForm
            currentStep={currentStepIndex + 1}
            key="step2"
            {...formData}
            updateForm={updateForm}
          />
        )}
        {currentStepIndex === 2 && (
          <DerivationPathOutput
            key="step3"
            currentStep={currentStepIndex + 1}
            {...formData}
            updateForm={updateForm}
          />
        )}
        {currentStepIndex === 3 && (
          <DerivedAddressesOutput
            key="step4"
            currentStep={currentStepIndex + 1}
            updateForm={updateForm}
            {...formData}
          />
        )}
      </AnimatePresence>
      <div className="mt-8 flex items-center justify-between">
        <div className="">
          <Button
            onClick={handleReset}
            type="button"
            variant="destructive"
            className={cn(
              "",
              isFirstStep ? "invisible" : "visible p-0 text-black"
            )}
          >
            Reset
            <span className="ml-2">
              <div className="h-4 w-4 ">
                <img src="/arrow-refresh.svg" alt="reset" />
              </div>
            </span>
          </Button>
        </div>

        <div className=" flex items-center justify-between gap-4">
          <div className="">
            <Button
              onClick={previousStep}
              type="button"
              variant="secondary"
              className={cn(
                "",
                isFirstStep
                  ? "invisible"
                  : "visible p-0 text-black hover:text-white"
              )}
            >
              <span>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
              </span>
              prev
            </Button>
          </div>
          <div className="flex items-center">
            <div className="after:shadow-highlight relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-white/10 after:transition focus-within:after:shadow-[#77f6aa]">
              <Button
                type="submit"
                variant="next"
                className="shadow-input relative rounded-md border border-black/20 bg-black text-neutral-200 shadow-black/10 hover:text-white"
              >
                {/* {isLastStep ? "Confirm" : "Next Step"} */}
                Next
                <span>
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
