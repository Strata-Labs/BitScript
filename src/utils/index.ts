import { useEffect, useState, createContext, useContext } from "react";
import MobileDetect from "mobile-detect";
import { GetServerSidePropsContext } from "next";

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

/*
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    //create a timer to delay setting the value.
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    //if the value changes, we clear the timeout and do not change the value
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

*/

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
