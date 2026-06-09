import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "gettxspendingprevout")!;

export const gettxspendingprevoutEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Devuelve las transacciones que gastan prevouts dados (en el mempool).",
  description:
    "Indica qué transacciones del mempool gastan las salidas previas especificadas.",
  howIsThisUsed:
    "Este comando es valioso para supervisar el uso de salidas concretas en el mempool. Ayuda a hacer seguimiento de las transacciones que gastan salidas asociadas a sus direcciones o transacciones. Esta información es crucial para comprender el estado de las transacciones pendientes y los posibles intentos de doble gasto, y aporta perspectivas sobre la actividad transaccional de la red Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Arreglo de prevouts {txid, vout}.",
    },
  ],
};
