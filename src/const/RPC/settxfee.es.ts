import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "settxfee")!;

export const settxfeeEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Establece la comisión de transacción por defecto de la billetera.",
  description:
    "Configura la tarifa de comisión utilizada para las nuevas transacciones, en BTC/kvB.",
  howIsThisUsed:
    "Este comando se utiliza para personalizar las comisiones de las transacciones generadas por la billetera. Es posible que quieras ajustar las comisiones según la congestión de la red, el tiempo de confirmación deseado o preferencias personales. Establecer una tarifa adecuada garantiza un procesamiento rápido de las transacciones e incentiva a los mineros a incluirlas en un bloque.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La tarifa de comisión en BTC/kvB.",
    },
  ],
};
