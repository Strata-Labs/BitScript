import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "help")!;

export const helpEs: RPCFunctionParams = {
  ...English,
  category: "Control",
  summary:
    "Muestra la ayuda de un comando RPC.",
  description:
    "Devuelve la documentación de un comando RPC o la lista de todos los comandos.",
  howIsThisUsed:
    "Este comando es útil para explorar los comandos RPC disponibles y comprender sus funcionalidades. Ayuda a descubrir las capacidades de la interfaz RPC y proporciona ayuda para utilizar eficazmente cada comando. Gracias a un texto de ayuda detallado, se aprende a interactuar con Bitcoin Core mediante RPC y a aprovechar sus funcionalidades para diversos fines.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Nombre del comando del que se desea obtener ayuda (opcional).",
    },
  ],
};
