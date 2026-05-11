import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_OVER as English } from "./OVER";

export const OP_OVERFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pile",
  type: "Dépile & Empile",
  shortDescription: "Copie l'avant-dernier élément de la pile vers le sommet.",
  longDescription:
    "L'opcode OP_OVER duplique l'avant-dernier élément de la pile et place la copie au sommet de la pile. Il est souvent utilisé dans les scripts qui ont besoin de réutiliser une valeur précédente tout en préservant l'ordre d'origine, par exemple dans les scripts qui réalisent des calculs ou comparaisons répétés sur un même élément.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Copie l'avant-dernier élément de la pile vers le sommet.",
    steps: [
      "Dépile l'élément 1",
      "Dépile l'élément 2",
      "Empile l'élément 2",
      "Empile l'élément 1",
      "Empile l'élément 2",
    ],
  },
};
