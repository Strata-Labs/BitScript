import { PARAMETER_TYPE, RPC_METHODS, RPCFunctionParams } from "../RPC";

// French translation of `abandontransaction`.
//
// Pattern: look up the English record from RPC_METHODS, spread it, then
// override only the fields you've translated. Anything you don't override
// stays English — so you can ship an RPC translation in stages.
//
// Keep `method`, `linkPath`, `callable`, each input's `method` (param name),
// `type`, `defaultValue`, and `enumValues` identical to the English version
// so URLs, RPC param wiring, and call payloads stay stable across locales.

const English = RPC_METHODS.find((m) => m.method === "abandontransaction")!;

export const abandontransactionFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Permet à un utilisateur d'abandonner une transaction non confirmée du portefeuille.",
  description:
    "Cette commande sert à marquer une transaction non confirmée comme abandonnée, en la retirant de la liste des transactions du portefeuille.",
  howIsThisUsed:
    "Peu de choses sont aussi frustrantes qu'une transaction Bitcoin bloquée sans confirmation. Vous avez envoyé des fonds — pour un service ou pour rembourser un ami — et l'attente s'étire de quelques minutes à plusieurs jours. Le problème vient souvent de frais trop bas, qui poussent les mineurs à ignorer votre transaction. La commande « abandontransaction » est la solution pour récupérer ces fonds. L'immuabilité de la blockchain empêche d'effacer la transaction, mais cette commande permet à votre portefeuille de se comporter comme si elle n'avait jamais eu lieu.",
  inputs: [
    {
      method: "TxId",
      description: "L'identifiant de la transaction",
      required: true,
      type: PARAMETER_TYPE.string,
    },
  ],
};
