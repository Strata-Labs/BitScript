import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "fundrawtransaction")!;

export const fundrawtransactionEs: RPCFunctionParams = {
  ...English,
  category: "Transacciones crudas",
  summary:
    "Selecciona UTXO de la billetera para financiar una transacción cruda.",
  description:
    "Agrega las entradas necesarias y un posible cambio a una transacción cruda existente.",
  howIsThisUsed:
    "Imagina que estás armando un rompecabezas y, después de empezar, te das cuenta de que te faltan piezas para completarlo. El comando «fundrawtransaction» busca y agrega esas piezas faltantes a tu transacción. Cuando creas una transacción cruda (el rompecabezas por completar), no siempre tienes todas las entradas (piezas) para alcanzar el monto que quieres enviar. Este comando elige automáticamente entre tus bitcoins disponibles y los agrega como entradas para que el total coincida con lo que intentas enviar, sumando si hace falta una salida de cambio cuando envías menos que el valor total de las entradas.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La transacción cruda en hex.",
    },
    {
      ...English.inputs[1],
      description: "Opciones de financiación (comisiones, replaceable, etc.).",
    },
    {
      ...English.inputs[2],
      description: "Incluir información bip32 para los firmantes.",
    },
  ],
};
