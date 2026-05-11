import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import English from "./2DROP";

export const OP_2DROPFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pile",
  type: "Dépile",
  shortDescription: "Retire les deux éléments du haut de la pile.",
  longDescription:
    "Cette opération retire les deux éléments du haut de la pile. Elle est utile pour nettoyer la pile en écartant des valeurs inutiles. C'est une opération courante dans les scripts Bitcoin lorsqu'il faut écarter des résultats intermédiaires pour préserver l'état correct de la pile avant la suite des opérations.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Retire les deux éléments du haut de la pile.",
    steps: ["Dépile les 2 éléments du haut", "Poursuit l'exécution du script"],
  },
};
