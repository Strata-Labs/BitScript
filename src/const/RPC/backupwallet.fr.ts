import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "backupwallet")!;

export const backupwalletFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Sauvegarde le fichier du portefeuille à la destination spécifiée.",
  description:
    "Cette commande crée une copie de sauvegarde du fichier du portefeuille à l'emplacement indiqué.",
  howIsThisUsed:
    "Voyez votre portefeuille Bitcoin comme un coffre-fort numérique — un album photo, sauf qu'au lieu de clichés, on y range des bitcoins. De la même manière qu'on sauvegarde des photos de famille précieuses pour éviter de les perdre suite à une panne, la commande « backupwallet » permet de créer une copie sécurisée de votre portefeuille Bitcoin. C'est comme dupliquer toute la collection sur une clé USB ou un service cloud, garantissant que si l'ordinateur tombe en panne, vos actifs numériques restent à l'abri et récupérables.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La destination de la sauvegarde. Peut être un répertoire ou un chemin de fichier.",
    },
  ],
};
