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
    "Imagine estudiar la historia de una larga muralla antigua y querer comprender la secuencia de su construcción y el estado actual de cada segmento sin inspeccionar cada ladrillo. El comando «getblockheader» de Bitcoin ofrece un enfoque análogo para la blockchain. A partir del hash de un bloque, se obtienen los metadatos esenciales —su posición en la cadena (altura), el momento de su minado, sus enlaces con los bloques vecinos (anterior y siguiente)— sin necesidad de descargar e inspeccionar todo su contenido, incluidas las transacciones.",
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
