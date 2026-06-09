import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "dumpprivkey")!;

export const dumpprivkeyEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Revela la clave privada correspondiente a una dirección de Bitcoin dada.",
  description:
    "Devuelve la clave privada de una dirección de la cartera en formato WIF.",
  howIsThisUsed:
    "Imagine su cartera de Bitcoin como una caja fuerte avanzada que protege su dinero digital. Cada caja está asegurada por una llave única que le da acceso a sus fondos. El comando «dumpprivkey» equivale a obtener un duplicado de esa llave para una sección concreta de la caja (una dirección de Bitcoin determinada). Revela la llave exacta necesaria para desbloquear y transferir los fondos desde esa dirección. Resulta valioso para migrar sus bitcoins a otra aplicación de cartera, garantizar el acceso a sus fondos o recuperarlos en caso de mal funcionamiento.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La dirección de Bitcoin de la que se desea obtener la clave privada.",
    },
  ],
};
