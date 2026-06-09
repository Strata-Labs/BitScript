import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "testmempoolaccept")!;

export const testmempoolacceptEs: RPCFunctionParams = {
  ...English,
  category: "Transacciones crudas",
  summary:
    "Prueba si las transacciones crudas serían aceptadas por el mempool.",
  description:
    "Simula la aceptación de las transacciones sin difundirlas.",
  howIsThisUsed:
    "Para verificar con antelación si las transacciones serían aceptadas por el mempool, resulta útil para probar la validez de una transacción antes de su envío.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Arreglo de las transacciones crudas en hex.",
    },
    {
      ...English.inputs[1],
      description: "Comisión máxima aceptable para rechazar.",
    },
  ],
};
