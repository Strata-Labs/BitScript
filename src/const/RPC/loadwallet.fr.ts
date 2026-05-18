import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "loadwallet")!;

export const loadwalletFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Charge un portefeuille à partir d'un fichier ou d'un répertoire.",
  description:
    "Ouvre un portefeuille existant dans bitcoind.",
  howIsThisUsed:
    "Le RPC loadwallet sert à charger dynamiquement des portefeuilles dans le nœud Bitcoin Core, permettant de gérer efficacement plusieurs portefeuilles. Il permet de basculer entre portefeuilles et facilite l'ajout de nouveaux portefeuilles au besoin. Particulièrement utile pour les personnes qui travaillent régulièrement avec plusieurs portefeuilles ou qui veulent que certains portefeuilles soient chargés automatiquement au démarrage. La possibilité de définir si le portefeuille chargé doit être sauvegardé dans les réglages persistants offre du confort en assurant que les portefeuilles voulus sont prêts à l'emploi.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le nom du portefeuille à charger.",
    },
    {
      ...English.inputs[1],
      description: "Charger le portefeuille au prochain démarrage.",
    },
  ],
};
