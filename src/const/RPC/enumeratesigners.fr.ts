import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "enumeratesigners")!;

export const enumeratesignersFr: RPCFunctionParams = {
  ...English,
  category: "Signataire",
  summary:
    "Liste les signataires externes connectés.",
  description:
    "Énumère les périphériques signataires (hardware wallets) détectés.",
  howIsThisUsed:
    "Imaginez un manager d'une équipe de sécurité chargée de protéger un objet précieux. Chaque membre de l'équipe possède une clé spéciale nécessaire à l'accès. De même, dans Bitcoin, les signataires externes (hardware wallets ou dispositifs de sécurité spéciaux) jouent le rôle de ces membres, chacun détenant une clé (capacité de signature) pour autoriser les transactions. La commande « enumeratesigners » revient à faire l'appel pour voir quels membres de l'équipe de sécurité (signataires externes) sont présents et prêts à protéger votre Bitcoin. Elle liste tous les dispositifs ou services externes configurés pour fonctionner avec votre portefeuille Bitcoin, en donnant des détails comme leurs identifiants uniques et leurs noms. Cela aide à gérer et vérifier les dispositifs autorisés à signer des transactions, garantissant la sécurité de votre Bitcoin.",
};
