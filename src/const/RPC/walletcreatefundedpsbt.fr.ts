import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "walletcreatefundedpsbt")!;

export const walletcreatefundedpsbtFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Construit et finance un PSBT à partir du portefeuille.",
  description:
    "Crée une transaction partiellement signée (PSBT) en sélectionnant les UTXO du portefeuille.",
  howIsThisUsed:
    "La commande walletcreatefundedpsbt sert à construire et financer des transactions en sécurité au sein du portefeuille Bitcoin. Particulièrement utile pour construire des transactions complexes avec des exigences spécifiques — multi-signature ou frais personnalisés. Cette commande offre flexibilité et contrôle sur le processus de création, garantissant que les transactions respectent les critères voulus avant finalisation et diffusion sur le réseau Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Tableau des entrées à utiliser (optionnel).",
    },
    {
      ...English.inputs[1],
      description: "Objet JSON des destinataires {adresse: montant}.",
    },
    {
      ...English.inputs[2],
      description: "Locktime à appliquer.",
    },
    {
      ...English.inputs[3],
      description: "Options de financement (frais, replaceable, etc.).",
    },
    {
      ...English.inputs[4],
      description: "Inclure des informations bip32 pour les signataires.",
    },
  ],
};
