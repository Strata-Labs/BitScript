import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "encryptwallet")!;

export const encryptwalletFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Chiffre le portefeuille avec une phrase de passe.",
  description:
    "Cette commande chiffre le portefeuille pour protéger les clés privées par une phrase de passe.",
  howIsThisUsed:
    "Voyez votre portefeuille Bitcoin comme un coffre-fort numérique où vous gardez votre monnaie. Tout comme on verrouille un coffre physique par une combinaison, la commande « encryptwallet » permet de définir une phrase de passe (un mot de passe complexe) qui verrouille le portefeuille. Une fois définie, cette phrase de passe est requise pour ouvrir le portefeuille ou autoriser une transaction, ajoutant une couche de sécurité. C'est crucial pour protéger vos fonds contre tout accès non autorisé, qu'il s'agisse de pirates, de malware ou même d'un vol physique de votre ordinateur ou appareil.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La phrase de passe utilisée pour chiffrer le portefeuille.",
    },
  ],
};
