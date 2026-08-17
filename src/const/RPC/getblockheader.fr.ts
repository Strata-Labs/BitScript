import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblockheader")!;

export const getblockheaderFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Renvoie l'en-tête d'un bloc à partir de son hash.",
  description:
    "Récupère uniquement l'en-tête du bloc (sans les transactions).",
  howIsThisUsed:
    "Imaginez étudier l'histoire d'une longue muraille ancienne et vouloir comprendre la séquence de sa construction et l'état actuel de chaque segment sans inspecter chaque brique. La commande « getblockheader » de Bitcoin offre une approche analogue pour la blockchain. À partir du hash d'un bloc, vous récupérez les métadonnées cruciales — sa position dans la chaîne (hauteur), le moment de son minage, ses liens avec les blocs voisins (précédent et suivant) — sans devoir télécharger et inspecter tout son contenu, transactions comprises.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le hash du bloc.",
    },
    {
      ...English.inputs[1],
      description: "Si vrai, renvoie un objet ; sinon, du hex brut.",
    },
  ],
};
