import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listlabels")!;

export const listlabelsEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Devuelve la lista de todas las etiquetas utilizadas en la cartera.",
  description:
    "Lista las etiquetas asociadas a las direcciones de la cartera.",
  howIsThisUsed:
    "Sirve para gestionar y organizar las direcciones asignándoles etiquetas. Al permitir listar las etiquetas según su propósito, podrá categorizar eficazmente sus direcciones para mejorar el seguimiento y la administración.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Tipo de propósito por el que filtrar (receive/send). Opcional.",
    },
  ],
};
