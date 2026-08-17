import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getmempooldescendants")!;

export const getmempooldescendantsFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Liste les descendants d'une transaction dans le mempool.",
  description:
    "Renvoie les transactions descendantes d'une transaction présente dans le mempool.",
  howIsThisUsed:
    "Cette commande est cruciale pour les applications et services qui doivent analyser le mempool pour ses dépendances de transactions, estimer les frais ou évaluer l'impact des transactions non confirmées sur le réseau. En identifiant tous les descendants d'une transaction donnée, on comprend comment cette transaction affecte le mempool, y compris les retards potentiels de confirmation ou la hausse des frais due à la taille et à la complexité de la chaîne.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'identifiant de la transaction.",
    },
    {
      ...English.inputs[1],
      description: "Si vrai, renvoie des objets ; sinon, juste les txids.",
    },
  ],
};
