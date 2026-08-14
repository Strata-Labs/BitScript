import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblockchaininfo")!;

export const getblockchaininfoEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Devuelve información global sobre el estado de la blockchain.",
  description:
    "Proporciona cadena actual, altura, dificultad, progreso de la sincronización, etc.",
  howIsThisUsed:
    "Imagina a un piloto revisando su tablero antes de despegar. Necesita conocer los indicadores clave —altitud, velocidad, nivel de combustible— para volar seguro. De forma similar, el comando «getblockchaininfo» funciona como tablero de la blockchain y da información crucial sobre su estado actual: altura (cuántos bloques la componen, indicador de su crecimiento), dificultad (qué tan difícil es minar un bloque nuevo) y tamaño en disco (cuánto ocupa la blockchain guardada en el dispositivo).",
};
