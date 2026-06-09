import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "signrawtransactionwithkey")!;

export const signrawtransactionwithkeyEs: RPCFunctionParams = {
  ...English,
  category: "Transacciones crudas",
  summary:
    "Firma una transacción cruda con un conjunto de claves privadas proporcionado.",
  description:
    "Firma la transacción utilizando las claves privadas pasadas como argumento (sin emplear la cartera).",
  howIsThisUsed:
    "Sirve para firmar las entradas de una transacción cruda antes de su difusión en la red. Permite un control preciso del proceso de firma especificando las claves privadas exactas a utilizar. Admite además proporcionar los prevouts dependientes, lo que resulta útil para construir transacciones complejas.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La transacción cruda en hex.",
    },
    {
      ...English.inputs[1],
      description: "Arreglo de claves privadas (en WIF).",
    },
    {
      ...English.inputs[2],
      description: "Arreglo JSON de prevouts (opcional).",
    },
    {
      ...English.inputs[3],
      description: "Tipo de sighash a utilizar.",
    },
  ],
};
