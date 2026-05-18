import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getrawtransaction")!;

export const getrawtransactionFr: RPCFunctionParams = {
  ...English,
  category: "Transactions brutes",
  summary:
    "Récupère une transaction brute par son identifiant.",
  description:
    "Renvoie la transaction brute (hex) ou son objet décodé selon le mode demandé.",
  howIsThisUsed:
    "Cette commande est très utilisée pour l'analyse de la blockchain, le debugging de transactions et la vérification des détails de transaction hors contexte du portefeuille. Elle permet aux développeurs, analystes et utilisateurs d'accéder aux détails de la composition d'une transaction — entrées et sorties, taille, inclusion dans un bloc. Particulièrement utile pour les applications qui vérifient les détails de transaction de manière programmatique ou pour quiconque mène une analyse approfondie des flux et des données blockchain.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'identifiant de la transaction.",
    },
    {
      ...English.inputs[1],
      description: "Niveau de verbosité (0 = hex, 1 = objet, 2 = objet avec prevouts).",
    },
    {
      ...English.inputs[2],
      description: "Hash du bloc dans lequel chercher (optionnel).",
    },
  ],
};
