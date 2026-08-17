import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "gettransaction")!;

export const gettransactionFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Renvoie les informations détaillées d'une transaction du portefeuille.",
  description:
    "Récupère les détails d'une transaction connue du portefeuille, incluant les destinataires et catégories.",
  howIsThisUsed:
    "Sert à suivre et auditer les transactions du portefeuille, en offrant un aperçu de leur statut, de leur impact sur le solde et plus encore — essentiel au suivi financier et au reporting.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'identifiant de la transaction.",
    },
    {
      ...English.inputs[1],
      description: "Inclure les transactions watch-only.",
    },
    {
      ...English.inputs[2],
      description: "Décoder la transaction brute dans la réponse.",
    },
  ],
};
