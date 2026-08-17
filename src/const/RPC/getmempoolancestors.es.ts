import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getmempoolancestors")!;

export const getmempoolancestorsEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Lista los ancestros de una transacción en el mempool.",
  description:
    "Devuelve las transacciones ancestras de una transacción presente en el mempool.",
  howIsThisUsed:
    "Imagina investigar a una persona en un árbol genealógico y querer conocer a todos sus antepasados. No buscas a toda la familia, sino únicamente a las personas que forman las generaciones anteriores de las que desciende. De manera similar, una transacción de Bitcoin puede depender de otras transacciones que aún están en el mempool. El comando «getmempoolancestors» muestra todas esas transacciones anteriores de las que depende directa o indirectamente.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El identificador de la transacción.",
    },
    {
      ...English.inputs[1],
      description: "Si es verdadero, devuelve objetos; en caso contrario, solo los txids.",
    },
  ],
};
