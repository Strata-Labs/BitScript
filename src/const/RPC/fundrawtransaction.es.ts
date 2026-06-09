import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "fundrawtransaction")!;

export const fundrawtransactionEs: RPCFunctionParams = {
  ...English,
  category: "Transacciones crudas",
  summary:
    "Selecciona UTXO de la cartera para financiar una transacción cruda.",
  description:
    "Agrega las entradas necesarias y un posible cambio a una transacción cruda existente.",
  howIsThisUsed:
    "Imagine que está armando un rompecabezas; tras comenzar, se da cuenta de que le faltan piezas para completar la imagen. El comando « fundrawtransaction » actúa como una búsqueda y adición de las piezas que faltan a su transacción. Cuando crea una transacción cruda (el rompecabezas a completar), no siempre tiene todas las entradas (piezas) para alcanzar el valor que desea enviar. Este comando selecciona automáticamente entre sus bitcoins disponibles, añadiéndolos como entradas para que el valor total coincida con lo que intenta enviar, agregando si es necesario una salida de cambio si envía menos que el valor total de las entradas.",
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
