import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "estimaterawfee")!;

export const estimaterawfeeEs: RPCFunctionParams = {
  ...English,
  category: "Utilidades",
  summary:
    "Estima la tarifa cruda necesaria para que una transacción sea confirmada.",
  description:
    "Devuelve una estimación detallada de la comisión para un objetivo de confirmación.",
  howIsThisUsed:
    "Imagina que quieres enviar un paquete y saber cuánto tienes que pagar para que llegue dentro de cierto plazo. De forma similar, cuando envías una transacción de Bitcoin pagas una comisión para que los mineros la procesen y la confirmen. El comando «estimaterawfee» equivale a preguntar en el correo cuál es la mejor tarifa para que tu paquete (o transacción) llegue a tiempo. Estima la tarifa óptima (por kilobyte) para que tu transacción se confirme en el número de bloques que quieras, según las condiciones actuales de la red y los datos anteriores.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Objetivo de confirmación en bloques.",
    },
    {
      ...English.inputs[1],
      description: "Umbral de fiabilidad (0 a 1).",
    },
  ],
};
