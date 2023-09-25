import "../src/styles/globals.css";
import { Provider, useAtom } from "jotai";
import type { AppProps } from "next/app";
import React from "react";
import NavigationMenu from "../src/comp/NavigationMenu";
import TopSearchBar from "../src/comp/SearchView/TopSearchBar";
import ScreenSizeDisplay from "@/utils";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <ScreenSizeDisplay />
      <div className="bg-[#F8F8F8]">
        <div className="sticky">
          <NavigationMenu />
        </div>
        <TopSearchBar />
        <div className="min-h-[92vh] overflow-y-auto">
          <Component {...pageProps} />
        </div>
        {/* <SearchView /> */}
      </div>
    </Provider>
  );
}
