import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "unloadwallet")!;

export const unloadwalletEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Descarga una cartera actualmente cargada.",
  description:
    "Cierra una cartera para liberar sus recursos.",
  howIsThisUsed:
    "Este comando se utiliza para descargar de forma segura una cartera del nodo Bitcoin Core, liberando recursos del sistema. Resulta útil para gestionar varias carteras o durante tareas de mantenimiento. El parámetro opcional « load_on_startup » permite configurar si la cartera debe cargarse automáticamente al inicio, ofreciendo flexibilidad.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El nombre de la cartera a descargar.",
    },
    {
      ...English.inputs[1],
      description: "No volver a cargarla en el próximo inicio.",
    },
  ],
};
