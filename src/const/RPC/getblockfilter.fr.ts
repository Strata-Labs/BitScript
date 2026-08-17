import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblockfilter")!;

export const getblockfilterFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Renvoie le filtre BIP157 d'un bloc.",
  description:
    "Récupère le filtre de bloc compact pour client léger.",
  howIsThisUsed:
    "Imaginez vous rendre dans un grand salon du livre à la recherche des ouvrages de votre auteur favori, sans vouloir vérifier chaque livre exposé. Un guide à l'entrée vous remet une carte spéciale qui ne signale que les stands où l'on peut trouver vos auteurs. De même, dans le réseau Bitcoin, la commande « getblockfilter » fournit une « carte » (ou filtre) pour un bloc précis, permettant aux clients légers (portefeuilles qui ne stockent pas toute la blockchain) de déterminer rapidement si le bloc contient des transactions pertinentes, sans avoir à télécharger et fouiller toutes les données du bloc.",
};
