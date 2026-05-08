import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import English from "./P2SH";

export const P2SHFr: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "(paiement vers hash de script)",
  shortDescription:
    "Le format Legacy standard pour les transactions plus complexes nécessitant un script.",
  longDescription: [
    "  Un script Pay-to-Script-Hash (P2SH) est le script standard en Legacy pour des types de transactions plus complexes (comme les multi-signatures). Au lieu d'envoyer du Bitcoin directement vers un script spécifique, le pubKeyScript de sortie contient le hash du script de verrouillage ; le ScriptSig d'entrée associé devra à la fois prouver qu'il connaît le script de verrouillage original et fournir les données et op_codes pour le déverrouiller. Le ScriptSig de déverrouillage en entrée contient donc à la fois le script de déverrouillage *et* le script de verrouillage / redeem script original. Décomposons cela en deux étapes claires :",

    "1. Vérifier que le script de verrouillage haché en entrée correspond au script de verrouillage haché de la sortie précédente. Pour dépenser du Bitcoin envoyé vers un script haché, il faut d'abord prouver que le script qu'on déverrouille correspond au script haché original. La pile consomme alors l'intégralité du script de verrouillage / redeem script comme un seul tableau et le hache avec HASH160. Le résultat est ensuite comparé au script haché original via OP_EQUAL.",
    "2. Exécution du script de déverrouillage et du script de verrouillage. Si le dernier op_code (OP_EQUAL) de l'étape de validation précédente renvoie 1/vrai, on peut alors passer au déverrouillage effectif du script de verrouillage en empilant le script (maintenant décomposé en octets de données et d'op_codes appropriés). Il s'agit d'une exécution plus classique où tous les éléments sont empilés puis traités selon le comportement LIFO habituel. ",
  ],
  opCodeReview:
    "P2SH nécessite deux (2) éléments de données, les scripts, et trois (3) op_codes.",
  inUse: "Oui",
};
