import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listsinceblock")!;

export const listsinceblockFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Liste toutes les transactions depuis un bloc donné.",
  description:
    "Renvoie toutes les transactions du portefeuille survenues depuis le block hash spécifié.",
  howIsThisUsed:
    "La commande listsinceblock sert à récupérer l'historique des transactions depuis un bloc donné, ce qui aide à suivre l'activité du portefeuille et à confirmer le statut des transactions. Particulièrement utile pour surveiller les transactions entrantes et sortantes, surtout dans des scénarios où une réorganisation peut affecter l'historique.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le hash du bloc de référence.",
    },
    {
      ...English.inputs[1],
      description: "Le nombre minimum de confirmations.",
    },
    {
      ...English.inputs[2],
      description: "Inclure les transactions watch-only.",
    },
    {
      ...English.inputs[3],
      description: "Inclure les transactions retirées (removed).",
    },
  ],
};
