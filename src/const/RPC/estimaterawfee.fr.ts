import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "estimaterawfee")!;

export const estimaterawfeeFr: RPCFunctionParams = {
  ...English,
  category: "Utilitaires",
  summary:
    "Estime le tarif brut nécessaire pour qu'une transaction soit confirmée.",
  description:
    "Renvoie une estimation détaillée des frais pour une cible de confirmation.",
  howIsThisUsed:
    "Imaginez vouloir envoyer un colis et savoir combien d'affranchissement assurera sa livraison dans un délai donné. De même, sur le réseau Bitcoin, quand vous envoyez une transaction, vous payez des frais pour qu'elle soit traitée et confirmée par les mineurs. La commande « estimaterawfee » revient à demander à la poste le meilleur tarif pour que votre colis (ou transaction) arrive à temps. Elle estime le tarif optimal (par kilo-octet) pour que votre transaction soit confirmée dans le nombre de blocs souhaité, en fonction des conditions réseau actuelles et des données passées.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Cible de confirmation en blocs.",
    },
    {
      ...English.inputs[1],
      description: "Seuil de fiabilité (0 à 1).",
    },
  ],
};
