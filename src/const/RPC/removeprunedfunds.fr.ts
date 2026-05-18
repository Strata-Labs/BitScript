import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "removeprunedfunds")!;

export const removeprunedfundsFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Supprime des fonds importés via `importprunedfunds`.",
  description:
    "Retire une transaction prunée précédemment importée.",
  howIsThisUsed:
    "Le RPC removeprunedfunds sert avant tout, dans les portefeuilles prunés, à supprimer des transactions qui ne sont plus nécessaires. Un portefeuille pruné ne stocke qu'un sous-ensemble de la blockchain, en écartant les anciennes données pour économiser l'espace disque. Même en mode pruné, on peut vouloir gérer les fonds ou faire le ménage dans l'historique. Cette commande permet de retirer des transactions individuelles du portefeuille — utile pour améliorer les performances ou pour la confidentialité en effaçant des détails sensibles.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'identifiant de la transaction à retirer.",
    },
  ],
};
