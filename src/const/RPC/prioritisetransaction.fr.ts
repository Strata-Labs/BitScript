import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "prioritisetransaction")!;

export const prioritisetransactionFr: RPCFunctionParams = {
  ...English,
  category: "Mining",
  summary:
    "Augmente ou diminue la priorité d'une transaction dans le mempool.",
  description:
    "Ajoute des frais fictifs à une transaction pour influencer son inclusion dans un bloc.",
  howIsThisUsed:
    "Le RPC prioritisetransaction sert couramment à influer sur la priorité d'une transaction dans la file de mining, particulièrement pendant les périodes de congestion ou quand des confirmations plus rapides sont souhaitées. En ajustant les frais d'une transaction, vous incitez les mineurs à l'inclure rapidement dans des blocs minés. Particulièrement utile pour des transactions urgentes ou des scénarios où la confirmation rapide est essentielle. Offre aussi un mécanisme pour ajuster dynamiquement la priorité sans avoir à recréer les transactions.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'identifiant de la transaction.",
    },
    {
      ...English.inputs[1],
      description: "Montant en satoshis à ajouter (positif ou négatif) à la priorité de frais.",
    },
  ],
};
