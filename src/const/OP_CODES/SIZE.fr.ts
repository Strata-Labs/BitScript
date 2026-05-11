import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_SIZE as English } from "./SIZE";

export const OP_SIZEFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pile",
  type: "Empile",
  shortDescription:
    "Empile la taille de l'élément du haut de la pile sur la pile.",
  longDescription:
    "L'opcode OP_SIZE évalue la taille des données présentes dans l'élément du haut de la pile. Il empile la taille (en octets) de cet élément, mais ne retire pas l'élément d'origine. Particulièrement utile dans les scripts qui doivent valider ou travailler avec des données de tailles spécifiques, par exemple dans certains scripts de vérification ou des contrats complexes nécessitant des entrées d'une certaine longueur ou d'un certain format.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Empile la taille de l'élément du haut de la pile sur la pile.",
    steps: [
      "Observe l'élément du haut",
      "Calcule la taille de l'élément",
      "Empile la taille de l'élément",
    ],
  },
};
