import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_ROT as English } from "./OP_ROT";

export const OP_ROTFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pile",
  type: "Dépile & Empile",
  shortDescription:
    "Effectue une rotation sur les trois éléments du haut de la pile.",
  longDescription:
    "OP_ROT est un opcode de manipulation de pile qui effectue une rotation des trois éléments du haut. Il dépile ces trois éléments, puis empile le troisième, suivi du premier, puis du deuxième. L'opération a pour effet de placer l'avant-dernier élément au sommet de la pile, tout en décalant les deux autres. OP_ROT est couramment utilisé dans les scripts Bitcoin pour réorganiser des données sur la pile avant d'effectuer d'autres opérations.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Effectue une rotation sur les trois éléments du haut de la pile.",
    steps: [
      "Dépile les éléments de la pile",
      "Effectue une rotation des 3 éléments du haut",
      "Réempile les éléments sur la pile",
    ],
  },
};
