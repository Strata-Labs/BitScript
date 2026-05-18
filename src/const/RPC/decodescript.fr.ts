import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "decodescript")!;

export const decodescriptFr: RPCFunctionParams = {
  ...English,
  category: "Transactions brutes",
  summary:
    "Décode un script (hex) en représentation lisible.",
  description:
    "Renvoie l'analyse d'un script en op_codes et données.",
  howIsThisUsed:
    "Imaginez découvrir un parchemin ancien avec des instructions écrites dans une langue codée et mystérieuse. Ce parchemin renferme les secrets pour débloquer un trésor, mais seulement si vous savez décrypter ses instructions. Dans Bitcoin, les scripts sont ces instructions, qui guident la manière dont les transactions sont traitées et sécurisées. Cependant, ils sont souvent écrits dans un format compact, encodé en hex, peu lisible. La commande « decodescript » est la clé qui traduit ces instructions chiffrées en un langage compréhensible, révélant le but, la structure et les détails opérationnels du script.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le script en hex à décoder.",
    },
  ],
};
