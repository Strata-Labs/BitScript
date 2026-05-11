import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_PICK as English } from "./OP_PICK";

export const OP_PICKFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pile",
  type: "Dépile & Empile",
  shortDescription:
    "Duplique le n-ième élément depuis le haut de la pile et empile la copie au sommet.",
  longDescription:
    "OP_PICK est un opcode sélectif de manipulation de pile qui duplique le n-ième élément depuis le haut de la pile et empile la copie au sommet. L'indice n est pris au sommet de la pile, à partir de 1, où 1 correspond à l'élément du haut. Après la duplication, les éléments d'origine restent inchangés sur la pile.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Duplique le n-ième élément depuis le haut de la pile et empile la copie au sommet.",
    steps: [
      "Dépile tous les éléments de la pile",
      "Trouve la valeur du (n + 1)-ième élément, où n = 2",
      "Copie le n-ième élément de la pile",
      "Récupère le n-ième élément",
      "Réempile les éléments avec le n-ième en premier",
    ],
  },
};
