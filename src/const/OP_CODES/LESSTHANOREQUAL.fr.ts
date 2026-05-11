import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_LESSTHANOREQUAL as English } from "./LESSTHANOREQUAL";

export const OP_LESSTHANOREQUALFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription:
    "Renvoie 1 si l'élément 1 est inférieur ou égal à l'élément 2, sinon 0.",
  longDescription:
    "OP_LESSTHANOREQUAL compare les deux éléments du haut de la pile et vérifie si l'avant-dernier est inférieur ou égal à l'élément du haut. Il empile 1 (vrai) si cette condition est remplie, et 0 (faux) sinon. Cet opcode sert dans les scripts requérant une comparaison « inférieur ou égal ».",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Renvoie 1 si l'élément 1 est inférieur ou égal à l'élément 2, sinon 0.",
    steps: [
      "Dépile l'élément a",
      "Dépile l'élément b",
      "Vérifie si b est inférieur ou égal à a",
      "Empile le résultat",
    ],
  },
};
