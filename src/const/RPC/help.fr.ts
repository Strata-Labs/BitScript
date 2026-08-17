import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "help")!;

export const helpFr: RPCFunctionParams = {
  ...English,
  category: "Contrôle",
  summary:
    "Affiche l'aide pour une commande RPC.",
  description:
    "Renvoie la documentation d'une commande RPC ou la liste de toutes les commandes.",
  howIsThisUsed:
    "Cette commande est utile pour explorer les commandes RPC disponibles et comprendre leurs fonctionnalités. Elle aide à découvrir les capacités de l'interface RPC et fournit de l'aide pour utiliser efficacement chaque commande. Grâce à un texte d'aide détaillé, on apprend à interagir avec Bitcoin Core via RPC et à exploiter ses fonctionnalités à diverses fins.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Nom de la commande dont on veut l'aide (optionnel).",
    },
  ],
};
