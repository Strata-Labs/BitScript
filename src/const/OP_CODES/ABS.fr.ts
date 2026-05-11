import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_ABS as English } from "./ABS";

export const OP_ABSFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription: "Valeur absolue de l'élément du haut de la pile.",
  longDescription:
    "OP_ABS prend l'élément du haut de la pile et le remplace par sa valeur absolue. Cette opération est essentielle dans les scripts où seule la magnitude d'un nombre importe, indépendamment de son signe — par exemple pour comparer des distances, des différences ou tout autre calcul où le signe n'est pas pertinent.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Valeur absolue de l'élément du haut de la pile.",
    steps: [
      "Dépile l'élément du haut",
      "Calcule la valeur absolue de l'élément",
      "Empile l'élément",
    ],
  },
};
