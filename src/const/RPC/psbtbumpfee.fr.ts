import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "psbtbumpfee")!;

export const psbtbumpfeeFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Augmente les frais d'une transaction via un PSBT.",
  description:
    "Variante de `bumpfee` qui renvoie un PSBT au lieu de diffuser directement.",
  howIsThisUsed:
    "Le RPC psbtbumpfee sert principalement à augmenter les frais d'une transaction RBF (opt-in) lorsque les frais initiaux sont insuffisants pour une confirmation rapide. C'est nécessaire pour accélérer la confirmation pendant les périodes de congestion ou quand les frais étaient sous-estimés. En augmentant les frais, vous priorisez votre transaction pour son inclusion dans la blockchain. Particulièrement utile pour les portefeuilles qui supportent RBF et doivent ajuster les frais dynamiquement après diffusion. Permet de remplacer la transaction d'origine par une nouvelle aux frais plus élevés, garantissant une confirmation plus rapide sans attendre que la transaction d'origine soit confirmée ou éjectée du mempool.",
};
