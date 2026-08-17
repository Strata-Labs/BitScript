import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblockstats")!;

export const getblockstatsEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Devuelve estadísticas agregadas sobre un bloque.",
  description:
    "Calcula estadísticas detalladas sobre un bloque (comisiones, tamaño, sigops, etc.).",
  howIsThisUsed:
    "Imagina a un analista deportivo que quiere entender cómo le fue a un equipo de baloncesto en un partido concreto. Revisaría distintas estadísticas: puntos anotados, rebotes, asistencias. De forma similar, el comando «getblockstats» permite a analistas, desarrolladores e investigadores meterse en los detalles de un bloque de Bitcoin: comisiones promedio, tamaño de las transacciones, tamaño total del bloque y otros indicadores clave. Es valioso para entender cómo se usa la blockchain en un momento dado, identificar tendencias y tomar decisiones informadas sobre operaciones y optimizaciones.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El hash o la altura del bloque.",
    },
    {
      ...English.inputs[1],
      description: "Arreglo opcional de campos de estadísticas a devolver.",
    },
  ],
};
