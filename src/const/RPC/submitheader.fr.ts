import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "submitheader")!;

export const submitheaderFr: RPCFunctionParams = {
  ...English,
  category: "Mining",
  summary:
    "Soumet un en-tête de bloc pour validation.",
  description:
    "Envoie un en-tête de bloc pour qu'il soit ajouté à l'index des en-têtes.",
  howIsThisUsed:
    "Cette commande est utilisée dans le processus de mining pour décoder et soumettre un en-tête de bloc comme candidat au prochain chain tip. Elle constitue une étape cruciale dans la validation et l'ajout de nouveaux blocs à la blockchain.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'en-tête de bloc en hex.",
    },
  ],
};
