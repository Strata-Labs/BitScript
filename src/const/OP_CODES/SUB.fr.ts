import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_SUB as English } from "./SUB";

export const OP_SUBFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription:
    "Soustrait le deuxième élément à l'élément du haut de la pile.",
  longDescription:
    "OP_SUB effectue une soustraction entre les deux éléments du haut de la pile. Il dépile ces deux éléments, soustrait l'élément du haut au deuxième, puis empile le résultat. Cet opcode est essentiel dans les scripts impliquant des calculs arithmétiques, en particulier lorsqu'il faut calculer des différences entre valeurs.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Soustrait le deuxième élément à l'élément du haut de la pile.",
    steps: [
      "Dépile l'élément a",
      "Dépile l'élément b",
      "Soustrait a à b",
      "Empile le résultat",
    ],
  },
};
