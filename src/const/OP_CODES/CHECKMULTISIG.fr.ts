import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import English from "./CHECKMULTISIG";

export const OP_CHECKMULTISIGFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Cryptographie",
  type: "Dépile & Empile",
  shortDescription:
    "Vérifie plusieurs signatures par rapport à plusieurs clés publiques.",
  longDescription:
    "Extension de CheckSig, CheckMultiSig permet les transactions multi-signatures ; comme son nom le suggère, ce sigop est la fondation des wallets multi-signatures. L'opcode fonctionne en mode m-sur-n, où « m » est le nombre minimum de signatures correctes requises pour la validation, et « n » est le nombre de clés publiques fournies. Si m signatures parmi les n clés publiques sont correctes, il renvoie vrai (1) ; sinon, il renvoie faux (0). Un maximum de 20 (n) clés publiques est autorisé pour cet opcode.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Vérifie plusieurs signatures par rapport à plusieurs clés publiques.",
    steps: [
      "Dépile l'élément du haut (nombre de clés : n)",
      "Dépile les n éléments suivants",
      "Dépile l'élément du haut (nombre de signatures : m)",
      "Dépile les m éléments suivants",
      "Vérifie n signatures parmi m",
      "Empile le résultat de la vérification (0 ou 1)",
    ],
  },
};
