import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "addnode")!;

export const addnodeFr: RPCFunctionParams = {
  ...English,
  category: "Réseau",
  summary:
    "Gère les connexions à d'autres nœuds : ajout, suppression ou connexion à la demande.",
  description:
    "Cette commande permet de gérer manuellement les connexions de pairs : ajouter, retirer ou tenter une connexion unique.",
  howIsThisUsed:
    "Voyez votre portefeuille Bitcoin comme partie prenante d'un grand réseau, comme habiter une immense ville bouillonnante. Tout comme on peut vouloir y faire de nouvelles connaissances, éviter certaines personnes ou occasionnellement retrouver quelqu'un autour d'un café, la commande « addnode » aide à gérer avec qui votre portefeuille communique sur le réseau Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'adresse du pair auquel se connecter.",
    },
    {
      ...English.inputs[1],
      description: "Action : « add », « remove » ou « onetry ».",
    },
    {
      ...English.inputs[2],
      description: "Version v2 à utiliser (optionnel).",
    },
  ],
};
