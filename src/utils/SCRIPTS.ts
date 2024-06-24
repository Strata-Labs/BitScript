import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import P2SH from "@/const/SCRIPTS/P2SH";
import P2TRKP from "@/const/SCRIPTS/P2TRKeyPath";
import P2TRSP from "@/const/SCRIPTS/P2TRScriptPath";
import P2WPKH from "@/const/SCRIPTS/P2WPKH";
import P2WSH from "@/const/SCRIPTS/P2WSH";
import P2SHTIMELOCK from "@/const/SCRIPTS/p2shTimelock";
import P2PK from "@/const/SCRIPTS/p2pk";

import { P2PKH } from "@/const/SCRIPTS/p2pkh";
import P2SHHASHLOCK from "@/const/SCRIPTS/p2shHashLock";
import P2SHMULTISIG from "@/const/SCRIPTS/p2shMultiSig";
import P2SHTIMEHASHLOCK from "@/const/SCRIPTS/p2shTimeHashLock";

export const SCRIPTS_LIST: SCRIPTS_PAGE_PROPS[] = [
  P2PK,
  P2PKH,
  P2SH,
  P2TRKP,
  P2TRSP,
  P2WPKH,
  P2WSH,
  P2SHTIMELOCK, 
  P2SHHASHLOCK, 
  P2SHMULTISIG, 
  P2SHTIMEHASHLOCK

];
