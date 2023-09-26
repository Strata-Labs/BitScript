import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";
import { INPUT_SCRIPTSIG } from "@/const/deserializeTx";
import { classNames, screenSizeAtom } from "@/utils";
import { useAtomValue } from "jotai";
import Link from "next/link";

const CodeBlocks: CodeBlockType[] = [
  {
    code: " # UnlockScript/ScriptSig",
    displayType: CodeDisplayBlock.comment,
  },
  {
    code: " [signature]",
    displayType: CodeDisplayBlock.code,
    step: 0,
  },
  {
    code: "[public-key]",
    displayType: CodeDisplayBlock.code,
    step: 1,
  },
  {
    code: " # LockScript/ScriptPubKey",
    displayType: CodeDisplayBlock.comment,
  },
  {
    code: "<dup>",
    displayType: CodeDisplayBlock.code,
    step: 2,
  },
  {
    code: "<hash160>",
    displayType: CodeDisplayBlock.code,
    step: 3,
  },
  {
    code: "[hash160[public-key]]",
    displayType: CodeDisplayBlock.code,
    step: 4,
  },
  {
    code: "<equalverify>",
    displayType: CodeDisplayBlock.code,
    step: 5,
  },
  {
    code: "<checksig>",
    displayType: CodeDisplayBlock.code,
    step: 6,
  },
];
const ScriptSigPopUp = () => {
  const renderScriptTags = () => {
    return (
      <>
        <ScriptTag text="P2WPKH" link="" />
        <ScriptTag text="OP_HASH160" link="/OPS/OP_HASH_160" />
        <ScriptTag text="OP_EQUALVERIFY" link="/OPS/OP_EQUALVERIFY" />
        <ScriptTag text="OP_DUP" link="/OPS/OP_DUP" />
        <ScriptTag text="OP_CHECKSIG" link="/OPS/OP_CHECKSIG" />
      </>
    );
  };
  const screenSize = useAtomValue(screenSizeAtom);

  const isMobile = screenSize.width < 640;

  return (
    <>
      <p className="mx-5 mt-3 text-[#0C071D]">{INPUT_SCRIPTSIG.Content}</p>
      <p className="mx-5 mt-3 text-[#0C071D]">{INPUT_SCRIPTSIG.Content3}</p>
      <div className="mt-4 flex flex-col items-center justify-between md:flex-row md:items-start ">
        <div className="flex flex-col justify-start ">
          <p className="mx-5 mt-3 text-[#0C071D]">
            <span className="font-bold">P2WPKH</span>{" "}
            (pay-to-witness-public-key-hash)
          </p>

          <p className="mx-5 mt-3 text-[#0C071D]">
            At one point the most universal script for simple, direct transfers.
            Still the default for pre-SegWit
          </p>
          {!isMobile && (
            <div className="mx-4 my-4 mt-6 flex flex-row flex-wrap gap-4">
              {renderScriptTags()}
            </div>
          )}
        </div>
        <CodeBlockDisplay codeBlocks={CodeBlocks} />
      </div>
    </>
  );
};

export default ScriptSigPopUp;

export type ScriptSigCodeBlockDisplayProps = {
  codeBlocks: CodeBlockType[];
};

export const ScriptTag = ({ text, link }: { text: string; link?: string }) => {
  if (link) {
    return (
      <Link href={link} target="_blank">
        <span className="inline-flex items-center gap-x-1.5 rounded-full px-6 py-3 text-xl font-bold  text-gray-900 ring-1 ring-inset ring-black">
          {text}
        </span>
      </Link>
    );
  } else {
    <span className="inline-flex items-center gap-x-1.5 rounded-full px-6 py-3 text-xl font-bold  text-gray-900 ring-1 ring-inset ring-black">
      {text}
    </span>;
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

const CodeBlockDisplay = ({ codeBlocks }: ScriptSigCodeBlockDisplayProps) => {
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
              code.step && code.step > 1
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
