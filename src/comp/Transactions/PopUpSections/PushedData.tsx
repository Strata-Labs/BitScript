import { classNames, screenSizeAtom } from "@/utils";
import { useAtomValue } from "jotai";
import { CodeBlockDisplay, ScriptTag } from "./ScriptSig";
import { TransactionItem } from "@/deserialization/model";
import { knownScriptsAtom, txDataAtom } from "../TransactionsView";
import { OP_CODES } from "@/utils/OPS";
import { SCRIPTS_LIST } from "@/utils/SCRIPTS";
import dynamic from "next/dynamic";
import { ScriptData } from "@/corelibrary/scriptdata";
import { hexToBytes } from "../Helper";
import Image from "next/image";

import inscriptionBackground from "@/../public/images/inscriptionBackground.png";

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

      // get the last item in the array since it'll be the closest to our current index (which is our data)
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
          const scriptdataItem = ScriptData.fromHex(props.item.value);
          console.log("scriptdataItem", scriptdataItem);

          const svg = scriptdataItem.dataString;
          console.log("svg", svg);
          // dangerouslySetInnerHTML={{ __html: svg }}

          const urlPath = "https://ordinals.com/";

          // find every instance of a url path and append urlPath to the beginning of it
          const newSvg = props.item.value.replace(
            /href="\//g,
            `href="${urlPath}`
          );

          // remove the last character from the string
          const _newSvg = newSvg.slice(0, -1);
          console.log("_newSvg", _newSvg);
          const blob = new Blob([_newSvg], { type: "text/html" });
          const url = URL.createObjectURL(blob);

          return (
            <div
              style={{
                backgroundImage: `url("${inscriptionBackground}")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "100%",
              }}
            >
              <iframe
                src={url}
                sandbox="allow-scripts"
                style={{ width: "300px", height: "300px", border: "none" }}
              ></iframe>
            </div>
          );
        } else if (mimeType === "image/png") {
          // Convert hex to bytes
          const byteData = hexToBytes(props.rawHex);

          // Create a blob from the byte data
          const blob = new Blob([byteData], { type: "image/png" });

          // Create a URL for the blob
          const imageUrl = URL.createObjectURL(blob);

          return (
            <div
              style={{
                backgroundImage: `url(${inscriptionBackground})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "100%",
              }}
            >
              <div className="w-1/2">
                <Image
                  src={imageUrl}
                  alt={props.item.title}
                  width={300}
                  height={300}
                />
              </div>
            </div>
          );
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

/*
"<svg id="ThePepes" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
 <svg>
  <image xlink:href="/content/b7cdcb669bb4cd86828359bfe076c293040220a514f07f18ac855b634ce162bbi0" width="100%" height="100%"></image>
 </svg>
 <svg>
  <image xlink:href="/content/221f3953d4ad0a6f19f02cb399dc658fc91ae635746b4e32039c5d357db5e3a0i0" width="100%" height="100%"></image>
 </svg>
 <svg>
  <image xlink:href="/content/9ee104f7e03c73ecf60b95ae4d35cbd14da9a269f6792ca65678daca4f8e6e9Mö7i0" width="100%" height="100%"></image>
 </svg>
 <svg>
  <image xlink:href="/content/c2690143a60efe68e9a42c125778b5e4dc0c25d3c04b7c2f8c3d3742d151474bi0" width="100%" height="100%"></image>
 </svg>
 <svg>
  <image xlink:href="/content/b916c9c38e38e7dbee1fbb517e0f1a525e661d1557fa066e3813ff9c503f00f4i0" width="100%" height="100%"></image>
 </svg>
 <svg>
  <image xlink:href="/content/58f3e9c7ca2a2164a3d492a85ead8810f62520bd5de8b05d96efb2671d103760i0" width="100%" height="100%"></image>
 </svg>
</svg>h"
*/
