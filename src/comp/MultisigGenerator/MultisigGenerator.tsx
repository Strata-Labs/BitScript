import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useCopy } from "./hooks/useCopy";
import { classNames } from "@/utils";
import {
  validatePublicKey,
  createP2SHMultisig,
  createP2WSHMultisig,
  createP2SHP2WSHMultisig,
  createTaprootMultisig,
  createTaprootScriptPathMultisig,
} from "./bitcoinUtils";
import { SAMPLE_KEYS } from "./SampleKeys";

// Define the types of multisig addresses we can generate
export enum MultisigType {
  P2SH = "P2SH",
  P2WSH = "P2WSH",
  P2SH_P2WSH = "P2SH-P2WSH",
  P2TR = "P2TR",
  P2TR_SCRIPT = "P2TR-SCRIPT",
}

const MultisigGenerator = () => {
  const { t } = useTranslation("multisig");
  const [publicKeys, setPublicKeys] = useState<string[]>(["", "", ""]);
  const [threshold, setThreshold] = useState<number>(2);
  const [scriptType, setScriptType] = useState<MultisigType>(MultisigType.P2SH);
  const [generatedAddress, setGeneratedAddress] = useState<string>("");
  const [redeemScript, setRedeemScript] = useState<string>("");
  const [witnessScript, setWitnessScript] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showSampleKeys, setShowSampleKeys] = useState<boolean>(false);
  const [currentKeyIndex, setCurrentKeyIndex] = useState<number>(0);
  const { isCopied, copyToClipboard } = useCopy();
  const [copiedItem, setCopiedItem] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Update threshold when public keys change
  useEffect(() => {
    if (threshold > publicKeys.length) {
      setThreshold(Math.max(1, publicKeys.length));
    }
  }, [publicKeys, threshold]);

  // Add a new public key input field
  const addPublicKey = () => {
    setPublicKeys([...publicKeys, ""]);
  };

  // Remove a public key input field
  const removePublicKey = (index: number) => {
    if (publicKeys.length > 1) {
      const newPublicKeys = [...publicKeys];
      newPublicKeys.splice(index, 1);
      setPublicKeys(newPublicKeys);
    }
  };

  // Update a public key at a specific index
  const updatePublicKey = (index: number, value: string) => {
    const newPublicKeys = [...publicKeys];
    newPublicKeys[index] = value;
    setPublicKeys(newPublicKeys);
  };

  // Generate a random key for a specific index
  const generateRandomKey = async (index: number) => {
    // I'm just generating this key from the sample keys set for now
    const needsCompressed =
      scriptType === MultisigType.P2TR ||
      scriptType === MultisigType.P2TR_SCRIPT;

    // Get a random key from the sample keys
    let availableKeys = needsCompressed
      ? SAMPLE_KEYS.filter(
          (key) => key.startsWith("02") || key.startsWith("03")
        ) // Only compressed keys
      : SAMPLE_KEYS; // All keys

    const randomIndex = Math.floor(Math.random() * availableKeys.length);
    const newKey = availableKeys[randomIndex];
    updatePublicKey(index, newKey);
  };

  // Validate m and n values
  useEffect(() => {
    if (threshold > publicKeys.length) {
      setError(t("error_threshold_too_high"));
    } else if (threshold <= 0) {
      setError(t("error_threshold_too_low"));
    } else if (publicKeys.length > 15) {
      setError(t("error_too_many_keys"));
    } else {
      setError("");
    }
  }, [threshold, publicKeys.length]);

  // Check if Taproot is selected and validate compressed keys
  useEffect(() => {
    if (
      (scriptType === MultisigType.P2TR ||
        scriptType === MultisigType.P2TR_SCRIPT) &&
      publicKeys.some((key) => key && key.length !== 66 && key.length !== 0)
    ) {
      setError(t("error_taproot_compressed"));
    }
  }, [scriptType, publicKeys]);

  const handleSelectSampleKey = (key: string) => {
    if (currentKeyIndex < publicKeys.length) {
      updatePublicKey(currentKeyIndex, key);
      setCurrentKeyIndex((prev) => (prev + 1) % publicKeys.length);
    }
  };

  const validatePublicKeys = (): boolean => {
    // Basic validation - check if all required public keys are filled and valid
    for (let i = 0; i < publicKeys.length; i++) {
      if (!publicKeys[i]) {
        setError(t("error_key_empty", { num: i + 1 }));
        return false;
      }

      if (!validatePublicKey(publicKeys[i])) {
        setError(t("error_key_invalid", { num: i + 1 }));
        return false;
      }
    }

    return true;
  };

  const handleCopy = (text: string, item: string) => {
    copyToClipboard(text);
    setCopiedItem(item);
  };

  const generateAddress = async () => {
    if (!validatePublicKeys()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      let result: any = {};

      // Filter out empty public keys
      const filteredKeys = publicKeys.filter((key) => key.trim() !== "");

      if (filteredKeys.length === 0) {
        setError(t("error_at_least_one_key"));
        return;
      }

      if (threshold <= 0 || threshold > filteredKeys.length) {
        setError(t("error_threshold_range", { max: filteredKeys.length }));
        return;
      }

      // Validate all public keys
      for (let i = 0; i < filteredKeys.length; i++) {
        if (!validatePublicKey(filteredKeys[i])) {
          setError(t("error_invalid_key_position", { num: i + 1 }));
          return;
        }
      }

      // Generate the appropriate address based on script type
      switch (scriptType) {
        case MultisigType.P2SH: {
          result = createP2SHMultisig(
            threshold,
            filteredKeys.length,
            filteredKeys
          );
          setGeneratedAddress(result.address);
          setRedeemScript(result.redeemScript);
          setWitnessScript("");
          break;
        }
        case MultisigType.P2WSH: {
          result = createP2WSHMultisig(
            threshold,
            filteredKeys.length,
            filteredKeys
          );
          setGeneratedAddress(result.address);
          setRedeemScript("");
          setWitnessScript(result.witnessScript);
          break;
        }
        case MultisigType.P2SH_P2WSH: {
          result = createP2SHP2WSHMultisig(
            threshold,
            filteredKeys.length,
            filteredKeys
          );
          setGeneratedAddress(result.address);
          setRedeemScript(result.redeemScript);
          setWitnessScript(result.witnessScript);
          break;
        }
        case MultisigType.P2TR: {
          result = createTaprootMultisig(filteredKeys);
          setGeneratedAddress(result.address);
          setRedeemScript("");
          setWitnessScript("");
          break;
        }
        case MultisigType.P2TR_SCRIPT: {
          result = createTaprootScriptPathMultisig(
            threshold,
            filteredKeys.length,
            filteredKeys
          );
          setGeneratedAddress(result.address);
          setRedeemScript("");
          setWitnessScript("");
          break;
        }
        default:
          setError(t("error_unknown_script_type"));
      }
    } catch (err: any) {
      setError(t("error_generating_address", { msg: err.message || err }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="mb-6 flex flex-row items-center justify-between">
        <div className="flex flex-row">
          <p className="font-bold text-black">{t("configuration")}</p>
          <p className="ml-1 font-extralight text-black">{t("parameters")}</p>
        </div>
      </div>

      {/* M of N Selection */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-black">
            {t("threshold_label")}
          </label>
          <div className="flex h-[42px] rounded-full bg-[#F3F3F3] p-2">
            <input
              type="number"
              min="1"
              max={publicKeys.length}
              value={threshold}
              onChange={(e) =>
                setThreshold(
                  Math.min(parseInt(e.target.value) || 1, publicKeys.length)
                )
              }
              className="w-full rounded-full bg-[#F3F3F3] px-3 text-[14px] font-extralight text-black focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-black">
            {t("total_keys")}
          </label>
          <div className="flex h-[42px] rounded-full bg-[#F3F3F3] p-2">
            <input
              type="number"
              min="1"
              max="15"
              value={publicKeys.length}
              onChange={(e) => {
                const newLength = parseInt(e.target.value) || 1;
                if (newLength > publicKeys.length) {
                  // Add empty keys
                  setPublicKeys([
                    ...publicKeys,
                    ...Array(newLength - publicKeys.length).fill(""),
                  ]);
                } else if (newLength < publicKeys.length) {
                  // Remove keys
                  setPublicKeys(publicKeys.slice(0, newLength));
                }
              }}
              className="w-full rounded-full bg-[#F3F3F3] px-3 text-[14px] font-extralight text-black focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Script Type Selection */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-black">
          {t("script_type")}
        </label>
        <div className="flex h-[42px] rounded-full bg-[#F3F3F3] p-2">
          <select
            value={scriptType}
            onChange={(e) => setScriptType(e.target.value as MultisigType)}
            className="w-full rounded-full bg-[#F3F3F3] px-3 text-[14px] font-extralight text-black focus:outline-none"
          >
            <option value={MultisigType.P2SH}>{t("option_p2sh")}</option>
            <option value={MultisigType.P2WSH}>{t("option_p2wsh")}</option>
            <option value={MultisigType.P2SH_P2WSH}>
              {t("option_p2sh_p2wsh")}
            </option>
            <option value={MultisigType.P2TR}>{t("option_p2tr")}</option>
            <option value={MultisigType.P2TR_SCRIPT}>
              {t("option_p2tr_script")}
            </option>
          </select>
        </div>
      </div>

      {/* Public Keys Input */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex flex-row">
            <p className="font-bold text-black">{t("public_keys")}</p>
            <p className="ml-1 font-extralight text-black">{t("input")}</p>
          </div>
          <button
            onClick={addPublicKey}
            className="hover:text-orange-600 text-sm font-medium text-[#F79327]"
          >
            {t("add_key")}
          </button>
        </div>
        <div className="space-y-3">
          {publicKeys.map((key, index) => (
            <div key={index} className="flex items-center">
              <span className="mr-2 w-6 text-sm font-medium text-black">
                {index + 1}.
              </span>
              <div className="flex h-[42px] flex-1 rounded-full bg-[#F3F3F3] p-2">
                <input
                  type="text"
                  placeholder={t("key_placeholder", { num: index + 1 })}
                  value={key}
                  onChange={(e) => updatePublicKey(index, e.target.value)}
                  className="w-full rounded-full bg-[#F3F3F3] px-3 text-[14px] font-extralight text-black focus:outline-none"
                />
              </div>
              <button
                onClick={() => generateRandomKey(index)}
                className="ml-2 rounded-full bg-[#0C071D] px-3 py-1 text-sm text-white hover:bg-[#1A1A2E]"
              >
                {t("generate")}
              </button>
              {publicKeys.length > 1 && (
                <button
                  onClick={() => removePublicKey(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={generateAddress}
        disabled={!!error || isLoading}
        className={classNames(
          "h-[42px] w-full rounded-full px-4 py-2 font-medium text-white",
          error || isLoading
            ? "cursor-not-allowed bg-gray-400"
            : "bg-[#0C071D] hover:bg-[#1A1A2E]"
        )}
      >
        {isLoading ? t("generating") : t("generate_address")}
      </button>

      {/* Results */}
      {generatedAddress && (
        <div className="mt-8">
          <div className="mb-6 flex flex-row items-center justify-between">
            <div className="flex flex-row">
              <p className="font-bold text-black">{t("results")}</p>
              <p className="ml-1 font-extralight text-black">{t("output")}</p>
            </div>
          </div>

          {/* Address */}
          <div className="mb-6 rounded-lg border border-[#F3F3F3] bg-white p-4">
            <h3 className="mb-2 text-lg font-medium text-black">
              {t("address_label")}
            </h3>
            <div className="relative">
              <div className="overflow-x-auto rounded-md bg-[#F3F3F3] p-3">
                <code className="break-all text-sm font-extralight text-black">
                  {generatedAddress}
                </code>
              </div>
              <button
                onClick={() => handleCopy(generatedAddress, "address")}
                className="absolute right-2 top-2 rounded-full bg-[#0C071D] p-1 px-3 text-sm text-white hover:bg-[#1A1A2E]"
              >
                {isCopied && copiedItem === "address"
                  ? t("copied")
                  : t("copy")}
              </button>
            </div>
          </div>

          {/* Redeem Script */}
          {redeemScript && (
            <div className="mb-6 rounded-lg border border-[#F3F3F3] bg-white p-4">
              <h3 className="mb-2 text-lg font-medium text-black">
                {scriptType === MultisigType.P2SH_P2WSH
                  ? t("redeem_script_p2sh")
                  : t("redeem_script")}
              </h3>
              <div className="relative">
                <div className="overflow-x-auto rounded-md bg-[#F3F3F3] p-3">
                  <code className="text-sm font-extralight text-black">
                    {redeemScript}
                  </code>
                </div>
                <button
                  onClick={() => handleCopy(redeemScript, "redeemScript")}
                  className="absolute right-2 top-2 rounded-full bg-[#0C071D] p-1 px-3 text-sm text-white hover:bg-[#1A1A2E]"
                >
                  {isCopied && copiedItem === "redeemScript"
                    ? t("copied")
                    : t("copy")}
                </button>
              </div>
            </div>
          )}

          {/* Witness Script */}
          {witnessScript && (
            <div className="rounded-lg border border-[#F3F3F3] bg-white p-4">
              <h3 className="mb-2 text-lg font-medium text-black">
                {scriptType === MultisigType.P2SH_P2WSH
                  ? t("witness_script_p2wsh")
                  : t("witness_script")}
              </h3>
              <div className="relative">
                <div className="overflow-x-auto rounded-md bg-[#F3F3F3] p-3">
                  <code className="text-sm font-extralight text-black">
                    {witnessScript}
                  </code>
                </div>
                <button
                  onClick={() => handleCopy(witnessScript, "witnessScript")}
                  className="absolute right-2 top-2 rounded-full bg-[#0C071D] p-1 px-3 text-sm text-white hover:bg-[#1A1A2E]"
                >
                  {isCopied && copiedItem === "witnessScript"
                    ? t("copied")
                    : t("copy")}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultisigGenerator;
