type ImportScriptProps = {
  setFetchShowing: (fetchShowing: boolean) => void;
  mainNetTestNet: string;
  setMainNetTestNet: (mainNetTestNet: string) => void;
};

const ImportScript = ({
  setFetchShowing,
  mainNetTestNet,
  setMainNetTestNet,
}: ImportScriptProps) => {
  return (
    <>
      <button
        className="absolute left-2 top-2 rounded-full bg-[#242034] p-2"
        onClick={() => setFetchShowing(false)}
      >
        {" "}
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "rotate(180deg)" }}
        >
          <path
            d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z"
            fill="#fff"
          />
        </svg>
      </button>

      <h3 className="mb-2 ml-[20px] mr-[20px] mt-5 text-center text-[18px] font-bold md:ml-[120px] md:mr-[120px] md:text-[28px]">
        Fetch UTXO
      </h3>
      <p className="font-extralight">
        start by providing a mined transaction ID
      </p>
      <div className="mt-5 h-[0.5px] w-full border-b border-[#F79327] "></div>
      <div className="mt-10 flex w-full flex-row items-center justify-between">
        <p className="font-extralight">1. Fetch Transaction Outputs</p>
        <div className="flex rounded-full bg-[#29243A] px-5 py-1 text-[14px] font-extralight">
          <button
            className={`rounded-full  px-5 py-1 ${
              mainNetTestNet === "Main" ? "bg-[#110B24] " : "bg-transparent"
            }`}
            onClick={() => setMainNetTestNet("Main")}
          >
            Mainnet
          </button>
          <button
            className={`rounded-full  px-5 py-1 ${
              mainNetTestNet === "Test" ? "bg-[#110B24]" : "bg-transparent"
            }`}
            onClick={() => setMainNetTestNet("Test")}
          >
            Testnet
          </button>
        </div>
      </div>

      <div className="relative mt-5 w-full">
        <input
          className="w-full rounded-full border border-[#F79327] bg-transparent px-4 py-2 pl-8 outline-none"
          placeholder="paste in 32-byte TXID..."
        ></input>
        {/* Checkmark */}
        {/* Hidden at the beginning and showing when fetch is successful */}
        <svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-2 top-2 hidden"
        >
          <path
            d="M11.5 0.25C5.572 0.25 0.75 5.073 0.75 11C0.75 16.927 5.572 21.75 11.5 21.75C17.428 21.75 22.25 16.927 22.25 11C22.25 5.073 17.428 0.25 11.5 0.25ZM11.5 20.25C6.399 20.25 2.25 16.101 2.25 11C2.25 5.899 6.399 1.75 11.5 1.75C16.601 1.75 20.75 5.899 20.75 11C20.75 16.101 16.601 20.25 11.5 20.25ZM15.53 8.13599C15.823 8.42899 15.823 8.90402 15.53 9.19702L10.863 13.864C10.717 14.01 10.525 14.084 10.333 14.084C10.141 14.084 9.94901 14.011 9.80301 13.864L7.47 11.531C7.177 11.238 7.177 10.763 7.47 10.47C7.763 10.177 8.23801 10.177 8.53101 10.47L10.334 12.273L14.47 8.13702C14.763 7.84402 15.237 7.84399 15.53 8.13599Z"
            fill="#5DDE44"
          />
        </svg>
      </div>

      <p className="mt-10 flex w-full items-start text-left font-extralight">
        2. Select Output PubKeyScript
      </p>
      <input
        className=" mt-5 w-full rounded-full border bg-transparent  px-4 py-2 outline-none"
        placeholder="waiting for transaction"
      ></input>
      {/* If fetch UTXO Successful */}
      {/* {outputPubKeyScript.map((i, index) => (
      <button className="mt-3 flex w-full flex-row items-center justify-between rounded-full bg-[#0C071D] px-3 py-2 font-extralight text-[#EEEEEE]">
        <p className="ml-1">
          {index} <span className="ml-5">{i.id}</span>
        </p>
        <div className="flex flex-row items-center text-[14px]">
          <p className="mr-3 rounded-full bg-[#231C33] px-3 py-1">
            {i.type}
          </p>
          <svg
            width="10"
            height="23"
            viewBox="0 0 14 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.939325 3.06153C0.353681 2.47589 0.353395 1.52656 0.938472 0.940565C1.23149 0.645737 1.6171 0.499969 1.99958 0.499969C2.38244 0.499969 2.76772 0.645947 3.06169 0.941551C3.0619 0.941771 3.06212 0.941992 3.06234 0.942211L12.3945 10.2743C12.9804 10.8603 12.9804 11.8102 12.3945 12.3962L3.06114 21.7295C2.47522 22.3154 1.52525 22.3154 0.939325 21.7295C0.353396 21.1436 0.353396 20.1936 0.939325 19.6077L9.2124 11.3346L0.939325 3.06153Z"
              fill="#F79327"
            />
          </svg>
        </div>
      </button>
    ))} */}
    </>
  );
};

export default ImportScript;
