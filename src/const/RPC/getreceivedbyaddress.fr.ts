import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getreceivedbyaddress")!;

export const getreceivedbyaddressFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Renvoie le total des bitcoins reçus par une adresse donnée.",
  description:
    "Calcule la somme reçue par une adresse spécifique, avec un seuil de confirmations.",
  howIsThisUsed:
    "Sert à vérifier et évaluer le total reçu sur une adresse précise — important pour la comptabilité et le suivi financier.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'adresse Bitcoin à interroger.",
    },
    {
      ...English.inputs[1],
      description: "Le nombre minimum de confirmations pour inclure une transaction.",
    },
  ],
};
