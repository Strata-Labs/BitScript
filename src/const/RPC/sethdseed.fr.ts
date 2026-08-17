import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "sethdseed")!;

export const sethdseedFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Définit la graine HD du portefeuille.",
  description:
    "Configure la graine déterministe hiérarchique utilisée pour dériver les clés.",
  howIsThisUsed:
    "Cette commande sert à gérer la graine HD d'un portefeuille Bitcoin. On peut générer une nouvelle graine ou fournir la sienne. En définissant une nouvelle graine HD, vous garantissez que les clés dérivées par la suite proviennent de cette graine, renforçant la sécurité et la confidentialité du portefeuille. Une nouvelle sauvegarde du portefeuille est cruciale après cette opération pour vous prémunir contre la perte de fonds.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Si vrai, vide le keypool.",
    },
    {
      ...English.inputs[1],
      description: "Graine HD en hex (optionnel).",
    },
  ],
};
