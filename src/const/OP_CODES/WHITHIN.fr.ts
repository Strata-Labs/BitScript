import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_WITHIN as English } from "./WHITHIN";

export const OP_WITHINFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Conditionnel",
  shortDescription:
    "Vérifie si le troisième élément de la pile est compris entre les deux éléments du haut.",
  longDescription:
    "OP_WITHIN sert à vérifier qu'un nombre donné se situe dans une plage donnée. Il prend trois valeurs de la pile : x, min et max, puis vérifie que min <= x < max. Si x est dans cette plage, l'opcode empile vrai (1) ; sinon, il empile faux (0). Cette opération est utile dans les scripts qui doivent valider qu'une entrée respecte des conditions numériques spécifiques.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Vérifie si le troisième élément de la pile est compris entre les deux éléments du haut.",
    steps: [
      "Dépile l'élément du haut (max)",
      "Dépile l'élément suivant (min)",
      "Dépile l'élément suivant (x)",
      "Vérifie l'intervalle",
      "Empile le résultat",
    ],
  },
};
