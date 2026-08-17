import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "gettxoutsetinfo")!;

export const gettxoutsetinfoEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Devuelve estadísticas sobre el conjunto de UTXOs.",
  description:
    "Calcula información sobre la base de datos de UTXOs en un instante dado.",
  howIsThisUsed:
    "Este comando es crucial para desarrolladores y analistas que necesitan comprender el estado actual del UTXO set, ya sea para el análisis de rendimiento, la optimización de la blockchain o la investigación económica. Al proporcionar una instantánea de las salidas no gastadas, ayuda a evaluar la distribución y la disponibilidad de los fondos en la red. La capacidad de generar hashes del UTXO set también ayuda a verificar la integridad del conjunto entre distintos nodos.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Tipo de hash a utilizar.",
    },
    {
      ...English.inputs[1],
      description: "Hash o altura objetivo (opcional).",
    },
    {
      ...English.inputs[2],
      description: "Utilizar el índice si está disponible.",
    },
  ],
};
