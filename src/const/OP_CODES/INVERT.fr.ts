import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_INVERT as English } from "./INVERT";

export const OP_INVERTFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Arithmétique",
  type: "Dépile & Empile",
  shortDescription:
    "Effectue une inversion bit à bit sur l'élément du haut de la pile.",
  longDescription:
    "OP_INVERT effectue une inversion bit à bit sur l'élément du haut de la pile. Il dépile l'élément, l'interprète comme un entier, effectue une inversion bit à bit sur sa représentation binaire, et empile le résultat. Cette opération est couramment utilisée dans les scripts Bitcoin pour diverses opérations cryptographiques et arithmétiques de manipulation bit à bit.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Effectue une inversion bit à bit sur l'élément du haut de la pile.",
    steps: [
      "Dépile le nombre à inverser",
      "Effectue l'inversion bit à bit",
      "Empile le résultat",
    ],
  },
};
