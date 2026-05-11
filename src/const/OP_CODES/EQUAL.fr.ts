import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_EQUAL as English } from "./EQUAL";

export const OP_EQUALFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Logique",
  type: "Contrôle de script",
  shortDescription:
    "Vérifie l'équivalence des éléments du haut et empile le résultat (0x00 ou 0x01).",
  longDescription:
    "OP_EQUAL est un opcode logique fondamental du langage de script Bitcoin. Il compare les deux éléments du haut de la pile : il les dépile, puis les compare. S'ils sont identiques, OP_EQUAL empile vrai (1) ; sinon, il empile faux (0). Cet opcode est essentiel à divers types de scripts, y compris pour la validation des transactions standards où il sert à confirmer que des données fournies (par exemple un hash de clé publique) correspondent aux valeurs attendues.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Vérifie l'équivalence des éléments du haut et empile le résultat (0x00 ou 0x01).",
    steps: [
      "Dépile l'élément du haut",
      "Dépile l'élément du haut",
      "Compare les éléments",
      "Empile le résultat de la comparaison (booléen)",
    ],
  },
};
