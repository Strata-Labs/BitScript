import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblockfilter")!;

export const getblockfilterEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Devuelve el filtro BIP157 de un bloque.",
  description:
    "Recupera el filtro de bloque compacto para clientes ligeros.",
  howIsThisUsed:
    "Imagine que acude a una gran feria del libro en busca de las obras de su autor favorito, sin querer revisar cada libro expuesto. Un guía en la entrada le entrega una tarjeta especial que solo señala los stands donde se pueden encontrar sus autores. De forma similar, en la red Bitcoin, el comando « getblockfilter » proporciona un « mapa » (o filtro) para un bloque concreto, permitiendo a los clientes ligeros (carteras que no almacenan toda la blockchain) determinar rápidamente si el bloque contiene transacciones relevantes, sin tener que descargar y revisar todos los datos del bloque.",
};
