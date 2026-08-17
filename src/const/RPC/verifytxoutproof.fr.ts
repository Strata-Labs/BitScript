import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "verifytxoutproof")!;

export const verifytxoutproofFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Vérifie une preuve d'inclusion de transaction.",
  description:
    "Valide une preuve produite par `gettxoutproof` et renvoie les txids vérifiés.",
  howIsThisUsed:
    "La commande verifytxoutproof sert à vérifier l'intégrité d'une transaction en confirmant son inclusion dans un bloc. Crucial pour s'assurer que les transactions sont correctement traitées et enregistrées sur la blockchain. En validant les preuves de transaction, on peut vérifier leur authenticité sans dépendre uniquement d'autorités centralisées.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La preuve hex à vérifier.",
    },
  ],
};
