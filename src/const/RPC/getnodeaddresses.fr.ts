import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getnodeaddresses")!;

export const getnodeaddressesFr: RPCFunctionParams = {
  ...English,
  category: "Réseau",
  summary:
    "Renvoie des adresses de nœuds connues, utilisables pour les connexions.",
  description:
    "Renvoie un échantillon des adresses connues par le gestionnaire de pairs.",
  howIsThisUsed:
    "Sert à découvrir des pairs au sein du réseau Bitcoin, pour les tâches de connectivité et d'analyse du réseau.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Nombre d'adresses à renvoyer.",
    },
  ],
};
