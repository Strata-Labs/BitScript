import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_MUL as English } from "./OP_MUL";

export const OP_MULFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Arithmétique",
  type: "Dépile & Empile",
  shortDescription:
    "Effectue une multiplication entre les deux éléments du haut de la pile.",
  longDescription:
    "OP_MUL effectue une multiplication entre les deux éléments du haut de la pile. Il dépile ces deux éléments, les interprète comme des entiers, effectue la multiplication et empile le résultat. Cette opération est couramment utilisée dans les scripts Bitcoin pour diverses opérations arithmétiques.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Effectue une multiplication entre les deux éléments du haut de la pile.",
    steps: [
      "Dépile les deux nombres de la pile",
      "Effectue une multiplication entre les deux nombres",
      "Empile le résultat",
    ],
  },
};
