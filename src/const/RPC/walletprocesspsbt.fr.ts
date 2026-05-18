import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "walletprocesspsbt")!;

export const walletprocesspsbtFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Met à jour et signe un PSBT avec les données du portefeuille.",
  description:
    "Tente de signer le PSBT et d'y ajouter les UTXO du portefeuille.",
  howIsThisUsed:
    "Utilisée pour faire avancer une transaction en mettant à jour un PSBT (Partially Signed Bitcoin Transaction) avec les informations d'entrée stockées dans le portefeuille. Facilite aussi la signature des entrées qui peuvent être signées. Cette commande est essentielle pour fluidifier le workflow et garantir que les entrées nécessaires sont incluses et signées efficacement, contribuant à la finalisation de la transaction.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le PSBT en base64.",
    },
    {
      ...English.inputs[1],
      description: "Signer ou non avec le portefeuille.",
    },
  ],
};
