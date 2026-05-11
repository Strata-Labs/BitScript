import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_DIV as English } from "./OP_DIV";

export const OP_DIVFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Arithmétique",
  type: "Dépile & Empile",
  shortDescription:
    "Effectue une division entre les deux éléments du haut de la pile.",
  longDescription:
    "OP_DIV effectue une division entre les deux éléments du haut de la pile. Il dépile ces deux éléments, les interprète comme des entiers, effectue la division et empile le résultat. Cette opération est couramment utilisée dans les scripts Bitcoin pour diverses opérations arithmétiques.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Effectue une division entre les deux éléments du haut de la pile.",
    steps: [
      "Dépile les deux nombres de la pile",
      "Effectue une division entre les deux nombres",
      "Empile le résultat",
    ],
  },
};
