import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "submitpackage")!;

export const submitpackageFr: RPCFunctionParams = {
  ...English,
  category: "Transactions brutes",
  summary:
    "Soumet un paquet de transactions à valider ensemble dans le mempool.",
  description:
    "Permet d'envoyer plusieurs transactions liées (paquet) à valider comme groupe.",
  howIsThisUsed:
    "Sert à soumettre des chaînes de transactions interdépendantes pour une acceptation plus efficace par le mempool, particulièrement utile pour des constructions complexes incluant plusieurs dépendances.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Tableau des transactions brutes en hex.",
    },
  ],
};
