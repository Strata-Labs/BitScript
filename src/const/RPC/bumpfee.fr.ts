import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "bumpfee")!;

export const bumpfeeFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Augmente les frais d'une transaction non confirmée pour accélérer sa confirmation.",
  description:
    "Cette commande sert à remplacer une transaction non confirmée par une nouvelle aux frais plus élevés (RBF).",
  howIsThisUsed:
    "Imaginez poster une lettre et constater qu'elle est sous-affranchie, ce qui la laisse traîner à la poste. De la même façon, la commande « bumpfee » est la solution pour une transaction Bitcoin qui patine à cause de frais trop bas. Tout comme la poste trie le courrier selon l'affranchissement, les mineurs Bitcoin privilégient les transactions à frais élevés. Si votre transaction est bloquée pendant un pic de trafic à cause de frais faibles, employer « bumpfee » revient à payer l'affranchissement supplémentaire pour que votre « lettre » numérique soit priorisée et traitée plus rapidement.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'identifiant de la transaction à remplacer.",
    },
    {
      ...English.inputs[1],
      description: "Options pour ajuster les frais, telles que `confTarget` ou `totalFee`.",
    },
  ],
};
