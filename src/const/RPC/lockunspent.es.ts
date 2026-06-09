import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "lockunspent")!;

export const lockunspentEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Bloquea o desbloquea temporalmente salidas sin gastar.",
  description:
    "Impide o permite la selección automática de ciertos UTXO.",
  howIsThisUsed:
    "El RPC lockunspent sirve para controlar el gasto de ciertas salidas de transacción en la cartera de Bitcoin Core. Permite impedir temporalmente que las salidas bloqueadas sean utilizadas por la selección automática de monedas, ofreciendo un control más detallado sobre la selección y construcción de transacciones. Es especialmente útil para construir transacciones complejas o gestionar múltiples salidas. Al especificar si los bloqueos deben ser persistentes, se garantiza que sus preferencias de bloqueo sobrevivan a reinicios o caídas, manteniendo un comportamiento constante en el tiempo.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Si es verdadero, desbloquea los UTXO; si es falso, los bloquea.",
    },
    {
      ...English.inputs[1],
      description: "Arreglo JSON de los UTXO {txid, vout} a bloquear/desbloquear.",
    },
  ],
};
