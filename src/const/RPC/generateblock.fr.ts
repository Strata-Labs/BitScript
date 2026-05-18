import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "generateblock")!;

export const generateblockFr: RPCFunctionParams = {
  ...English,
  category: "Génération",
  summary:
    "Génère un bloc immédiatement avec les transactions fournies (régtest).",
  description:
    "Crée un bloc contenant les transactions spécifiées, principalement utile en regtest.",
  howIsThisUsed:
    "Imaginez construire une ville miniature où vous décidez précisément des bâtiments à construire et de leur emplacement. La commande « generateblock » de Bitcoin est un peu similaire, mais au lieu de bâtiments, vous créez des blocs sur la blockchain. Elle permet de créer manuellement un bloc en décidant quelles transactions inclure et en dirigeant les récompenses du bloc vers une adresse donnée. C'est un outil principalement utilisé par les développeurs en environnement de test, où ils peuvent simuler la création de blocs et la confirmation des transactions sans affecter le vrai réseau Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'adresse ou descripteur recevant la coinbase.",
    },
    {
      ...English.inputs[1],
      description: "Tableau des transactions à inclure.",
    },
  ],
};
