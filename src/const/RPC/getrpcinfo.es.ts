import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getrpcinfo")!;

export const getrpcinfoEs: RPCFunctionParams = {
  ...English,
  category: "Control",
  summary:
    "Devuelve información sobre el estado del servidor RPC.",
  description:
    "Lista los comandos RPC en curso y la ubicación del log.",
  howIsThisUsed:
    "Sirve para evaluar el rendimiento y el estado de las llamadas RPC procesadas por el nodo, lo que ayuda a la optimización y al diagnóstico del funcionamiento del servidor.",
};
