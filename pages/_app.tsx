import "../src/styles/globals.css";
import { BrowserRouter } from 'react-router-dom';

import { Provider } from "jotai";
import type { AppProps } from "next/app";
import NavigationMobile from "@/comp/NavigationMobile";
import Navigation from "@/comp/Navigation";
import TopSearchBar from "@/comp/TopSearchBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    
    <Provider>
      <div className="w-full bg-[#F8F8F8]">
      {/* Show mobile nav on small screens */}
      {/* <div className="md:hidden absolute">
          <NavigationMobile /> 
        </div> */}
  
        {/* Show regular nav on medium screens and up */}
        <div className="flex absolute">
          <NavigationMobile />
        </div>
        <TopSearchBar />
      <Component {...pageProps} />
      </div>
    </Provider>
  );
}
