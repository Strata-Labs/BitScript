import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getbestblockhash")!;

export const getbestblockhashEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Devuelve el hash del último bloque (tip) de la cadena más larga.",
  description:
    "Devuelve el block hash de la punta actual de la blockchain.",
  howIsThisUsed:
    "Imagine seguir un rastro de migas de pan para orientarse en el bosque, donde cada miga representa un paso hacia adelante. En la blockchain Bitcoin, los bloques son esas migas, y el comando « getbestblockhash » ayuda a identificar la última del rastro — el bloque más reciente añadido a la blockchain. Este bloque se considera el « mejor » o « tip » porque es el último plenamente verificado y el que acumula mayor trabajo de cálculo.",
};
