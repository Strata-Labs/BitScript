import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_GREATERTHANOREQUAL as English } from "./GREATERTHANOREQUAL";

export const OP_GREATERTHANOREQUALFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription:
    "Renvoie 1 si l'élément 1 est supérieur ou égal à l'élément 2, sinon 0.",
  longDescription:
    "OP_GREATERTHANOREQUAL effectue une comparaison similaire à OP_LESSTHANOREQUAL mais dans le sens opposé. Il vérifie si l'avant-dernier élément est supérieur ou égal à l'élément du haut, en empilant 1 (vrai) si oui, et 0 (faux) sinon. Cet opcode sert dans les scripts nécessitant une comparaison « supérieur ou égal ».",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Renvoie 1 si l'élément 1 est supérieur ou égal à l'élément 2, sinon 0.",
    steps: [
      "Dépile l'élément a",
      "Dépile l'élément b",
      "Vérifie si b est supérieur ou égal à a",
      "Empile le résultat",
    ],
  },
};
