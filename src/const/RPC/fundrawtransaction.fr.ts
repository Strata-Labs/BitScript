import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "fundrawtransaction")!;

export const fundrawtransactionFr: RPCFunctionParams = {
  ...English,
  category: "Transactions brutes",
  summary:
    "Sélectionne des UTXO du portefeuille pour financer une transaction brute.",
  description:
    "Ajoute les entrées nécessaires et un éventuel change à une transaction brute existante.",
  howIsThisUsed:
    "Imaginez assembler un puzzle ; après avoir démarré, vous réalisez qu'il vous manque des pièces pour terminer l'image. La commande « fundrawtransaction » agit comme une recherche et un ajout des pièces manquantes à votre transaction. Quand vous créez une transaction brute (le puzzle à compléter), vous n'avez pas toujours toutes les entrées (pièces) pour atteindre la valeur que vous voulez envoyer. Cette commande sélectionne automatiquement parmi vos bitcoins disponibles, en les ajoutant comme entrées pour que la valeur totale corresponde à ce que vous tentez d'envoyer, en ajoutant si nécessaire une sortie de monnaie si vous envoyez moins que la valeur totale des entrées.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La transaction brute en hex.",
    },
    {
      ...English.inputs[1],
      description: "Options de financement (frais, replaceable, etc.).",
    },
    {
      ...English.inputs[2],
      description: "Inclure des informations bip32 pour les signataires.",
    },
  ],
};
