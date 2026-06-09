import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getnettotals")!;

export const getnettotalsEs: RPCFunctionParams = {
  ...English,
  category: "Red",
  summary:
    "Devuelve las estadísticas totales de tráfico de red del nodo.",
  description:
    "Proporciona el total de bytes enviados y recibidos desde el arranque del nodo.",
  howIsThisUsed:
    "Se utiliza para supervisar el intercambio de datos del nodo con la red Bitcoin, lo que ayuda a evaluar la salud y el rendimiento de la red.",
};
