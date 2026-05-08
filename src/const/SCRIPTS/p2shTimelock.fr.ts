import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import English from "./p2shTimelock";

export const P2SHTLFr: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "Paiement vers hash de script (Timelock)",
  shortDescription:
    "Une sortie P2SH avec une condition de verrouillage temporel pour la dépense",
  longDescription:
    "Un script Pay-to-Script-Hash (TimeLock) est une sortie P2SH qui inclut une condition temporelle dans son redeemScript. Il utilise l'opcode OP_CHECKLOCKTIMEVERIFY (CLTV), aussi appelé timelock absolu, pour imposer qu'une sortie de transaction non dépensée (UTXO) reste indépensable jusqu'à une hauteur de bloc ou un timestamp donné. Le redeemScript en P2SH(Timelock) inclut cette condition temporelle, les valeurs inférieures à 500 000 000 représentant des hauteurs de bloc et les valeurs supérieures représentant des timestamps Unix.",
  opCodeReview:
    "P2SH-TimeLock combine la structure P2SH avec OP_CHECKLOCKTIMEVERIFY pour créer une condition de dépense limitée dans le temps. Le redeemScript inclut le timelock, une clé publique et la vérification de signature.",
  inUse: "Oui",
  descriptionText: [
    "Empile <signature> sur la pile",
    "Empile <redeemScript> sur la pile",
    "Exécute OP_HASH160 sur redeemScript",
    "Exécute OP_EQUAL",
    "Si vrai, exécute redeemScript",
    "Exécute OP_CHECKLOCKTIMEVERIFY",
    "Empile <publicKey> sur la pile",
    "Exécute OP_CHECKSIG",
  ],
};
