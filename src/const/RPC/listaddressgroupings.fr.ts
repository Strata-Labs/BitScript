import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listaddressgroupings")!;

export const listaddressgroupingsFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Renvoie des groupes d'adresses qui ont reçu des fonds ensemble.",
  description:
    "Liste les heuristiques de regroupement d'adresses utilisées par le portefeuille.",
  howIsThisUsed:
    "Sert à obtenir des informations sur des groupes d'adresses liées entre elles par leur usage commun dans des transactions. Utile pour analyser la propriété des adresses et l'historique des transactions.",
};
