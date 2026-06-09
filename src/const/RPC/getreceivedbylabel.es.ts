import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getreceivedbylabel")!;

export const getreceivedbylabelEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Devuelve el total de bitcoins recibidos por las direcciones de una etiqueta dada.",
  description:
    "Calcula la suma recibida por todas las direcciones agrupadas bajo una misma etiqueta.",
  howIsThisUsed:
    "Útil para organizar y hacer seguimiento de las transacciones entrantes por etiqueta, facilitando la gestión financiera dentro de una cartera Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La etiqueta a consultar.",
    },
    {
      ...English.inputs[1],
      description: "El número mínimo de confirmaciones para incluir una transacción.",
    },
  ],
};
