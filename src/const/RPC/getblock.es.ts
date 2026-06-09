import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblock")!;

export const getblockEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Devuelve la información de un bloque a partir de su hash.",
  description:
    "Recupera un bloque por su hash, con distintos niveles de verbosidad.",
  howIsThisUsed:
    "Imagine un detective que investiga un suceso concreto ocurrido un día dado, y que necesita reunir todos los detalles de esa jornada — del clima a las personas implicadas. En la blockchain Bitcoin, el comando « getblock » funciona de la misma manera permitiéndole investigar un bloque concreto a partir de su hash.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El hash del bloque.",
    },
    {
      ...English.inputs[1],
      description: "Nivel de verbosidad (0 = hex, 1 = objeto, 2 = con transacciones completas).",
    },
  ],
};
