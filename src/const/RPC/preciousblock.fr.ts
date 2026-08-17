import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "preciousblock")!;

export const preciousblockFr: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Marque un bloc comme « précieux » pour qu'il soit préféré en cas de fork.",
  description:
    "Influence le choix de la chaîne en faveur d'un bloc précis.",
  howIsThisUsed:
    "Le RPC preciousblock est généralement utilisé à des fins de test ou dans des scénarios où l'opérateur d'un nœud doit manipuler l'ordre de réception des blocs. En marquant un bloc comme précieux, un nœud peut le privilégier sur d'autres ayant le même travail, modifiant ainsi l'historique perçu de la blockchain au sein du contexte du nœud. Pratique pour simuler diverses conditions réseau ou vérifier le comportement d'un nœud Bitcoin. Ses effets sont temporaires et ne persistent pas après un redémarrage, ce qui la rend adaptée surtout au test et au debugging.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Le hash du bloc à privilégier.",
    },
  ],
};
