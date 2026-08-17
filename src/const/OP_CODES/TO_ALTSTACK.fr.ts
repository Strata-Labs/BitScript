import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_TOALTSTACK as English } from "./TO_ALTSTACK";

export const OP_TOALTSTACKFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pile",
  type: "Dépile & Empile",
  shortDescription:
    "Déplace l'élément du haut de la pile principale vers la pile alternative.",
  longDescription:
    "OP_TOALTSTACK transfère l'élément du haut de la pile principale vers la pile alternative. Cet opcode est utile dans les scripts qui nécessitent un stockage temporaire d'éléments. En utilisant la pile alternative, le script peut gérer et récupérer des données sans perturber le flux d'opérations sur la pile principale.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Déplace l'élément du haut de la pile principale vers la pile alternative.",
    steps: [
      "Dépile l'élément du haut de la pile principale",
      "Empile l'élément sur la pile alternative",
    ],
  },
};
