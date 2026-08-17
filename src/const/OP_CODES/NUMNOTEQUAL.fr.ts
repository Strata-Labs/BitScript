import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_NUMNOTEQUAL as English } from "./NUMNOTEQUAL";

export const OP_NUMNOTEQUALFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription:
    "Compare les deux éléments du haut de la pile pour inégalité.",
  longDescription:
    "Inverse de OP_NUMEQUAL, OP_NUMNOTEQUAL vérifie si les deux éléments du haut de la pile sont numériquement différents. Il empile 1 (vrai) s'ils sont différents, et 0 (faux) s'ils sont égaux. Cet opcode est utilisé dans les conditions où l'inégalité est un facteur clé de la logique du script.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Compare les deux éléments du haut de la pile pour inégalité.",
    steps: [
      "Dépile l'élément a",
      "Dépile l'élément b",
      "Vérifie si a est différent de b",
      "Empile le résultat",
    ],
  },
};
