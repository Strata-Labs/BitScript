import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "bumpfee")!;

export const bumpfeeEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Aumenta la comisión de una transacción no confirmada para acelerar su confirmación.",
  description:
    "Este comando se utiliza para reemplazar una transacción no confirmada por otra con comisiones más altas (RBF).",
  howIsThisUsed:
    "Imagina enviar una carta y descubrir que la estampilla no cubre el costo del envío, por lo que se queda varada en correos. De forma similar, el comando «bumpfee» es la solución para una transacción de Bitcoin que se queda atascada por culpa de comisiones demasiado bajas. Igual que correos da prioridad a las cartas que han pagado lo necesario para su envío, los mineros de Bitcoin priorizan las transacciones con comisiones más altas. Si tu transacción se queda bloqueada durante un pico de tráfico por comisiones bajas, usar «bumpfee» equivale a pagar la diferencia para que tu «carta» digital tenga prioridad y se procese más rápido.",
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
