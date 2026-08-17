import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "keypoolrefill")!;

export const keypoolrefillFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Remplit le pool de clés du portefeuille pour des adresses futures.",
  description:
    "Réapprovisionne le keypool, utile après import de clés ou changement de configuration.",
  howIsThisUsed:
    "Cette commande sert généralement à maintenir un stock de clés inutilisées dans le portefeuille. Quand une nouvelle adresse est générée ou qu'une transaction est signée, une clé est consommée depuis le keypool. Le réapprovisionner garantit que le portefeuille dispose en permanence d'assez de clés, ce qui améliore l'efficacité et évite les problèmes d'épuisement de clés.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La nouvelle taille du keypool.",
    },
  ],
};
