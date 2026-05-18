import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "signrawtransactionwithwallet")!;

export const signrawtransactionwithwalletFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Signe une transaction brute avec les clés du portefeuille.",
  description:
    "Tente de signer chaque entrée d'une transaction brute en utilisant le portefeuille.",
  howIsThisUsed:
    "Cette commande sert à signer les entrées d'une transaction brute avec les clés stockées dans le portefeuille — un moyen pratique de signer sans spécifier manuellement les clés privées. Elle facilite la signature avec les clés gérées par le portefeuille, garantissant sécurité et simplicité. Elle renvoie la transaction signée avec des informations sur sa complétude et toute erreur de vérification de script rencontrée pendant le processus.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La transaction brute en hex.",
    },
    {
      ...English.inputs[1],
      description: "Tableau JSON des UTXO précédents (optionnel).",
    },
  ],
};
