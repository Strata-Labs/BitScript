import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_NEGATE as English } from "./NEGATE";

export const OP_NEGATEFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription: "Inverse le signe de l'élément du haut de la pile.",
  longDescription:
    "OP_NEGATE change le signe de l'élément numérique du haut de la pile. Les nombres positifs deviennent négatifs et vice versa. Cet opcode est particulièrement utile dans les scripts nécessitant l'inversion de valeurs, par exemple lors d'opérations financières impliquant remboursements ou annulations.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Inverse le signe de l'élément du haut de la pile.",
    steps: [
      "Dépile l'élément du haut",
      "Multiplie l'élément par -1",
      "Empile l'élément",
    ],
  },
};
