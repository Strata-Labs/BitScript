import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "sendtoaddress")!;

export const sendtoaddressFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Envoie des bitcoins à une adresse donnée.",
  description:
    "Crée et diffuse une transaction vers une adresse Bitcoin spécifique.",
  howIsThisUsed:
    "Cette commande est essentielle pour transférer du Bitcoin d'une adresse à une autre. Particulièrement utile pour des transactions ponctuelles — paiements personnels, dons ou transactions professionnelles.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'adresse Bitcoin du destinataire.",
    },
    {
      ...English.inputs[1],
      description: "Le montant en BTC.",
    },
    {
      ...English.inputs[2],
      description: "Un commentaire stocké localement sur la transaction.",
    },
    {
      ...English.inputs[3],
      description: "Un commentaire concernant le destinataire.",
    },
    {
      ...English.inputs[4],
      description: "Si vrai, les frais sont déduits du montant envoyé.",
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
