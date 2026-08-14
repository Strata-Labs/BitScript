import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listlabels")!;

export const listlabelsEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Devuelve la lista de todas las etiquetas utilizadas en la billetera.",
  description:
    "Lista las etiquetas asociadas a las direcciones de la billetera.",
  howIsThisUsed:
    "Sirve para gestionar y organizar las direcciones asignándoles etiquetas. Al listar las etiquetas según su propósito, puedes categorizar tus direcciones para mejorar el seguimiento y la administración.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Tipo de propósito por el que filtrar (receive/send). Opcional.",
    },
  ],
};
