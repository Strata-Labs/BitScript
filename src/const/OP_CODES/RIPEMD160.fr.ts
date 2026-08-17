import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_RIPEMD160 as English } from "./RIPEMD160";

export const OP_RIPEMD160Fr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Cryptographie",
  type: "Dépile & Empile",
  shortDescription:
    "L'entrée est hachée avec l'algorithme de hachage RIPEMD160.",
  longDescription:
    "Publié en 1996, RIPEMD160 — abréviation de RIPE Message Digest — est l'une des cinq variantes des algorithmes de hachage RIPEMD qui produit un hash de 20 octets (40 caractères hexadécimaux). Il est inclus comme op_code autonome, mais OP_RIPEMD160 est rarement, voire jamais, utilisé directement dans les scripts courants. RIPEMD160 lui-même est en revanche très utilisé via les opérations plus populaires OP_HASH160 et OP_HASH256.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Hache l'élément du haut avec l'algorithme RIPEMD160.",
    steps: [
      "Dépile l'élément du haut",
      "Hache avec l'algorithme RIPEMD160",
      "Empile l'élément haché",
    ],
  },
};
