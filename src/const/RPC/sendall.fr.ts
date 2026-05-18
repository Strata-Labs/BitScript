import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "sendall")!;

export const sendallFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Envoie l'intégralité du solde disponible vers une ou plusieurs destinations.",
  description:
    "Vide le portefeuille (ou un sous-ensemble) vers les destinataires fournis.",
  howIsThisUsed:
    "La commande sendall sert à gérer et redistribuer efficacement les fonds détenus dans le portefeuille. Elle permet de consolider les UTXO et de payer plusieurs destinataires en une seule transaction, ce qui simplifie la gestion du portefeuille et réduit les frais.",
};
