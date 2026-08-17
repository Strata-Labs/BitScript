import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "simulaterawtransaction")!;

export const simulaterawtransactionFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Calcule l'effet d'une transaction brute sur le solde du portefeuille, sans la diffuser.",
  description:
    "Simule l'impact d'une transaction sans l'envoyer sur le réseau.",
  howIsThisUsed:
    "Sert à prévoir l'effet de signer et diffuser des transactions brutes sur le solde du portefeuille.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Tableau de transactions brutes en hex.",
    },
    {
      ...English.inputs[1],
      description: "Options de simulation.",
    },
  ],
};
