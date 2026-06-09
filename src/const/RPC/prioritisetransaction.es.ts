import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "prioritisetransaction")!;

export const prioritisetransactionEs: RPCFunctionParams = {
  ...English,
  category: "Mining",
  summary:
    "Aumenta o disminuye la prioridad de una transacción en el mempool.",
  description:
    "Añade comisiones ficticias a una transacción para influir en su inclusión en un bloque.",
  howIsThisUsed:
    "El RPC prioritisetransaction sirve habitualmente para influir en la prioridad de una transacción en la cola de mining, especialmente durante períodos de congestión o cuando se desean confirmaciones más rápidas. Al ajustar las comisiones de una transacción, se incentiva a los mineros a incluirla rápidamente en los bloques minados. Es especialmente útil para transacciones urgentes o escenarios donde la confirmación rápida es esencial. También ofrece un mecanismo para priorizar dinámicamente sin tener que recrear las transacciones.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El identificador de la transacción.",
    },
    {
      ...English.inputs[1],
      description: "Cantidad en satoshis a añadir (positiva o negativa) a la prioridad de comisiones.",
    },
  ],
};
