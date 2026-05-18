import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "decodepsbt")!;

export const decodepsbtFr: RPCFunctionParams = {
  ...English,
  category: "Transactions brutes",
  summary:
    "Décode un PSBT en un objet lisible.",
  description:
    "Affiche le contenu d'un PSBT (entrées, sorties, signatures partielles).",
  howIsThisUsed:
    "Voyez un PSBT comme une boîte mystère qui contient toutes les pièces nécessaires à une transaction, sans savoir précisément ce qu'il y a dedans ni s'il manque quelque chose. La commande « decodepsbt » revient à disposer d'une vision aux rayons X qui permet de voir l'intérieur de la boîte sans l'ouvrir. Elle vous montre tout sur la transaction de manière compréhensible : qui doit signer, combien de bitcoins partent, où ils vont, et si certaines pièces manquent encore avant que la transaction puisse être finalisée et envoyée sur le réseau.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le PSBT en base64 à décoder.",
    },
  ],
};
