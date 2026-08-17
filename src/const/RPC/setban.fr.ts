import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "setban")!;

export const setbanFr: RPCFunctionParams = {
  ...English,
  category: "Réseau",
  summary:
    "Ajoute ou retire un bannissement d'une adresse IP ou d'un sous-réseau.",
  description:
    "Bannit (« add ») ou débanit (« remove ») une adresse ou un sous-réseau du nœud.",
  howIsThisUsed:
    "Cette commande sert à bannir certaines adresses IP ou sous-réseaux pour les empêcher de se connecter au réseau Bitcoin. Utile pour limiter le spam, empêcher des attaques ou bloquer des nœuds malveillants. Offre aussi de la souplesse pour définir des durées de bannissement, ponctuelles ou indéfinies.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'adresse IP ou le sous-réseau à bannir.",
    },
    {
      ...English.inputs[1],
      description: "Action : « add » ou « remove ».",
    },
    {
      ...English.inputs[2],
      description: "Durée du bannissement en secondes (0 = par défaut).",
    },
    {
      ...English.inputs[3],
      description: "Si vrai, traite « bantime » comme un timestamp absolu.",
    },
  ],
};
