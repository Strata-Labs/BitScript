import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getmempooldescendants")!;

export const getmempooldescendantsEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Lista los descendientes de una transacción en el mempool.",
  description:
    "Devuelve las transacciones descendientes de una transacción presente en el mempool.",
  howIsThisUsed:
    "Este comando resulta crucial para aplicaciones y servicios que necesitan analizar el mempool en busca de dependencias entre transacciones, estimar comisiones o evaluar el impacto de las transacciones no confirmadas en la red. Al identificar todos los descendientes de una transacción determinada, se comprende cómo afecta esa transacción al mempool, incluidos los posibles retrasos en la confirmación o el incremento de comisiones derivado del tamaño y la complejidad de la cadena.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El identificador de la transacción.",
    },
    {
      ...English.inputs[1],
      description: "Si es verdadero, devuelve objetos; en caso contrario, solo los txids.",
    },
  ],
};
