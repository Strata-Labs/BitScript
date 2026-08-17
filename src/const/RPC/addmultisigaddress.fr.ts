import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "addmultisigaddress")!;

export const addmultisigaddressFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Crée une adresse multi-signature avec N signatures requises parmi M clés publiques fournies.",
  description:
    "Sert à créer une adresse multi-signature.",
  howIsThisUsed:
    "Votre groupe organise une cagnotte pour un cadeau ou un investissement commun et exige qu'une dépense passe par l'approbation de la majorité ? La commande « addmultisigaddress » ajoute une couche de sécurité à ce travail collaboratif, comme la création d'un portefeuille partagé et sécurisé. Elle établit une adresse Bitcoin unique qui exige plusieurs approbations (signatures) de membres choisis du groupe pour initier une transaction. Voyez-la comme un coffre collectif qui ne s'ouvre que lorsqu'assez de détenteurs de confiance tournent leurs clés simultanément. Cette configuration garantit que les fonds ne sortent qu'avec consensus, protégeant les actifs du groupe par un mécanisme d'approbation intégré.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le nombre de signatures requises parmi les n clés ou adresses.",
    },
    {
      ...English.inputs[1],
      description: "Les adresses Bitcoin ou clés publiques encodées en hex.",
    },
    {
      ...English.inputs[2],
      description: "Un label à attribuer aux adresses.",
    },
  ],
};
