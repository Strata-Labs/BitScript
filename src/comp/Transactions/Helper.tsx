export enum TxTextSectionType {
  txType = "txType",
  version = "version",
  marker = "marker",
  flag = "flag",
  inputCount = "inputCount",
  input = "input",
  outputCount = "outputCount",
  output = "output",
  witness = "witness",
  locktime = "locktime",
  inputTxId = "inputTxId",
  inputVout = "inputVout",
  inputScriptSigSize = "inputScriptSigSize",
  inputScriptSig = "inputScriptSig",
  inputSequence = "inputSequence",
}
export type TxTextSectionProps = {
  text: string | undefined;
  type: TxTextSectionType;
  setIsModularPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleHover: (type: ModularPopUpDataProps) => void;
  inputIndex?: number;
};
export const TxTextSection = ({
  text,
  type,
  setIsModularPopUpOpen,
  handleHover,
  inputIndex,
}: TxTextSectionProps) => {
  const handleHoverAction = () => {
    let displayData = {
      Title: "",
      Value: text ? text : "",
      Content: "",
      Content2: "",
      Content3: "",
    };
    switch (type) {
      case TxTextSectionType.version:
        displayData = {
          ...displayData,
          ...VERSION_DATA,
        };
        break;
      case TxTextSectionType.inputCount:
        displayData = {
          ...displayData,
          ...INPUT_COUNT_DATA,
        };
        break;
      case TxTextSectionType.inputTxId:
        displayData = {
          ...displayData,
          ...INPUT_TX_ID,
        };
        break;
    }

    handleHover(displayData);
  };
  return (
    <span
      onMouseEnter={() => handleHoverAction()}
      onMouseLeave={() => setIsModularPopUpOpen(false)}
      className=" text-md break-words  rounded-md transition-all hover:bg-black  hover:text-[#F79327]"
    >
      {text}
    </span>
  );
};

export type ModularPopUpDataProps = {
  Title: string;
  Value: string;
  Content: string;
  Content2: string;
  Content3: string;
};

const VERSION_DATA = {
  Title: "Version",
  Content:
    "The version field tells us what type of transaction this is (legacy vs segwit/taproot). It’s stored as a 4-byte | 8 hex string in Little-Endian format.",
  Content2:
    "Introduced with BIP68, BIP112, & BIP113. This version (2), supports the relative lock-time feature using the nSequence field.",
  Content3: "",
};

const INPUT_COUNT_DATA = {
  Title: "Input Count",
  Content:
    "The input count field tells us the total number of inputs that were used to fetch & unlock the Bitcoin spent in this transaction. It’s stored as a VarInt.",
  Content2:
    "With our input count, we know how many inputs we expect in the upcoming hex, recall that each input requires the following fields: TXID, VOUT, ScriptSigSize, ScriptSig, & Sequence.",
  Content3: "",
};

const INPUT_TX_ID = {
  Title: "TXID",
  Content:
    "The TXID of an input specifies in which previous transaction this Bitcoin was received. The TXID is stored as a 32-byte | 64-char in Little Endian format. ",

  Content2:
    "This means you cannot copy/paste it as is - you first need to convert it from Little Endian to Big Endian. Click the link indicator above to open this transaction in a different tab.",

  Content3: "",
};
