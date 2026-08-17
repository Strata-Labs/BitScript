import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_OR as English } from "./OP_OR";

export const OP_ORFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Arithmétique",
  type: "Dépile & Empile",
  shortDescription:
    "Effectue un OU bit à bit entre les deux éléments du haut de la pile.",
  longDescription:
    "OP_OR effectue un OU bit à bit entre les deux éléments du haut de la pile. Il dépile ces deux éléments, les interprète comme des entiers, effectue un OU bit à bit sur leur représentation binaire, et empile le résultat. Cette opération est couramment utilisée dans les scripts Bitcoin pour diverses opérations cryptographiques et arithmétiques impliquant la manipulation bit à bit.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Effectue un OU bit à bit entre les deux éléments du haut de la pile.",
    steps: [
      "Dépile les deux nombres de la pile",
      "Effectue un OU bit à bit sur les deux nombres",
      "Empile le résultat",
    ],
  },
};
