import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "decoderawtransaction")!;

export const decoderawtransactionFr: RPCFunctionParams = {
  ...English,
  category: "Transactions brutes",
  summary:
    "Décode une transaction brute (hex) en un objet JSON.",
  description:
    "Lit une transaction brute et renvoie sa structure (entrées, sorties, scripts).",
  howIsThisUsed:
    "Imaginez recevoir un message secret écrit dans un code qui ressemble à une suite aléatoire de lettres et de chiffres ; ce code contient des informations importantes, mais reste indéchiffrable sans le bon outil. La commande « decoderawtransaction » agit comme ce traducteur pour les transactions Bitcoin. Elle prend une transaction encodée dans un format complexe (hexadécimal) et la convertit dans un format (JSON) facile à lire, en exposant tous les détails de la transaction — qui envoie quoi, à qui, et avec quels frais.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La transaction brute en hex.",
    },
    {
      ...English.inputs[1],
      description: "Si vrai, considère qu'il s'agit d'une transaction SegWit.",
    },
  ],
};
