import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listaddressgroupings")!;

export const listaddressgroupingsEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Devuelve agrupaciones de direcciones que han recibido fondos juntas.",
  description:
    "Lista las heurísticas de agrupación de direcciones utilizadas por la cartera.",
  howIsThisUsed:
    "Sirve para obtener información sobre agrupaciones de direcciones vinculadas entre sí por su uso conjunto en transacciones. Resulta útil para analizar la titularidad de las direcciones y el historial de transacciones.",
};
