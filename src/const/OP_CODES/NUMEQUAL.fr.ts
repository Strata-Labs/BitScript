import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_NUMEQUAL as English } from "./NUMEQUAL";

export const OP_NUMEQUALFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription:
    "Compare les deux éléments du haut de la pile pour égalité.",
  longDescription:
    "OP_NUMEQUAL compare numériquement les deux éléments du haut de la pile. S'ils sont égaux, il empile 1 (vrai) ; sinon, il empile 0 (faux). Cet opcode est indispensable dans les scripts qui nécessitent une vérification d'égalité entre valeurs numériques.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Compare les deux éléments du haut de la pile pour égalité.",
    steps: [
      "Dépile l'élément a",
      "Dépile l'élément b",
      "Vérifie si a est égal à b",
      "Empile le résultat",
    ],
  },
};
