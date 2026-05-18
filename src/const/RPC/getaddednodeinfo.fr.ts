import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getaddednodeinfo")!;

export const getaddednodeinfoFr: RPCFunctionParams = {
  ...English,
  category: "Réseau",
  summary:
    "Renvoie des informations sur les nœuds ajoutés manuellement.",
  description:
    "Liste les pairs ajoutés via `addnode` et leur état de connexion.",
  howIsThisUsed:
    "Imaginez avoir invité un groupe d'amis à une rencontre privée et vouloir vérifier qui est arrivé et qui non. De même, la commande « getaddednodeinfo » du réseau Bitcoin aide à suivre des pairs (nœuds) spécifiques que vous avez manuellement invités (ajoutés). En l'utilisant, vous voyez lesquels sont actuellement connectés à votre nœud et obtenez des informations détaillées sur leur état. Particulièrement utile pour le diagnostic réseau et la gestion des relations avec les pairs, en s'assurant que votre nœud communique efficacement avec ceux que vous avez sélectionnés.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Limiter le résultat à un nœud précis.",
    },
  ],
};
