import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_MIN as English } from "./MIN";

export const OP_MINFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription:
    "Empile le plus petit des deux éléments du haut de la pile.",
  longDescription:
    "OP_MIN remplit une fonction similaire à OP_MAX mais inverse. Il évalue les deux valeurs numériques du haut de la pile, les dépile pour comparaison, puis empile la plus petite des deux. Cette opération est particulièrement utile dans les scripts qui doivent déterminer des seuils minimums, par exemple pour imposer un montant minimum de paiement ou toute autre logique conditionnelle basée sur des valeurs numériques.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Empile le plus petit des deux éléments du haut de la pile.",
    steps: [
      "Dépile l'élément du haut",
      "Dépile l'élément suivant",
      "Empile le minimum des deux éléments",
    ],
  },
};
