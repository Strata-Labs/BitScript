import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "sendrawtransaction")!;

export const sendrawtransactionEs: RPCFunctionParams = {
  ...English,
  category: "Transacciones crudas",
  summary:
    "Difunde una transacción cruda en la red Bitcoin.",
  description:
    "Envía una transacción firmada a la red para que sea incluida en un bloque.",
  howIsThisUsed:
    "Este comando se utiliza para difundir una transacción en la red después de que ha sido creada y firmada. Constituye un paso crítico en la ejecución de transacciones, ya que permite su inclusión en bloques por parte de los mineros. Resulta especialmente útil para aplicaciones o servicios que construyen transacciones de forma programática, como billeteras o procesadores de pagos.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La transacción cruda en hex.",
    },
    {
      ...English.inputs[1],
      description: "Comisión máxima aceptable para rechazar la transacción si se supera.",
    },
  ],
};
