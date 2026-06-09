import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "setnetworkactive")!;

export const setnetworkactiveEs: RPCFunctionParams = {
  ...English,
  category: "Red",
  summary:
    "Activa o desactiva por completo la actividad de red del nodo.",
  description:
    "Permite cortar todas las conexiones entrantes y salientes, o restablecerlas.",
  howIsThisUsed:
    "Este comando se utiliza para controlar la actividad de la red P2P del cliente Bitcoin. Al pasar un valor booleano (true/false), se activa o desactiva toda la actividad de red. Resulta práctico cuando se necesita interrumpir temporalmente las comunicaciones de red, por ejemplo durante tareas de mantenimiento o diagnóstico. Devuelve un valor booleano que indica si la actividad se ha activado o desactivado correctamente.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Verdadero para activar la red, falso para desactivarla.",
    },
  ],
};
