import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getpeerinfo")!;

export const getpeerinfoFr: RPCFunctionParams = {
  ...English,
  category: "Réseau",
  summary:
    "Renvoie des informations détaillées sur chaque pair connecté.",
  description:
    "Liste les pairs connectés avec leur version, ping, agent et statistiques de trafic.",
  howIsThisUsed:
    "Sert à surveiller et diagnostiquer les connexions réseau, en donnant un aperçu du statut, de l'activité des pairs et des problèmes éventuels de communication réseau.",
};
