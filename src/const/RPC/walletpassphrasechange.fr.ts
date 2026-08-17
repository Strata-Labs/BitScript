import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "walletpassphrasechange")!;

export const walletpassphrasechangeFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Change la phrase de passe du portefeuille.",
  description:
    "Remplace l'ancienne phrase de passe par une nouvelle.",
  howIsThisUsed:
    "Utilisée pour mettre à jour la phrase de passe du portefeuille en passant de l'ancienne à une nouvelle. Cruciale pour maintenir la sécurité en permettant de changer régulièrement la phrase de passe, ce qui réduit le risque d'accès non autorisé ou de compromission. En fournissant l'actuelle et la nouvelle phrase de passe, vous garantissez que le portefeuille reste protégé par des mesures à jour. Essentielle aux pratiques de sécurité proactives, elle renforce la protection globale des actifs et informations sensibles.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'ancienne phrase de passe.",
    },
    {
      ...English.inputs[1],
      description: "La nouvelle phrase de passe.",
    },
  ],
};
