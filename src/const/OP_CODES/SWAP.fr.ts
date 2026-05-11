import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_SWAP as English } from "./SWAP";

export const OP_SWAPFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pile",
  type: "Dépile & Empile",
  shortDescription: "Échange les deux éléments du haut de la pile.",
  longDescription:
    "OP_SWAP est un opcode simple de manipulation de pile qui échange la position des deux éléments du haut. Cette opération est essentielle dans les scripts où l'ordre des éléments doit être modifié pour la bonne exécution des opérations suivantes, par exemple dans les scripts complexes effectuant plusieurs opérations sur une série d'éléments de la pile.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Échange les deux éléments du haut de la pile.",
    steps: [
      "Dépile l'élément 1",
      "Dépile l'élément 2",
      "Empile l'élément 2",
      "Empile l'élément 1",
    ],
  },
};
