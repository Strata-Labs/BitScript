import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "walletdisplayaddress")!;

export const walletdisplayaddressFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Affiche une adresse sur l'écran d'un signataire externe.",
  description:
    "Demande au signataire matériel d'afficher l'adresse pour vérification.",
  howIsThisUsed:
    "La commande walletdisplayaddress sert à vérifier l'authenticité d'une adresse Bitcoin en l'affichant sur un signataire externe. Particulièrement utile quand des mesures de sécurité supplémentaires sont requises, comme confirmer la justesse d'une adresse avant d'initier une transaction. En comparant l'adresse affichée à celle fournie, vous vous assurez qu'elle n'a pas été altérée et pouvez procéder en toute confiance.",
};
