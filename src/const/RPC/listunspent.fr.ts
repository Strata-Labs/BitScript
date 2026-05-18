import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listunspent")!;

export const listunspentFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Liste les sorties non dépensées (UTXO) du portefeuille.",
  description:
    "Renvoie tous les UTXO contrôlés par le portefeuille avec leurs montants et adresses.",
  howIsThisUsed:
    "La commande listunspent sert à récupérer la liste des sorties non dépensées (UTXO) dans une plage de confirmations donnée. C'est essentiel pour construire de nouvelles transactions, en donnant l'information sur les fonds disponibles. La possibilité de filtrer par adresses permet d'obtenir les UTXO d'adresses précises, facilitant la création ciblée de transactions. Le paramètre include_unsafe permet de contrôler l'inclusion de sorties qui ne sont pas sûres à dépenser, offrant de la souplesse dans la gestion des fonds.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Nombre minimum de confirmations.",
    },
    {
      ...English.inputs[1],
      description: "Nombre maximum de confirmations.",
    },
    {
      ...English.inputs[2],
      description: "Liste d'adresses à inclure.",
    },
    {
      ...English.inputs[3],
      description: "Inclure les UTXO non sûrs.",
    },
    {
      ...English.inputs[4],
      description: "Options de filtre (minimumAmount, maximumAmount, etc.).",
    },
  ],
};
