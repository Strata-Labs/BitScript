import React, { useEffect, useState } from "react";
import {
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import { Input } from "./UI/input";
import { classNames as cn } from "@/utils";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  activeTaprootComponent,
  globalMerkelRoot,
  internalPublicKey,
  taprootOutputKey,
} from "../atom";
import { TaprootGenComponents } from "./TaprootParent";
import { secp256k1 } from "@noble/curves/secp256k1";

// Function to validate public key using secp256k1, it appears this was too overkill and was not really needed. Leaving this here, just incase we might need it in future
// function isValidPublicKey(key: string): boolean {
//   // Check if the key is a valid hex string of the correct length for a compressed key
//   const hexRegex = /^(02|03)[0-9A-Fa-f]{64}$/;
//   if (!hexRegex.test(key)) {
//     return false;
//   }
//   return true;

//   // try {
//   //   const publicKey = secp256k1.ProjectivePoint.fromHex(key);

//   //   publicKey.assertValidity();

//   //   return true;
//   // } catch (error) {
//   //   return false;
//   // }
// }

function isValidPublicKey(key: string): boolean {
  // Check if the key is a valid hex string of the correct length for either a Taproot or compressed key
  const compressedKeyRegex = /^(02|03)[0-9A-Fa-f]{64}$/;
  const taprootKeyRegex = /^[0-9A-Fa-f]{64}$/;

  if (!compressedKeyRegex.test(key) && !taprootKeyRegex.test(key)) {
    return false;
  }

  // At this point, we know the key is either a valid 32-byte or 33-byte hex string
  // taproot internal keys can either be 32-byte or 33-byte hex strings

  return true;
}
// this is for testing 


export default function NewTemplateView() {
  const [inputTouched, setInputTouched] = React.useState(false);
  const setTaprootComponent = useSetAtom(activeTaprootComponent);
  const [pubKey, setPubKey] = React.useState("");
  const [internalPubKey, setInternalPublicKey] = useAtom(internalPublicKey);
  const taprootPubKey = useAtomValue(taprootOutputKey);
  const merkelRoot = useAtomValue(globalMerkelRoot);
  const [isInternalKeyReadonly, setIsInternalKeyReadonly] =
    React.useState(false);
  const [isTaprootKeyReadonly, setIsTaprootKeyReadonly] = React.useState(false);
  const [isValidKey, setIsValidKey] = useState(false);
  const [showScriptTweakValue, setShowScriptTweakValue] = useState(false);

  useEffect(() => {
    if (internalPubKey !== null && internalPubKey !== "") {
      setIsInternalKeyReadonly(true);
      // setInputTouched(true);
    }

    if (taprootPubKey !== null && taprootPubKey !== "") {
      setIsTaprootKeyReadonly(true);
    }

    if (merkelRoot !== null && merkelRoot !== "") {
      // set the showScriptTweakValue to true
      setShowScriptTweakValue(true);
    }
  }, [internalPubKey, taprootPubKey, merkelRoot]);

  const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isInternalKeyReadonly) {
      const value = e.target.value;
      setPubKey(value);
      setIsValidKey(isValidPublicKey(value));

      if (value.length > 0) {
        setInputTouched(true);
      } else {
        setInputTouched(false);
      }
    }
  };

  const onButtonClicked = () => {
    setInternalPublicKey(pubKey);
    setTaprootComponent(TaprootGenComponents.TapLeafSelectionPage);
  };

  return (
    <div
      style={{
        minHeight: "92vh",
        // paddingLeft: "240px",
      }}
      className="mx-5 flex h-full flex-col justify-between gap-4 overflow-auto bg-lighter-dark-purple px-5 "
    >
      <div className="mt-8 flex h-full flex-col  justify-between gap-4 md:flex-row">
        <div className=" flex max-w-2xl flex-col justify-between space-y-3 rounded-xl bg-dark-purple px-6 pb-6 pt-7 sm:h-64  md:w-3/5 lg:w-1/2">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <img src="/key.svg" alt="key svg" className="h-5 w-5" />
              <p className="font-bold">Keypath</p>
            </div>
            <p className="text-sm">
              The simple path that allows a signing private key to consume the
              UTXO. This private key can map to a single public key or a more
              complicated multi-sig using an aggregatd public key.
            </p>
          </div>

          <div className="flex w-full max-w-lg flex-col  gap-1 text-sm">
            <label>Provide internal Public Key</label>
            {isInternalKeyReadonly ? (
              <Input
                // onChange={onInputChanged}
                name="internalPublicKey"
                id="internalPublicKey"
                placeholder="Type in Internal key here..."
                value={internalPubKey}
                readOnly={isInternalKeyReadonly}
              />
            ) : (
              <Input
                onChange={onInputChanged}
                name="internalPublicKey"
                id="internalPublicKey"
                placeholder="Type in Internal key here..."
                value={pubKey}
              />
            )}
            {inputTouched &&
              (merkelRoot === "" || merkelRoot === null) &&
              !isValidKey && (
                <p className="text-red-500">Please enter a valid public key</p>
              )}
          </div>
        </div>

        <div className="flex h-64 w-full max-w-2xl flex-col  justify-between space-y-2 rounded-xl bg-dark-purple px-6 pb-6 pt-7 sm:h-64 md:w-3/5 lg:w-1/2">
          <div className="flex-col gap-2">
            <div className="flex gap-1">
              <img
                src="/script.svg"
                alt="scriptpath icon"
                className="h-5 w-5"
              />
              <p className="font-bold">Script path</p>
            </div>
            <p className="text-sm">
              The script, or smart-contract, path that represents a Merkle tree
              of either keys or scripts. A specific node, or tapleaf, is
              consumed by providing ___, __ & a valid ____.
            </p>
          </div>

          <div className="grid w-full max-w-lg items-center gap-1 text-sm">
            <label>Provide TweakKey/scriptPath</label>
            {!showScriptTweakValue ? (
              <div className="relative">
                <ChevronRightIcon
                  color={inputTouched ? "white" : "gray"}
                  className="absolute right-2 top-1 h-8 w-8 "
                />
                {/* <Input
                  className="border-none"
                  name="tweakKey"
                  id="tweakKey"
                  placeholder="Fill in internal Key to continue..."
                /> */}
                <button
                  onClick={onButtonClicked}
                  disabled={!inputTouched || !isValidKey}
                  className={cn(
                    "block h-10 w-full rounded-full border border-gray-500 px-4 py-2 text-left text-sm text-white no-underline transition-all duration-300",
                    inputTouched
                      ? "border-dark-orange bg-dark-orange"
                      : "border-gray-500 "
                  )}
                >
                  {/* {inputTouched
                  ? "Continue to Script Selector"
                  : "Fill in Internal Key to continue..."} */}
                  {inputTouched && isValidKey
                    ? "Continue to Script Selector"
                    : "Fill in internal Key to continue...."}
                </button>
              </div>
            ) : (
              <div
                onClick={() => {
                  setTaprootComponent(TaprootGenComponents.NewScriptPathView);
                }}
              >
                <Input
                  // onChange={onInputChanged}
                  className="cursor-pointer"
                  name="scriptHash"
                  id="scriptHash"
                  value={merkelRoot}
                  readOnly={showScriptTweakValue}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" hidden justify-center lg:flex">
        <div className="relative h-96 w-1/2">
          <div className="absolute bottom-1/2 left-0 top-0 border-l-2 border-dashed border-gray-600"></div>
          <div className="absolute bottom-1/2 right-0 top-0 border-l-2 border-dashed border-gray-600"></div>
          <div className="absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-gray-600"></div>
          <div className="absolute bottom-0 left-1/2 top-1/2 border-l-2 border-dashed border-gray-600"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform">
            <div className="h-0 w-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-600"></div>
          </div>
        </div>
      </div>

      <div className="mx-auto mb-12 grid w-full max-w-5xl items-center gap-1 px-5 text-sm">
        <div className="flex w-full justify-between px-2">
          <p>Taproot Output</p>
          <InformationCircleIcon color="white" className="h-5 w-5 " />
        </div>
        <Input
          type="taprootOutputKey"
          id="taprootOutputKey"
          placeholder="complete both the KeyPath & ScriptPath above to continue..."
          className="placeholder-gray-200 placeholder:italic"
          value={taprootPubKey}
          readOnly={isTaprootKeyReadonly}
        />
      </div>
    </div>
  );
}
