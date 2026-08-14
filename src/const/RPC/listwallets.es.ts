import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listwallets")!;

export const listwalletsEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Lista las billeteras actualmente cargadas por el nodo.",
  description:
    "Devuelve los nombres de las billeteras abiertas en la instancia de bitcoind.",
  howIsThisUsed:
    "El comando listwallets proporciona la lista de billeteras actualmente cargadas en el nodo Bitcoin, permitiendo verificar las billeteras cargadas, supervisar su actividad, integrarse con herramientas de gestión y ayudar en el debugging al identificar posibles conflictos o inconsistencias durante la carga.",
};
