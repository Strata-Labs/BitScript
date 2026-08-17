import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_2DIV as English } from "./2DIV";

export const OP_2DIVFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Arithmétique",
  type: "Dépile & Empile",
  shortDescription: "Divise par 2 l'élément du haut de la pile.",
  longDescription:
    "OP_2DIV divise par 2 l'élément du haut de la pile. Il dépile cet élément, l'interprète comme un entier, le divise par 2 et empile le résultat. Cette opération est couramment utilisée dans les scripts Bitcoin pour diverses opérations arithmétiques.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Divise par 2 l'élément du haut de la pile.",
    steps: [
      "Dépile le nombre de la pile",
      "Divise le nombre par 2",
      "Empile le résultat",
    ],
  },
};
