import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "newkeypool")!;

export const newkeypoolFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Recharge entièrement le keypool avec de nouvelles clés.",
  description:
    "Vide et recrée le pool de clés du portefeuille.",
  howIsThisUsed:
    "Le RPC newkeypool sert à rafraîchir le keypool d'un portefeuille Bitcoin, en s'assurant qu'on peut générer de nouvelles adresses pour recevoir des transactions. C'est essentiel pour maintenir la sécurité et le bon fonctionnement du portefeuille, en particulier dans les portefeuilles non-HD où la gestion des clés n'est pas automatique. En vidant puis remplissant le keypool, on génère un nouveau jeu de clés pour recevoir des fonds en sécurité. Une sauvegarde immédiate est nécessaire après cette opération, surtout pour les portefeuilles non-HD, afin d'inclure les nouvelles clés. En cas de restauration d'une sauvegarde HD, exécuter newkeypool puis un rescan est nécessaire pour que les fonds reçus sur les nouvelles adresses soient reconnus.",
};
