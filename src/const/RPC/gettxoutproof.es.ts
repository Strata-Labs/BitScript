import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "gettxoutproof")!;

export const gettxoutproofEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Devuelve una prueba criptográfica de inclusión de una transacción.",
  description:
    "Produce una prueba de que uno o varios txids están incluidos en un bloque.",
  howIsThisUsed:
    "Este comando se utiliza principalmente con clientes ligeros o SPV (Simplified Payment Verification) que no descargan toda la blockchain pero necesitan probar la inclusión de una transacción en un bloque. Al obtener una prueba de Merkle, estos clientes pueden verificar transacciones sin necesitar el bloque completo, lo que permite un uso más eficiente del almacenamiento y del ancho de banda manteniendo las garantías de seguridad sobre la inclusión.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Arreglo de txids a probar.",
    },
    {
      ...English.inputs[1],
      description: "Hash del bloque a utilizar para la prueba (opcional).",
    },
  ],
};
