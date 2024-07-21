import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { OUTPUT_TYPE } from "./TemplateOutputGen";

type OutputPubKeyTypeRow = {
  pubkeyType: string;
  description: string;
  autoSign: string;
  keyIndex: number;
  addTabLeaf: (outputType: string, type: OUTPUT_TYPE) => void;
  templateID: OUTPUT_TYPE;
};

const TextStyles = "text-md py-3.5 pl-5 pr-3 font-normal  text-white ";
export const OutputSetUpTableRow = ({
  pubkeyType,
  description,
  autoSign,
  keyIndex,
  addTabLeaf,
  templateID,
}: OutputPubKeyTypeRow) => {
  return (
    <tr
      key={keyIndex}
      className={`  ${
        keyIndex % 2 === 0 ? " bg-dark-purple" : " bg-light-purple"
      }`}
    >
      <td className={TextStyles}>{pubkeyType}</td>
      <td className={TextStyles}>{description}</td>
      <td className={TextStyles}>{autoSign}</td>
      <td
        onClick={() => addTabLeaf(pubkeyType, templateID)}
        className={TextStyles + " cursor-pointer"}
      >
        <ChevronRightIcon className="h-6 w-6 text-dark-orange" />
      </td>
    </tr>
  );
};

export const OUTPUT_PUBKEY_TYPES = [
  {
    pubkeyType: "P2PK",
    description:
      "Directly locks funds to a public key & requires a signature from the corresponding private key to spend.",
    autoSign: "Yes",
    templateID: OUTPUT_TYPE.P2PKH,
  },
  {
    pubkeyType: "P2PKH",
    description:
      "Locks funds to a hash of a public key & requires a signature from the corresponding private key & the public key...",
    autoSign: "Yes",
    templateID: OUTPUT_TYPE.P2PKH,
  },
  {
    pubkeyType: "P2WPKH",
    description:
      "A SegWit version of P2PKH that separates the signature & script from the transaction, reducing transaction size...",
    autoSign: "Yes",
    templateID: OUTPUT_TYPE.P2PKH,
  },
  {
    pubkeyType: "P2WSH (general)",
    description:
      "A SegWit version of P2SH that allows for more complex scripts to be executed efficiently and securely",
    autoSign: "No",
    templateID: OUTPUT_TYPE.P2PKH,
  },
  {
    pubkeyType: "P2SH (general)",
    description:
      "Locks funds to a hash of an arbitrary script (redeem script) & requires the redeem script and necessary data...",
    autoSign: "No",
    templateID: OUTPUT_TYPE.P2PKH,
  },
  {
    pubkeyType: "P2SH (multi-sig)",
    description:
      "A type of P2SH script that requires multiple signatures to authorize a transaction, enhancing security through...",
    autoSign: "No",
    templateID: OUTPUT_TYPE.P2PKH,
  },
  {
    pubkeyType: "P2SH (time-lock)",
    description:
      "A P2SH script that includes a condition to prevent spending the funds until a specified time or block height is...",

    autoSign: "No",
    templateID: OUTPUT_TYPE.P2SH_TL,
  },
  {
    pubkeyType: "P2SH (hash-lock)",
    description:
      "A P2SH script that requires the preimage of a specific hash to unlock the funds, commonly used in atomic sw...",
    autoSign: "No",
    templateID: OUTPUT_TYPE.P2SH_HL,
  },
  {
    pubkeyType: "P2SH (timehash-lock)",
    description:
      "A combination of time-lock and hash-lock in a P2SH script, requiring both a time condition & a hash preimag...",
    autoSign: "No",
    templateID: OUTPUT_TYPE.P2PKH,
  },
  {
    pubkeyType: "P2TR (general)",
    description:
      "Pay-to-Taproot, a new script type introduced by the Taproot upgrade,  which allows for more efficient & privat...",
    autoSign: "No",
    templateID: OUTPUT_TYPE.P2PKH,
  },
  {
    pubkeyType: "P2TR (inscription-commit)",
    description:
      "A specific use of P2TR where an inscription or message is committed to  the Taproot output, allowing for dat...",
    autoSign: "No",
    templateID: OUTPUT_TYPE.P2PKH,
  },
];

type SelectTapLeafProps = {
  addTapLeaf: (outputType: string, type: OUTPUT_TYPE) => void;
};

const SelectTapLeaf = ({ addTapLeaf }: SelectTapLeafProps) => {
  return (
    <div className="w-full overflow-hidden overflow-x-auto rounded-md bg-lighter-dark-purple px-4 py-8">
      <table className="w-full table-auto">
        <colgroup>
          <col style={{ width: "15%" }} />
          <col style={{ width: "65%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
        </colgroup>
        <thead>
          <tr className="bg-lighter-dark-purple">
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
              addTabLeaf={addTapLeaf}
              templateID={outputPubKeyType.templateID}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectTapLeaf;
