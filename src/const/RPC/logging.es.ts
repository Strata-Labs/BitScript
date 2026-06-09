import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "logging")!;

export const loggingEs: RPCFunctionParams = {
  ...English,
  category: "Control",
  summary:
    "Activa o desactiva las logging categories.",
  description:
    "Configura dinámicamente qué logging categories se emiten.",
  howIsThisUsed:
    "El RPC logging sirve para gestionar la configuración de registros en Bitcoin Core. Permite controlar qué categorías de eventos se registran con fines de debugging. Al especificar las categorías a incluir o excluir, se ajusta la salida de los registros para enfocarse en ciertas áreas o reducir la verbosidad. Es especialmente útil para diagnosticar problemas, supervisar componentes específicos u optimizar el rendimiento. La posibilidad de ajustar dinámicamente la configuración de registros ofrece flexibilidad para el debugging y el diagnóstico de los nodos Bitcoin Core.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Categorías a activar.",
    },
    {
      ...English.inputs[1],
      description: "Categorías a desactivar.",
    },
  ],
};
