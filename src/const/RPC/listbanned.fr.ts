import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listbanned")!;

export const listbannedFr: RPCFunctionParams = {
  ...English,
  category: "Réseau",
  summary:
    "Renvoie la liste des pairs actuellement bannis.",
  description:
    "Liste les adresses ou sous-réseaux qui sont bannis sur ce nœud.",
  howIsThisUsed:
    "Cette commande sert à revoir la liste des adresses IP ou sous-réseaux qui ont été manuellement bannis d'accéder au nœud. Elle fournit des informations essentielles sur chaque bannissement, ce qui permet aux administrateurs réseau de gérer efficacement les restrictions d'accès.",
};
