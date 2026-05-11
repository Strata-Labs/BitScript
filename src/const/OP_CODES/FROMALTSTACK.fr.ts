import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_FROMALTSTACK as English } from "./FROMALTSTACK";

export const OP_FROMALTSTACKFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pile",
  type: "Dépile & Empile",
  shortDescription:
    "Déplace l'élément du haut de la pile alternative vers la pile principale.",
  longDescription:
    "OP_FROMALTSTACK transfère l'élément du haut de la pile alternative vers la pile principale. Cet opcode est utile dans les scripts qui nécessitent un stockage temporaire d'éléments. En utilisant la pile alternative, le script peut gérer et récupérer des données sans perturber le flux d'opérations sur la pile principale.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Déplace l'élément du haut de la pile alternative vers la pile principale.",
    steps: [
      "Dépile l'élément du haut de la pile alternative",
      "Empile l'élément sur la pile principale",
    ],
  },
};
