import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "dumpprivkey")!;

export const dumpprivkeyFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Révèle la clé privée correspondant à une adresse Bitcoin donnée.",
  description:
    "Renvoie la clé privée d'une adresse du portefeuille au format WIF.",
  howIsThisUsed:
    "Imaginez votre portefeuille Bitcoin comme un coffre-fort avancé qui protège votre monnaie numérique. Chaque coffre est sécurisé par une clé unique qui vous donne accès à vos fonds. La commande « dumpprivkey » revient à obtenir un double de cette clé pour une section précise du coffre (une adresse Bitcoin donnée). Elle révèle la clé exacte nécessaire pour débloquer et transférer les fonds depuis cette adresse. C'est précieux pour migrer vos bitcoins vers une autre application de portefeuille, garantir l'accès à vos fonds, ou les récupérer en cas de dysfonctionnement.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'adresse Bitcoin dont on souhaite obtenir la clé privée.",
    },
  ],
};
