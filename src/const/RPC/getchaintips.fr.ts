import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getchaintips")!;

export const getchaintipsFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Liste les pointes des branches connues de la chaîne.",
  description:
    "Renvoie toutes les pointes (tips) de la blockchain, y compris les branches mineures.",
  howIsThisUsed:
    "Imaginez explorer une forêt avec plusieurs chemins dans différentes directions. Certains rejoignent le sentier principal, d'autres sont des impasses ou des sentiers peu fréquentés qui s'embroussaillent. Dans la blockchain Bitcoin, la commande « getchaintips » aide à comprendre la topographie de cette forêt en montrant toutes les « pointes » connues de l'arbre des blocs : le chemin principal (la blockchain active) ainsi que tous les chemins secondaires (branches orphelines et forks) apparus au fil du temps. Chaque pointe est décrite par sa hauteur (longueur du chemin), son hash (identifiant unique), la longueur de la branche qui la rattache à la chaîne principale et son statut (chemin actif, fork valide non choisi, ou chemin invalide).",
};
