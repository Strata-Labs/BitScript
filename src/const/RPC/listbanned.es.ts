import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listbanned")!;

export const listbannedEs: RPCFunctionParams = {
  ...English,
  category: "Red",
  summary:
    "Devuelve la lista de pares actualmente baneados.",
  description:
    "Lista las direcciones o subredes que están baneados en este nodo.",
  howIsThisUsed:
    "Este comando sirve para revisar la lista de direcciones IP o subredes que han sido baneados manualmente del acceso al nodo. Proporciona información esencial sobre cada baneo, lo que permite a los administradores de la red gestionar de forma eficaz las restricciones de acceso.",
};
