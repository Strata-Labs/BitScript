import "../src/styles/globals.css";
import { Provider, useAtom } from "jotai";
import type { AppProps } from "next/app";
import TopSearchBar from "@/comp/SearchView/TopSearchBar";
import NavigationMenu from "@/comp/NavigationMenu";
import { activeSearchView, menuSelected } from "@/comp/atom";
import SearchView from "@/comp/SearchView/SearchView";
import { useEffect } from "react";
import { IsSsrMobileContext } from "@/utils";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <div className="bg-[#F8F8F8]">
        <div className="">
          <NavigationMenu />
        </div>
        <TopSearchBar />
        <Component {...pageProps} />
        {/* <SearchView /> */}
      </div>
    </Provider>
  );
}
