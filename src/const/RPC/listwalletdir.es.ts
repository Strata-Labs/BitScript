import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listwalletdir")!;

export const listwalletdirEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Lista las billeteras disponibles en el directorio de billeteras.",
  description:
    "Devuelve todas las billeteras presentes en `walletdir`, ya estén cargadas o no.",
  howIsThisUsed:
    "El comando listwalletdir sirve para recuperar una lista completa de las billeteras almacenadas en el directorio de billeteras. Esta funcionalidad es esencial para diversas tareas de administración y gestión de billeteras.",
};
