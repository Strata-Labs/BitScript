import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "gettxspendingprevout")!;

export const gettxspendingprevoutFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Renvoie les transactions dépensant des prevouts donnés (dans le mempool).",
  description:
    "Indique quelles transactions du mempool dépensent les sorties précédentes spécifiées.",
  howIsThisUsed:
    "Cette commande est précieuse pour surveiller l'usage de sorties précises dans le mempool. Elle aide à suivre les transactions qui dépensent des sorties associées à vos adresses ou transactions. Cette information est cruciale pour comprendre le statut des transactions en attente et les tentatives potentielles de double dépense, et donne des aperçus sur l'activité transactionnelle du réseau Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Tableau de prevouts {txid, vout}.",
    },
  ],
};
