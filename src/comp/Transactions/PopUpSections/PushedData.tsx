import { classNames, screenSizeAtom } from "@/utils";
import { useAtomValue } from "jotai";
import { CodeBlockDisplay, ScriptTag } from "./ScriptSig";
import { TransactionItem } from "@/deserialization/model";
import { txDataAtom } from "../TransactionsView";
import { OP_CODES } from "@/utils/OPS";
import { SCRIPTS_LIST } from "@/utils/SCRIPTS";

const PushedData = (props: TransactionItem) => {
  const txData = useAtomValue(txDataAtom);

  const renderScriptTags = () => {};

  return (
    <>
      <p className="mx-5 mt-3 text-lg text-[#0C071D]">
        When pushing data to the stack we first need to push an op that
        announces the size of the upcoming data; much like VarInt, there are
        varying rules based on using the 1st-byte as a flag:
      </p>
    </>
  );
};

export default PushedData;
