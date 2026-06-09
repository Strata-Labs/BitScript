import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listwalletdir")!;

export const listwalletdirEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Lista las carteras disponibles en el directorio de carteras.",
  description:
    "Devuelve todas las carteras presentes en `walletdir`, ya estén cargadas o no.",
  howIsThisUsed:
    "El comando listwalletdir sirve para recuperar una lista completa de las carteras almacenadas en el directorio de carteras. Esta funcionalidad es esencial para diversas tareas de administración y gestión de carteras.",
};
