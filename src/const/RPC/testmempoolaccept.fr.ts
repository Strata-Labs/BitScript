import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "testmempoolaccept")!;

export const testmempoolacceptFr: RPCFunctionParams = {
  ...English,
  category: "Transactions brutes",
  summary:
    "Teste si des transactions brutes seraient acceptées par le mempool.",
  description:
    "Simule l'acceptation des transactions sans les diffuser.",
  howIsThisUsed:
    "Pour vérifier à l'avance si des transactions seraient acceptées par le mempool — utile pour tester la validité d'une transaction avant soumission.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Tableau des transactions brutes en hex.",
    },
    {
      ...English.inputs[1],
      description: "Tarif maximum acceptable pour rejeter.",
    },
  ],
};
