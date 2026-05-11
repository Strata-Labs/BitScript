import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_HASH160 as English } from "./HASH160";

export const OP_HASH160Fr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Cryptographie",
  type: "Dépile & Empile",
  shortDescription:
    "Hache l'élément du haut de la pile avec les algorithmes SHA-256 puis RIPEMD-160.",
  longDescription:
    "Vous avez déjà utilisé P2PKH ou P2SH ? Alors vous avez directement invoqué OP_HASH160, l'une des opérations cryptographiques Bitcoin les plus courantes. Comme son nom l'indique, c'est un algorithme de hachage ; mais, contrairement à ce que le nom laisse penser, il s'agit en réalité de deux algorithmes de hachage indépendants appliqués séquentiellement, produisant un hash de 20 octets (40 caractères hexadécimaux). OP_HASH160 hache d'abord l'élément avec SHA256, puis avec RIPEMD160.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Hache l'élément du haut de la pile avec les algorithmes SHA-256 puis RIPEMD-160.",
    steps: [
      "Dépile l'élément du haut",
      "Applique Hash160 (sha256 puis ripemd160)",
      "Empile le résultat",
    ],
  },
};
