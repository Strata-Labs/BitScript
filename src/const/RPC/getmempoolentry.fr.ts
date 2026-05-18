import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getmempoolentry")!;

export const getmempoolentryFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Renvoie les détails d'une entrée du mempool.",
  description:
    "Donne les informations d'une transaction présente dans le mempool.",
  howIsThisUsed:
    "Sert à inspecter le statut et les détails des transactions en attente de confirmation, pour le suivi et l'analyse des transactions.",
};
