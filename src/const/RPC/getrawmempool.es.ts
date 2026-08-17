import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getrawmempool")!;

export const getrawmempoolEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Lista todas las transacciones actualmente en el mempool.",
  description:
    "Devuelve los txids presentes en el mempool, con o sin detalles.",
  howIsThisUsed:
    "Este comando es crucial para desarrolladores y analistas que necesitan comprender el estado actual del mempool, analizar el flujo de transacciones o estimar las comisiones según la congestión actual. La información detallada que se proporciona en modo verboso ayuda a evaluar comisiones, tamaños y el posible impacto en la inclusión en un futuro bloque.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Si es verdadero, devuelve objetos; de lo contrario, solo los txids.",
    },
    {
      ...English.inputs[1],
      description: "Si es verdadero, devuelve la secuencia del mempool.",
    },
  ],
};
