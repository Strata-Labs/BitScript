import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getmempoolinfo")!;

export const getmempoolinfoFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Renvoie des informations globales sur l'état du mempool.",
  description:
    "Fournit taille, taille mémoire, tarif minimum, etc. du mempool.",
  howIsThisUsed:
    "getmempoolinfo est essentiel pour surveiller et analyser l'état actuel du mempool, en aidant à comprendre sa congestion, à estimer plus finement les frais et à mesurer l'activité et la santé globale du réseau. En fournissant des données sur la taille, les octets, l'utilisation et les frais liés au mempool, elle aide à décider en connaissance de cause pour soumettre des transactions et optimiser.",
};
