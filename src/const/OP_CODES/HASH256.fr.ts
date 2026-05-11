import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_HASH256 as English } from "./HASH256";

export const OP_HASH256Fr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Cryptographie",
  type: "Dépile & Empile",
  shortDescription:
    "Applique deux fois l'algorithme SHA-256 sur l'élément du haut de la pile.",
  longDescription:
    "L'opération OP_HASH256 représente un double hachage spécifique avec l'algorithme SHA-256. Elle prend une entrée, la hache une première fois avec SHA-256, puis hache le résultat à nouveau avec SHA-256. Ce double hachage est une caractéristique du protocole Bitcoin, utilisée notamment pour la création des hashes de bloc et des identifiants de transaction.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Double-hache l'élément du haut de la pile avec l'algorithme SHA256.",
    steps: [
      "Dépile l'élément du haut",
      "Applique un premier hash SHA256",
      "Applique un second hash SHA256",
      "Empile l'élément doublement haché",
    ],
  },
};
