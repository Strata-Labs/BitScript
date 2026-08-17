import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "signrawtransactionwithkey")!;

export const signrawtransactionwithkeyFr: RPCFunctionParams = {
  ...English,
  category: "Transactions brutes",
  summary:
    "Signe une transaction brute avec un jeu de clés privées fourni.",
  description:
    "Signe la transaction en utilisant les clés privées passées en argument (sans toucher au portefeuille).",
  howIsThisUsed:
    "Sert à signer les entrées d'une transaction brute avant sa diffusion sur le réseau. Permet un contrôle fin du processus de signature en spécifiant les clés privées exactes à utiliser. Supporte également la fourniture des prevouts dépendants, ce qui est utile pour construire des transactions complexes.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La transaction brute en hex.",
    },
    {
      ...English.inputs[1],
      description: "Tableau des clés privées (en WIF).",
    },
    {
      ...English.inputs[2],
      description: "Tableau JSON des prevouts (optionnel).",
    },
    {
      ...English.inputs[3],
      description: "Type de sighash à utiliser.",
    },
  ],
};
