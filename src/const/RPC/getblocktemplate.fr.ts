import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblocktemplate")!;

export const getblocktemplateFr: RPCFunctionParams = {
  ...English,
  category: "Mining",
  summary:
    "Renvoie un modèle de bloc pour le mining.",
  description:
    "Fournit les données nécessaires (template) à un mineur pour construire un nouveau bloc.",
  howIsThisUsed:
    "Imaginez un architecte sur le point de débuter un nouveau bâtiment. Avant de commencer, il a besoin d'un plan qui décrit ce qu'il faut construire, les matériaux à utiliser et les autres spécifications. De même, dans le mining Bitcoin, la commande « getblocktemplate » sert de plan pour construire un nouveau bloc. Elle fournit aux mineurs les informations nécessaires pour démarrer le mining d'un nouveau bloc : quelles transactions inclure, les frais associés à ces transactions et divers autres paramètres critiques au processus de mining.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Objet JSON des règles et capacités du client.",
    },
  ],
};
