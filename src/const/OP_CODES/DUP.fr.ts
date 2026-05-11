import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_DUP as English } from "./DUP";

// French translation of OP_DUP.
//
// Pattern: spread the English opcode, then override the fields you've
// translated. Anything you don't override stays English — so you can ship
// an opcode translation in stages without breaking it.
//
// Keep `name`, `opCode`, `hex`, `linkPath`, `tileImage`, `generalType`,
// `inputNum`, `returnNum`, and `visualProps.stackSteps`/`failureSteps`
// identical to the English version so URLs, assets, and the animation logic
// stay stable across locales.

export const OP_DUPFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pile",
  type: "Empile",
  shortDescription:
    "Duplique l'élément du haut de la pile et empile la copie sur la pile.",
  longDescription:
    "OP_DUP est une opération de pile courante qui permet de dupliquer l'élément du haut de la pile. Dup, abréviation de « duplicate » (dupliquer), est généralement utilisé lorsqu'on doit traiter plus d'une fois (souvent pour vérification) un élément déjà présent sur la pile. En P2PKH, par exemple, il sert à dupliquer une clé publique utilisée deux fois : d'abord dans OP_EQUALVERIFY, puis dans OP_CHECKSIG.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Duplique l'élément du haut de la pile",
    steps: [
      "Récupère la valeur (sans dépiler) de l'élément du haut de la pile",
      "Duplique l'élément (en binaire)",
      "Empile l'élément dupliqué",
    ],
  },
};
