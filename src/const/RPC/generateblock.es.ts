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
    "Imagine que construye una ciudad en miniatura donde decide con precisión qué edificios construir y dónde ubicarlos. El comando « generateblock » de Bitcoin es algo similar, pero en lugar de edificios, crea bloques en la blockchain. Permite crear manualmente un bloque decidiendo qué transacciones incluir y dirigiendo las recompensas del bloque a una dirección dada. Es una herramienta utilizada principalmente por los desarrolladores en entornos de prueba, donde pueden simular la creación de bloques y la confirmación de transacciones sin afectar a la red Bitcoin real.",
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
