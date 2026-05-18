import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "createrawtransaction")!;

export const createrawtransactionFr: RPCFunctionParams = {
  ...English,
  category: "Transactions brutes",
  summary:
    "Crée une transaction brute à partir d'entrées et de sorties données.",
  description:
    "Construit une transaction non signée selon les UTXO et destinataires fournis.",
  howIsThisUsed:
    "Imaginez créer une carte de vœux personnalisée. Vous avez tous les matériaux étalés sur la table mais vous n'avez encore rien collé. La commande « createrawtransaction » de Bitcoin fonctionne de manière similaire : elle permet de disposer toutes les pièces d'une transaction Bitcoin — qui envoie, qui reçoit — sans rien finaliser. Cette étape revient à préparer votre carte mais à attendre d'y écrire un message personnel avant l'envoi.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Tableau des entrées {txid, vout}.",
    },
    {
      ...English.inputs[1],
      description: "Objet ou tableau des sorties {adresse: montant}.",
    },
  ],
};
