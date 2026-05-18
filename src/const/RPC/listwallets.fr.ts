import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listwallets")!;

export const listwalletsFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Liste les portefeuilles actuellement chargés par le nœud.",
  description:
    "Renvoie les noms des portefeuilles ouverts sur l'instance de bitcoind.",
  howIsThisUsed:
    "La commande listwallets fournit la liste des portefeuilles actuellement chargés dans le nœud Bitcoin, permettant de vérifier les portefeuilles chargés, de surveiller leur activité, de s'intégrer à des outils de gestion et d'aider au debugging en identifiant les conflits ou incohérences potentiels lors du chargement.",
};
