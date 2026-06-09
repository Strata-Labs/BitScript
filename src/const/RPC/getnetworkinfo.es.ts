import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getnetworkinfo")!;

export const getnetworkinfoEs: RPCFunctionParams = {
  ...English,
  category: "Red",
  summary:
    "Devuelve información detallada sobre el estado de la red entre pares.",
  description:
    "Proporciona la versión, los servicios, la tarifa mínima de retransmisión y el estado de las conexiones.",
  howIsThisUsed:
    "Esencial para comprender la conectividad y el estado operativo del nodo dentro de la red Bitcoin, facilitando el diagnóstico y la supervisión de la red.",
};
