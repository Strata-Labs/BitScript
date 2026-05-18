import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getrawmempool")!;

export const getrawmempoolFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Liste toutes les transactions actuellement dans le mempool.",
  description:
    "Renvoie les txids présents dans le mempool, avec ou sans détails.",
  howIsThisUsed:
    "Cette commande est cruciale pour les développeurs et analystes qui doivent comprendre l'état actuel du mempool, analyser les flux de transactions ou estimer les frais selon la congestion actuelle. Les informations détaillées fournies en mode verbeux aident à évaluer frais, tailles et impact potentiel sur l'inclusion dans un futur bloc.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Si vrai, renvoie des objets ; sinon, juste les txids.",
    },
    {
      ...English.inputs[1],
      description: "Si vrai, renvoie la séquence du mempool.",
    },
  ],
};
