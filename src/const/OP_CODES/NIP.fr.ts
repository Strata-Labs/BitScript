import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_NIP as English } from "./NIP";

export const OP_NIPFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pile",
  type: "Dépile & Empile",
  shortDescription: "Retire l'avant-dernier élément de la pile.",
  longDescription:
    "OP_NIP est un opcode sélectif de manipulation de pile qui retire l'avant-dernier élément de la pile, en laissant l'élément du haut intact. Il est utile lorsqu'un script doit écarter un calcul intermédiaire ou une valeur devenus inutiles pour la suite des opérations, ce qui simplifie l'exécution du script.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Retire l'avant-dernier élément de la pile.",
    steps: [
      "Dépile l'élément 1",
      "Dépile l'élément 2",
      "Empile l'élément 1",
    ],
  },
};
