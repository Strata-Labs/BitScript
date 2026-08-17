import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import English from "./p2pk";

// French translation of P2PK.
//
// Pattern: spread the English script, then override the fields you've
// translated. Anything you don't override stays English — so you can ship
// a script translation in stages without breaking it.
//
// Keep `shortHand`, `linkPath`, `image`, `exampleLink`, `STACK_DATA`, and
// `codeBlocks` code values identical to the English version so URLs,
// assets, and the animation logic stay stable across locales.

export const P2PKFr: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "(paiement vers clé publique)",
  shortDescription:
    "Le script le plus simple pour un transfert direct. Trois op_codes au total sont nécessaires.",
  longDescription:
    "Un script Pay-to-Public-Key (P2PK) est le type de script de transaction Bitcoin le plus simple, permettant d'envoyer des bitcoins à une adresse Bitcoin spécifique. Le script verrouille les bitcoins directement sur une clé publique, exigeant une signature de la clé privée correspondante pour pouvoir les dépenser.",
  opCodeReview:
    "P2PK nécessite trois (3) éléments de données et quatre (4) op_codes.",
  inUse: "Oui",
  descriptionText: [
    "Empile <signature> sur la pile",
    "Empile <pubkey> sur la pile",
    "Dépile deux éléments (clé pub. & sign.) et vérifie la signature ECDSA",
  ],
};
