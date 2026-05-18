import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "importwallet")!;

export const importwalletFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Importe les clés d'un fichier dump dans le portefeuille.",
  description:
    "Charge les clés exportées par `dumpwallet` dans le portefeuille courant.",
  howIsThisUsed:
    "Cette commande est essentielle pour restaurer ou transférer un portefeuille en important les clés depuis un fichier de dump. Elle permet de garder l'accès aux fonds et à l'historique des transactions. À utiliser lors d'une migration entre instances ou d'une récupération depuis une sauvegarde. Le rescan automatique garantit que l'historique du portefeuille est synchronisé avec la blockchain après l'import.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le chemin du fichier de dump à importer.",
    },
  ],
};
