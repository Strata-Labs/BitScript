import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblockstats")!;

export const getblockstatsFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Renvoie des statistiques agrégées sur un bloc.",
  description:
    "Calcule des statistiques détaillées sur un bloc (frais, taille, sigops, etc.).",
  howIsThisUsed:
    "Imaginez un analyste sportif essayant de comprendre la performance d'une équipe de basket lors d'un match précis. Il étudierait diverses statistiques — points marqués, rebonds, passes, etc. De même, la commande « getblockstats » permet aux analystes blockchain, développeurs et chercheurs de plonger dans les détails d'un bloc Bitcoin : frais moyens, taille des transactions, taille totale du bloc et autres indicateurs clés. Précieux pour comprendre comment la blockchain est utilisée à un instant donné, identifier des tendances et prendre des décisions éclairées sur les opérations et optimisations.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le hash ou la hauteur du bloc.",
    },
    {
      ...English.inputs[1],
      description: "Tableau optionnel des champs de statistiques à renvoyer.",
    },
  ],
};
