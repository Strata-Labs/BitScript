import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getmininginfo")!;

export const getmininginfoEs: RPCFunctionParams = {
  ...English,
  category: "Mining",
  summary:
    "Devuelve un objeto con la información de minería.",
  description:
    "Proporciona el estado actual del mining (dificultad, hashrate de la red, tamaño del bloque en curso, etc.).",
  howIsThisUsed:
    "Se utiliza para recopilar información completa sobre las actividades de mining del nodo y el estado del mining en la red — útil para mineros y analistas que hacen seguimiento de la salud y la competitividad del entorno de mining.",
};
