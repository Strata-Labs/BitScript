import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getbalance")!;

export const getbalanceFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Renvoie le solde total des fonds confirmés et non confirmés du portefeuille.",
  description:
    "Renvoie le solde du portefeuille, avec options pour filtrer par compte, confirmations minimum, etc.",
  howIsThisUsed:
    "Imaginez ouvrir votre app bancaire pour voir combien d'argent vous avez sur tous vos comptes — épargne, courant, comptes spéciaux. Vous voulez un instantané rapide et précis du total pour décider en connaissance de cause de vos dépenses, économies ou virements. La commande « getbalance » fait la même chose pour votre portefeuille Bitcoin. Elle donne un aperçu immédiat des bitcoins disponibles au total, toutes adresses ou labels confondus. Elle prend en compte les transactions qui ont atteint un certain nombre de confirmations, ce qui en fait un moyen fiable de comprendre votre position financière sur le réseau Bitcoin à tout moment.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Compte (déprécié). Utiliser « * » pour tous les comptes.",
    },
    {
      ...English.inputs[1],
      description: "Le nombre minimum de confirmations requis pour inclure une transaction.",
    },
    {
      ...English.inputs[2],
      description: "Inclut les transactions des adresses watch-only.",
    },
    {
      ...English.inputs[3],
      description: "Évite le rechargement du mempool si vrai.",
    },
  ],
};
