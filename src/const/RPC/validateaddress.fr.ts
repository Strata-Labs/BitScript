import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "validateaddress")!;

export const validateaddressFr: RPCFunctionParams = {
  ...English,
  category: "Utilitaires",
  summary:
    "Vérifie si une adresse Bitcoin est valide.",
  description:
    "Renvoie un objet décrivant la validité et la nature d'une adresse.",
  howIsThisUsed:
    "Principalement utilisée pour valider une adresse Bitcoin avant d'engager une transaction, en s'assurant que les adresses sont correctes et pour confirmer la propriété et les détails de l'adresse.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'adresse Bitcoin à valider.",
    },
  ],
};
