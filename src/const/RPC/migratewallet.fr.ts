import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "migratewallet")!;

export const migratewalletFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Migre un portefeuille legacy vers un portefeuille à descripteurs.",
  description:
    "Convertit un portefeuille existant en portefeuille basé sur des descripteurs.",
  howIsThisUsed:
    "Le RPC migratewallet sert à faire évoluer un portefeuille Legacy vers un portefeuille à descripteurs, pour profiter de fonctionnalités améliorées et d'une meilleure compatibilité. Les portefeuilles à descripteurs offrent davantage de fonctionnalités et sont mieux adaptés aux futures évolutions de Bitcoin Core. Cette migration est bénéfique aux utilisateurs qui veulent garder leur portefeuille compatible avec les changements à venir. Attention : cette fonctionnalité est expérimentale et peut ne pas se comporter comme attendu dans tous les cas. Sauvegardez soigneusement avant de migrer.",
};
