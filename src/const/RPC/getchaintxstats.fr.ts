import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getchaintxstats")!;

export const getchaintxstatsFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Renvoie des statistiques sur le débit de transactions de la chaîne.",
  description:
    "Calcule le nombre moyen de transactions par seconde sur une fenêtre donnée.",
  howIsThisUsed:
    "Imaginez un démographe qui étudie la croissance d'une ville en analysant taux de natalité, schémas de migration et autres statistiques pour comprendre les tendances et anticiper le futur. De même, « getchaintxstats » permet aux analystes blockchain, développeurs et passionnés d'étudier la « démographie » de la blockchain Bitcoin en examinant des statistiques de transactions. En précisant un nombre de blocs ou une fenêtre temporelle, on obtient des indicateurs clés : nombre total de transactions, rythme auquel elles se produisent, etc. Cette analyse aide à comprendre l'activité, l'efficacité et les tendances de croissance de la blockchain.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Nombre de blocs à inclure (fenêtre).",
    },
    {
      ...English.inputs[1],
      description: "Hash du bloc de fin de la fenêtre.",
    },
  ],
};
