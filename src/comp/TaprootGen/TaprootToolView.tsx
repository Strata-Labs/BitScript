import React from "react";
import { TaprootTemplateTable } from "./UI/templateTable";
import Link from "next/link";
import { TaprootGenComponents } from "./types";
import { activeTaprootComponent } from "../atom";
import { useAtom } from "jotai";


export default function TaprootToolView() {

  const [taprootComponent, setTaprootComponent] = useAtom(
    activeTaprootComponent
  );
  return (
    <div
      style={{
        minHeight: "92vh",
      }}
      className="mx-5 flex h-full w-full flex-col justify-between gap-4 overflow-auto bg-lighter-dark-purple px-5 "
    >
      <div className="mt-8 flex h-full flex-col justify-center gap-4 space-y-3 md:flex-col">
        <p className="text-base font-light">
          Since BIP 340 - 342, Taproot transactions have been enabled. Below,
          you’ll find both existing taproot transaction templates as well as the
          ability to create your own P2TR output | Taproot public key
        </p>

        <div
          // href="/taprootGen/new"
          onClick={() => {
              setTaprootComponent(TaprootGenComponents.NewTemplateView);
          }}
          className="block w-full cursor-pointer rounded-full border border-dark-orange bg-lighter-dark-purple px-6 py-3 text-left text-sm text-white no-underline transition-all duration-300 hover:bg-dark-purple"
        >
          <span className="font-bold">Create </span>
          <span className="font-bold text-dark-orange">New</span>
          <span className="font-bold"> P2TR Output</span>
          <span className="font-bold"> | Taproot Public Key</span>
        </div>

        <div className="relative mx-auto w-full">
          <hr className="border-gray-400" />
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-lighter-dark-purple px-2 text-xs text-gray-500">
            or
          </p>
        </div>

        <TaprootTemplateTable />
      </div>
    </div>
  );
}
