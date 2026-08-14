import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getrawchangeaddress")!;

export const getrawchangeaddressEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Devuelve una nueva dirección Bitcoin para recibir el cambio de una transacción cruda.",
  description:
    "Genera una dirección de cambio que no se marcará como dirección de recepción habitual.",
  howIsThisUsed:
    "Proporciona una dirección nueva a la que enviar el «cambio» de una transacción, lo que mejora la privacidad al evitar la reutilización de direcciones.",
};
