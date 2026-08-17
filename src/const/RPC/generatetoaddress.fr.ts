import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "generatetoaddress")!;

export const generatetoaddressFr: RPCFunctionParams = {
  ...English,
  category: "Génération",
  summary:
    "Mine immédiatement des blocs vers une adresse (régtest).",
  description:
    "Génère un nombre donné de blocs et envoie la récompense à l'adresse fournie.",
  howIsThisUsed:
    "Imaginez un jeu vidéo où vous pouvez créer instantanément des ressources ou des objets pour tester différentes stratégies ou progresser plus vite. Dans le monde du développement Bitcoin, la commande « generatetoaddress » remplit un rôle similaire mais en environnement de test. En l'utilisant, les développeurs peuvent miner instantanément un nombre donné de blocs, en envoyant toutes les récompenses vers une adresse Bitcoin précise. Particulièrement utile en développement et test quand on doit simuler rapidement la création de blocs pour tester des transactions, confirmations et l'allocation des récompenses de mining sans attendre des conditions réelles.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Nombre de blocs à générer.",
    },
    {
      ...English.inputs[1],
      description: "L'adresse Bitcoin recevant la coinbase.",
    },
    {
      ...English.inputs[2],
      description: "Nombre maximal d'itérations de mining (optionnel).",
    },
  ],
};
