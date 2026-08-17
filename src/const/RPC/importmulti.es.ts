import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "importmulti")!;

export const importmultiEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Importa por lotes direcciones, claves o scripts en la billetera.",
  description:
    "Permite importar varias direcciones, claves o scripts en una sola solicitud.",
  howIsThisUsed:
    "Este comando es crucial para gestionar la billetera de direcciones y scripts, ya que permite supervisar e interactuar con varias entidades externas de forma simultánea. Simplifica la importación de direcciones o scripts con sus claves o descriptores asociados, garantizando que la billetera permanezca sincronizada. Mediante opciones como el rescaneo, controlas si se hace un análisis de la blockchain y optimizas el proceso según tus necesidades. Resulta especialmente útil para integrar la billetera con sistemas, aplicaciones o billeteras de hardware externos.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Arreglo JSON de las entradas a importar (direcciones, scripts, claves).",
    },
    {
      ...English.inputs[1],
      description: "Opciones de importación (rescan, etc.).",
    },
  ],
};
