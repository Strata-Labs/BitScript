import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getnettotals")!;

export const getnettotalsFr: RPCFunctionParams = {
  ...English,
  category: "Réseau",
  summary:
    "Renvoie les statistiques totales de trafic réseau du nœud.",
  description:
    "Donne le total des octets envoyés et reçus depuis le démarrage du nœud.",
  howIsThisUsed:
    "Sert à surveiller l'échange de données du nœud avec le réseau Bitcoin, ce qui aide à évaluer la santé et les performances du réseau.",
};
