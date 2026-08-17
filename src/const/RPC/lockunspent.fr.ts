import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "lockunspent")!;

export const lockunspentFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Verrouille ou déverrouille temporairement des sorties non dépensées.",
  description:
    "Empêche ou autorise la sélection automatique de certains UTXO.",
  howIsThisUsed:
    "Le RPC lockunspent sert à contrôler la dépense de certaines sorties de transaction dans le portefeuille Bitcoin Core. Il permet d'empêcher temporairement que des sorties verrouillées soient utilisées par la sélection automatique de pièces, offrant un contrôle plus fin sur la sélection et la construction des transactions. Particulièrement utile pour construire des transactions complexes ou gérer plusieurs sorties. En précisant si les verrous doivent être persistants, vous garantissez que vos préférences de verrouillage survivent aux redémarrages ou aux pannes, pour un comportement constant dans le temps.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Si vrai, déverrouille les UTXO ; si faux, les verrouille.",
    },
    {
      ...English.inputs[1],
      description: "Tableau JSON des UTXO {txid, vout} à verrouiller/déverrouiller.",
    },
  ],
};
