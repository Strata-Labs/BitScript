import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getnewaddress")!;

export const getnewaddressFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Génère une nouvelle adresse Bitcoin pour recevoir des paiements.",
  description:
    "Renvoie une adresse fraîchement dérivée du portefeuille, optionnellement avec label et type d'adresse.",
  howIsThisUsed:
    "Reçoit des fonds en toute sécurité en fournissant une adresse neuve, ce qui améliore la confidentialité et la sécurité des transactions.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Un label optionnel à associer à la nouvelle adresse.",
    },
  ],
};
