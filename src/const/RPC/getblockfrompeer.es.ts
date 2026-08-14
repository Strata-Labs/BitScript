import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblockfrompeer")!;

export const getblockfrompeerEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Solicita a un par específico que envíe un bloque.",
  description:
    "Fuerza la recuperación de un bloque desde un par determinado, útil para depuración.",
  howIsThisUsed:
    "Imagina que estás juntando las piezas de un mapa antiguo y te falta un fragmento clave que uno de tus contactos ya encontró. Le pides justo ese trozo para completar tu colección. De forma similar, si operas un nodo al que le falta un bloque concreto —o si sospechas que tu versión está mal—, puedes usar «getblockfrompeer» para pedirle ese bloque directamente a un par conectado, indicando su hash.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El hash del bloque a solicitar.",
    },
    {
      ...English.inputs[1],
      description: "El identificador del par a consultar.",
    },
  ],
};
