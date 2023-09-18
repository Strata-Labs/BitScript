import {
  CodeBlockType,
  CodeDisplayBlock,
} from "@/comp/scripts/ScriptVideoContainer";
import { INPUT_SCRIPTSIG } from "@/const/deserializeTx";
import { classNames } from "@/utils";
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
  return (
    <>
      <p className="mx-5 mt-3 text-[#0C071D]">{INPUT_SCRIPTSIG.Content}</p>
      <p className="mx-5 mt-3 text-[#0C071D]">{INPUT_SCRIPTSIG.Content3}</p>
      <div className="mt-4 flex flex-row items-start justify-between ">
        <div className="flex flex-col justify-start ">
          <p className="mx-5 mt-3 text-[#0C071D]">
            <span className="font-bold">P2WPKH</span>{" "}
            (pay-to-witness-public-key-hash)
          </p>
          <p className="mx-5 mt-3 text-[#0C071D]">
            At one point the most universal script for simple, direct transfers.
            Still the default for pre-SegWit
          </p>
          <div className="mx-4 my-4 mt-6 flex flex-row flex-wrap gap-4">
            {renderScriptTags()}
          </div>
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

const ScriptTag = ({ text, link }: { text: string; link: string }) => {
  return (
    <Link href={link}>
      <span className="inline-flex items-center gap-x-1.5 rounded-full px-6 py-3 text-xl font-bold  text-gray-900 ring-1 ring-inset ring-black">
        {text}
      </span>
    </Link>
  );
};
const CodeBlockDisplay = ({ codeBlocks }: ScriptSigCodeBlockDisplayProps) => {
  const renderCodeBlock = () => {
    return codeBlocks.map((code, index) => {
      if (code.displayType === CodeDisplayBlock.comment) {
        return (
          <p className="mt-2 text-[14px] text-[#787878] md:text-[20px]">
            {code.code}
          </p>
        );
      } else {
        return (
          <p
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
    <div className="mx-4 flex h-[200px] w-full flex-col rounded-xl bg-[#26292C] sm:mx-10 md:mx-0  md:ml-7 md:mt-0 md:h-[350px] md:w-[594px] ">
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
