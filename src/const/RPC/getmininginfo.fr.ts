import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getmininginfo")!;

export const getmininginfoFr: RPCFunctionParams = {
  ...English,
  category: "Mining",
  summary:
    "Renvoie un objet contenant les informations de mining.",
  description:
    "Donne l'état actuel du mining (difficulté, hashrate réseau, taille du bloc en cours, etc.).",
  howIsThisUsed:
    "Sert à recueillir des informations complètes sur les activités de mining du nœud et l'état du mining du réseau — utile aux mineurs et aux analystes qui suivent la santé et la compétitivité de l'environnement de mining.",
};
