import { classNames, screenSizeAtom } from "@/utils";
import { useAtomValue } from "jotai";
import { CodeBlockDisplay, ScriptTag } from "./ScriptSig";
import { TransactionItem } from "@/deserialization/model";
import { txDataAtom } from "../TransactionsView";
import { OP_CODES } from "@/utils/OPS";
import { SCRIPTS_LIST } from "@/utils/SCRIPTS";

const OpCode = (props: TransactionItem) => {
  const txData = useAtomValue(txDataAtom);

  const renderScriptTags = () => {
    // i need to loop through the txData hex and find all the op codes used
    const opCodes =
      txData?.hexResponse.parsedRawHex
        .filter((txItem) => {
          // ensure to make sure the title does not include "Upcoming Data Size"

          return (
            txItem.item.type === "opCode" &&
            txItem.item.title.includes("Upcoming Data Size") === false
          );
        })
        .map((opCode) => {
          return opCode.item.title;
        }) || [];

    // show the known script
    const knownScript: string[] =
      txData?.hexResponse.knownScripts
        .filter((script) => {
          return script !== "NONE";
        })
        .map((script) => {
          return script as string;
        }) || [];

    const itemsFirst = opCodes.map((script) => {
      const active = script === props.item.title;
      return (
        <ScriptTag text={script} active={active} link={`/OPS/${script}`} />
      );
    });

    const itemsSecond = knownScript.map((script) => {
      const active = script === props.item.title;
      return (
        <ScriptTag text={script} active={active} link={`/scripts/${script}`} />
      );
    });

    return [...itemsFirst, ...itemsSecond];
  };

  const renderOpCodeText = () => {
    // get the op code from the op list
    const op = OP_CODES.find((op) => op.name === props.item.title);
    const otherOpCheck = OP_CODES.find((op) => {
      const opName = props.item.title.split("OP_");
      //console.log("opName", opName);
      const _opName = `OP_PUSH${opName[1]}`;
      //console.log("_opName", _opName);

      return op.name === _opName;
    });
    if (op) {
      return `This is an op_code, ${props.item.title}. ${op.longDescription}. Click on the highlighted button to learn more."`;
    } else if (otherOpCheck) {
      return `This is an op_code, ${props.item.title}. ${otherOpCheck.longDescription}. Click on the highlighted button to learn more."`;
    } else {
      return "could not find op";
    }
  };

  const renderKnownScript = () => {
    // get the first known script that is not NONE
    const knownScript = txData?.hexResponse.knownScripts.find((script) => {
      return script !== "NONE";
    });

    if (knownScript) {
      // find the known script in our list of scripts

      const scriptTing = SCRIPTS_LIST.find((script) => {
        return script.shortHand === knownScript;
      });

      // if we found the script we return the info text
      if (scriptTing) {
        return (
          <>
            <p className="mx-5 mt-3 text-[#0C071D]">
              <span className="font-bold">{scriptTing.shortHand}</span>{" "}
              {scriptTing.longHand}
            </p>

            <p className="mx-5 mt-3 text-[#0C071D]">
              At one point the most universal script for simple, direct
              transfers. Still the default for pre-SegWit
            </p>
          </>
        );
      } else {
        return "Could not find the known script in our list of scripts.";
      }
    } else {
      return "Could not find the known script in our list of scripts.";
    }
  };

  const renderCodeBlocks = () => {
    // check if known script is in the list of scripts
    const knownScript = txData?.hexResponse.knownScripts.find((script) => {
      return script !== "NONE";
    });

    if (knownScript) {
      // find the known script in our list of scripts

      const scriptTing = SCRIPTS_LIST.find((script) => {
        return script.shortHand === knownScript;
      });

      // if we found the script we return the info text
      if (scriptTing) {
        // were in ops so the active items is going to be an op
        // need to format to the version that we have in the code block
        //1) remove the OP_ from the title
        //2) make it all lowercase

        const trim = props.item.title.replace("OP_", "").toLowerCase();

        const activeItem = `<${trim}>`;
        return (
          <CodeBlockDisplay
            activeItem={activeItem}
            codeBlocks={scriptTing.codeBlocks}
          />
        );
      } else {
        return ":( no script found";
      }
    }
  };

  const screenSize = useAtomValue(screenSizeAtom);
  const isMobile = screenSize.width < 640;

  // if the title includes "Upcoming Data Size" then we know its a push data op code

  if (props.item.title.includes("Upcoming Data Size")) {
    return (
      <>
        <p className="break-wrap mt-3 text-lg text-[#0C071D] md:mx-5">
          When pushing data to the stack we first need to push an op that
          announces the size of the upcoming data; much like VarInt, there are
          varying rules based on using the 1st-byte as a flag:
        </p>
        <SizeOpCodeTable />
        <p className="mt-3 text-lg text-[#0C071D] md:mx-5">
          This length is recorded in hex & must be converted to decimal to
          correctly count upcoming chars.
        </p>
      </>
    );
  }
  return (
    <>
      <p className="mx-5 mt-3  text-[#0C071D]">{renderOpCodeText()}</p>
      <div className="mt-4 flex flex-col items-center justify-between md:flex-row md:items-start ">
        <div className="flex flex-col justify-start ">
          {renderKnownScript()}
          {!isMobile && (
            <div className="mx-4 my-4 mt-6 flex flex-row flex-wrap gap-4">
              {renderScriptTags()}
            </div>
          )}
        </div>
        {renderCodeBlocks()}
      </div>
    </>
  );
};

export default OpCode;

export const SIZE_DETAILS = [
  {
    word: "OP_1 - 75",
    hex: "0x01 - 0x4b",
    examples: "0x0a",
    description: "Decimal value < 76",
  },
  {
    word: "OP_pushdata1",
    hex: "0x4c",
    examples: "0x4c99",
    description: "4c + 1 byte",
  },
  {
    word: "OP_pushdata2",
    hex: "0x4d",
    examples: "0x4d9999",
    description: "4d + 4 bytes (in little-endian).",
  },
  {
    word: "OP_pushdata3",
    hex: "0x4e",
    examples: "0x4e99999999",
    description: "4e + 8 bytes (in little-endian).",
  },
];

const SizeOpCodeTable = () => {
  const screenSize = useAtomValue(screenSizeAtom);

  const isMobile = screenSize.width < 640;

  return (
    <div className="mt-6 overflow-hidden rounded-lg ring-1  ring-black  md:mx-4">
      <table className="min-w-full divide-y divide-[#F79327]">
        <thead className="">
          <tr>
            <th
              scope="col"
              className="text-md py-3.5 pl-4 pr-3 text-left  font-bold text-gray-900 sm:pl-6 md:text-2xl"
            >
              Word
            </th>
            {!isMobile && (
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-2xl font-bold text-gray-900 sm:pl-6"
              >
                Hex
              </th>
            )}

            {!isMobile && (
              <th
                scope="col"
                className="hidden py-3.5 pl-4 pr-3 text-left text-2xl font-bold text-gray-900 sm:pl-6"
              >
                Example
              </th>
            )}
            <th
              scope="col"
              className="text-md py-3.5 pl-4 pr-3 text-left  font-bold text-gray-900 sm:pl-6 md:text-2xl"
            >
              Description
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className=" bg-white">
          {SIZE_DETAILS.map((deet, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-lg  text-black sm:pl-6">
                {deet.word}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-left text-lg text-black">
                {deet.hex}
              </td>
              {!isMobile && (
                <>
                  <td className="whitespace-nowrap px-3 py-4 text-left text-lg text-black">
                    {deet.examples}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-left text-lg text-black">
                    {deet.description}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
