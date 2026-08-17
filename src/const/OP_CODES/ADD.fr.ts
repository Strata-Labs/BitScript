import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_ADD as English } from "./ADD";

export const OP_ADDFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription:
    "Additionne les deux éléments du haut de la pile et empile le résultat.",
  longDescription:
    "Opération arithmétique courante présente dans tout langage de programmation, OP_ADD fonctionne exactement comme on s'y attend. Il requiert au minimum deux entrées sans quoi il échoue. Bien que pratique, aucun des scripts courants n'utilise op_add pour les transactions.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Additionne les deux éléments du haut de la pile et empile le résultat.",
    steps: [
      "Dépile l'élément du haut",
      "Dépile l'élément du haut",
      "Additionne les deux éléments pour en créer un nouveau",
      "Empile le nouvel élément",
    ],
  },
};
