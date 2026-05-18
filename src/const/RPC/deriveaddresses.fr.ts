import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "deriveaddresses")!;

export const deriveaddressesFr: RPCFunctionParams = {
  ...English,
  category: "Utilitaires",
  summary:
    "Dérive un ensemble d'adresses à partir d'un descripteur.",
  description:
    "Calcule les adresses correspondant à un descripteur sur une plage donnée.",
  howIsThisUsed:
    "Imaginez un livre magique capable de créer des clés à partir d'instructions précises. Chaque jeu d'instructions (ou « descripteur ») peut produire non pas une mais tout un ensemble de clés, chacune ouvrant une serrure différente. Dans le monde Bitcoin, la commande « deriveaddresses » agit comme ce livre magique. En lui fournissant un descripteur de sortie — un jeu d'instructions spécial — vous générez une ou plusieurs adresses Bitcoin. Ces adresses sont comme les clés de coffres numériques où vous pouvez recevoir du Bitcoin. Particulièrement utile quand vous devez créer une série d'adresses à partir d'un même point de départ, en fluidifiant la gestion de multiples transactions entrantes ou l'organisation de fonds entre différentes adresses pour la confidentialité ou l'organisation.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le descripteur de sortie.",
    },
    {
      ...English.inputs[1],
      description: "Plage d'indices [début, fin] (optionnel).",
    },
  ],
};
