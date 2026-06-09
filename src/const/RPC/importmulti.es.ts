import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "importmulti")!;

export const importmultiEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Importa por lotes direcciones, claves o scripts en la cartera.",
  description:
    "Permite importar varias direcciones, claves o scripts en una sola solicitud.",
  howIsThisUsed:
    "Este comando es crucial para gestionar la cartera de direcciones y scripts, ya que permite supervisar e interactuar con varias entidades externas de forma simultánea. Simplifica la importación de direcciones o scripts con sus claves o descriptores asociados, garantizando que la cartera permanezca sincronizada. Mediante opciones como el rescaneo, usted controla si se realiza un análisis de la blockchain y optimiza el proceso según sus necesidades. Resulta especialmente útil para integrar la cartera con sistemas, aplicaciones o carteras de hardware externos.",
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
