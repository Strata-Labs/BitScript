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
    "Imagine que está reuniendo las piezas de un mapa antiguo; le falta un fragmento crucial que uno de sus contactos ha encontrado. Le pide precisamente ese trozo para completar su colección. De forma similar, en la blockchain Bitcoin, si opera un nodo al que le falta un bloque concreto — o si sospecha que su versión es incorrecta —, puede utilizar « getblockfrompeer » para solicitar ese bloque directamente a un par conectado indicando su hash.",
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
