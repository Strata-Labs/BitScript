import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_GREATERTHAN as English } from "./GREATERTHAN";

export const OP_GREATERTHANFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription:
    "Renvoie 0x01 si l'élément 1 est strictement supérieur à l'élément 2, sinon 0x00.",
  longDescription:
    "Opposé à OP_LESSTHAN, OP_GREATERTHAN vérifie si l'avant-dernier élément de la pile est strictement supérieur à l'élément du haut. Il empile 1 (vrai) si c'est le cas, et 0 (faux) sinon. Cet opcode est essentiel dans les scripts impliquant des comparaisons « strictement supérieur ».",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Renvoie 0x01 si l'élément 1 est strictement supérieur à l'élément 2, sinon 0x00.",
    steps: [
      "Dépile l'élément a",
      "Dépile l'élément b",
      "Vérifie si b est strictement supérieur à a",
      "Empile le résultat",
    ],
  },
};
