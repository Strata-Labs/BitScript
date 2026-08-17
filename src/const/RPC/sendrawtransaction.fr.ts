import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "sendrawtransaction")!;

export const sendrawtransactionFr: RPCFunctionParams = {
  ...English,
  category: "Transactions brutes",
  summary:
    "Diffuse une transaction brute sur le réseau Bitcoin.",
  description:
    "Envoie une transaction signée au réseau pour qu'elle soit incluse dans un bloc.",
  howIsThisUsed:
    "Cette commande sert à diffuser une transaction sur le réseau après qu'elle a été créée et signée. Étape critique de l'exécution des transactions, elle permet leur inclusion dans des blocs par les mineurs. Particulièrement utile pour les applications ou services qui construisent les transactions de manière programmatique — portefeuilles, processeurs de paiement, etc.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La transaction brute en hex.",
    },
    {
      ...English.inputs[1],
      description: "Tarif maximum acceptable pour rejeter la transaction si dépassé.",
    },
  ],
};
