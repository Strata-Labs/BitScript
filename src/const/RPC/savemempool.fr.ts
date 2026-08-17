import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "savemempool")!;

export const savemempoolFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Sauvegarde immédiatement le mempool sur le disque.",
  description:
    "Force la sérialisation du mempool actuel dans `mempool.dat`.",
  howIsThisUsed:
    "La commande savemempool est généralement utilisée par les opérateurs de nœuds et développeurs pour s'assurer que les transactions non confirmées présentes dans le mempool ne sont pas perdues pendant les arrêts. En sauvegardant le mempool sur disque, on préserve les transactions en attente et on évite qu'elles soient expulsées à l'arrêt du nœud. Particulièrement important pour les mineurs qui s'appuient sur le mempool pour inclure des transactions dans les blocs minés. Les développeurs peuvent aussi l'utiliser pour des stratégies de gestion personnalisées du mempool ou des analyses des transactions en attente.",
};
