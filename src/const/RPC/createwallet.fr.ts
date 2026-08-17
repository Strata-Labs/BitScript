import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "createwallet")!;

export const createwalletFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Crée et charge un nouveau portefeuille avec le nom et les paramètres spécifiés.",
  description:
    "Cette commande initialise un nouveau portefeuille avec un nom et des options configurables.",
  howIsThisUsed:
    "Imaginez que votre portefeuille physique puisse créer à la volée des compartiments distincts pour chaque besoin : un pour les courses, un autre pour l'épargne, un troisième pour les loisirs. La commande « createwallet » de Bitcoin Core apporte cette idée à votre monnaie numérique. Elle permet de créer de nouveaux portefeuilles distincts au sein du même Bitcoin Core, chacun avec son propre nom et ses paramètres adaptés à un objectif précis — comme autant de poches personnalisées pour vos différents besoins de stockage.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le nom du nouveau portefeuille.",
    },
    {
      ...English.inputs[1],
      description: "Si vrai, désactive les clés privées pour ce portefeuille.",
    },
    {
      ...English.inputs[2],
      description: "Si vrai, crée un portefeuille vierge sans clé HD ni clés importées.",
    },
    {
      ...English.inputs[3],
      description: "Phrase de passe pour chiffrer le portefeuille. Vide si non chiffré.",
    },
    {
      ...English.inputs[4],
      description: "Si vrai, désactive les fonctions de réutilisation d'adresses.",
    },
    {
      ...English.inputs[5],
      description: "Si vrai, utilise des descripteurs au lieu de la gestion de clés legacy.",
    },
    {
      ...English.inputs[6],
      description: "Si vrai, charge le portefeuille au démarrage du nœud.",
    },
  ],
};
