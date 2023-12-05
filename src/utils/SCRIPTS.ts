import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import P2SH from "@/const/SCRIPTS/P2SH";
import P2TRKP from "@/const/SCRIPTS/P2TRKeyPath";
import P2TRSP from "@/const/SCRIPTS/P2TRScriptPath";
import P2WPKH from "@/const/SCRIPTS/P2WPKH";
import P2WSH from "@/const/SCRIPTS/P2WSH";
import P2PK from "@/const/SCRIPTS/p2pk";

import { P2PKH } from "@/const/SCRIPTS/p2pkh";

export const SCRIPTS_LIST: SCRIPTS_PAGE_PROPS[] = [
  P2PK,
  P2PKH,
  P2SH,
  P2TRKP,
  P2TRSP,
  P2WPKH,
  P2WSH,
];
