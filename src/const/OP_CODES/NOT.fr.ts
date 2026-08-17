import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_NOT as English } from "./NOT";

export const OP_NOTFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription: "NON logique de l'élément du haut de la pile.",
  longDescription:
    "OP_NOT inverse la valeur booléenne de l'élément du haut de la pile. Si l'élément est non nul, OP_NOT le remplace par 0 (faux) ; s'il vaut 0, il le remplace par 1 (vrai). Cet opcode est souvent utilisé dans les scripts qui nécessitent une négation logique, par exemple pour inverser des conditions ou basculer des indicateurs booléens.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "NON logique de l'élément du haut de la pile.",
    steps: [
      "Dépile l'élément du haut",
      "Calcule le NON logique de l'élément",
      "Empile l'élément",
    ],
  },
};
