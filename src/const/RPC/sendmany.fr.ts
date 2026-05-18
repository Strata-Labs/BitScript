import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "sendmany")!;

export const sendmanyFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Envoie des bitcoins à plusieurs adresses en une seule transaction.",
  description:
    "Crée et diffuse une transaction multi-destinataires depuis le portefeuille.",
  howIsThisUsed:
    "La commande sendmany sert à simplifier la distribution de Bitcoin vers de nombreuses adresses en une seule transaction. C'est un outil clé pour les entreprises, organisations ou particuliers qui doivent effectuer des paiements ou versements en masse efficacement.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Compte source (déprécié). Utiliser « ».",
    },
    {
      ...English.inputs[1],
      description: "Objet JSON {adresse: montant} des destinataires.",
    },
    {
      ...English.inputs[2],
      description: "Nombre minimum de confirmations pour les UTXO sources.",
    },
    {
      ...English.inputs[3],
      description: "Un commentaire stocké localement.",
    },
    {
      ...English.inputs[4],
      description: "Tableau des adresses qui paieront les frais.",
    },
    {
      ...English.inputs[5],
      description: "Activer le replace-by-fee.",
    },
    {
      ...English.inputs[6],
      description: "Cible de confirmation en blocs.",
    },
    {
      ...English.inputs[7],
      description: "Mode d'estimation des frais.",
    },
    {
      ...English.inputs[8],
      description: "Frais en BTC/kvB.",
    },
  ],
};
