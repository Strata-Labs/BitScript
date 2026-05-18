import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "settxfee")!;

export const settxfeeFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Définit les frais de transaction par défaut du portefeuille.",
  description:
    "Configure le tarif de frais utilisé pour les nouvelles transactions, en BTC/kvB.",
  howIsThisUsed:
    "Cette commande sert à personnaliser les frais des transactions générées par le portefeuille. On peut vouloir ajuster les frais selon la congestion du réseau, le temps de confirmation souhaité ou des préférences personnelles. Définir un tarif adéquat garantit un traitement rapide des transactions et incite les mineurs à les inclure dans un bloc.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le tarif de frais en BTC/kvB.",
    },
  ],
};
