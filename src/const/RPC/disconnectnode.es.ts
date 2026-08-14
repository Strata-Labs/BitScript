import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "disconnectnode")!;

export const disconnectnodeEs: RPCFunctionParams = {
  ...English,
  category: "Red",
  summary:
    "Desconecta inmediatamente un nodo conectado.",
  description:
    "Fuerza la desconexión de un par, ya sea por dirección o por identificador.",
  howIsThisUsed:
    "Imagina organizar una reunión grande en línea y que uno de los participantes empiece a interrumpir la conversación. Puedes sacarlo para restablecer el orden. De forma similar, el comando «disconnectnode» te permite retirar manualmente a un participante (nodo) de tu lista de conexiones. Ya sea por comportamiento malicioso, problemas técnicos o cualquier otro motivo que consideres necesario, puedes desconectarte de él usando su identificador único o su dirección de Internet.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La dirección del nodo a desconectar.",
    },
    {
      ...English.inputs[1],
      description: "El identificador interno del nodo (alternativa a la dirección).",
    },
  ],
};
