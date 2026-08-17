import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getaddressinfo")!;

export const getaddressinfoFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Renvoie des informations détaillées sur une adresse Bitcoin du portefeuille.",
  description:
    "Récupère les métadonnées d'une adresse appartenant au portefeuille (clé publique, label, type, etc.).",
  howIsThisUsed:
    "Imaginez faire une vérification poussée sur une voiture que vous envisagez d'acheter : historique, état actuel, tout détail pertinent avant de décider. De même, dans le réseau Bitcoin, face à une adresse précise, vous voulez souvent en savoir plus — sa validité, son lien éventuel avec votre portefeuille, et tout autre élément pouvant influencer votre interaction. La commande « getaddressinfo » répond à ce besoin en fournissant une vue d'ensemble d'une adresse Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'adresse Bitcoin à inspecter.",
    },
  ],
};
