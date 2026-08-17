import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "simulaterawtransaction")!;

export const simulaterawtransactionEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Calcula el efecto de una transacción cruda sobre el saldo de la billetera, sin difundirla.",
  description:
    "Simula el impacto de una transacción sin enviarla a la red.",
  howIsThisUsed:
    "Sirve para prever el efecto de firmar y difundir transacciones crudas sobre el saldo de la billetera.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Arreglo de transacciones crudas en hex.",
    },
    {
      ...English.inputs[1],
      description: "Opciones de simulación.",
    },
  ],
};
