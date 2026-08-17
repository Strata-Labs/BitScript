import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import English from "./P2WPKH";

export const P2WPKHFr: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "(paiement vers hash de clé publique du témoin)",
  shortDescription:
    "Le script SegWit standard pour les transferts directs et le type de transaction le plus courant.",
  longDescription: [
    " Un script Pay-to-Witness-Public-Key-Hash (P2WPKH) est le script SegWit standard pour une transaction de transfert direct. La logique du witness script P2WPKH et du pubKeyScript de sortie est exactement la même que celle du ScriptSig d'entrée et du pubKeyScript de sortie en P2PKH. Il existe toutefois une grande différence dans les op_codes explicitement présents dans la transaction brute. Les portefeuilles/clients savent que, lorsqu'une sortie P2WPKH est détectée, ils devront insérer les op_codes P2PKH habituels ; un pubKeyScript P2WPKH ne nécessite donc qu'un seul élément spécifique : un hash de clé publique.",
  ],
  opCodeReview:
    "P2WPKH nécessite les mêmes trois (3) éléments de données et quatre (4) op_codes que P2PKH. Cependant, comme on le voit à la première étape ci-dessous, le formatage initial du ScriptPubKey est différent.",
  inUse: "Oui",
  descriptionText: [
    "Désérialise le témoin pour obtenir la signature et la clé publique",
    "Empile la signature et la clé publique sur la pile",
    "Duplique la clé publique",
    "Exécute la fonction HASH160 sur la clé publique",
    "Empile le hash de la clé publique sur la pile",
    "Exécute OP_EQUALVERIFY",
    "Exécute OP_CHECKSIG",
  ],
};
