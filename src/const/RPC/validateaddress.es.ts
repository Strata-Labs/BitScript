import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "validateaddress")!;

export const validateaddressEs: RPCFunctionParams = {
  ...English,
  category: "Utilidades",
  summary:
    "Comprueba si una dirección Bitcoin es válida.",
  description:
    "Devuelve un objeto que describe la validez y la naturaleza de una dirección.",
  howIsThisUsed:
    "Se utiliza principalmente para validar una dirección Bitcoin antes de realizar una transacción, asegurando que las direcciones sean correctas y confirmando la propiedad y los detalles de la dirección.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La dirección Bitcoin a validar.",
    },
  ],
};
