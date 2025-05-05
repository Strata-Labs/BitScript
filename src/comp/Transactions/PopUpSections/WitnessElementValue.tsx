import { screenSizeAtom } from "@/utils";
import { useAtomValue } from "jotai";
import { CodeBlockDisplay, ScriptTag } from "./ScriptSig";
import { knownScriptsAtom, txDataAtom } from "../TransactionsView";

const WitnessElementValue = () => {
  const txData = useAtomValue(txDataAtom);

  const knownScriptRange = useAtomValue(knownScriptsAtom);

  const renderScriptTags = () => {
    return (
      <>
        <ScriptTag text="P2WPKH" link="" />
        <ScriptTag text="OP_HASH160" link="/OPS/OP_HASH160" />
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
      <p className="mx-5 mt-3 text-[#0C071D]">
        This is an element, or item, in the witness script. This witness script,
        just like the ScriptSig/unlockScript, is used to verify ownership of the
        paired input UTXO. Commonly, but not always, the ScriptSig/UnlockScript
        is one of the handful of standard scripts.
      </p>
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
        {/* <CodeBlockDisplay codeBlocks={CODE_BLOCKS} /> */}
      </div>
    </>
  );
};

export default WitnessElementValue;
