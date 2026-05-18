import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "unloadwallet")!;

export const unloadwalletFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Décharge un portefeuille actuellement chargé.",
  description:
    "Ferme un portefeuille pour libérer ses ressources.",
  howIsThisUsed:
    "Cette commande sert à décharger un portefeuille du nœud Bitcoin Core en toute sécurité, libérant des ressources système. Utile pour gérer plusieurs portefeuilles ou pendant des tâches de maintenance. Le paramètre optionnel « load_on_startup » permet de configurer si le portefeuille doit être chargé automatiquement au démarrage, offrant de la souplesse.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le nom du portefeuille à décharger.",
    },
    {
      ...English.inputs[1],
      description: "Ne plus le charger au prochain démarrage.",
    },
  ],
};
