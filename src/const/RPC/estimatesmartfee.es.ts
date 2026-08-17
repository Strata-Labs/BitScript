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
    "Imagina que esperas un autobús cuya tarifa cambia según la hora del día. Quieres pagar lo justo para subir al próximo sin pagar de más. El comando «estimatesmartfee» funciona de forma similar: estima cuánto tienes que pagar para que tu transacción se procese en un plazo determinado, es decir, para alcanzar los próximos «bloques» de transacciones.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Objetivo de confirmación en bloques.",
    },
  ],
};
