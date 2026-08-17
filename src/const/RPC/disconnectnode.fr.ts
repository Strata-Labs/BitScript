import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "disconnectnode")!;

export const disconnectnodeFr: RPCFunctionParams = {
  ...English,
  category: "Réseau",
  summary:
    "Déconnecte immédiatement un nœud connecté.",
  description:
    "Force la déconnexion d'un pair, soit par adresse soit par identifiant.",
  howIsThisUsed:
    "Imaginez organiser une grande réunion en ligne ; l'un des participants commence à perturber la conversation. Vous pouvez l'exclure pour rétablir l'ordre. De même, la commande « disconnectnode » du réseau Bitcoin permet de retirer manuellement un participant (nœud) de votre liste de connexions. Que ce soit pour comportement malveillant, problèmes techniques ou toute autre raison jugée nécessaire, vous pouvez vous déconnecter de lui par son identifiant unique ou son adresse Internet.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'adresse du nœud à déconnecter.",
    },
    {
      ...English.inputs[1],
      description: "L'identifiant interne du nœud (alternative à l'adresse).",
    },
  ],
};
