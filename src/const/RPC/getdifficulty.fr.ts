import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getdifficulty")!;

export const getdifficultyFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Renvoie la difficulté courante du proof-of-work.",
  description:
    "Renvoie un multiple de la difficulté minimale en virgule flottante.",
  howIsThisUsed:
    "Imaginez un alpiniste prêt à gravir une montagne et souhaitant savoir à quel point l'ascension sera difficile par rapport aux montagnes déjà gravies. La commande « getdifficulty » du réseau Bitcoin offre une information similaire mais pour les mineurs. Elle indique à quel point il est difficile de trouver un nouveau bloc à cet instant, comparé au scénario le plus facile possible. Cette difficulté s'ajuste automatiquement au fil du temps, selon la puissance de calcul totale des mineurs, pour qu'un bloc soit trouvé environ toutes les 10 minutes.",
};
