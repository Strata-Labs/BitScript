import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "stop")!;

export const stopFr: RPCFunctionParams = {
  ...English,
  category: "Contrôle",
  summary:
    "Arrête proprement le nœud Bitcoin.",
  description:
    "Demande au nœud de s'arrêter en sauvegardant l'état.",
  howIsThisUsed:
    "La commande stop sert à terminer proprement le serveur Bitcoin Core, en garantissant la bonne fermeture des processus en cours et l'intégrité des données. Essentielle pour maintenir la stabilité et la fiabilité de l'environnement serveur.",
};
