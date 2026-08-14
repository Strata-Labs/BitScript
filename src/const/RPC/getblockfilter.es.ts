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
    "Imagina que vas a una feria del libro enorme buscando las obras de tu autor favorito, y no quieres revisar cada libro expuesto. Un guía en la entrada te da una tarjeta que solo señala los stands donde puedes encontrarlo. De forma similar, el comando «getblockfilter» entrega un «mapa» (o filtro) de un bloque concreto, que permite a los clientes ligeros (billeteras que no guardan toda la blockchain) saber rápido si ese bloque contiene transacciones que les interesan, sin tener que descargar y revisar todos sus datos.",
};
