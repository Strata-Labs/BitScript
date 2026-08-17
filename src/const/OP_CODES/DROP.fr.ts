import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import English from "./DROP";

export const OP_DROPFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pile",
  type: "Dépile",
  shortDescription: "Retire l'élément du haut de la pile.",
  longDescription:
    "Opération simple mais puissante, conçue pour retirer et écarter complètement l'élément du haut de la pile (toujours selon un ordre LIFO). Drop, avec Return, est l'un des op_codes les plus utilisés pour stocker des données dans Bitcoin. Plutôt que d'empiler simplement des données, l'usage de OP_DROP garantit que le script restera valide.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Retire l'élément du haut de la pile.",
    steps: ["Dépile l'élément du haut", "Poursuit l'exécution du script"],
  },
};
