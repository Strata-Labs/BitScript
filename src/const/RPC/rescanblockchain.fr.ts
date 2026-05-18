import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "rescanblockchain")!;

export const rescanblockchainFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Rescanne la blockchain à la recherche de transactions du portefeuille.",
  description:
    "Force le portefeuille à analyser la chaîne sur la plage de blocs indiquée.",
  howIsThisUsed:
    "Le RPC rescanblockchain est utilisé couramment par les portefeuilles pour synchroniser leur historique avec la blockchain. Si un portefeuille est hors ligne ou désynchronisé pendant un temps, il peut manquer de nouvelles transactions ou de mises à jour. En lançant un rescan, il identifie les transactions pertinentes survenues pendant la période hors ligne et met à jour son historique. Cela garantit l'exactitude du solde et de l'historique. Pratique aussi si le wallet.dat est déplacé sur un nouvel appareil ou restauré depuis une sauvegarde, en réindexant les transactions à partir d'une hauteur donnée.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Hauteur de bloc à partir de laquelle commencer le rescan.",
    },
    {
      ...English.inputs[1],
      description: "Hauteur de bloc où arrêter le rescan.",
    },
  ],
};
