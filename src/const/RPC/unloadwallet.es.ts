import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "unloadwallet")!;

export const unloadwalletEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Descarga una billetera actualmente cargada.",
  description:
    "Cierra una billetera para liberar sus recursos.",
  howIsThisUsed:
    "Este comando se utiliza para descargar de forma segura una billetera del nodo Bitcoin Core, liberando recursos del sistema. Resulta útil para gestionar varias billeteras o durante tareas de mantenimiento. El parámetro opcional «load_on_startup» permite configurar si la billetera debe cargarse automáticamente al inicio, ofreciendo flexibilidad.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El nombre de la billetera a descargar.",
    },
    {
      ...English.inputs[1],
      description: "No volver a cargarla en el próximo inicio.",
    },
  ],
};
