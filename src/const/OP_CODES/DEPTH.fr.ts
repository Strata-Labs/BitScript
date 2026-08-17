import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_DEPTH as English } from "./DEPTH";

export const OP_DEPTHFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pile",
  type: "Pile",
  shortDescription: "Empile la profondeur de la pile sur la pile.",
  longDescription:
    "En tant que langage à base de pile, il est toujours utile de capturer l'état courant de la pile. L'opcode OP_DEPTH compte précisément tous les éléments présents sur la pile (sans en retirer aucun) et empile cette valeur (en hexadécimal). Bien que non utilisé dans les scripts courants, op_depth peut servir dans un scénario multisig où l'on a besoin d'un comptage pour vérifier le nombre de signatures m-sur-n.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Empile la profondeur de la pile sur la pile.",
    steps: [
      "Compte les éléments présents sur la pile (combien d'éléments)",
      "Empile le résultat du comptage.",
    ],
  },
};
