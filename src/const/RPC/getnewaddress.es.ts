import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getnewaddress")!;

export const getnewaddressEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Genera una nueva dirección Bitcoin para recibir pagos.",
  description:
    "Devuelve una dirección recién derivada de la billetera, opcionalmente con etiqueta y tipo de dirección.",
  howIsThisUsed:
    "Recibe fondos de forma segura proporcionando una dirección nueva, lo que mejora la privacidad y la seguridad de las transacciones.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Una etiqueta opcional para asociar a la nueva dirección.",
    },
  ],
};
