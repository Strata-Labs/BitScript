import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "dumpprivkey")!;

export const dumpprivkeyEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Revela la clave privada correspondiente a una dirección de Bitcoin dada.",
  description:
    "Devuelve la clave privada de una dirección de la billetera en formato WIF.",
  howIsThisUsed:
    "Piensa en tu billetera de Bitcoin como una caja fuerte que protege tu dinero digital. Cada caja está asegurada por una llave única que te da acceso a tus fondos. El comando «dumpprivkey» equivale a sacar un duplicado de esa llave para una sección concreta de la caja (una dirección de Bitcoin determinada). Revela la llave exacta que hace falta para desbloquear y transferir los fondos desde esa dirección. Es valioso para migrar tus bitcoins a otra aplicación de billetera, asegurar el acceso a tus fondos o recuperarlos si algo falla.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La dirección de Bitcoin de la que se desea obtener la clave privada.",
    },
  ],
};
