export enum TxTextSectionType {
  txType = "txType",
  version = "version",
  marker = "marker",
  flag = "flag",

  /* Input Fields */
  inputCount = "inputCount",
  inputTxId = "inputTxId",
  inputVout = "inputVout",
  inputScriptSigSize = "inputScriptSigSize",
  inputScriptSig = "inputScriptSig",
  inputSequence = "inputSequence",
  /* Output Fields */
  outputCount = "outputCount",
  outputAmount = "outputAmount",
  outputPubKeySize = "outputScriptPubKeySize",
  outputPubKeyScript = "outputScriptPubKey",
  /* Witness Fields */
  witnessSize = "witnessSize",
  witnessElementSize = "witnessElementSize",
  witnessElementValue = "witnessElementValue",
  /* Lock Time Field */
  lockTimeValue = "lockTimeValue",
}
export type TxTextSectionProps = {
  text: string | undefined | number;
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
      case TxTextSectionType.inputSequence:
        displayData = {
          ...displayData,
          ...INPUT_SEQUENCE,
        };
        break;
      case TxTextSectionType.inputScriptSig:
        displayData = {
          ...displayData,
          ...INPUT_SCRIPTSIG,
        };
        break;
      case TxTextSectionType.inputScriptSigSize:
        displayData = {
          ...displayData,
          ...INPUT_SCRIPTSIGSIZE,
        };
        break;
      case TxTextSectionType.inputVout:
        displayData = {
          ...displayData,
          ...INPUT_VOUT,
        };
        break;
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
      case TxTextSectionType.outputCount:
        displayData = {
          ...displayData,
          ...OUTPUT_COUNT,
        };
        break;
      case TxTextSectionType.outputAmount:
        displayData = {
          ...displayData,
          ...OUTPUT_AMOUNT,
        };
        break;
      case TxTextSectionType.outputPubKeySize:
        displayData = {
          ...displayData,
          ...OUTPUT_SCRIPT_PUB_SIZE,
        };
        break;
      case TxTextSectionType.outputPubKeyScript:
        displayData = {
          ...displayData,
          ...OUTPUT_SCRIPT_PUB_KEY,
        };
        break;
      case TxTextSectionType.witnessSize:
        displayData = {
          ...displayData,
          ...WITNESS_SIZE,
        };
        break;
      case TxTextSectionType.witnessElementSize:
        displayData = {
          ...displayData,
          ...WITNESS_ELEMENT_SIZE,
        };
        break;
      case TxTextSectionType.witnessElementValue:
        displayData = {
          ...displayData,
          ...WITNESS_ELEMENT_VALUE,
        };
        break;
      case TxTextSectionType.witnessElementValue:
        displayData = {
          ...displayData,
          ...LOCK_TIME,
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
  Value: string | number;
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

const INPUT_VOUT = {
  Title: "VOUT",
  Content:
    "The VOUT of an input specifies the index of the UTXO unlocked; recall that the field before this is a TXID that points to a mined transaction which may contain multiple inputs.",

  Content2:
    "The TXID is stored as an 4-byte | 16-char in Little Endian format. ",

  Content3: "BE 00000001",
};

const INPUT_SCRIPTSIGSIZE = {
  Title: "ScriptSigSize",
  Content:
    "The ScriptSigSize field dictates the length of the upcoming ScriptSig / UnlockScript. Like most items of varying size, The scriptSigSize is formatted according to Bitcoin VarInt rules.",

  Content2: "",

  Content3:
    "This length is recorded in hex & must be converted to decimal to correctly count upcoming chars.",
};

const INPUT_SCRIPTSIG = {
  Title: "ScriptSig",
  Content:
    "The ScriptSig, also known as the UnlockScript, is what’s used to cryptographically verify that we own the UTXO fetched; by proving ownership, we’re now allowed to spend the BTC  stored in the input. Commonly, but not always, the SigScript/UnlockScript is one of the handful of standard scripts.",

  Content2:
    "It appears that this particular SigScript is part of a Legacy P2PKH transaction.",

  Content3:
    "P2PKH (pay-to-public-key-hash) At one point the most universal script for simple, direct transfers. Still the default for pre-SegWit.",
};

const INPUT_SEQUENCE = {
  Title: "Sequence",
  Content:
    "A timelock for a specific input. Used very rarely with  op_checksequenceverify, most commonly left unaltered / set to mine immediately.",

  Content2:
    "The sequence is stored as an 4-byte | 16-char in Little Endian format & the value itself tells us whether the timelock is block-height, time based or set to mine immediately (ffffffff).",

  Content3: "",
};

const OUTPUT_COUNT = {
  Title: "Output Count",
  Content:
    "The input count field tells us the total number of inputs that were used to fetch & unlock the Bitcoin spent in this transaction.  Like most items of varying size, it’s stored according to VarInt rules:",
  Content2:
    "With our output count, we know how many outputs we expect in the upcoming hex, recall that each output requires the following fields: Amount, PubKeySize, & PubKey.",
  Content3: "",
};

const OUTPUT_AMOUNT = {
  Title: "Amount",
  Content:
    "The amount of Bitcoin, described in integer Satoshis (1/100,000,000 of a Bitcoin) that is being sent in this output.",
  Content2:
    " This amount value is stored as an 8-byte | 16-char in Little Endian format.",
  Content3: "",
};

const OUTPUT_SCRIPT_PUB_SIZE = {
  Title: "ScriptPubKeySize",
  Content:
    "The ScriptPubKeySize field dictates the length of the upcoming ScriptPubKey / LockScript. Like most items of varying size, The ScriptPubKeySize is formatted according to Bitcoin VarInt rules:",
  Content2:
    "This length is recorded in hex & must be converted to decimal to correctly count upcoming chars.",
};

const OUTPUT_SCRIPT_PUB_KEY = {
  Title: "ScriptPubKey",
  Content:
    "The ScriptPubKey, also known as the LockScript, is what’s used to cryptographically assign ownership for a defined amount of Bitcoin.  Commonly, but not always, the SigScript/UnlockScript is one of the handful of standard scripts.",
  Content2:
    " It appears that this particular SigScript is part of a SegWit P2WPKH transaction.",
};

const WITNESS_SIZE = {
  Title: "Witness Element Count",
  Content:
    "Every Witness consists of an element count & an array of tuples that include the size(varint) of the upcoming element & the actual value / element (data or op_code) itself. ",
  Content2:
    "This witness element count tells us how many items are in the upcoming witness script.",
};

const WITNESS_ELEMENT_SIZE = {
  Title: "Element Size",
  Content:
    "Before every item in the Witness script, we first need to record the size of the upcoming item. As usual, this means using the standard VarInt rules:",
  Content2:
    "This witness element count tells us how many items are in the upcoming witness script.",
};

const WITNESS_ELEMENT_VALUE = {
  Title: "Element Value",
  Content:
    "This is an element, or item, in the witness script. This witness script, just like the sigScript/unlockScript, is used to verify ownership of the paired input UTXO. Commonly, but not always, the SigScript/UnlockScript is one of the handful of standard scripts.",
  Content2:
    " It appears that this particular WitnessScript is part of a SegWit P2WPKH transaction.",
};

const LOCK_TIME = {
  Title: "Locktime",
  Content:
    "Locktime sets the earliest time an entire transaction can be mined in to a block; it’s the last field in any type of transaction.",
  Content2:
    "The sequence is stored as an 4-byte | 16-char in Little Endian format & the value itself tells us whether the timelock is block-height, time based or set to mine immediately (00000000):",
};
