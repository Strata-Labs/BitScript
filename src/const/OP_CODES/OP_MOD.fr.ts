import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_MOD as English } from "./OP_MOD";

export const OP_MODFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Arithmétique",
  type: "Dépile & Empile",
  shortDescription:
    "Effectue un modulo entre les deux éléments du haut de la pile.",
  longDescription:
    "OP_MOD effectue une opération modulo entre les deux éléments du haut de la pile. Il dépile ces deux éléments, les interprète comme des entiers, effectue le modulo et empile le résultat. L'opération renvoie le reste de la division du premier élément par le second. OP_MOD est couramment utilisé dans les scripts Bitcoin pour diverses opérations arithmétiques.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Effectue un modulo entre les deux éléments du haut de la pile.",
    steps: [
      "Dépile les deux nombres de la pile",
      "Effectue le modulo entre les deux nombres",
      "Empile le résultat",
    ],
  },
};
