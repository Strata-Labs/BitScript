import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getrawchangeaddress")!;

export const getrawchangeaddressFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Renvoie une nouvelle adresse Bitcoin pour recevoir la monnaie d'une transaction brute.",
  description:
    "Génère une adresse de monnaie (change) qui ne sera pas marquée comme adresse de réception classique.",
  howIsThisUsed:
    "Fournit une adresse neuve où envoyer la « monnaie » d'une transaction, ce qui améliore la confidentialité en évitant de réutiliser des adresses.",
};
