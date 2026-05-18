import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "importmulti")!;

export const importmultiFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Importe en lot des adresses, clés ou scripts dans le portefeuille.",
  description:
    "Permet d'importer plusieurs adresses/clés/scripts en une seule requête.",
  howIsThisUsed:
    "Cette commande est cruciale pour gérer le portefeuille d'adresses et de scripts, en permettant de surveiller et d'interagir avec plusieurs entités externes simultanément. Elle simplifie l'import d'adresses ou de scripts avec leurs clés ou descripteurs associés, en s'assurant que le portefeuille reste synchronisé. Via des options comme le rescan, vous contrôlez si une analyse de la blockchain est effectuée et optimisez le processus selon vos besoins. Particulièrement utile pour intégrer le portefeuille avec des systèmes, applications ou wallets matériels externes.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Tableau JSON des entrées à importer (adresses, scripts, clés).",
    },
    {
      ...English.inputs[1],
      description: "Options d'import (rescan, etc.).",
    },
  ],
};
