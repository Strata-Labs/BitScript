import "../src/styles/globals.css";
import { Provider } from "jotai";
import type { AppProps } from "next/app";
import TopSearchBar from "@/comp/TopSearchBar";
import NavigationMenu from "@/comp/NavigationMenu";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <div className="bg-[#F8F8F8]">
      <div className="">
        <NavigationMenu />
      </div>
      <TopSearchBar />
      <Component {...pageProps} />
      </div>
    </Provider>
  );
}
