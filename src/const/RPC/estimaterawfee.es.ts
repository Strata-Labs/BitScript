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
    "Imagine que quiere enviar un paquete y saber cuánto franqueo asegurará su entrega dentro de un plazo determinado. De forma similar, en la red Bitcoin, cuando envía una transacción, paga una comisión para que sea procesada y confirmada por los mineros. El comando « estimaterawfee » equivale a preguntar en la oficina postal la mejor tarifa para que su paquete (o transacción) llegue a tiempo. Estima la tarifa óptima (por kilobyte) para que su transacción sea confirmada en el número de bloques deseado, basándose en las condiciones actuales de la red y los datos pasados.",
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
