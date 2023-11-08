import { useEffect, useState, createContext, useContext, useRef } from "react";

import { atom, useAtom, useAtomValue } from "jotai";

import MobileDetect from "mobile-detect";
import { GetServerSidePropsContext } from "next";

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const getIsSsrMobile = (context: GetServerSidePropsContext) => {
  const md = new MobileDetect(context.req.headers["user-agent"] as string);

  return Boolean(md.mobile());
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width?: number;
    height?: number;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Don't forget to remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export const IsSsrMobileContext = createContext(false);

export const useWindowSizeWindow = () => {
  const [windowSize, setWindowSize] = useState<{
    width?: number;
    height?: number;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Don't forget to remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export const useIsMobile = () => {
  const isSsrMobile = useContext(IsSsrMobileContext);
  const { width: windowWidth } = useWindowSize();
  console.log("width", windowWidth);
  const isBrowserMobile = !!windowWidth && windowWidth < 992;
  console.log("isBrowserMobile", isBrowserMobile);

  return isSsrMobile || isBrowserMobile;
};

type Timer = ReturnType<typeof setTimeout>;
type SomeFunction = (...args: any[]) => void;
/**
 *
 * @param func The original, non debounced function (You can pass any number of args to it)
 * @param delay The delay (in ms) for the function to return
 * @returns The debounced function, which will run only if the debounced function has not been called in the last (delay) ms
 */

export const satsToBtc = (sats: number) => sats / 100000000;

// Jotai atom for storing the screen size
export const screenSizeAtom = atom({
  width: 0,
  height: 0,
});

// Component to display and update the screen size
const ScreenSizeDisplay: React.FC = () => {
  const [screenSize, setScreenSize] = useAtom(screenSizeAtom);

  useEffect(() => {
    if (window !== undefined) {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth || 0,
        height: window.innerHeight || 0,
      });
    };

    if (typeof window !== "undefined") {
      // Attach an event listener for window resize
      window.addEventListener("resize", handleResize);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [setScreenSize]);

  return null;
};

export default ScreenSizeDisplay;

// debounce helper func

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | undefined;

  return function (...args: Parameters<T>): void {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
}
