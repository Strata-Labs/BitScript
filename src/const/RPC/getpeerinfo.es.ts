import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getpeerinfo")!;

export const getpeerinfoEs: RPCFunctionParams = {
  ...English,
  category: "Red",
  summary:
    "Devuelve información detallada sobre cada par conectado.",
  description:
    "Lista los pares conectados con su versión, ping, agente y estadísticas de tráfico.",
  howIsThisUsed:
    "Sirve para supervisar y diagnosticar las conexiones de red, ofreciendo una visión del estado, la actividad de los pares y los posibles problemas de comunicación en la red.",
};
