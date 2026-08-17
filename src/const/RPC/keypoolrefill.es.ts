import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "keypoolrefill")!;

export const keypoolrefillEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Rellena el keypool de la billetera para direcciones futuras.",
  description:
    "Reabastece el keypool, útil tras importar claves o cambiar la configuración.",
  howIsThisUsed:
    "Este comando se utiliza habitualmente para mantener una reserva de claves sin usar en la billetera. Cuando se genera una nueva dirección o se firma una transacción, se consume una clave del keypool. Reabastecerlo garantiza que la billetera disponga en todo momento de suficientes claves, lo que mejora la eficiencia y evita problemas de agotamiento de claves.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El nuevo tamaño del keypool.",
    },
  ],
};
