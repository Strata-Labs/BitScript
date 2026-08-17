import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getnetworkhashps")!;

export const getnetworkhashpsFr: RPCFunctionParams = {
  ...English,
  category: "Mining",
  summary:
    "Renvoie une estimation du hashrate du réseau (en hashes/s).",
  description:
    "Estime la puissance de calcul totale du réseau sur une fenêtre de blocs.",
  howIsThisUsed:
    "Sert à évaluer la puissance et la sécurité globales du réseau Bitcoin en comprenant l'effort de hashage cumulé fourni par les mineurs.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Nombre de blocs à inclure (-1 = depuis le dernier ajustement).",
    },
    {
      ...English.inputs[1],
      description: "Hauteur de référence (-1 = chain tip).",
    },
  ],
};
