import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "uptime")!;

export const uptimeEs: RPCFunctionParams = {
  ...English,
  category: "Control",
  summary:
    "Devuelve el tiempo transcurrido (en segundos) desde el inicio del nodo.",
  description:
    "Indica desde hace cuánto tiempo está en funcionamiento el nodo.",
  howIsThisUsed:
    "El comando uptime se utiliza para supervisar la duración del funcionamiento ininterrumpido del servidor Bitcoin Core. Resulta práctico para hacer seguimiento de la estabilidad del sistema y diagnosticar posibles problemas de disponibilidad.",
};
