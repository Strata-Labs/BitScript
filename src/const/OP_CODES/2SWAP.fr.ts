import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_2SWAP as English } from "./2SWAP";

export const OP_2SWAPFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Cryptographie",
  type: "Dépile & Empile",
  shortDescription: "Échange les deux paires d'éléments du haut de la pile.",
  longDescription:
    "OP_2SWAP est un opcode de manipulation de pile qui échange la position des deux paires d'éléments du haut de la pile. Cette opération est utile lorsqu'il faut réorganiser les éléments de la pile pour la bonne exécution des opérations suivantes, en particulier dans les scripts complexes.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Échange la position des deux paires d'éléments du haut de la pile.",
    steps: [
      "Dépile la première paire d'éléments",
      "Dépile la deuxième paire d'éléments",
      "Empile la première paire dépilée",
      "Empile la deuxième paire dépilée",
    ],
  },
};
