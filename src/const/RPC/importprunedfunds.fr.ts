import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "importprunedfunds")!;

export const importprunedfundsFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Importe les fonds correspondant à une transaction prunée.",
  description:
    "Sert lorsqu'on utilise un nœud pruné et qu'on veut quand même importer une transaction.",
  howIsThisUsed:
    "Particulièrement utile aux utilisateurs de portefeuilles prunés qui veulent importer des fonds depuis certaines transactions. En important sans déclencher de rescan, on gère efficacement les fonds sans devoir se synchroniser avec toute la blockchain. Permet de travailler avec une configuration prunée tout en accédant aux fonds et en les gérant. Attention : toute transaction ultérieure dépensant les sorties importées doit elle aussi être importée, ou un rescan doit être effectué pour mettre à jour l'état du portefeuille.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La transaction brute en hex.",
    },
    {
      ...English.inputs[1],
      description: "La preuve TXout en hex.",
    },
  ],
};
