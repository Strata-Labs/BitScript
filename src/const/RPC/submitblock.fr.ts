import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "submitblock")!;

export const submitblockFr: RPCFunctionParams = {
  ...English,
  category: "Mining",
  summary:
    "Soumet un nouveau bloc au réseau.",
  description:
    "Envoie un bloc miné pour qu'il soit validé et propagé sur le réseau.",
  howIsThisUsed:
    "Cette commande sert à propager des blocs nouvellement minés vers le réseau Bitcoin pour validation et éventuelle inclusion dans la blockchain. Elle joue un rôle crucial dans le processus de mining, en facilitant l'expansion et la sécurité du réseau.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le bloc brut en hex.",
    },
    {
      ...English.inputs[1],
      description: "Paramètre déprécié (à ignorer).",
    },
  ],
};
