import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_SHA1 as English } from "./SHA1";

export const OP_SHA1Fr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Cryptographie",
  type: "Dépile & Empile",
  shortDescription:
    "Applique la fonction de hachage SHA-1 sur l'élément du haut de la pile.",
  longDescription:
    "SHA1, ou Secure Hash Algorithm 1, est une fonction de hachage cryptographique qui produit un hash de 160 bits (20 octets), souvent représenté par un nombre hexadécimal de 40 chiffres. Malgré son omniprésence dans divers systèmes, son usage décline dans Bitcoin en raison de vulnérabilités. L'opcode OP_SHA1 permet de calculer directement le hash SHA-1 d'une donnée, mais son utilisation est déconseillée dans les protocoles Bitcoin modernes au profit d'algorithmes plus sûrs.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Applique la fonction de hachage SHA-1 sur l'élément du haut de la pile.",
    steps: [
      "Dépile l'élément du haut",
      "Applique le hash SHA1",
      "Empile l'élément haché",
    ],
  },
};
