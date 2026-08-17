import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listdescriptors")!;

export const listdescriptorsFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Liste les descripteurs présents dans le portefeuille.",
  description:
    "Renvoie tous les descripteurs (output descriptors) enregistrés dans le portefeuille.",
  howIsThisUsed:
    "Sert à obtenir la liste des descripteurs importés dans un portefeuille à descripteurs. Aide à comprendre la composition du portefeuille et les caractéristiques de chaque descripteur. Permet aussi de revoir les descripteurs privés si nécessaire, en offrant de la visibilité sur la configuration et l'usage du portefeuille.",
};
