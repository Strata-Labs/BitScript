import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_SHA256 as English } from "./SHA256";

export const OP_SHA256Fr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Cryptographie",
  type: "Dépile & Empile",
  shortDescription:
    "L'entrée est hachée avec l'algorithme de hachage SHA256.",
  longDescription:
    "Publié en 2001, SHA256 — abréviation de Secure Hash Algorithm — est l'une des six variantes des algorithmes SHA-2 qui produit un hash de 32 octets (64 caractères hexadécimaux). OP_SHA256 est rarement utilisé seul ; il est plutôt couramment invoqué via les opérations plus communes OP_HASH160 et OP_HASH256 (présentes dans des scripts comme P2PKH et P2SH).",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Hache l'élément du haut avec l'algorithme SHA256.",
    steps: [
      "Dépile l'élément du haut",
      "Hache avec l'algorithme SHA256",
      "Empile l'élément haché",
    ],
  },
};
