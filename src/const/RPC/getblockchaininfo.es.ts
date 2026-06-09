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
    "Imagine un piloto revisando su panel de instrumentos antes del despegue. Necesita conocer indicadores clave — altitud, velocidad, nivel de combustible — para garantizar un vuelo seguro. De forma similar, en el mundo Bitcoin, el comando « getblockchaininfo » sirve como panel de control para la blockchain, proporcionando información crucial sobre su estado actual. Este comando ofrece una instantánea de la salud y el estado de la blockchain: altura (cuántos bloques componen la blockchain, indicador de su crecimiento), dificultad (cuán arduo es minar un nuevo bloque), tamaño en disco (tamaño total de la blockchain almacenada en el dispositivo).",
};
