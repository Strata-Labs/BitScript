import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "estimatesmartfee")!;

export const estimatesmartfeeEs: RPCFunctionParams = {
  ...English,
  category: "Utilidades",
  summary:
    "Estima inteligentemente la tarifa de comisión para un objetivo de confirmación.",
  description:
    "Devuelve una tarifa estimada en BTC/kvB para que una transacción se incluya en N bloques.",
  howIsThisUsed:
    "Imagine que espera un autobús cuya tarifa cambia según la hora del día. Quiere pagar lo suficiente para subir al próximo autobús sin pagar de más. El comando « estimatesmartfee » de la red Bitcoin funciona de forma similar, estimando cuánto debe pagar para que su transacción sea procesada en un plazo determinado — como tomar los próximos « bloques » de transacciones.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Objetivo de confirmación en bloques.",
    },
  ],
};
