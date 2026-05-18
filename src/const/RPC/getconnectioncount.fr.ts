import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getconnectioncount")!;

export const getconnectioncountFr: RPCFunctionParams = {
  ...English,
  category: "Réseau",
  summary:
    "Renvoie le nombre de connexions actives vers d'autres nœuds.",
  description:
    "Indique combien de pairs sont actuellement connectés.",
  howIsThisUsed:
    "Imaginez gérer un réseau de communication pour une grande organisation et devoir vérifier que votre point central est bien relié à tous les services pour fluidifier la circulation de l'information. De même, dans le réseau Bitcoin, la commande « getconnectioncount » fournit aux opérateurs de nœud un outil pour vérifier la qualité de leur connexion au reste du réseau. Elle indique le nombre total de connexions actives de votre nœud avec d'autres nœuds, donnant un instantané de sa connectivité et de la santé du réseau. Une bonne connectivité est cruciale pour recevoir et transmettre rapidement transactions et blocs, et rester à jour avec les dernières données de la blockchain.",
};
