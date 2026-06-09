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
    "Imagine a un analista deportivo que intenta comprender el rendimiento de un equipo de baloncesto durante un partido concreto. Estudiaría diversas estadísticas: puntos anotados, rebotes, asistencias, etc. De manera similar, el comando «getblockstats» permite a analistas de blockchain, desarrolladores e investigadores adentrarse en los detalles de un bloque de Bitcoin: comisiones promedio, tamaño de las transacciones, tamaño total del bloque y otros indicadores clave. Resulta valioso para comprender cómo se utiliza la blockchain en un momento dado, identificar tendencias y tomar decisiones informadas sobre operaciones y optimizaciones.",
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
