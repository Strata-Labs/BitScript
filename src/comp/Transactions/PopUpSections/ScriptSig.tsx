import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";
import { INPUT_SCRIPTSIG } from "@/const/deserializeTx";
import { classNames, screenSizeAtom } from "@/utils";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { knownScriptsAtom, txDataAtom } from "../TransactionsView";
import {
  TransactionItem,
  TransactionItemSigScirpt,
} from "@/deserialization/model";
import { TxTextSectionType } from "../Helper";
import { SCRIPTS_LIST } from "@/utils/SCRIPTS";

const ScriptSigPopUp = (props: TransactionItemSigScirpt) => {
  const { dataItemIndex } = props;
  console.log("ScriptSigPopUp props", props);

  const txData = useAtomValue(txDataAtom);
  const screenSize = useAtomValue(screenSizeAtom);

  const isMobile = screenSize.width < 640;

  const knownScriptRange = useAtomValue(knownScriptsAtom);

  const renderScriptTags = () => {
    console.log("knownScriptRange", knownScriptRange);
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
  };

  const fetchKnownScript = () => {
    const knownScript = props.item.knownScript;
    if (knownScript) {
      // check the script list we have
      const foundScript = SCRIPTS_LIST.find((script) => {
        return script.shortHand === knownScript;
      });
      if (foundScript) {
        return foundScript;
      } else {
        return null;
      }
    } else return null;
  };
  const renderScriptText = () => {
    // check if the script is a known script
    if (props.item.knownScript) {
      const foundScript = fetchKnownScript();
      if (foundScript) {
        return foundScript.longDescription;
      } else {
        // if not return some placeholder text
        return "This is a known script but we don't have any information about it yet.";
      }
    } else {
      // if not return some placeholder text
      return "Place holder";
    }
  };

  // render the right code block if the script is known and we have the code
  const renderCodeBlock = () => {
    if (props.item.knownScript) {
      const foundScript = fetchKnownScript();
      if (foundScript) {
        const blocks = foundScript.codeBlocks;
        return <CodeBlockDisplay codeBlocks={blocks} />;
      } else {
        // if not return some placeholder text
        return "Could not find script";
      }
    }
  };

  const renderKnownScript = () => {
    // get the first known script that is not NONE
    if (props.item.knownScript) {
      const foundScript = fetchKnownScript();

      // if we found the script we return the info text
      if (foundScript) {
        return (
          <>
            <p className="mx-5 mt-3 text-[#0C071D]">
              <span className="font-bold">{foundScript.shortHand}</span>{" "}
              {foundScript.longHand}
            </p>

            <p className="mx-5 mt-3 text-[#0C071D]">
              {foundScript.shortDescription}
            </p>
          </>
        );
      }
    }
  };

  return (
    <>
      <p className="mx-5 mt-3 text-[#0C071D]">{renderScriptText()}</p>

      <div className="mt-4 flex flex-col items-center justify-between md:flex-row md:items-start ">
        <div className="flex flex-col justify-start ">
          {renderKnownScript()}

          <div className="mx-4 my-4 mt-6 flex flex-col flex-wrap items-center gap-4 md:flex-row md:items-start">
            {renderScriptTags()}
          </div>
        </div>
        {renderCodeBlock()}
      </div>
    </>
  );
};

export default ScriptSigPopUp;

export type ScriptSigCodeBlockDisplayProps = {
  codeBlocks: CodeBlockType[];
  activeItem?: string;
};

export const ScriptTag = ({
  text,
  link,
  active,
}: {
  text: string;
  link?: string;
  active?: boolean;
}) => {
  if (link) {
    return (
      <Link href={link} target="_blank">
        <span
          className={classNames(
            "inline-flex cursor-pointer items-center gap-x-1.5 rounded-full px-6 py-3 text-xl font-bold ring-1  ring-inset ring-black transition-all hover:shadow-md",
            active ? "bg-black  text-dark-orange " : " text-gray-900 "
          )}
        >
          {text}
        </span>
      </Link>
    );
  } else {
    return (
      <span className="inline-flex items-center gap-x-1.5 rounded-full px-6 py-3 text-xl font-bold  text-gray-900 ring-1 ring-inset ring-black">
        {text}
      </span>
    );
  }
};

export const ScriptTagMin = ({
  text,
  link,
}: {
  text: string;
  link?: string;
}) => {
  if (link) {
    return (
      <Link href={link} target="_blank">
        <span className="text-md inline-flex items-center gap-x-1.5 rounded-full bg-white px-6 py-2 font-semibold  text-gray-900  ">
          {text}
        </span>
      </Link>
    );
  } else {
    return (
      <span className="text-md inline-flex items-center gap-x-1.5 rounded-full bg-white px-6 py-2 font-semibold  text-gray-900  ">
        {text}
      </span>
    );
  }
};

export const CodeBlockDisplay = ({
  codeBlocks,
  activeItem,
}: ScriptSigCodeBlockDisplayProps) => {
  const renderCodeBlock = () => {
    return codeBlocks.map((code, index) => {
      if (code.displayType === CodeDisplayBlock.comment) {
        return (
          <p
            key={index}
            className="mt-2 text-[14px] text-[#787878] md:text-[20px]"
          >
            {code.code}
          </p>
        );
      } else {
        return (
          <p
            key={index}
            className={classNames(
              "text-[11px]  md:text-[20px]",
              activeItem && activeItem === code.code
                ? "font-bold text-[#FABC78] "
                : "text-white"
            )}
          >
            {code.code}
          </p>
        );
      }
    });
  };
  return (
    <div className="mx-4 mt-4 flex h-[200px]  w-[320px]  flex-col rounded-xl bg-[#26292C] text-left sm:mx-10 md:mx-0 md:my-0  md:ml-7 md:mt-0 md:h-[350px] md:w-[594px] ">
      <div className="flex h-[35px] w-full items-start rounded-t-lg bg-[#1C1E20] md:w-[594px]">
        {/* 3 buttons */}
        <button className="ml-3 mt-3 h-[9px] w-[9px] rounded-full bg-[#F45952]"></button>
        <button className="ml-3 mt-3 h-[9px] w-[9px] rounded-full bg-[#DFB94E]"></button>
        <button className="ml-3 mt-3 h-[9px] w-[9px] rounded-full bg-[#5AB748]"></button>
      </div>
      {/* Information */}
      <div className="ml-3 mt-1 flex flex-col">
        {renderCodeBlock()}

        {/* <p className="text-[11px] md:text-[16px]">&lt;checksig&gt;</p> */}
      </div>
    </div>
  );
};
