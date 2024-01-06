import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";
import { INPUT_SCRIPTSIG } from "@/const/deserializeTx";
import { classNames, screenSizeAtom } from "@/utils";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { txDataAtom } from "../TransactionsView";
import {
  TransactionItem,
  TransactionItemSigScirpt,
} from "@/deserialization/model";
import { TxTextSectionType } from "../Helper";
import { SCRIPTS_LIST } from "@/utils/SCRIPTS";

const ScriptSigPopUp = (props: TransactionItemSigScirpt) => {
  const txData = useAtomValue(txDataAtom);
  const screenSize = useAtomValue(screenSizeAtom);

  const isMobile = screenSize.width < 640;

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

    // ensure there are no duplicates in opCodes
    const opCodesSet = new Set(opCodes);
    const opCodesArray = [...opCodesSet];

    const itemsFirst = opCodesArray.map((script) => {
      const active = script === props.item.title;
      return (
        <ScriptTag text={script} active={active} link={`/OPS/${script}`} />
      );
    });

    // ensure there is no duplicates in itemsFirst
    const knownScriptSet = new Set(knownScript);

    const itemsFirstArray = [...knownScriptSet];

    const itemsSecond = itemsFirstArray.map((script) => {
      const active = script === props.item.title;
      return (
        <ScriptTag text={script} active={active} link={`/scripts/${script}`} />
      );
    });

    return [...itemsFirst, ...itemsSecond];
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

          {!isMobile && (
            <div className="mx-4 my-4 mt-6 flex flex-row flex-wrap gap-4">
              {renderScriptTags()}
            </div>
          )}
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
