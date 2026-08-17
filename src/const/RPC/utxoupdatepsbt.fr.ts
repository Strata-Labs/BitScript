import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "utxoupdatepsbt")!;

export const utxoupdatepsbtFr: RPCFunctionParams = {
  ...English,
  category: "Transactions brutes",
  summary:
    "Met à jour un PSBT avec les UTXO et descripteurs nécessaires.",
  description:
    "Ajoute les informations d'UTXO et de descripteurs manquantes dans un PSBT.",
  howIsThisUsed:
    "La commande utxoupdatepsbt sert à améliorer la complétude et l'exactitude d'un PSBT en mettant à jour ses entrées et sorties segwit avec les informations issues des descripteurs de sortie, de l'UTXO set ou du mempool. Crucial pour préparer un PSBT à sa finalisation et diffusion sur le réseau Bitcoin, en s'assurant qu'il contient les dernières données de transaction et respecte les exigences du réseau.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le PSBT en base64.",
    },
    {
      ...English.inputs[1],
      description: "Tableau de descripteurs (optionnel).",
    },
  ],
};
