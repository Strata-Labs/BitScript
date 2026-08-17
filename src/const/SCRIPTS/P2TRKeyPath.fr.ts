import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import English from "./P2TRKeyPath";

export const P2TRKPFr: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "(paiement vers Taproot — chemin de clé)",
  shortDescription:
    "Une sortie Taproot dépensée via le chemin de clé pour un transfert simple et direct (vraisemblablement)",
  longDescription:
    "Un script Pay-to-Taproot - KeyPath est un scriptPubKey de sortie P2TR déverrouillé via le chemin de clé. Les sorties P2TR offrent à la fois un chemin de clé direct, déverrouillable par une signature Schnorr, et un arbre de scripts (appelé chemin de script) nécessitant bien plus de données pour être déverrouillé. Ci-dessous, un exemple du premier cas.",
  opCodeReview:
    "P2TR - KeyPath ne nécessite que deux (2) éléments de données et quatre (4) op_codes, comme P2PKH. Cependant, comme on le voit à la première étape ci-dessous, le formatage initial du ScriptPubKey est différent.",
  inUse: "Oui",
  descriptionText: [
    "Désérialise le script de verrouillage pour obtenir la clé Taproot",
    "Exécute OP_CHECKSIG",
  ],
};
