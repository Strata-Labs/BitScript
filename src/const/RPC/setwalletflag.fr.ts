import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "setwalletflag")!;

export const setwalletflagFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Active ou désactive un flag du portefeuille.",
  description:
    "Permet de modifier des indicateurs de comportement du portefeuille.",
  howIsThisUsed:
    "Cette commande sert à gérer des comportements ou réglages spécifiques au portefeuille en activant/désactivant des flags. Par exemple, le flag « avoid_reuse » améliore la confidentialité et la sécurité en empêchant le portefeuille de dépenser depuis des adresses déjà utilisées. En changeant l'état de flags comme « avoid_reuse », vous personnalisez le comportement du portefeuille selon vos préférences et exigences de sécurité.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Nom du flag à modifier.",
    },
    {
      ...English.inputs[1],
      description: "Valeur booléenne du flag.",
    },
  ],
};
