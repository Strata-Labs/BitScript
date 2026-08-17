import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "restorewallet")!;

export const restorewalletFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Restaure un portefeuille à partir d'une sauvegarde.",
  description:
    "Charge un portefeuille à partir d'un fichier de sauvegarde.",
  howIsThisUsed:
    "La commande restorewallet est essentielle pour récupérer des portefeuilles à partir de fichiers de sauvegarde quand le portefeuille d'origine est perdu, corrompu ou inaccessible. Elle permet de recréer les données du portefeuille — clés privées et historique des transactions — à partir d'une sauvegarde précédente. Particulièrement utile pour transférer un portefeuille sur un nouvel appareil, récupérer après une suppression accidentelle ou se remettre d'un problème de portefeuille.",
};
