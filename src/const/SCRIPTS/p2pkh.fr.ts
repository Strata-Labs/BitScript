import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import { P2PKH as English } from "./p2pkh";

export const P2PKHFr: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "(paiement vers hash de clé publique)",
  shortDescription:
    "Fut à une époque le script le plus répandu pour les transferts simples et directs. Reste le format par défaut avant SegWit.",
  longDescription:
    "Un script Pay-to-Public-Key-Hash (P2PKH) est un type courant de script de transaction Bitcoin permettant d'envoyer des bitcoins à une adresse Bitcoin spécifique. Le script verrouille les bitcoins sur le hash d'une clé publique, exigeant une signature de la clé privée correspondante pour les dépenser. Lors de la dépense, l'émetteur fournit un scriptSig contenant la clé publique et une signature valide.",
  opCodeReview:
    "P2PKH nécessite trois (3) éléments de données et quatre (4) op_codes. Les trois (3) éléments de données modifiables requis sont visibles ci-dessous.",
  inUse: "Oui",
  descriptionText: [
    "Empile <signature> sur la pile",
    "Empile <pubkey> sur la pile",
    "Duplique l'élément en haut de la pile",
    "Hache l'élément en haut de la pile",
    "Empile le <pubkey> haché sur la pile",
    "Vérifie que les deux éléments du haut de la pile sont égaux",
    "Dépile deux éléments (clé pub. & sign.) et vérifie la signature ECDSA",
  ],
};
