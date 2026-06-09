import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "gettxout")!;

export const gettxoutEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Devuelve los detalles de una salida no gastada (UTXO).",
  description:
    "Inspecciona un UTXO concreto identificado por txid y vout.",
  howIsThisUsed:
    "Este comando es esencial para verificar la existencia y los detalles de UTXOs específicos, particularmente útil para carteras, exploradores o cualquier servicio que necesite confirmar la finalidad de una transacción y los detalles de su salida. Ayuda a evaluar si un UTXO se puede gastar y a recopilar los elementos necesarios para construir nuevas transacciones.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El identificador de la transacción.",
    },
    {
      ...English.inputs[1],
      description: "El índice de la salida.",
    },
    {
      ...English.inputs[2],
      description: "Incluir las transacciones del mempool.",
    },
  ],
};
