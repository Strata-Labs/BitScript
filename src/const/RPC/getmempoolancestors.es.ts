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
    "Imagine ensamblar un rompecabezas complejo que requiere unir primero varios grupos de piezas antes de poder conectarlas en la imagen final. De manera análoga, en la red Bitcoin, una transacción puede depender de otras transacciones que deben confirmarse antes de ser procesada. El comando «getmempoolancestors» equivale a obtener la lista de todos los pequeños grupos de piezas (transacciones ancestras) que hay que ensamblar primero para comprender la imagen global (la cadena de transacciones).",
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
