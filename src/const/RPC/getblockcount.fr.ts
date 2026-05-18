import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblockcount")!;

export const getblockcountFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Renvoie la hauteur actuelle de la blockchain.",
  description:
    "Renvoie le nombre de blocs présents dans la chaîne la plus longue.",
  howIsThisUsed:
    "Imaginez gravir une montagne et vouloir savoir précisément à quelle hauteur vous êtes par rapport au niveau de la mer pour mesurer votre progression. Dans la blockchain Bitcoin, la commande « getblockcount » fournit une mesure analogue : combien de blocs ont été ajoutés à la blockchain depuis le tout premier — le bloc genesis. Ce comptage donne une idée claire de la longueur de la blockchain, indicateur direct de sa croissance et de son activité dans le temps.",
};
