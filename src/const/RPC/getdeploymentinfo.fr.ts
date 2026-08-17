import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getdeploymentinfo")!;

export const getdeploymentinfoFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Renvoie l'état des déploiements soft-fork.",
  description:
    "Donne le statut des activations des soft-forks via BIP9/BIP8.",
  howIsThisUsed:
    "Imaginez faire partie d'une communauté qui décide de nouvelles règles ou de modifications par consensus collectif. Pour décider en connaissance de cause ou comprendre l'état actuel des règles, vous auriez besoin d'un moyen fiable de suivre quelles propositions ont été acceptées, lesquelles sont en attente et lesquelles ont été pleinement appliquées. Dans le réseau Bitcoin, « getdeploymentinfo » remplit ce rôle pour le suivi des changements aux règles de consensus, mis en œuvre via des mécanismes comme les soft forks.",
};
