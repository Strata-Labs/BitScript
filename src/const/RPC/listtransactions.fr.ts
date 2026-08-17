import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listtransactions")!;

export const listtransactionsFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Renvoie les transactions les plus récentes du portefeuille.",
  description:
    "Liste les transactions du portefeuille avec pagination par compte ou label.",
  howIsThisUsed:
    "La commande listtransactions sert à récupérer un nombre donné de transactions récentes depuis l'historique du portefeuille. Elle aide les utilisateurs et applications à suivre l'activité, surveiller les paiements entrants et sortants, et gérer les finances. Elle offre aussi de la flexibilité pour filtrer par label, permettant d'organiser et d'analyser les transactions plus efficacement.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Label à filtrer. « * » pour tout.",
    },
    {
      ...English.inputs[1],
      description: "Nombre de transactions à renvoyer.",
    },
    {
      ...English.inputs[2],
      description: "Décalage à partir duquel renvoyer.",
    },
    {
      ...English.inputs[3],
      description: "Inclure les transactions watch-only.",
    },
  ],
};
