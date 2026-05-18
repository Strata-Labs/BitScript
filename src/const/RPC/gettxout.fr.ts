import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "gettxout")!;

export const gettxoutFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Renvoie les détails d'une sortie non dépensée (UTXO).",
  description:
    "Inspecte un UTXO précis identifié par txid et vout.",
  howIsThisUsed:
    "Cette commande est essentielle pour vérifier l'existence et les détails d'UTXO spécifiques, particulièrement utile pour les portefeuilles, explorateurs ou tout service nécessitant de confirmer la finalité d'une transaction et les détails de sa sortie. Elle aide à évaluer si un UTXO est dépensable et à recueillir les éléments nécessaires à la construction de nouvelles transactions.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'identifiant de la transaction.",
    },
    {
      ...English.inputs[1],
      description: "L'index de la sortie.",
    },
    {
      ...English.inputs[2],
      description: "Inclure les transactions du mempool.",
    },
  ],
};
