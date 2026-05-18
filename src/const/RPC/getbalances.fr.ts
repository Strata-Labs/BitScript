import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getbalances")!;

export const getbalancesFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Renvoie un objet avec tous les soldes (mine, watchonly, etc.).",
  description:
    "Donne une vue détaillée des soldes du portefeuille par catégorie.",
  howIsThisUsed:
    "Imaginez disposer d'un tableau de bord financier détaillé pour tous vos actifs, qui montre non seulement le total mais aussi la répartition selon le statut courant — ce qui est immédiatement disponible, ce qui est en attente, ce qui est verrouillé pour une période donnée. La commande « getbalances » joue ce rôle pour votre portefeuille Bitcoin. Elle décompose vos avoirs en catégories détaillées : solde de confiance (bitcoins ayant reçu assez de confirmations pour être considérés sûrs et dépensables), solde en attente non fiable (transactions entrantes non encore confirmées, potentiellement réversibles), solde immature (récompenses de mining ou de staking pas encore dépensables tant qu'un certain nombre de confirmations n'est pas atteint). Cette commande donne une vue complète de votre situation financière, vous aidant à comprendre non seulement combien de bitcoins vous avez au total, mais aussi quelle part est accessible vs. en attente ou immature.",
};
