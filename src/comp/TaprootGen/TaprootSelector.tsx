import React from "react";
import {
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import { Input } from "./UI/input";
import ReactFlow, { Handle, Position, MarkerType } from "reactflow";
import "reactflow/dist/style.css";

export default function TaprootSelector() {
  return (
    <div
      style={{
        minHeight: "92vh",
        // paddingLeft: "240px",
      }}
      className="mx-5 px-7 lg:pl-[240px] flex h-full justify-between w-full flex-col gap-4 overflow-auto bg-lighter-dark-purple"
    >
      <div className="mt-8 flex h-full flex-col justify-center gap-4 md:flex-row">
        <div className="h-fit w-full max-w-2xl space-y-2 rounded-xl bg-dark-purple px-6 pb-6 pt-7 sm:h-64 md:w-3/5 lg:w-1/2">
          <div className="flex items-center space-x-1">
            <img src="/key.svg" alt="key svg" className="h-5 w-5" />
            <p className="font-bold">Keypath</p>
          </div>

          <div className="space-y-6 ">
            <p className="text-sm">
              The simple path that allows a signing private key to consume the
              UTXO. This private key can map to a single public key or a more
              complicated multi-sig using an aggregatd public key.
            </p>

            <div className="grid w-full max-w-lg items-center gap-1 text-sm">
              <p>Provide internal Public Key</p>
              <Input
                type="email"
                id="email"
                placeholder="Type in Internal key here..."
              />
            </div>
          </div>
        </div>

        <div className="h-fit w-full max-w-2xl space-y-2 rounded-xl bg-dark-purple px-6 pb-6 pt-7 sm:h-64 md:w-3/5 lg:w-1/2">
          <div className="flex items-center space-x-1">
            <img src="/script.svg" alt="scriptpath icon" className="h-5 w-5" />
            <p className="font-bold">Script path</p>
          </div>

          <div className="space-y-6 ">
            <p className="text-sm">
              The script, or smart-contract, path that represents a Merkle tree
              of either keys or scripts. A specific node, or tapleaf, is
              consumed by providing ___, __ & a valid ____.
            </p>

            <div className="grid w-full max-w-lg items-center gap-1 text-sm">
              <p>Provide TweakKey/scriptPath</p>
              <div className="relative">
                <ChevronRightIcon
                  color="gray"
                  className="absolute right-2 top-2 h-5 w-5 "
                />
                <Input
                  className="border-none"
                  type="email"
                  id="email"
                  placeholder="Fill in internal Key to continue..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" hidden lg:flex justify-center">
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

      <div className="grid mb-12 w-full max-w-5xl mx-auto items-center gap-1 px-5 text-sm">
        <div className="flex w-full justify-between px-2">
          <p>Taproot Output</p>
          <InformationCircleIcon color="white" className="h-5 w-5 " />
        </div>
        <Input
          type="email"
          id="email"
          placeholder="complete both the KeyPath & ScriptPath above to continue..."
          className="placeholder:italic placeholder-gray-200"
        />
      </div>
    </div>
  );
}
