import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "uptime")!;

export const uptimeFr: RPCFunctionParams = {
  ...English,
  category: "Contrôle",
  summary:
    "Renvoie le temps écoulé (en secondes) depuis le démarrage du nœud.",
  description:
    "Indique depuis combien de temps le nœud tourne.",
  howIsThisUsed:
    "La commande uptime sert à surveiller la durée de fonctionnement ininterrompu du serveur Bitcoin Core. Pratique pour suivre la stabilité du système et diagnostiquer d'éventuels problèmes de disponibilité.",
};
