import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_EQUALVERIFY as English } from "./EQUALVERIFY";

export const OP_EQUALVERIFYFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Logique",
  type: "Conditionnel",
  shortDescription:
    "Compare les deux éléments du haut pour égalité sans empiler de résultat.",
  longDescription:
    "L'un des op_codes les plus utilisés, puisque pratiquement chaque script vérifie une forme d'égalité. La principale différence entre OP_EQUALVERIFY et OP_EQUAL est que le premier n'empile RIEN. Soit il échoue (si 0 ou vide), soit il est simplement consommé sans effet.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Vérifie l'équivalence, échoue si faux.",
    steps: [
      "Dépile l'élément du haut",
      "Dépile l'élément du haut",
      "Vérifie l'égalité ; si vrai (autre chose que 0), ne fait rien ; sinon échoue",
      "Poursuit l'exécution du script",
    ],
  },
};
