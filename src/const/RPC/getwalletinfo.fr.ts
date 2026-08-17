import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getwalletinfo")!;

export const getwalletinfoFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Renvoie diverses informations sur l'état du portefeuille.",
  description:
    "Fournit un instantané du portefeuille : solde, version, clés, transactions, etc.",
  howIsThisUsed:
    "Cette commande est cruciale pour comprendre l'état et la configuration de votre portefeuille. Elle fournit les informations essentielles à la gestion des ressources, au suivi des soldes, à la configuration des frais et à la sécurité. Elle permet de suivre l'activité, gérer les clés et ajuster les réglages selon vos besoins, garantissant le bon fonctionnement et la sécurité de votre portefeuille Bitcoin.",
};
