import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "importdescriptors")!;

export const importdescriptorsEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Importa descriptores (output descriptors) en la billetera.",
  description:
    "Añade descriptores a la billetera para realizar el seguimiento de los fondos asociados.",
  howIsThisUsed:
    "Este comando es esencial para sincronizar la billetera con descriptores externos, lo que permite supervisar direcciones o scripts generados fuera del entorno de la billetera. Facilita el seguimiento de los fondos asociados y mantiene actualizado el historial de la billetera. Al especificar timestamps y otros parámetros, controlas el alcance y el comportamiento del rescaneo de la blockchain, y optimizas el proceso según tus necesidades. Resulta especialmente útil para integrar una billetera de Bitcoin con sistemas externos, aplicaciones o billeteras de hardware.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Arreglo JSON de los descriptores a importar.",
    },
  ],
};
