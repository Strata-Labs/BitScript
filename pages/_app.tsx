import "../src/styles/globals.css";
import { Provider, useAtom } from "jotai";
import type { AppProps } from "next/app";
import React from "react";
import NavigationMenu from "../src/comp/NavigationMenu";
import TopSearchBar from "../src/comp/SearchView/TopSearchBar";
import ScreenSizeDisplay from "@/utils";
import PlausibleProvider from "next-plausible";
import Head from "next/head";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Bitscript</title>
        <meta
          property="description"
          content="Our NorthStar is to scale the programming layer of Bitcoin by introducing & supporting developers to the ecosystem through educational on-boarding & technical support.

We do this by shipping intuitive, powerful, & flexible Bitcoin development tools that together make up a Bitcoin Development Environment."
        />
        <meta property="og:image" content="Link preview image URL"></meta>
        <meta
          property="og:title"
          content="BitScript - Bitcoin Development Environment"
        ></meta>
        <meta
          property="og:description"
          content="Our NorthStar is to scale the programming layer of Bitcoin by introducing & supporting developers to the ecosystem through educational on-boarding & technical support.

We do this by shipping intuitive, powerful, & flexible Bitcoin development tools that together make up a Bitcoin Development Environment."
        />
        <meta property="og:url" content="https://www.bitscript.app/"></meta>
        <meta
          property="og:image"
          content="https://www.bitscript.app/images/linkImg.png"
        />
      </Head>
      <PlausibleProvider
        trackOutboundLinks={true}
        taggedEvents={true}
        domain="bitscript.app"
        trackLocalhost={false}
      >
        <Provider>
          <ScreenSizeDisplay />
          <div className="topLevelSats bg-[#F8F8F8]">
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
      </PlausibleProvider>
    </>
  );
}
