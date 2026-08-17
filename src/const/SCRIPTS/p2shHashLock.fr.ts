import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import English from "./p2shHashLock";

export const P2SHHLFr: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "Paiement vers hash de script (HashLock)",
  shortDescription:
    "Une sortie P2SH avec une condition de verrouillage par hash pour la dépense",
  longDescription:
    "Un script Pay-to-Script-Hash (HashLock) est une sortie P2SH qui inclut une condition basée sur un hash dans son redeemScript. Les fonds ne peuvent être dépensés qu'en fournissant une valeur secrète dont le hash correspond à un hash prédéfini. Cette construction est couramment utilisée dans les échanges atomiques et d'autres protocoles cryptographiques.",
  opCodeReview:
    "P2SH-HashLock combine la structure P2SH avec une étape de vérification de hash. Le redeemScript hache le secret fourni, le compare à un hash prédéfini, puis vérifie une signature.",
  inUse: "Oui",
  descriptionText: [
    "Empile <signature> sur la pile",
    "Empile <secret> sur la pile",
    "Empile <redeemScript> sur la pile",
    "Exécute OP_HASH160 sur redeemScript",
    "Exécute OP_EQUAL",
    "Exécute OP_HASH160 sur le secret",
    "Exécute OP_EQUAL",
    "Empile <publicKey> sur la pile",
    "Exécute OP_CHECKSIG",
  ],
};
