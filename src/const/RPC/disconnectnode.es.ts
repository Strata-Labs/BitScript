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
    "Imagine organizar una gran reunión en línea; uno de los participantes empieza a perturbar la conversación. Puede expulsarlo para restablecer el orden. De forma similar, el comando «disconnectnode» de la red de Bitcoin permite retirar manualmente a un participante (nodo) de su lista de conexiones. Ya sea por comportamiento malicioso, problemas técnicos o cualquier otro motivo que considere necesario, puede desconectarse de él por su identificador único o por su dirección de Internet.",
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
