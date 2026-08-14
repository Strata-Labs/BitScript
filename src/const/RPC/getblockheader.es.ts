import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblockheader")!;

export const getblockheaderEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Devuelve la cabecera de un bloque a partir de su hash.",
  description:
    "Recupera únicamente la cabecera del bloque (sin las transacciones).",
  howIsThisUsed:
    "Imagina estudiar la historia de una muralla antigua y querer entender en qué orden se construyó y cómo está cada tramo, sin tener que revisar ladrillo por ladrillo. El comando «getblockheader» ofrece algo parecido para la blockchain. A partir del hash de un bloque obtienes los metadatos esenciales —su posición en la cadena (altura), cuándo se minó y sus enlaces con los bloques vecinos (anterior y siguiente)— sin necesidad de descargar e inspeccionar todo su contenido, incluidas las transacciones.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El hash del bloque.",
    },
    {
      ...English.inputs[1],
      description: "Si es verdadero, devuelve un objeto; en caso contrario, hex crudo.",
    },
  ],
};
