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
    "Imagine que se encuentra en una biblioteca donde los libros están ordenados en una secuencia precisa. Busca un libro en una posición determinada de la estantería, pero solo dispone de su número de ubicación, no de su título. El comando «getblockhash» funciona de manera análoga: al proporcionarle la altura de un bloque (su posición en la estantería), devuelve el hash del bloque (el equivalente a su título único), lo que le permite identificarlo y, posteriormente, acceder a su información detallada.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La altura del bloque.",
    },
  ],
};
