import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getreceivedbylabel")!;

export const getreceivedbylabelFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Renvoie le total des bitcoins reçus par les adresses d'un label donné.",
  description:
    "Calcule la somme reçue par toutes les adresses regroupées sous un même label.",
  howIsThisUsed:
    "Utile pour organiser et suivre les transactions entrantes par label, facilitant la gestion financière au sein d'un portefeuille Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le label à interroger.",
    },
    {
      ...English.inputs[1],
      description: "Le nombre minimum de confirmations pour inclure une transaction.",
    },
  ],
};
