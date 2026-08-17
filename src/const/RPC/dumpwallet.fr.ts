import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "dumpwallet")!;

export const dumpwalletFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Exporte toutes les clés du portefeuille dans un fichier lisible par un humain.",
  description:
    "Cette commande sauvegarde toutes les clés privées du portefeuille dans un fichier texte.",
  howIsThisUsed:
    "Imaginez un coffre rempli d'objets précieux, chacun ayant sa propre serrure et sa propre clé. La commande « dumpwallet » revient à dresser une carte détaillée listant chaque clé pour chaque serrure du coffre. Cette carte est enregistrée dans un fichier lisible, ce qui permet de comprendre quelle clé ouvre quelle serrure. En l'utilisant, vous créez une sauvegarde complète de toutes les clés (y compris les secrètes) du Bitcoin stocké dans votre portefeuille. C'est essentiel pour garantir l'accès à vos bitcoins, en particulier si le logiciel de portefeuille cesse de fonctionner, si votre ordinateur plante, ou si vous décidez de changer de portefeuille Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le chemin de fichier où exporter les clés du portefeuille.",
    },
  ],
};
