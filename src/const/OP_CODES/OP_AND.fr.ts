import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_AND as English } from "./OP_AND";

export const OP_ANDFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Arithmétique",
  type: "Dépile & Empile",
  shortDescription:
    "Effectue un ET bit à bit entre les deux éléments du haut de la pile.",
  longDescription:
    "OP_AND effectue un ET bit à bit entre les deux éléments du haut de la pile. Il dépile ces deux éléments, les interprète comme des entiers, effectue un ET bit à bit sur leur représentation binaire, et empile le résultat. Cette opération est couramment utilisée dans les scripts Bitcoin pour diverses opérations cryptographiques et arithmétiques impliquant la manipulation bit à bit.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Effectue un ET bit à bit entre les deux éléments du haut de la pile.",
    steps: [
      "Dépile les deux nombres de la pile",
      "Effectue un ET bit à bit sur les deux nombres",
      "Empile le résultat",
    ],
  },
};
