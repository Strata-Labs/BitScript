import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblockhash")!;

export const getblockhashEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Devuelve el hash del bloque a la altura indicada.",
  description:
    "Devuelve el hash del bloque correspondiente a un número de bloque.",
  howIsThisUsed:
    "Imagina que estás en una biblioteca donde los libros están ordenados en una secuencia precisa. Buscas un libro en una posición determinada del estante, pero solo tienes su número de ubicación, no su título. El comando «getblockhash» funciona igual: al darle la altura de un bloque (su posición en el estante), te devuelve el hash del bloque (el equivalente a su título único), con lo que puedes identificarlo y luego acceder a su información detallada.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La altura del bloque.",
    },
  ],
};
