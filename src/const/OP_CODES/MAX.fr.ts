import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_MAX as English } from "./MAX";

export const OP_MAXFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription:
    "Empile le plus grand des deux éléments du haut de la pile.",
  longDescription:
    "OP_MAX sert, dans le langage de script Bitcoin, à comparer deux valeurs numériques de la pile. Une fois exécuté, il dépile les deux éléments du haut (attendus comme valeurs numériques), évalue lequel est le plus grand, puis empile cette valeur. Cet opcode est essentiel dans les scripts qui prennent des décisions à partir de comparaisons numériques, par exemple certains types de transactions conditionnelles ou des scripts multi-conditions complexes.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Empile le plus grand des deux éléments du haut de la pile.",
    steps: [
      "Dépile l'élément du haut",
      "Dépile l'élément suivant",
      "Empile le maximum des deux éléments",
    ],
  },
};
