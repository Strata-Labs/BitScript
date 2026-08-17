import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listreceivedbyaddress")!;

export const listreceivedbyaddressFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Liste les bitcoins reçus par adresse.",
  description:
    "Renvoie chaque adresse du portefeuille avec le total reçu.",
  howIsThisUsed:
    "Sert à obtenir une vue complète des soldes liés aux adresses de réception du portefeuille. Fournit les informations essentielles au suivi des paiements entrants, à la confirmation des transactions et à la gestion des soldes. Offre aussi de la flexibilité grâce à diverses options pour filtrer et personnaliser les résultats selon les besoins.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le nombre minimum de confirmations.",
    },
    {
      ...English.inputs[1],
      description: "Inclure les adresses n'ayant rien reçu.",
    },
    {
      ...English.inputs[2],
      description: "Inclure les adresses watch-only.",
    },
    {
      ...English.inputs[3],
      description: "Filtrer sur une adresse précise.",
    },
  ],
};
