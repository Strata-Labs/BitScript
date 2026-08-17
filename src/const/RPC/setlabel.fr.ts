import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "setlabel")!;

export const setlabelFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Associe un label à une adresse.",
  description:
    "Définit ou met à jour le label d'une adresse du portefeuille.",
  howIsThisUsed:
    "Cette commande sert à attribuer un label à une adresse Bitcoin du portefeuille. On peut vouloir labéliser des adresses pour les classer par usage ou les associer à des transactions ou destinataires spécifiques. Le label défini peut ensuite servir de référence lors de la gestion des adresses.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'adresse Bitcoin à labéliser.",
    },
    {
      ...English.inputs[1],
      description: "Le nouveau label.",
    },
  ],
};
