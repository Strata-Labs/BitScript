import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listwalletdir")!;

export const listwalletdirFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Liste les portefeuilles disponibles dans le répertoire wallets.",
  description:
    "Renvoie tous les portefeuilles présents dans `walletdir`, qu'ils soient chargés ou non.",
  howIsThisUsed:
    "La commande listwalletdir sert à récupérer une liste complète des portefeuilles stockés dans le répertoire des portefeuilles. Cette fonctionnalité est essentielle pour diverses tâches d'administration et de gestion des portefeuilles.",
};
