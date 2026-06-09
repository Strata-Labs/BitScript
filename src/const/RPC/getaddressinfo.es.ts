import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getaddressinfo")!;

export const getaddressinfoEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Devuelve información detallada sobre una dirección Bitcoin de la cartera.",
  description:
    "Recupera los metadatos de una dirección que pertenece a la cartera (clave pública, etiqueta, tipo, etc.).",
  howIsThisUsed:
    "Imagine realizar una comprobación exhaustiva de un automóvil que considera comprar: historial, estado actual, cualquier detalle relevante antes de decidir. De forma similar, en la red Bitcoin, ante una dirección concreta, a menudo desea saber más — su validez, su posible vinculación con su cartera y cualquier otro elemento que pueda influir en su interacción. El comando « getaddressinfo » responde a esa necesidad ofreciendo una visión general de una dirección Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La dirección Bitcoin a inspeccionar.",
    },
  ],
};
