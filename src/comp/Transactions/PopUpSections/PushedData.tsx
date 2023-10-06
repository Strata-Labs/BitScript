import { classNames, screenSizeAtom } from "@/utils";
import { useAtomValue } from "jotai";
import { CodeBlockDisplay, ScriptTag } from "./ScriptSig";
import { TransactionItem } from "@/deserialization/model";
import { knownScriptsAtom, txDataAtom } from "../TransactionsView";
import { OP_CODES } from "@/utils/OPS";
import { SCRIPTS_LIST } from "@/utils/SCRIPTS";

const PushedData = (props: TransactionItem) => {
  const txData = useAtomValue(txDataAtom);

  const knownScriptRange = useAtomValue(knownScriptsAtom);

  const renderCodeBlocks = () => {
    // get the index of the current item
    const indexItem = props.dataItemIndex;
    if (indexItem) {
      // check if the index falls within any of the known scripts range
      const knownScript = knownScriptRange.find((item) => {
        return indexItem >= item.range[0] && indexItem <= item.range[1];
      });
      if (knownScript) {
        // found the know scirpt this item is in
        // now look for it in the data items

        const scriptTing = SCRIPTS_LIST.find((ting) => {
          return ting.shortHand === knownScript.script;
        });

        if (scriptTing) {
          // get the active item this represents
          let item = "";
          if (
            props.item.title === "Signature (schnorr)" ||
            props.item.title === "Signature (ecdsa)"
          ) {
            item = "[signature]";
          } else if (props.item.title === "Public Key") {
            item = "[public-key]";
          }

          console.log("item", item);
          return (
            <CodeBlockDisplay
              activeItem={item}
              codeBlocks={scriptTing.codeBlocks}
            />
          );
        } else {
          return null;
        }
      }
    } else {
      return null;
    }
  };

  const renderKnownScript = () => {
    // get the first known script that is not NONE
    const indexItem = props.dataItemIndex;
    if (!indexItem) {
      return null;
    }
    const knownScript = knownScriptRange.find((item) => {
      return indexItem >= item.range[0] && indexItem <= item.range[1];
    });

    if (!knownScript) {
      return null;
    }

    const scriptTing = SCRIPTS_LIST.find((ting) => {
      return ting.shortHand === knownScript.script;
    });

    if (scriptTing) {
      return (
        <>
          <p className="mx-5 mt-3 text-[#0C071D]">
            <span className="font-bold">{scriptTing.shortHand}</span>{" "}
            {scriptTing.longHand}
          </p>

          <p className="mx-5 mt-3 text-[#0C071D]">
            {scriptTing.longDescription}
          </p>
        </>
      );
    } else {
      return "Could not find the known script in our list of scripts.";
    }
  };

  const renderScriptTags = () => {
    const indexItem = props.dataItemIndex;
    if (indexItem) {
      const knownScript = knownScriptRange.find((item) => {
        return indexItem >= item.range[0] && indexItem <= item.range[1];
      });

      if (knownScript) {
        const scriptItems = txData?.hexResponse.parsedRawHex.slice(
          knownScript.range[0] + 1,
          knownScript.range[1] + 1
        );

        const copOut = scriptItems?.filter((item, i) => {
          if (
            item.item.type === "opCode" &&
            item.item.title.includes("Upcoming Data Size") === false
          ) {
            return true;
          } else if (item.item.type === "pushedData") {
            return true;
          }
        });

        if (copOut) {
          console.log("copOut", copOut);

          return copOut.map((d, i) => {
            if (d.item.type === "opCode") {
              return (
                <ScriptTag
                  key={i}
                  text={d.item.title}
                  active={false}
                  link={`/OPS/${d.item.title}`}
                />
              );
            } else if (d.item.type === "pushedData") {
              console.log(" yes");
              return (
                <ScriptTag
                  key={i}
                  text={d.item.title}
                  active={d.item.title === props.item.title}
                />
              );
            } else {
              return null;
            }
          });
        }
      }
    }

    // get all the items in the known script
  };

  return (
    <>
      <p className="mx-5 mt-3 text-lg text-[#0C071D]">
        When pushing data to the stack we first need to push an op that
        announces the size of the upcoming data; much like VarInt, there are
        varying rules based on using the 1st-byte as a flag:
      </p>
      <div className="mt-4 flex flex-col items-center justify-between md:flex-row md:items-start ">
        <div className="flex flex-col justify-start ">
          {renderKnownScript()}

          <div className="mx-4 my-4 mt-6 flex flex-row flex-wrap gap-4">
            {renderScriptTags()}
          </div>
        </div>
        {renderCodeBlocks()}
      </div>
    </>
  );
};

export default PushedData;
