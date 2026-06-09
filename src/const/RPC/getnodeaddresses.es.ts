import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getnodeaddresses")!;

export const getnodeaddressesEs: RPCFunctionParams = {
  ...English,
  category: "Red",
  summary:
    "Devuelve direcciones de nodos conocidas, utilizables para las conexiones.",
  description:
    "Devuelve una muestra de las direcciones conocidas por el gestor de pares.",
  howIsThisUsed:
    "Sirve para descubrir pares dentro de la red Bitcoin, para tareas de conectividad y análisis de la red.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Número de direcciones a devolver.",
    },
  ],
};
