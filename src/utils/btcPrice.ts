export const getPriceOfBtc = async (dollarAmount: number): Promise<number> => {
  try {
    //getting the current rate from this API. 
    const response = await fetch(
      "https://api.coindesk.com/v1/bpi/currentprice/USD.json"
    );
    const data = await response.json();
    const bitcoinPriceInUSD: number = data.bpi.USD.rate_float;


    const bitcoinAmount: number = dollarAmount / bitcoinPriceInUSD;

    console.log("this is the bitcoin amount", bitcoinAmount)
    // basically rounds it up to 8 decimals places and return it as a number
    return Math.round(bitcoinAmount * 1e8) / 1e8;
  } catch (error) {
    console.error("Error fetching Bitcoin price:", error);
    throw error;
  }
};

export const convertBtcToSats = (btc: number) => btc * 100000000;
