import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_BOOLAND as English } from "./BOOLAND";

export const OP_BOOLANDFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription: "ET logique des deux éléments du haut de la pile.",
  longDescription:
    "OP_BOOLAND est une opération logique qui prend les deux éléments du haut de la pile et effectue un ET logique. Si les deux éléments sont non nuls, il empile 1 (vrai) ; sinon, il empile 0 (faux). Cet opcode sert dans les scripts nécessitant une conjonction logique entre deux conditions.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "ET logique des deux éléments du haut de la pile.",
    steps: [
      "Dépile l'élément a",
      "Dépile l'élément b",
      "Calcule le ET logique de a et b",
      "Empile le résultat",
    ],
  },
};
