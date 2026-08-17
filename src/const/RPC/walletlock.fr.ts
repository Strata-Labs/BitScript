import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "walletlock")!;

export const walletlockFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Verrouille le portefeuille, effaçant la phrase de passe en mémoire.",
  description:
    "Bloque immédiatement les opérations nécessitant la phrase de passe.",
  howIsThisUsed:
    "La commande walletlock sert à renforcer la sécurité du portefeuille en le verrouillant quand il n'est pas utilisé. Elle empêche tout accès non autorisé aux fonctions et fonds du portefeuille, en particulier quand celui-ci n'est pas actif. C'est une bonne pratique recommandée de verrouiller le portefeuille au repos pour prévenir un accès non autorisé et un vol potentiel.",
};
