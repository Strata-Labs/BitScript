import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "importdescriptors")!;

export const importdescriptorsFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Importe des descripteurs (output descriptors) dans le portefeuille.",
  description:
    "Ajoute des descripteurs au portefeuille pour suivre les fonds associés.",
  howIsThisUsed:
    "Cette commande est essentielle pour synchroniser le portefeuille avec des descripteurs externes, ce qui permet de surveiller des adresses ou scripts générés en dehors de l'environnement du portefeuille. Elle facilite le suivi des fonds associés et maintient l'historique du portefeuille à jour. En précisant des timestamps et d'autres paramètres, vous contrôlez la portée et le comportement du rescan de la blockchain, ce qui optimise le processus selon vos besoins. Particulièrement utile pour intégrer un portefeuille Bitcoin avec des systèmes externes, des applications ou des wallets matériels.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Tableau JSON des descripteurs à importer.",
    },
  ],
};
