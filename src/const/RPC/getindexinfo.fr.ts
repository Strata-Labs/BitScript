import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getindexinfo")!;

export const getindexinfoFr: RPCFunctionParams = {
  ...English,
  category: "Utilitaires",
  summary:
    "Renvoie l'état des index optionnels (txindex, coinstatsindex, etc.).",
  description:
    "Indique l'état de synchronisation des index activés sur le nœud.",
  howIsThisUsed:
    "Imaginez gérer une bibliothèque avec plusieurs catalogues qui indexent différents types de livres — fiction, science, histoire. Vous devez savoir quels catalogues sont à jour pour informer les lecteurs de la disponibilité et des dernières acquisitions. De même, dans la blockchain Bitcoin, la commande « getindexinfo » aide les opérateurs de nœuds et les développeurs à vérifier le statut des différents index gérés par leur nœud — index de transactions, d'adresses, ou tout autre index spécialisé qui améliore la capacité du nœud à interroger efficacement les données blockchain.",
};
