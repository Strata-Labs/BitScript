import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "send")!;

export const sendFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Envoie des bitcoins à plusieurs destinataires en une transaction.",
  description:
    "Construit, signe et diffuse une transaction vers plusieurs adresses.",
  howIsThisUsed:
    "Cette commande sert à initier des transactions Bitcoin, en permettant de transférer des fonds vers des destinataires désignés ou d'inscrire des données dans la blockchain. Elle est essentielle pour réaliser des transactions de manière sûre et efficace sur le réseau Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Tableau JSON {adresse: montant} des destinataires.",
    },
    {
      ...English.inputs[1],
      description: "Cible de confirmation en nombre de blocs.",
    },
    {
      ...English.inputs[2],
      description: "Mode d'estimation des frais : « unset », « economical » ou « conservative ».",
    },
    {
      ...English.inputs[3],
      description: "Frais en BTC/kvB.",
    },
    {
      ...English.inputs[4],
      description: "Options additionnelles (sous-traction des frais, etc.).",
    },
  ],
};
