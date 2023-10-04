import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";
import { INPUT_SCRIPTSIG } from "@/const/deserializeTx";
import { classNames, screenSizeAtom } from "@/utils";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { CODE_BLOCKS, CodeBlockDisplay, ScriptTag } from "./ScriptSig";
import { InputScriptSigItem, TransactionItem } from "@/deserialization/model";
import { txDataAtom } from "../TransactionsView";
import { OP_CODES } from "@/utils/OPS";
import { SCRIPTS_LIST } from "@/utils/SCRIPTS";

const OpCode = (props: TransactionItem) => {
  console.log("props ops", props);

  const txData = useAtomValue(txDataAtom);

  console.log("txData", txData);
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
  const screenSize = useAtomValue(screenSizeAtom);

  const isMobile = screenSize.width < 640;

  const renderOpCodeText = () => {
    // get the op code from the op list
    const op = OP_CODES.find((op) => op.name === props.item.title);
    if (op) {
      return `This is an op_code, ${props.item.title}. ${op.longDescription}. Click on the highlighted button to learn more."`;
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
  return (
    <>
      <p className="mx-5 mt-3 text-[#0C071D]">{renderOpCodeText()}</p>
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
