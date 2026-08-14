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
    "Imagina seguir un rastro de migas de pan para orientarte en el bosque, donde cada miga es un paso hacia adelante. En la blockchain de Bitcoin los bloques son esas migas, y el comando «getbestblockhash» te ayuda a identificar la última del rastro: el bloque más reciente que se agregó a la cadena. Ese bloque se considera el «mejor» o «tip» porque es el último verificado por completo y el que acumula más trabajo de cálculo.",
};
