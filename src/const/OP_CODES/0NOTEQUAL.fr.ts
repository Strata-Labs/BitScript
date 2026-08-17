import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_ZERONOTEQUAL as English } from "./0NOTEQUAL";

export const OP_ZERONOTEQUALFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription:
    "Vérifie si l'élément du haut de la pile est différent de 0.",
  longDescription:
    "OP_0NOTEQUAL vérifie si l'élément du haut de la pile est différent de zéro. Si l'élément est non nul, OP_0NOTEQUAL empile 1 (vrai) sur la pile ; sinon, il empile 0 (faux). Cet opcode est utile dans les conditions où il faut tester la présence ou l'absence d'une valeur, servant essentiellement de vérification de non-nullité.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Vérifie si l'élément du haut de la pile est différent de 0.",
    steps: [
      "Dépile l'élément du haut",
      "Vérifie si l'élément est différent de 0",
      "Empile le résultat",
    ],
  },
};
