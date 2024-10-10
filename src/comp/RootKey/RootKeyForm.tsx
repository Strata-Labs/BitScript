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
  validateSeed,
} from "./utils";
import SeedGeneratorFormOutput from "./SeedGeneratorFormOutput";

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
  } = useMultiplestepForm(5);

  const handleReset = () => {
    setFormData(initialValues);
    goTo(0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newErrors = { ...errors };
    let isValid = true;

    // this is the seed generator form
    if (currentStepIndex === 0) {
      // Clear previous errors
      newErrors = { mnemonic: "", seed: "" };

      if (formData.mnemonic === "") {
        newErrors.mnemonic = "Mnemonic is required";
        isValid = false;
      } else if (!validateMnemonic(formData.mnemonic)) {
        newErrors.mnemonic = "Mnemonic is not valid";
        console.log("this is the new errors: ", newErrors);
        isValid = false;
      }

      if (formData.seed === "") {
        newErrors.seed = "Seed is required";
        isValid = false;
      } else if (!validateSeed(formData.seed)) {
        newErrors.seed = "Seed is not valid";
        isValid = false;
      }

      if (isValid) {
        const rootKey = generateRootKeyFromMnemonic(
          formData.mnemonic,
          formData.passphrase,
          formData.coin === "btc"
            ? bitcoin.networks.bitcoin
            : bitcoin.networks.testnet
        );
        setFormData({ ...formData, rootKey });
      }
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
        derivationPath,
      });
    }

    console.log("form submitted");
    setErrors(newErrors);
    console.log("this is the new errors: ", newErrors);
    if (!isValid) {
      return;
    }
    nextStep();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-5 mt-5 max-w-md justify-center rounded-lg bg-white p-4 pb-10 text-black sm:mr-10 sm:max-w-6xl md:ml-[260px]"
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
          <SeedGeneratorFormOutput
            key="step2"
            currentStep={currentStepIndex + 1}
            {...formData}
            updateForm={updateForm}
            errors={errors}
          />
        )}
        {currentStepIndex === 2 && (
          <DerivationPathForm
            currentStep={currentStepIndex + 1}
            key="step3"
            {...formData}
            updateForm={updateForm}
          />
        )}
        {currentStepIndex === 3 && (
          <DerivationPathOutput
            key="step4"
            currentStep={currentStepIndex + 1}
            {...formData}
            updateForm={updateForm}
          />
        )}
        {currentStepIndex === 4 && (
          <DerivedAddressesOutput
            key="step5"
            currentStep={currentStepIndex + 1}
            updateForm={updateForm}
            {...formData}
          />
        )}
      </AnimatePresence>
      <div className="mt-8 flex w-full max-w-sm flex-col items-center justify-between space-y-4 p-4 sm:max-w-6xl sm:flex-row sm:space-y-0">
        <div className="w-full sm:w-auto">
          <Button
            onClick={handleReset}
            type="button"
            variant="destructive"
            className={cn(
              "w-full text-sm sm:w-auto sm:text-base",
              isFirstStep ? "invisible" : "visible p-2 text-black sm:p-3"
            )}
          >
            Reset
            <span className="ml-2">
              <div className="h-3 w-3 sm:h-4 sm:w-4">
                <img src="/arrow-refresh.svg" alt="reset" />
              </div>
            </span>
          </Button>
        </div>

        <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end sm:gap-4">
          <Button
            onClick={previousStep}
            type="button"
            variant="secondary"
            className={cn(
              "text-sm sm:text-base",
              isFirstStep
                ? "invisible"
                : "visible p-2 text-black hover:text-white sm:p-3"
            )}
          >
            <ArrowLeftIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            prev
          </Button>

          <div className="after:shadow-highlight relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-white/10 after:transition focus-within:after:shadow-[#77f6aa]">
            <Button
              type="submit"
              variant="next"
              className="shadow-input relative rounded-md border border-black/20 bg-black p-2 text-sm text-neutral-200 shadow-black/10 hover:text-white sm:p-3 sm:text-base"
            >
              Next
              <ArrowRightIcon className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
