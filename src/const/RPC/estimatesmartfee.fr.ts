import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "estimatesmartfee")!;

export const estimatesmartfeeFr: RPCFunctionParams = {
  ...English,
  category: "Utilitaires",
  summary:
    "Estime intelligemment le tarif de frais pour une cible de confirmation.",
  description:
    "Renvoie un tarif estimé en BTC/kvB pour qu'une transaction soit incluse dans N blocs.",
  howIsThisUsed:
    "Imaginez attendre un bus dont le tarif change selon l'heure de la journée. Vous voulez payer assez pour monter dans le prochain bus sans payer trop. La commande « estimatesmartfee » du réseau Bitcoin fonctionne de la même façon en estimant combien vous devez payer pour que votre transaction soit traitée dans un délai donné — comme attraper les prochains « blocs » de transactions.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Cible de confirmation en blocs.",
    },
  ],
};
