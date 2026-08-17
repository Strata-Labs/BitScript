import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "gettxoutsetinfo")!;

export const gettxoutsetinfoFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Renvoie des statistiques sur l'ensemble des UTXO.",
  description:
    "Calcule des informations sur la base de données UTXO à un instant donné.",
  howIsThisUsed:
    "Cette commande est cruciale pour les développeurs et analystes qui doivent comprendre l'état courant de l'UTXO set, pour l'analyse de performance, l'optimisation de la blockchain ou la recherche économique. En fournissant un instantané des sorties non dépensées, elle aide à évaluer la répartition et la disponibilité des fonds sur le réseau. La capacité à générer des hashes de l'UTXO set aide aussi à vérifier l'intégrité de l'ensemble entre différents nœuds.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Type de hash à utiliser.",
    },
    {
      ...English.inputs[1],
      description: "Hash ou hauteur cible (optionnel).",
    },
    {
      ...English.inputs[2],
      description: "Utiliser l'index si disponible.",
    },
  ],
};
