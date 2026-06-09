import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "stop")!;

export const stopEs: RPCFunctionParams = {
  ...English,
  category: "Control",
  summary:
    "Detiene de forma ordenada el nodo Bitcoin.",
  description:
    "Solicita al nodo que se detenga guardando el estado.",
  howIsThisUsed:
    "El comando stop sirve para finalizar de forma ordenada el servidor Bitcoin Core, garantizando el cierre adecuado de los procesos en curso y la integridad de los datos. Es esencial para mantener la estabilidad y la fiabilidad del entorno del servidor.",
};
