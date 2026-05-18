import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblockchaininfo")!;

export const getblockchaininfoFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Renvoie des informations globales sur l'état de la blockchain.",
  description:
    "Fournit chaîne courante, hauteur, difficulté, progression de la synchronisation, etc.",
  howIsThisUsed:
    "Imaginez un pilote vérifiant son tableau de bord avant décollage. Il doit connaître des indicateurs clés — altitude, vitesse, niveau de carburant — pour garantir un vol sûr. De même, dans le monde Bitcoin, la commande « getblockchaininfo » sert de tableau de bord pour la blockchain, en fournissant des informations cruciales sur son état actuel. Cette commande donne un instantané de la santé et de l'état de la blockchain : hauteur (combien de blocs forment la blockchain, indicateur de sa croissance), difficulté (à quel point miner un nouveau bloc est ardu), taille sur disque (taille totale de la blockchain stockée sur l'appareil).",
};
