import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "importdescriptors")!;

export const importdescriptorsEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Importa descriptores (output descriptors) en la cartera.",
  description:
    "Añade descriptores a la cartera para realizar el seguimiento de los fondos asociados.",
  howIsThisUsed:
    "Este comando es esencial para sincronizar la cartera con descriptores externos, lo que permite supervisar direcciones o scripts generados fuera del entorno de la cartera. Facilita el seguimiento de los fondos asociados y mantiene actualizado el historial de la cartera. Al especificar timestamps y otros parámetros, usted controla el alcance y el comportamiento del rescaneo de la blockchain, optimizando el proceso según sus necesidades. Resulta especialmente útil para integrar una cartera de Bitcoin con sistemas externos, aplicaciones o carteras de hardware.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Arreglo JSON de los descriptores a importar.",
    },
  ],
};
