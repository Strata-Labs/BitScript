import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listwallets")!;

export const listwalletsEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Lista las carteras actualmente cargadas por el nodo.",
  description:
    "Devuelve los nombres de las carteras abiertas en la instancia de bitcoind.",
  howIsThisUsed:
    "El comando listwallets proporciona la lista de carteras actualmente cargadas en el nodo Bitcoin, permitiendo verificar las carteras cargadas, supervisar su actividad, integrarse con herramientas de gestión y ayudar en el debugging al identificar posibles conflictos o inconsistencias durante la carga.",
};
