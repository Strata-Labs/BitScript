import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_CHECKSIG as English } from "./CHECKSIG";

export const OP_CHECKSIGFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Cryptographie",
  type: "Dépile & Empile",
  shortDescription:
    "Vérifie une signature cryptographique à partir d'une clé publique et d'un message.",
  longDescription:
    "Connu comme l'un des OpSigs, c'est l'un des op_codes les plus critiques du langage de script. En bref, il vérifie qu'une signature fournie est valide pour une clé publique donnée et renvoie vrai (1) ou faux (0). À noter : selon la structure de la transaction (legacy/segwit/taproot), la sérialisation du message/transaction et le schéma de signature lui-même (ECDSA ou Schnorr) peuvent différer. CheckSig est utilisé dans la plupart des scripts courants, dont P2PK et P2PKH.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Vérifie une signature cryptographique à partir d'une clé publique et d'un message.",
    steps: [
      "Dépile l'élément du haut (clé publique)",
      "Dépile l'élément du haut (signature)",
      "Effectue la vérification de signature (ECDSA ou Schnorr)",
      "Empile le résultat de la vérification (0 ou 1)",
    ],
  },
};
