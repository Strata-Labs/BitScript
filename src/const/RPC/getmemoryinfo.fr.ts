import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getmemoryinfo")!;

export const getmemoryinfoFr: RPCFunctionParams = {
  ...English,
  category: "Contrôle",
  summary:
    "Renvoie des informations sur l'utilisation mémoire du nœud.",
  description:
    "Donne l'état de l'allocateur mémoire utilisé par bitcoind.",
  howIsThisUsed:
    "Imaginez faire tourner un système informatique complexe pour une grande entreprise et devoir surveiller en permanence l'utilisation mémoire pour qu'il fonctionne efficacement. Dans le réseau Bitcoin, la commande « getmemoryinfo » remplit un rôle similaire pour les opérateurs de nœuds et les développeurs. Elle permet de surveiller la mémoire utilisée par leur nœud Bitcoin, ce qui aide à diagnostiquer les éventuels problèmes ou inefficacités susceptibles d'affecter les performances.",
};
