import "../src/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

import { Provider, useAtom } from "jotai";
import type { AppProps } from "next/app";
import React, { use, useEffect, useState } from "react";
import NavigationMenu from "../src/comp/NavigationMenu";
import TopSearchBar from "../src/comp/SearchView/TopSearchBar";
import ScreenSizeDisplay from "@/utils";
import PlausibleProvider from "next-plausible";
import Head from "next/head";
import { getBaseUrl, trpc } from "@/utils/trpc";
import CreateLogin from "@/comp/Profile/CreateLogin";
import LoginModal from "@/comp/LoginModal";
import ForgotPassword from "@/comp/ForgotPassword";
import ChangePassword from "@/comp/ChangePassword";
import BuyingOptions from "@/comp/Profile/BuyingOptions";
import { useRouter } from "next/router";
import TeamChangePassword from "@/comp/TeamChangePassword";
function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          // You can pass any HTTP headers you wish here
          async headers() {
            let token = null;
            if (window.localStorage) {
              token = window.localStorage.getItem("token");
            }

            return {
              authorization: token ? `Bearer ${token}` : "",
            };
          },
        }),
      ],
    })
  );
  const router = useRouter();

  return (
    <>
      <Head>
        <title>BitScript</title>
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
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <Provider>
              <div className="topLevelSats bg-[#F8F8F8]">
                {router.pathname === "/" ? null : (
                  <>
                    <div className=" md:absolute">
                      <NavigationMenu />
                    </div>
                    <div className=" md:mt-[100px]">
                      <TopSearchBar />
                    </div>
                  </>
                )}
                <div className="min-h-[92vh] overflow-y-auto">
                  <ScreenSizeDisplay />
                  <BuyingOptions />
                  <CreateLogin />
                  <LoginModal />
                  <ForgotPassword />
                  <ChangePassword />
                  <TeamChangePassword />
                  <Component {...pageProps} />
                </div>
              </div>
            </Provider>
          </QueryClientProvider>
        </trpc.Provider>
      </PlausibleProvider>
    </>
  );
}

export default App;
