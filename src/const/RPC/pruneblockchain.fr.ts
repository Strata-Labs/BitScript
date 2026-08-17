import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "pruneblockchain")!;

export const pruneblockchainFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Élague les blocs antérieurs à une hauteur ou un timestamp donné.",
  description:
    "Libère de l'espace disque en supprimant les anciens blocs sur un nœud pruné.",
  howIsThisUsed:
    "Le RPC pruneblockchain sert principalement à réduire l'espace disque requis pour faire tourner un full node en supprimant les anciennes données blockchain qui ne sont plus nécessaires à la validation ou au consensus. Particulièrement utile aux nœuds disposant de peu de stockage ou tournant sur des appareils aux ressources limitées. En élaguant périodiquement la blockchain, vous gardez un nœud fonctionnel tout en minimisant la surcharge de stockage. L'élagage peut aussi améliorer le temps de synchronisation pour les nouveaux nœuds en réduisant la quantité de données à télécharger et valider.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Hauteur cible ou timestamp Unix jusqu'auquel élaguer.",
    },
  ],
};
