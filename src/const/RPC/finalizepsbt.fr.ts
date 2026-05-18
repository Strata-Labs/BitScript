import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "finalizepsbt")!;

export const finalizepsbtFr: RPCFunctionParams = {
  ...English,
  category: "Transactions brutes",
  summary:
    "Finalise un PSBT et extrait la transaction brute correspondante.",
  description:
    "Combine les signatures et produit la transaction prête à être diffusée.",
  howIsThisUsed:
    "Imaginez un projet de groupe où chacun doit valider la version finale avant qu'on puisse la rendre. De même, dans Bitcoin, certaines transactions exigent l'approbation (signatures) de plusieurs parties avant de pouvoir être finalisées — par exemple parce que les fonds sont dans un portefeuille multi-signature, qui ajoute une couche de sécurité en exigeant l'accord de plusieurs personnes. La commande « finalizepsbt » revient à collecter ces dernières signatures et approbations, vérifier que tout est en ordre et que la transaction a toutes les autorisations nécessaires. Une fois validée, elle scelle la transaction, prête à être diffusée sur le réseau Bitcoin pour confirmation.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le PSBT en base64 à finaliser.",
    },
    {
      ...English.inputs[1],
      description: "Si vrai, extrait la transaction nette ; sinon renvoie un PSBT.",
    },
  ],
};
