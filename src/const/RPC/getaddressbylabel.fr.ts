import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getaddressbylabel")!;

export const getaddressbylabelFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Renvoie la liste des adresses associées au label donné.",
  description:
    "Récupère les adresses du portefeuille classées sous le label spécifié.",
  howIsThisUsed:
    "Votre portefeuille contient plusieurs adresses utilisées pour différents besoins — certaines pour des transactions personnelles, d'autres pour le professionnel, d'autres encore pour des dons. Attribuer un label à chaque groupe d'adresses aide à les organiser. Si vous avez besoin de revoir transactions ou soldes liés à un domaine spécifique de votre vie ou de votre activité, une commande comme « getaddressbylabel » liste rapidement toutes les adresses sous un label donné.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le label dont on veut lister les adresses.",
    },
  ],
};
