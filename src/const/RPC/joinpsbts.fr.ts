import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "joinpsbts")!;

export const joinpsbtsFr: RPCFunctionParams = {
  ...English,
  category: "Transactions brutes",
  summary:
    "Fusionne plusieurs PSBT distincts en un seul PSBT (entrées/sorties additionnées).",
  description:
    "Joint plusieurs PSBT (avec des entrées/sorties différentes) en un PSBT unique.",
  howIsThisUsed:
    "Cette commande est particulièrement utile quand plusieurs parties collaborent à une transaction et fournissent chacune leur PSBT. En joignant ces PSBT, les participants peuvent créer une transaction unique et unifiée qui inclut les entrées et sorties de chacun. Cela simplifie la coordination et la finalisation des transactions multi-parties, en garantissant qu'aucune entrée n'est dupliquée entre les PSBT.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Tableau des PSBT (en base64) à joindre.",
    },
  ],
};
