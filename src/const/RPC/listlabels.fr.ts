import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listlabels")!;

export const listlabelsFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Renvoie la liste de tous les labels utilisés dans le portefeuille.",
  description:
    "Liste les labels associés aux adresses du portefeuille.",
  howIsThisUsed:
    "Sert à gérer et organiser les adresses en leur attribuant des labels. En offrant la possibilité de lister les labels selon leur but, vous catégorisez efficacement vos adresses pour un meilleur suivi et une meilleure gestion.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Type de but à filtrer (receive/send). Optionnel.",
    },
  ],
};
