import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "gettxoutproof")!;

export const gettxoutproofFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Renvoie une preuve cryptographique d'inclusion d'une transaction.",
  description:
    "Produit une preuve qu'un ou plusieurs txids sont inclus dans un bloc.",
  howIsThisUsed:
    "Cette commande sert principalement aux clients légers ou SPV (Simplified Payment Verification) qui ne téléchargent pas toute la blockchain mais qui ont besoin de prouver l'inclusion d'une transaction dans un bloc. En obtenant une preuve de Merkle, ces clients peuvent vérifier des transactions sans avoir besoin du bloc complet, ce qui permet une utilisation plus efficace du stockage et de la bande passante tout en gardant des garanties de sécurité sur l'inclusion.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Tableau des txids à prouver.",
    },
    {
      ...English.inputs[1],
      description: "Hash du bloc à utiliser pour la preuve (optionnel).",
    },
  ],
};
