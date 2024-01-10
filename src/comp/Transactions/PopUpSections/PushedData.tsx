import { classNames, screenSizeAtom } from "@/utils";
import { useAtomValue } from "jotai";
import { CodeBlockDisplay, ScriptTag } from "./ScriptSig";
import { TransactionItem } from "@/deserialization/model";
import { knownScriptsAtom, txDataAtom } from "../TransactionsView";
import { OP_CODES } from "@/utils/OPS";
import { SCRIPTS_LIST } from "@/utils/SCRIPTS";
import dynamic from "next/dynamic";
const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

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
          } else if (props.item.title === "Hashed Public Key") {
            item = "[hash160[public-key]]";
          }

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
          const test = copOut.map((d, i) => {
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
              return (
                <ScriptTag
                  key={i}
                  text={d.item.title}
                  active={d.item.title === props.item.title}
                />
              );
            } else {
              console.log("is tis where we are?");
              return null;
            }
          });

          return test;
        }
      }
    }

    // get all the items in the known script
  };

  const renderInscriptionData = () => {
    if (props.item.title === "Inscription Data") {
      // inscription data can be multi things for the time being it can either be html, svg image or json

      // okay so this is janky but we're going have to loop through the hex res and find any item that has a title that holds the string "mime type"
      // their potentially could be more than 1 so we're going have to find the one that is closes and before our current index
      const mimeItems = txData?.hexResponse.parsedRawHex.filter((item, i) => {
        const includeMimeTitle = item.item.title.includes("MIME Type:");

        if (includeMimeTitle) {
          if (props.dataItemIndex) {
            if (i < props.dataItemIndex) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }

          return true;
        } else {
          return false;
        }
      });

      const mimeItem = mimeItems?.[mimeItems.length - 1];
      console.log("mimeItem", mimeItem);

      // now we get the data type from the title
      const mimeType = mimeItem?.item.title.split(":")[1].trim();
      console.log("mimeType", mimeType);

      if (mimeType) {
        if (mimeType.includes("text/plain")) {
          // return the text as html

          //const jsonItems = JSON.parse(props.item.value);
          return (
            <p className="mx-5 mt-3 text-lg text-dark-orange">
              {props.item.value}
            </p>
          );
        } else if (mimeType === "image/svg+xml") {
          // return the svg image
          return null;
        }
      }
      return null;
    } else {
      return null;
    }
  };
  return (
    <>
      <p className="mx-5 mt-3 text-lg text-[#0C071D]">
        {props.item.description}
      </p>
      <div className="mt-4 flex flex-col items-center justify-between md:flex-row md:items-start ">
        <div className="flex flex-col justify-start ">
          {renderKnownScript()}

          <div className="mx-4 my-4 mt-6 flex flex-row flex-wrap gap-4">
            {renderScriptTags()}
          </div>
        </div>
        {renderCodeBlocks()}
        {renderInscriptionData()}
      </div>
    </>
  );
};

export default PushedData;
