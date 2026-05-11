import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_LSHIFT as English } from "./LSHIFT";

export const OP_LSHIFTFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Arithmétique",
  type: "Dépile & Empile",
  shortDescription:
    "Effectue un décalage à gauche bit à bit sur les deux éléments du haut de la pile.",
  longDescription:
    "OP_LSHIFT effectue un décalage à gauche bit à bit sur les deux éléments du haut de la pile. Il dépile ces deux éléments, les interprète comme des entiers, effectue le décalage à gauche, puis empile le résultat. La représentation binaire du premier élément est décalée vers la gauche du nombre de bits indiqué par le second élément. OP_LSHIFT est couramment utilisé dans les scripts Bitcoin pour la manipulation bit à bit.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Effectue un décalage à gauche bit à bit sur les deux éléments du haut de la pile.",
    steps: [
      "Dépile les deux nombres de la pile",
      "Effectue un décalage à gauche bit à bit sur les deux nombres",
      "Empile le résultat",
    ],
  },
};
