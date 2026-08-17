import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import English from "./P2WSH";

export const P2WSHFr: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "(paiement vers hash de witness script)",
  shortDescription:
    "Le format SegWit standard pour les transactions plus complexes nécessitant un script.",
  longDescription: [
    "Les scripts P2WSH jouent un rôle similaire à P2SH dans l'univers SegWit, ciblant les types de transactions plus complexes. La logique du witness script P2WSH et du pubKeyScript de sortie est exactement la même que celle du ScriptSig d'entrée et du pubKeyScript de sortie en P2SH. Il existe toutefois une grande différence dans les op_codes explicitement présents dans la transaction brute. Les portefeuilles/clients savent que, lorsqu'une sortie P2WSH est détectée, ils devront insérer les op_codes P2SH habituels ; un pubKeyScript P2WSH ne nécessite donc qu'un seul élément spécifique : le hash du script de verrouillage. Voici un détail étape par étape :",
    "1. Vérifier que le script de verrouillage haché en entrée correspond au script de verrouillage haché de la sortie précédente. Pour dépenser du Bitcoin envoyé vers un script haché, il faut d'abord prouver que le script qu'on déverrouille correspond au script haché original. La pile consomme alors l'intégralité du script de verrouillage / redeem script comme un seul tableau et le hache avec HASH160. Le résultat est ensuite comparé au script haché original via OP_EQUAL.",
    "2. Exécution du script de déverrouillage et du script de verrouillage. Si le dernier op_code (OP_EQUAL) de l'étape de validation précédente renvoie 1/vrai, on peut alors passer au déverrouillage effectif du script de verrouillage en empilant le script (maintenant décomposé en octets de données et d'op_codes appropriés). Il s'agit d'une exécution plus classique où tous les éléments sont empilés puis traités selon le comportement LIFO habituel.",
  ],
  opCodeReview:
    "P2WSH nécessite deux (2) éléments de données, les scripts, et quatre (4) op_codes.",
  inUse: "Oui",
  descriptionText: [
    "Décode le témoin pour extraire <sig>, <witness script>",
    "Empile le witness script et <sig> sur la pile,",
    "Hache le witness script (hash sha256)",
    "Insère le hash du witness script sur la pile",
    "Décode le scriptPubKey pour obtenir <OP_0> et [witness script hash]",
    "Exécute OP_EQUAL pour comparer le hash du script avec le hash du witness script",
    "Empile [witness script] sur la pile",
    "Décode le witness script en <pubkey> et <OP_CHECKSIG>",
    "Empile <pubkey> et <OP_CHECKSIG> sur la pile",
    "Exécute OP_CHECKSIG pour valider la signature",
  ],
};
