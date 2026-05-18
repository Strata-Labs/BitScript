import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "setnetworkactive")!;

export const setnetworkactiveFr: RPCFunctionParams = {
  ...English,
  category: "Réseau",
  summary:
    "Active ou désactive complètement l'activité réseau du nœud.",
  description:
    "Permet de couper toutes les connexions sortantes/entrantes ou de les rétablir.",
  howIsThisUsed:
    "Cette commande sert à contrôler l'activité du réseau P2P du client Bitcoin. En passant une valeur booléenne (true/false), vous activez ou désactivez l'ensemble de l'activité réseau. Pratique quand on doit interrompre temporairement les communications réseau — maintenance ou diagnostic. Elle renvoie une valeur booléenne indiquant si l'activité a bien été activée ou désactivée.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Vrai pour activer le réseau, faux pour le désactiver.",
    },
  ],
};
