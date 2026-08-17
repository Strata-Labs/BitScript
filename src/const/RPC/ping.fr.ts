import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "ping")!;

export const pingFr: RPCFunctionParams = {
  ...English,
  category: "Réseau",
  summary:
    "Demande un ping vers tous les pairs connectés.",
  description:
    "Envoie un message ping à chaque pair pour mesurer le temps de réponse.",
  howIsThisUsed:
    "Le RPC ping sert à mesurer le temps de ping vers les autres nœuds du réseau Bitcoin. En envoyant une requête ping à tous les autres nœuds, un nœud peut mesurer l'aller-retour. Cette information est précieuse pour évaluer la latence et la santé globale du réseau. Les résultats du ping, dont pingtime et pingwait, donnent un aperçu de la réactivité du réseau et d'un éventuel arriéré de traitement. Utile au diagnostic et à la surveillance des performances du nœud Bitcoin.",
};
