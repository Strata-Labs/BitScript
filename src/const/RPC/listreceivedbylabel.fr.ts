import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listreceivedbylabel")!;

export const listreceivedbylabelFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Liste les bitcoins reçus par label.",
  description:
    "Renvoie chaque label du portefeuille avec le total reçu pour ses adresses.",
  howIsThisUsed:
    "La commande listreceivedbylabel sert à suivre les transactions reçues, groupées par label. Particulièrement utile pour gérer et organiser les transactions au sein du portefeuille, elle permet de suivre les paiements entrants associés à des labels ou catégories spécifiques. Elle aide aussi à l'analyse et au reporting financier en donnant un aperçu de la répartition des fonds reçus entre les différents labels.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le nombre minimum de confirmations.",
    },
    {
      ...English.inputs[1],
      description: "Inclure les labels n'ayant rien reçu.",
    },
    {
      ...English.inputs[2],
      description: "Inclure les adresses watch-only.",
    },
  ],
};
