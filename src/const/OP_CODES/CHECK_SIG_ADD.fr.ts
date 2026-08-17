import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_CHECKSIGADD as English } from "./CHECK_SIG_ADD";

export const OP_CHECKSIGADDFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Cryptographie",
  type: "Dépile & Empile",
  shortDescription:
    "Vérifie une signature avec une clé publique et incrémente le résultat de 1 en cas de succès.",
  longDescription:
    "L'opération OP_CHECKSIGADD vérifie une signature par rapport à une clé publique et incrémente le résultat de 1 en cas de succès. Elle suit le fonctionnement d'OP_CHECKSIG, qui dépile habituellement trois éléments : la signature, la clé publique et la donnée originale. Si la vérification de signature réussit, OP_CHECKSIGADD empile le résultat incrémenté ; sinon, il empile 0.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Vérifie une signature avec une clé publique et incrémente le résultat de 1 en cas de succès.",
    steps: [
      "Dépile la clé publique",
      "Dépile la signature",
      "Applique OP_CHECKSIGADD",
      "Ajoute le résultat à la valeur initiale",
      "Empile le résultat de vérification incrémenté",
    ],
  },
};
