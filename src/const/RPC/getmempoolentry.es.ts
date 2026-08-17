import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getmempoolentry")!;

export const getmempoolentryEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Devuelve los detalles de una entrada del mempool.",
  description:
    "Proporciona la información de una transacción presente en el mempool.",
  howIsThisUsed:
    "Se utiliza para inspeccionar el estado y los detalles de las transacciones a la espera de confirmación, con fines de seguimiento y análisis de transacciones.",
};
