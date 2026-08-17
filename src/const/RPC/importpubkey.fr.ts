import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "importpubkey")!;

export const importpubkeyFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Ajoute une clé publique (en hex) en watch-only au portefeuille.",
  description:
    "Importe une clé publique pour suivre les fonds qui lui sont envoyés sans pouvoir les dépenser.",
  howIsThisUsed:
    "Utile lorsqu'on veut surveiller une clé publique précise dans le portefeuille sans permettre de dépenser. Permet de suivre les transactions liées à cette clé. Vous pouvez attribuer un label pour organiser les clés publiques importées et choisir d'effectuer un rescan pour synchroniser le portefeuille avec la blockchain. Particulièrement utile pour gérer plusieurs clés publiques au sein du portefeuille et suivre leurs transactions associées.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La clé publique en hex.",
    },
    {
      ...English.inputs[1],
      description: "Un label optionnel à associer.",
    },
    {
      ...English.inputs[2],
      description: "Si vrai, rescanne la blockchain pour les transactions associées.",
    },
  ],
};
