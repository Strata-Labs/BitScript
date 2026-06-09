import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getmempoolinfo")!;

export const getmempoolinfoEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Devuelve información general sobre el estado del mempool.",
  description:
    "Proporciona tamaño, tamaño en memoria, tarifa mínima, etc. del mempool.",
  howIsThisUsed:
    "getmempoolinfo es esencial para supervisar y analizar el estado actual del mempool, ayudando a comprender su congestión, a estimar con mayor precisión las comisiones y a medir la actividad y la salud global de la red. Al proporcionar datos sobre el tamaño, los bytes, el uso y las comisiones asociadas al mempool, facilita la toma de decisiones informadas para enviar transacciones y optimizar.",
};
