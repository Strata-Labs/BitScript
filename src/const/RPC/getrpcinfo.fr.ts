import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getrpcinfo")!;

export const getrpcinfoFr: RPCFunctionParams = {
  ...English,
  category: "Contrôle",
  summary:
    "Renvoie des informations sur l'état du serveur RPC.",
  description:
    "Liste les commandes RPC en cours et l'emplacement du log.",
  howIsThisUsed:
    "Sert à évaluer les performances et l'état des appels RPC traités par le nœud, ce qui aide à l'optimisation et au diagnostic du fonctionnement du serveur.",
};
