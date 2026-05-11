import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_ONEADD as English } from "./1ADD";

export const OP_ONEADDFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription: "Incrémente de 1 l'élément du haut de la pile.",
  longDescription:
    "OP_1ADD est un opcode arithmétique simple qui ajoute 1 à l'élément du haut de la pile. Cet opcode est généralement utilisé dans les scripts nécessitant des incréments ou des compteurs, par exemple dans des structures pseudo-boucles ou lorsqu'une valeur doit être ajustée d'une unité.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Incrémente de 1 l'élément du haut de la pile.",
    steps: [
      "Dépile l'élément du haut",
      "Ajoute 1 à l'élément",
      "Empile l'élément",
    ],
  },
};
