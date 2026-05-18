import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getbestblockhash")!;

export const getbestblockhashFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Renvoie le hash du dernier bloc (tip) de la chaîne la plus longue.",
  description:
    "Renvoie le block hash de la pointe actuelle de la blockchain.",
  howIsThisUsed:
    "Imaginez suivre une piste de miettes de pain pour vous orienter en forêt, chaque miette représentant un pas en avant. Dans la blockchain Bitcoin, les blocs sont ces miettes, et la commande « getbestblockhash » aide à identifier la toute dernière de la piste — le bloc le plus récent ajouté à la blockchain. Ce bloc est considéré comme le « meilleur » ou « tip » car c'est le dernier pleinement vérifié et celui qui cumule le plus de travail de calcul.",
};
