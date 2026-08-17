import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "decodepsbt")!;

export const decodepsbtEs: RPCFunctionParams = {
  ...English,
  category: "Transacciones sin procesar",
  summary:
    "Decodifica un PSBT a un objeto legible.",
  description:
    "Muestra el contenido de un PSBT (entradas, salidas, firmas parciales).",
  howIsThisUsed:
    "Piensa en un PSBT como una caja misteriosa que contiene todas las piezas necesarias para una transacción, sin saber con exactitud qué hay dentro ni si falta algo. El comando «decodepsbt» equivale a tener rayos X para ver el interior de la caja sin abrirla. Te muestra todo sobre la transacción de forma clara: quién debe firmar, cuántos bitcoins salen, a dónde van y si todavía faltan piezas antes de que la transacción se pueda cerrar y enviar a la red.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El PSBT en base64 a decodificar.",
    },
  ],
};
