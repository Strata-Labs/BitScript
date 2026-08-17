import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getmempoolancestors")!;

export const getmempoolancestorsFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Liste les ancêtres d'une transaction dans le mempool.",
  description:
    "Renvoie les transactions ancêtres d'une transaction présente dans le mempool.",
  howIsThisUsed:
    "Imaginez assembler un puzzle complexe qui nécessite de réunir d'abord plusieurs groupes de pièces avant de pouvoir les connecter dans l'image finale. De même, dans le réseau Bitcoin, une transaction peut dépendre d'autres transactions qui doivent être confirmées avant d'être traitée. La commande « getmempoolancestors » revient à obtenir la liste de tous les petits groupes de pièces (transactions ancêtres) à assembler d'abord pour comprendre l'image globale (la chaîne de transactions).",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'identifiant de la transaction.",
    },
    {
      ...English.inputs[1],
      description: "Si vrai, renvoie des objets ; sinon, juste les txids.",
    },
  ],
};
