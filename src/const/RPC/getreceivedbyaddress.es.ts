import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getreceivedbyaddress")!;

export const getreceivedbyaddressEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Devuelve el total de bitcoins recibidos por una dirección dada.",
  description:
    "Calcula la suma recibida por una dirección específica, con un umbral de confirmaciones.",
  howIsThisUsed:
    "Sirve para verificar y evaluar el total recibido en una dirección concreta, lo que resulta importante para la contabilidad y el seguimiento financiero.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La dirección Bitcoin a consultar.",
    },
    {
      ...English.inputs[1],
      description: "El número mínimo de confirmaciones para incluir una transacción.",
    },
  ],
};
