import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "verifychain")!;

export const verifychainFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Vérifie l'intégrité de la base de données de la blockchain.",
  description:
    "Effectue une vérification de cohérence sur N derniers blocs.",
  howIsThisUsed:
    "La commande verifychain sert à garantir l'intégrité et l'exactitude de la base de données blockchain locale. En vérifiant la validité de chaque bloc et des données associées, elle aide à maintenir la fiabilité et la sécurité de la blockchain. Différents niveaux de vérification permettent de personnaliser le processus selon les besoins et les ressources.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Niveau de vérification (0 à 4).",
    },
    {
      ...English.inputs[1],
      description: "Nombre de blocs à vérifier (0 = tous).",
    },
  ],
};
