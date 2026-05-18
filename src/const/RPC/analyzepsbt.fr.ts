import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "analyzepsbt")!;

export const analyzepsbtFr: RPCFunctionParams = {
  ...English,
  category: "Transactions brutes",
  summary:
    "Analyse un PSBT et indique les prochaines étapes nécessaires.",
  description:
    "Examine un PSBT et signale ce qui reste à signer, finaliser, etc.",
  howIsThisUsed:
    "Imaginez assembler un puzzle compliqué avec plusieurs amis, chaque pièce représentant une part d'une transaction qui doit être signée par différentes personnes. La commande « analyzepsbt » revient à disposer d'un guide qui vous indique quelles pièces du puzzle sont déjà en place et lesquelles manquent encore, ce qui facilite la compréhension de ce qu'il reste à faire pour compléter l'image.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le PSBT en base64 à analyser.",
    },
  ],
};
