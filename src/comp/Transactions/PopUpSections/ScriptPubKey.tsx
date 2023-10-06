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

export const temp = "";
