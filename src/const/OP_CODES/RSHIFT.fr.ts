import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_RSHIFT as English } from "./RSHIFT";

export const OP_RSHIFTFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Arithmétique",
  type: "Dépile & Empile",
  shortDescription:
    "Effectue un décalage à droite bit à bit sur les deux éléments du haut de la pile.",
  longDescription:
    "OP_RSHIFT effectue un décalage à droite bit à bit sur les deux éléments du haut de la pile. Il dépile ces deux éléments, les interprète comme des entiers, effectue le décalage à droite, puis empile le résultat. La représentation binaire du premier élément est décalée vers la droite du nombre de bits indiqué par le second élément. OP_RSHIFT est couramment utilisé dans les scripts Bitcoin pour la manipulation bit à bit.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Effectue un décalage à droite bit à bit sur les deux éléments du haut de la pile.",
    steps: [
      "Dépile les deux nombres de la pile",
      "Effectue un décalage à droite bit à bit sur les deux nombres",
      "Empile le résultat",
    ],
  },
};
