import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "upgradewallet")!;

export const upgradewalletFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Met à niveau le format du portefeuille vers la version courante.",
  description:
    "Convertit le portefeuille vers une version plus récente du format de stockage.",
  howIsThisUsed:
    "Cette commande sert à s'assurer que le portefeuille utilise la dernière version disponible, qui peut inclure d'importants correctifs de sécurité ou des améliorations. Il est essentiel de mettre à jour périodiquement pour maintenir la compatibilité avec le réseau Bitcoin et bénéficier des dernières améliorations de fonctionnalité et de sécurité.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Version cible (optionnel).",
    },
  ],
};
