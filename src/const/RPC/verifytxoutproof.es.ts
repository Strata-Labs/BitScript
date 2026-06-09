import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "verifytxoutproof")!;

export const verifytxoutproofEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Verifica una prueba de inclusión de transacción.",
  description:
    "Valida una prueba generada por `gettxoutproof` y devuelve los txids verificados.",
  howIsThisUsed:
    "El comando verifytxoutproof se utiliza para verificar la integridad de una transacción confirmando su inclusión en un bloque. Resulta crucial para asegurar que las transacciones se procesan y registran correctamente en la blockchain. Al validar las pruebas de transacción, se puede verificar su autenticidad sin depender únicamente de autoridades centralizadas.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La prueba hex a verificar.",
    },
  ],
};
