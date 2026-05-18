import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "signmessagewithprivkey")!;

export const signmessagewithprivkeyFr: RPCFunctionParams = {
  ...English,
  category: "Utilitaires",
  summary:
    "Signe un message avec une clé privée arbitraire.",
  description:
    "Produit une signature de message sans nécessiter le portefeuille.",
  howIsThisUsed:
    "Cette commande sert quand on a un accès direct à une clé privée et qu'on n'a pas besoin de passer par un portefeuille ou une phrase de passe. Elle permet de signer des messages avec une clé privée spécifique, ce qui peut être utile pour signer des messages hors ligne ou quand le signataire veut un contrôle total sur le processus. Typiquement utilisée pour des messages d'authentification ou la vérification cryptographique d'identité.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La clé privée (WIF).",
    },
    {
      ...English.inputs[1],
      description: "Le message à signer.",
    },
  ],
};
