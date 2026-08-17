import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_LESSTHAN as English } from "./LESSTHAN";

export const OP_LESSTHANFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription:
    "Renvoie 0x01 si l'élément 1 est strictement inférieur à l'élément 2, sinon 0x00.",
  longDescription:
    "OP_LESSTHAN compare les deux éléments du haut de la pile et vérifie si l'avant-dernier est strictement inférieur à l'élément du haut. Si oui, il empile 1 (vrai) ; sinon il empile 0 (faux). Cet opcode sert dans les scripts qui requièrent une comparaison « strictement inférieur » entre valeurs numériques.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Renvoie 0x01 si l'élément 1 est strictement inférieur à l'élément 2, sinon 0x00.",
    steps: [
      "Dépile l'élément a",
      "Dépile l'élément b",
      "Vérifie si b est strictement inférieur à a",
      "Empile le résultat",
    ],
  },
};
