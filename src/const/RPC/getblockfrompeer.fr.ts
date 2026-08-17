import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblockfrompeer")!;

export const getblockfrompeerFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Demande à un pair précis d'envoyer un bloc.",
  description:
    "Force la récupération d'un bloc depuis un pair donné, utile pour le debugging.",
  howIsThisUsed:
    "Imaginez collecter les pièces d'une vieille carte ; il vous manque un fragment crucial que l'un de vos contacts a trouvé. Vous lui demandez précisément ce morceau pour compléter votre collection. De même, dans la blockchain Bitcoin, si vous opérez un nœud auquel il manque un bloc précis — ou si vous soupçonnez votre version d'être incorrecte —, vous pouvez utiliser « getblockfrompeer » pour demander ce bloc directement à un pair connecté en indiquant son hash.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le hash du bloc à demander.",
    },
    {
      ...English.inputs[1],
      description: "L'identifiant du pair à interroger.",
    },
  ],
};
