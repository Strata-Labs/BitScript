import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_TUCK as English } from "./OP_TUCK";

export const OP_TUCKFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pile",
  type: "Dépile & Empile",
  shortDescription:
    "Duplique l'élément du haut de la pile et insère la copie avant l'avant-dernier élément.",
  longDescription:
    "OP_TUCK est un opcode de manipulation de pile qui duplique l'élément du haut et insère la copie avant l'avant-dernier élément. Il « glisse » essentiellement une copie de l'élément du haut sous le deuxième élément, tout en préservant les éléments d'origine du haut et de l'avant-dernier. OP_TUCK est souvent utilisé dans les scripts Bitcoin pour la manipulation de pile, permettant de dupliquer et réarranger certains éléments sans modifier l'ordre d'origine.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Duplique l'élément du haut de la pile et insère la copie avant l'avant-dernier élément.",
    steps: [
      "Retire les deux éléments du haut de la pile",
      "Duplique l'élément du haut de la pile",
      "Réempile les éléments réarrangés sur la pile",
    ],
  },
};
