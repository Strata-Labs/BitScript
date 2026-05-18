import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "verifymessage")!;

export const verifymessageFr: RPCFunctionParams = {
  ...English,
  category: "Utilitaires",
  summary:
    "Vérifie qu'un message a bien été signé par le propriétaire d'une adresse.",
  description:
    "Vérifie une signature de message produite par `signmessage`.",
  howIsThisUsed:
    "Sert à prouver la propriété d'une adresse Bitcoin ou à vérifier qu'un expéditeur détient la clé privée, ce qui renforce la sécurité et la confiance dans les communications liées aux transactions Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'adresse Bitcoin utilisée pour signer.",
    },
    {
      ...English.inputs[1],
      description: "La signature en base64.",
    },
    {
      ...English.inputs[2],
      description: "Le message signé.",
    },
  ],
};
