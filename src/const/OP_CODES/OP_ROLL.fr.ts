import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_ROLL as English } from "./OP_ROLL";

export const OP_ROLLFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pile",
  type: "Dépile & Empile",
  shortDescription:
    "Déplace le n-ième élément de la pile vers la position du haut.",
  longDescription:
    "OP_ROLL est un opcode de manipulation de pile qui déplace le n-ième élément de la pile vers le sommet. L'indice « n » est pris au sommet de la pile, à partir de 1, où 1 correspond à l'élément du haut. Après l'opération, l'ordre d'origine est préservé, l'élément déplacé devenant le nouvel élément du haut.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Retire l'avant-dernier élément de la pile.",
    steps: [
      "Dépile le premier élément de la pile",
      "Trouve la valeur du (n + 1)-ième élément, où n = 2",
      "Dépile la pile jusqu'à atteindre le n-ième élément",
      "Récupère le n-ième élément",
      "Réempile les éléments avec le n-ième en premier",
    ],
  },
};
