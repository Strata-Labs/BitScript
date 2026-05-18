import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "signmessage")!;

export const signmessageFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Signe un message avec la clé privée d'une adresse.",
  description:
    "Produit une signature prouvant la possession d'une adresse.",
  howIsThisUsed:
    "Cette commande sert à fournir une preuve cryptographique de possession ou d'authorship pour un message en le signant avec la clé privée correspondant à une adresse Bitcoin. La signature obtenue peut être vérifiée plus tard via la commande verifymessage. Couramment utilisée pour prouver la possession d'une adresse Bitcoin, signer des messages à des fins d'authentification ou la vérification cryptographique d'identité.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'adresse Bitcoin utilisée pour signer.",
    },
    {
      ...English.inputs[1],
      description: "Le message à signer.",
    },
  ],
};
