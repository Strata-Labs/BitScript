import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getchaintxstats")!;

export const getchaintxstatsEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Devuelve estadísticas sobre el rendimiento de transacciones de la cadena.",
  description:
    "Calcula el número promedio de transacciones por segundo en una ventana determinada.",
  howIsThisUsed:
    "Imagine a un demógrafo que estudia el crecimiento de una ciudad analizando tasas de natalidad, patrones de migración y otras estadísticas para comprender tendencias y anticipar el futuro. De manera similar, «getchaintxstats» permite a analistas de blockchain, desarrolladores y entusiastas estudiar la «demografía» de la blockchain de Bitcoin examinando estadísticas de transacciones. Al especificar un número de bloques o una ventana temporal, se obtienen indicadores clave: número total de transacciones, ritmo al que se producen, etc. Este análisis ayuda a comprender la actividad, la eficiencia y las tendencias de crecimiento de la blockchain.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Número de bloques a incluir (ventana).",
    },
    {
      ...English.inputs[1],
      description: "Hash del bloque final de la ventana.",
    },
  ],
};
