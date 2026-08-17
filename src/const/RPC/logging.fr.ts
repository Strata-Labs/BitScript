import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "logging")!;

export const loggingFr: RPCFunctionParams = {
  ...English,
  category: "Contrôle",
  summary:
    "Active ou désactive les catégories de logs.",
  description:
    "Configure dynamiquement quelles catégories de logs sont émises.",
  howIsThisUsed:
    "Le RPC logging sert à gérer la configuration des logs dans Bitcoin Core. Il permet de contrôler quelles catégories d'événements sont journalisées à des fins de debugging. En précisant les catégories à inclure ou exclure, vous ajustez la sortie des logs pour vous concentrer sur certains domaines ou réduire la verbosité. Particulièrement utile pour diagnostiquer des problèmes, surveiller des composants spécifiques ou optimiser les performances. La possibilité d'ajuster dynamiquement la configuration des logs offre de la souplesse pour le debugging et le diagnostic des nœuds Bitcoin Core.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Catégories à activer.",
    },
    {
      ...English.inputs[1],
      description: "Catégories à désactiver.",
    },
  ],
};
