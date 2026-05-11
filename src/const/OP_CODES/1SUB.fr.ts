import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_ONESUB as English } from "./1SUB";

export const OP_ONESUBFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription: "Décrémente de 1 l'élément du haut de la pile.",
  longDescription:
    "Pendant de OP_1ADD, OP_1SUB soustrait 1 à l'élément du haut de la pile. Cet opcode trouve son utilité dans les scripts nécessitant de décrémenter des valeurs, par exemple dans les comptes à rebours, les boucles décrémentielles ou pour ajuster une valeur d'une seule unité vers le bas.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Décrémente de 1 l'élément du haut de la pile.",
    steps: [
      "Dépile l'élément du haut",
      "Soustrait 1 à l'élément",
      "Empile l'élément",
    ],
  },
};
