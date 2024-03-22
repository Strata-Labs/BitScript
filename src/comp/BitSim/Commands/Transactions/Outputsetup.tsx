import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { SettingsInput } from "../../CreateBitSim";
import { useRouter } from "next/router";

type OutputPubKeyTypeRow = {
  pubkeyType: string;
  description: string;
  autoSign: string;
  keyIndex: number;
};

export enum OUTPUT_TYPE {
  P2PKH = "P2PKH",
}

export enum SCRIPT_SANDBOX_TYPE {
  COMMENT = "COMMENT",
  CODE = "CODE",
  INPUT_CODE = "INPUT_CODE",
}

export enum TAG_TYPE {
  TEXT = "TEXT",
  LINK = "LINK",
}

type SCRIPT_OUTPUT_TAG_TYPE = {
  text: string;
  type: TAG_TYPE;
  link: string | null;
};

type SCRIPT_SANDBOX = {
  type: SCRIPT_SANDBOX_TYPE;
  id: number;
  content: string;
  label?: string;
  scriptSandBoxInputName?: string;
};

type SCRIPT_INPUT = {
  label: string;
  placeholder: string;
  scriptSandBoxInputName: string;
  required: boolean;
};

type SCRIPT_FORM_STATE = {
  [key: string]: string;
};

export type P2PKH_FORM_STATE = {
  [key: string]: string;
  hashedPublicKey: string;
};
export type SCRIPT_OUTPUT_TYPE = {
  outputType: OUTPUT_TYPE;
  title: string;
  tags: SCRIPT_OUTPUT_TAG_TYPE[];
  description: string[];
  scriptSandbox: SCRIPT_SANDBOX[];
  scriptInput: SCRIPT_INPUT[];
};

export const GENERATE_OUTPUT_FROM_SCRIPT: SCRIPT_OUTPUT_TYPE[] = [
  {
    outputType: OUTPUT_TYPE.P2PKH,
    title: "P2PKH",
    tags: [
      {
        text: "legacy",
        type: TAG_TYPE.TEXT,
        link: null,
      },
      {
        text: "P2PKH",
        type: TAG_TYPE.LINK,
        link: "/scripts/p2pkh",
      },
    ],
    description: [
      "A Pay-to-Public-Key-Hash (P2PKH) script is a common type of Bitcoin transaction script that allows bitcoins to be sent to a specific Bitcoin address. The script locks the bitcoins to the hash of a public key, requiring a signature from the corresponding private key to spend them. When the bitcoins are spent, the spender provides a scriptSig that includes the public key & a valid signature.",
      "We already have our public key from before (423F...), so in order to complete our two-item ScriptSig/UnlockSig, seen to the right, we’ll need to provide a valid ECDSA (legacy) signature.",
    ],
    scriptInput: [
      {
        label: "Recipient Hashed Public Key",
        placeholder: "start typing a wallet like ‘Alice’...",
        scriptSandBoxInputName: "hashedPublicKey",
        required: true,
      },
    ],
    scriptSandbox: [
      {
        type: SCRIPT_SANDBOX_TYPE.COMMENT,
        id: 0,
        content: "# lockscript/scriptpubkey",
      },
      {
        type: SCRIPT_SANDBOX_TYPE.CODE,
        id: 1,
        content: "OP_DUP",
      },
      {
        type: SCRIPT_SANDBOX_TYPE.CODE,
        id: 2,
        content: "OP_HASH160",
      },
      {
        type: SCRIPT_SANDBOX_TYPE.INPUT_CODE,
        id: 3,
        content: "",
        label: "Hashed Public Key",
        scriptSandBoxInputName: "hashedPublicKey",
      },
      {
        type: SCRIPT_SANDBOX_TYPE.CODE,
        id: 4,
        content: "OP_EQUALVERIFY",
      },
      {
        type: SCRIPT_SANDBOX_TYPE.CODE,
        id: 5,
        content: "OP_CHECKSIG",
      },
    ],
  },
];

export const OUTPUT_PUBKEY_TYPES = [
  {
    pubkeyType: "P2PK",
    description:
      "Directly locks funds to a public key & requires a signature from the corresponding private key to spend.",
    autoSign: "Yes",
  },
  {
    pubkeyType: "P2PKH",
    description:
      "Locks funds to a hash of a public key & requires a signature from the corresponding private key & the public key...",
    autoSign: "Yes",
    outputType: OUTPUT_TYPE.P2PKH,
  },
  {
    pubkeyType: "P2WPKH",
    description:
      "A SegWit version of P2PKH that separates the signature & script from the transaction, reducing transaction size...",
    autoSign: "Yes",
  },
  {
    pubkeyType: "P2WSH (general)",
    description:
      "A SegWit version of P2SH that allows for more complex scripts to be executed efficiently and securely",
    autoSign: "No",
  },
  {
    pubkeyType: "P2SH (general)",
    description:
      "Locks funds to a hash of an arbitrary script (redeem script) & requires the redeem script and necessary data...",
    autoSign: "No",
  },
  {
    pubkeyType: "P2SH (multi-sig)",
    description:
      "A type of P2SH script that requires multiple signatures to authorize a transaction, enhancing security through...",
    autoSign: "No",
  },
  {
    pubkeyType: "P2SH (time-lock)",
    description:
      "A P2SH script that includes a condition to prevent spending the funds until a specified time or block height is...",
    autoSign: "No",
  },
  {
    pubkeyType: "P2SH (hash-lock)",
    description:
      "A P2SH script that requires the preimage of a specific hash to unlock the funds, commonly used in atomic sw...",
    autoSign: "No",
  },
  {
    pubkeyType: "P2SH (timehash-lock)",
    description:
      "A combination of time-lock and hash-lock in a P2SH script, requiring both a time condition & a hash preimag...",
    autoSign: "No",
  },
  {
    pubkeyType: "P2TR (general)",
    description:
      "Pay-to-Taproot, a new script type introduced by the Taproot upgrade,  which allows for more efficient & privat...",
    autoSign: "No",
  },
  {
    pubkeyType: "P2TR (inscription-commit)",
    description:
      "A specific use of P2TR where an inscription or message is committed to  the Taproot output, allowing for dat...",
    autoSign: "No",
  },
];

export const OutputSetUpTableRow = ({
  pubkeyType,
  description,
  autoSign,
  keyIndex,
}: OutputPubKeyTypeRow) => {
  return (
    <tr
      key={keyIndex}
      className={` border-b border-[#E9EAEC] ${
        keyIndex % 2 === 0 ? "hover-row-white" : "hover-row-grayish"
      }`}
    >
      <td className="text-md py-3.5 pl-5 pr-3 font-normal  text-[#0C071D] ">
        {pubkeyType}
      </td>
      <td className="text-md py-3.5 pl-5  pr-3 font-normal text-[#0C071D] ">
        {description}
      </td>
      <td className="text-md py-3.5 pl-5  pr-3 font-normal text-[#0C071D] ">
        {autoSign}
      </td>
      <td className="text-md py-3.5 pl-5  pr-3 font-normal text-[#0C071D] ">
        <ChevronRightIcon className="h-6 w-6 text-dark-orange" />
      </td>
    </tr>
  );
};
const OutputSetup = () => {
  const [outputAmount, setOutputAmount] = useState<string>("");

  const router = useRouter();

  return (
    <div
      style={{
        //minHeight: "calc(100vh - 110px)",
        height: "100%",
        minHeight: "92vh",
        paddingLeft: "240px",
      }}
      className="min-height-[92vh] flex h-full w-full flex-col gap-4 overflow-auto"
    >
      <div className="flex flex-1 flex-col gap-10 p-8">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <ChevronLeftIcon
              onClick={() => router.back()}
              className="h-10 w-10 cursor-pointer  text-[#0C071D]"
            />
            <p className=" text-[20px] font-semibold text-[#0C071D]  md:text-[32px]">
              Output 0 <span className="font-normal">Details</span>
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-row items-center gap-2"></div>
          </div>
        </div>
        <div className="flex w-full flex-col  gap-4 rounded-xl bg-white px-4 py-6">
          <div className="flex flex-row items-center justify-between">
            <p className=" text-[28px]  font-normal  text-[#0C071D]">
              Input(s) Details
            </p>
            <p className=" text-[20px] font-thin text-[#0C071D] md:text-[24px]">
              <span className="font-bold"> x</span> available in inputs
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <SettingsInput
              valid={outputAmount.length > 0}
              label="Type in an amount..."
              placeholder="How much BTC is transferred in this output?"
              value={outputAmount}
              setValue={setOutputAmount}
            />
          </div>
        </div>
        <div className="flex w-full flex-col  gap-4 rounded-xl bg-[#fafafafa] px-4 py-6">
          <p className=" text-[28px]  font-normal  text-[#0C071D]">
            Output PubKey Type
          </p>
          <div className="w-full  overflow-hidden overflow-x-auto">
            <table className="w-full table-auto">
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "65%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "15%" }} />
              </colgroup>
              <thead>
                <tr className="bg-[#FAFAFA]">
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-light text-[#687588] sm:pl-3"
                  >
                    PubKey Type
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-light text-[#687588] sm:pl-3"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-light text-[#687588] sm:pl-3"
                  >
                    Auto Sign
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-light text-[#687588] sm:pl-3"
                  >
                    Select
                  </th>
                </tr>
              </thead>
              <tbody>
                {OUTPUT_PUBKEY_TYPES.map((outputPubKeyType, index: number) => (
                  <OutputSetUpTableRow
                    keyIndex={index}
                    pubkeyType={outputPubKeyType.pubkeyType}
                    description={outputPubKeyType.description}
                    autoSign={outputPubKeyType.autoSign}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputSetup;
