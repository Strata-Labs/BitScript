import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listlockunspent")!;

export const listlockunspentEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Lista las salidas sin gastar bloqueadas temporalmente por la cartera.",
  description:
    "Muestra los UTXO marcados como bloqueados para evitar su selección automática.",
  howIsThisUsed:
    "Sirve para ver la lista de salidas bloqueadas temporalmente con el fin de evitar que sean gastadas. Resulta especialmente útil al gestionar transacciones cuando se desea garantizar que ciertas salidas permanezcan sin gastar con un propósito concreto. Permite supervisar y controlar el bloqueo y desbloqueo de las transacciones cuando sea necesario.",
};
