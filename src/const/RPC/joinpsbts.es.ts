import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "joinpsbts")!;

export const joinpsbtsEs: RPCFunctionParams = {
  ...English,
  category: "Transacciones crudas",
  summary:
    "Fusiona varios PSBT distintos en un único PSBT (entradas y salidas combinadas).",
  description:
    "Une varios PSBT (con diferentes entradas y salidas) en un único PSBT.",
  howIsThisUsed:
    "Este comando es especialmente útil cuando varias partes colaboran en una transacción y cada una aporta su propio PSBT. Al unir esos PSBT, los participantes pueden crear una transacción única y unificada que incluya las entradas y salidas de todos. Esto simplifica la coordinación y la finalización de transacciones multipartidas, garantizando que ninguna entrada se duplique entre los PSBT.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Arreglo de PSBT (en base64) a unir.",
    },
  ],
};
