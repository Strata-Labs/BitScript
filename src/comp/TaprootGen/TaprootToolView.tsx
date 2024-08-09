import React from "react";
import {
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import { Input } from "./UI/input";
import { TaprootTemplateTable } from "./UI/templateTable";
import Link from "next/link";


export default function TaprootToolView() {
  return (
    <div
      style={{
        minHeight: "92vh",
      }}
      className="mx-5 flex h-full w-full flex-col justify-between gap-4 overflow-auto bg-lighter-dark-purple px-7 lg:pl-[240px]"
    >
      <div className="mt-8 flex h-full flex-col justify-center gap-4 space-y-3 md:flex-col">
        <p className="text-base font-light">
          Since BIP 340 - 342, Taproot transactions have been enabled. Below,
          you’ll find both existing taproot transaction templates as well as the
          ability to create your own P2TR output | Taproot public key
        </p>

        <Link
          href="/taprootGen/new"
          className="block w-full rounded-full border border-dark-orange bg-lighter-dark-purple px-6 py-3 text-left text-sm text-white no-underline transition-all duration-300 hover:bg-dark-purple"
        >
          <span className="font-bold">Create </span>
          <span className="font-bold text-dark-orange">New</span>
          <span className="font-bold"> P2TR Output</span>
          <span className="font-bold"> | Taproot Public Key</span>
        </Link>

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
