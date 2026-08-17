import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "generateblock")!;

export const generateblockEs: RPCFunctionParams = {
  ...English,
  category: "Generación",
  summary:
    "Genera un bloque inmediatamente con las transacciones proporcionadas (regtest).",
  description:
    "Crea un bloque que contiene las transacciones especificadas, útil principalmente en regtest.",
  howIsThisUsed:
    "Imagina que construyes una ciudad en miniatura y decides con precisión qué edificios levantar y dónde ponerlos. El comando «generateblock» hace algo parecido, pero en lugar de edificios crea bloques en la blockchain. Te permite crear manualmente un bloque eligiendo qué transacciones incluir y a qué dirección van las recompensas. Es una herramienta que usan sobre todo los desarrolladores en entornos de prueba, donde pueden simular la creación de bloques y la confirmación de transacciones sin afectar la red real de Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La dirección o descriptor que recibe la coinbase.",
    },
    {
      ...English.inputs[1],
      description: "Arreglo de transacciones a incluir.",
    },
  ],
};
