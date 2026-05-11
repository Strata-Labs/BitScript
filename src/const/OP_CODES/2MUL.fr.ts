import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_2MUL as English } from "./2MUL";

export const OP_2MULFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Arithmétique",
  type: "Dépile & Empile",
  shortDescription: "Multiplie par 2 l'élément du haut de la pile.",
  longDescription:
    "OP_2MUL multiplie par 2 l'élément du haut de la pile. Il dépile cet élément, l'interprète comme un entier, le multiplie par 2 et empile le résultat. Cette opération est couramment utilisée dans les scripts Bitcoin pour diverses opérations arithmétiques.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Multiplie par 2 l'élément du haut de la pile.",
    steps: [
      "Dépile le nombre de la pile",
      "Multiplie le nombre par 2",
      "Empile le résultat",
    ],
  },
};
