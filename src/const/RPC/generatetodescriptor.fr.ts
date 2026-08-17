import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "generatetodescriptor")!;

export const generatetodescriptorFr: RPCFunctionParams = {
  ...English,
  category: "Génération",
  summary:
    "Mine immédiatement des blocs vers un descripteur.",
  description:
    "Génère un nombre donné de blocs et envoie la récompense au descripteur fourni.",
  howIsThisUsed:
    "Imaginez un chef qui expérimente des recettes et a besoin que certains ingrédients soient livrés instantanément pour tester différents plats. Dans Bitcoin, la commande « generatetodescriptor » agit comme un service de livraison direct des récompenses de bloc, en permettant aux développeurs de miner instantanément des blocs et de diriger les récompenses vers des sorties définies par un descripteur précis. Ce descripteur décrit exactement comment les récompenses doivent être réparties, offrant de la précision dans l'allocation des bitcoins minés. Particulièrement utile dans des environnements de développement et de test où l'on doit simuler la création de blocs sous conditions précises pour tester des applications blockchain, smart contracts ou fonctionnalités de portefeuille.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Nombre de blocs à générer.",
    },
    {
      ...English.inputs[1],
      description: "Le descripteur recevant la coinbase.",
    },
    {
      ...English.inputs[2],
      description: "Nombre maximal d'itérations de mining (optionnel).",
    },
  ],
};
