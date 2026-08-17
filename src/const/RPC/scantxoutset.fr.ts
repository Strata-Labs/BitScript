import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "scantxoutset")!;

export const scantxoutsetFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Scanne l'ensemble des UTXO à la recherche de descripteurs donnés.",
  description:
    "Cherche dans l'UTXO set les sorties correspondant à des descripteurs fournis.",
  howIsThisUsed:
    "La commande scantxoutset est principalement utilisée par les logiciels de portefeuille, les explorateurs et autres outils d'analyse blockchain pour identifier des sorties de transaction correspondant à des critères prédéfinis. Elle permet d'interroger la blockchain à la recherche de sorties associées à certaines adresses, scripts ou clés publiques sans avoir à maintenir un index complet. Particulièrement utile pour les portefeuilles qui supportent la dérivation HD, en leur permettant de découvrir et surveiller efficacement les fonds associés à des xpubs. Les développeurs peuvent aussi l'utiliser pour bâtir des applications nécessitant l'interrogation et l'analyse de données UTXO.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Action : « start », « abort » ou « status ».",
    },
    {
      ...English.inputs[1],
      description: "Tableau des descripteurs à scanner.",
    },
  ],
};
