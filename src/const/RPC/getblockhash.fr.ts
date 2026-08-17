import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblockhash")!;

export const getblockhashFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Renvoie le hash du bloc à la hauteur donnée.",
  description:
    "Renvoie le block hash correspondant à un numéro de bloc.",
  howIsThisUsed:
    "Imaginez vous trouver dans une bibliothèque où les livres sont rangés dans un ordre précis. Vous cherchez un livre à une position donnée sur l'étagère mais vous n'en avez que le numéro de placement, pas le titre. La commande « getblockhash » fonctionne de la même manière : en lui fournissant la hauteur d'un bloc (sa position sur l'étagère), elle renvoie le hash du bloc (l'équivalent de son titre unique), ce qui vous permet de l'identifier puis d'accéder à ses informations détaillées.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La hauteur du bloc.",
    },
  ],
};
