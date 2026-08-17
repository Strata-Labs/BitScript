import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_BOOLOR as English } from "./BOOLOR";

export const OP_BOOLORFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription: "OU logique des deux éléments du haut de la pile.",
  longDescription:
    "Semblable à OP_BOOLAND, OP_BOOLOR effectue un OU logique sur les deux éléments du haut de la pile. Si au moins un des éléments est non nul, OP_BOOLOR empile 1 (vrai) ; si les deux valent 0, il empile 0 (faux). Cet opcode est utile dans les scripts nécessitant une disjonction logique, où il suffit qu'une des conditions soit vraie.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "OU logique des deux éléments du haut de la pile.",
    steps: [
      "Dépile l'élément a",
      "Dépile l'élément b",
      "Calcule le OU logique de a et b",
      "Empile le résultat",
    ],
  },
};
