import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "importprivkey")!;

export const importprivkeyFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Importe une clé privée (au format WIF) dans le portefeuille.",
  description:
    "Ajoute une clé privée existante au portefeuille pour pouvoir dépenser les fonds associés.",
  howIsThisUsed:
    "Cette commande est essentielle pour accéder à des fonds associés à des clés privées extérieures à votre portefeuille. Elle permet d'importer une clé privée pour pouvoir dépenser ou gérer les fonds correspondants depuis le portefeuille. Vous pouvez attribuer un label pour organiser les clés importées et choisir de déclencher un rescan de la blockchain pour synchroniser les transactions. Couramment utilisée pour consolider des fonds provenant de plusieurs sources ou gérer des adresses de stockage à froid depuis le portefeuille.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La clé privée Bitcoin (au format WIF).",
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
