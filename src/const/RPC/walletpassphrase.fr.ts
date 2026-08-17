import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "walletpassphrase")!;

export const walletpassphraseFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Déverrouille le portefeuille pour une durée donnée.",
  description:
    "Stocke temporairement la phrase de passe pour autoriser les signatures.",
  howIsThisUsed:
    "Sert à déverrouiller temporairement le portefeuille en stockant la clé de déchiffrement en mémoire pendant une durée donnée. Nécessaire avant d'effectuer des opérations qui sollicitent les clés privées (envoyer des bitcoins). En fournissant la phrase de passe et la durée, vous déverrouillez le portefeuille pour une fenêtre limitée — exécution sécurisée des transactions sans exposer la clé de déchiffrement trop longtemps. Cela améliore la sécurité du portefeuille en minimisant l'exposition des informations sensibles tout en permettant les opérations nécessaires.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La phrase de passe du portefeuille.",
    },
    {
      ...English.inputs[1],
      description: "Durée en secondes pendant laquelle le portefeuille reste déverrouillé.",
    },
  ],
};
