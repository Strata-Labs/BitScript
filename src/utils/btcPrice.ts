import { useQuery } from "@tanstack/react-query";

// Cache key for Bitcoin price query
const BTC_PRICE_QUERY_KEY = ["bitcoinPrice"];

const fetchBitcoinPrice = async (): Promise<number> => {
  const response = await fetch(
    "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD"
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.USD;
};

export const useBitcoinPrice = () => {
  return useQuery(BTC_PRICE_QUERY_KEY, fetchBitcoinPrice, {
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
    retry: 3,
    // tanstack exponential backoff
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onError: (error) => {
      console.error("Error fetching Bitcoin price:", error);
    },
  });
};

export const useUsdToBtcConverter = () => {
  const { data: bitcoinPrice, isLoading, error, isError } = useBitcoinPrice();

  const convertUsdToBtc = (dollarAmount: number): number | null => {
    // Only convert if we have a valid price
    if (!bitcoinPrice || isError) {
      return null;
    }

    const bitcoinAmount = dollarAmount / bitcoinPrice;

    // Round to 8 decimal places
    return Math.round(bitcoinAmount * 1e8) / 1e8;
  };

  return {
    convertUsdToBtc,
    bitcoinPrice,
    isLoading,
    isError,
    error,
  };
};

// we still use this function for non react components. ie in the api
// default to the hook above for react components
export const getPriceOfBtc = async (dollarAmount: number): Promise<number> => {
  try {
    const response = await fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const bitcoinPriceInUSD = data.USD;

    if (
      !bitcoinPriceInUSD ||
      isNaN(bitcoinPriceInUSD) ||
      bitcoinPriceInUSD <= 0
    ) {
      console.error("Invalid Bitcoin price received:", bitcoinPriceInUSD);
      return 0;
    }

    const bitcoinAmount = dollarAmount / bitcoinPriceInUSD;
    return Math.round(bitcoinAmount * 1e8) / 1e8;
  } catch (error) {
    console.error("Error calculating Bitcoin price:", error);
    return 0;
  }
};

export const convertBtcToSats = (btc: number) => btc * 100000000;
