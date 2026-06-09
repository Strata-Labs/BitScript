import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "bumpfee")!;

export const bumpfeeEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Aumenta la comisión de una transacción no confirmada para acelerar su confirmación.",
  description:
    "Este comando se utiliza para reemplazar una transacción no confirmada por otra con comisiones más altas (RBF).",
  howIsThisUsed:
    "Imagine enviar una carta y descubrir que lleva un franqueo insuficiente, lo que la deja varada en correos. De forma similar, el comando «bumpfee» es la solución para una transacción de Bitcoin que se queda atascada por culpa de comisiones demasiado bajas. Igual que correos clasifica las cartas según el franqueo, los mineros de Bitcoin priorizan las transacciones con comisiones elevadas. Si su transacción se queda bloqueada durante un pico de tráfico debido a comisiones bajas, emplear «bumpfee» equivale a pagar el franqueo adicional para que su «carta» digital tenga prioridad y se procese más rápido.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El identificador de la transacción a reemplazar.",
    },
    {
      ...English.inputs[1],
      description: "Opciones para ajustar las comisiones, como `confTarget` o `totalFee`.",
    },
  ],
};
