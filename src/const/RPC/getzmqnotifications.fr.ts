import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getzmqnotifications")!;

export const getzmqnotificationsFr: RPCFunctionParams = {
  ...English,
  category: "ZMQ",
  summary:
    "Renvoie la configuration des notifications ZMQ.",
  description:
    "Liste les endpoints ZMQ actifs et les sujets associés.",
  howIsThisUsed:
    "Cette commande est essentielle aux utilisateurs qui exploitent les notifications ZeroMQ dans leur application ou infrastructure Bitcoin. Elle donne un aperçu des types de notifications reçues, ainsi que des adresses de publication associées et des réglages de traitement des messages. Comprendre les notifications ZeroMQ actives est crucial pour surveiller et intégrer efficacement les événements et flux de données liés à Bitcoin dans des systèmes et applications externes.",
};
