import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblock")!;

export const getblockFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Renvoie les informations d'un bloc à partir de son hash.",
  description:
    "Récupère un bloc par son hash, avec différents niveaux de verbosité.",
  howIsThisUsed:
    "Imaginez un détective enquêtant sur un événement précis survenu un jour donné, qui a besoin de rassembler tous les détails de cette journée — de la météo aux personnes impliquées. Dans la blockchain Bitcoin, la commande « getblock » fonctionne de la même manière en vous permettant d'enquêter sur un bloc précis à partir de son hash.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le hash du bloc.",
    },
    {
      ...English.inputs[1],
      description: "Niveau de verbosité (0 = hex, 1 = objet, 2 = avec transactions complètes).",
    },
  ],
};
