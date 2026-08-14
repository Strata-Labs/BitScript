import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "scantxoutset")!;

export const scantxoutsetEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Escanea el conjunto de UTXO en busca de descriptores dados.",
  description:
    "Busca en el UTXO set las salidas que coinciden con los descriptores proporcionados.",
  howIsThisUsed:
    "El comando scantxoutset es utilizado principalmente por software de billetera, exploradores y otras herramientas de análisis de blockchain para identificar salidas de transacciones que coinciden con criterios predefinidos. Permite consultar la blockchain en busca de salidas asociadas a ciertas direcciones, scripts o claves públicas sin necesidad de mantener un índice completo. Es especialmente útil para billeteras que soportan la derivación HD, permitiéndoles descubrir y supervisar eficientemente los fondos asociados a xpubs. Los desarrolladores también pueden utilizarlo para construir aplicaciones que requieren consultar y analizar datos UTXO.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Acción: «start», «abort» o «status».",
    },
    {
      ...English.inputs[1],
      description: "Arreglo de descriptores a escanear.",
    },
  ],
};
