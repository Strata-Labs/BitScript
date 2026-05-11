import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_NUMEQUALVERIFY as English } from "./NUMEQUALVERIFY";

export const OP_NUMEQUALVERIFYFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Mathématiques",
  type: "Dépile & Empile",
  shortDescription:
    "Compare les deux éléments du haut pour égalité ; échoue si faux.",
  longDescription:
    "OP_NUMEQUALVERIFY est similaire à OP_NUMEQUAL mais avec une étape de vérification supplémentaire. Il effectue la même vérification d'égalité numérique puis exécute un OP_VERIFY, ce qui signifie que le script ne se poursuit que si la comparaison est vraie. Cet opcode sert dans les scripts où la vérification d'égalité est cruciale pour la suite.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Compare les deux éléments du haut pour égalité ; échoue si faux.",
    steps: [
      "Dépile l'élément a",
      "Dépile l'élément b",
      "Vérifie si a est égal à b ; sinon, le script échoue",
    ],
  },
};
