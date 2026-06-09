import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getnetworkhashps")!;

export const getnetworkhashpsEs: RPCFunctionParams = {
  ...English,
  category: "Mining",
  summary:
    "Devuelve una estimación del hashrate de la red (en hashes por segundo).",
  description:
    "Estima la potencia de cálculo total de la red en una ventana de bloques.",
  howIsThisUsed:
    "Se utiliza para evaluar la potencia y la seguridad globales de la red Bitcoin entendiendo el esfuerzo de hashing acumulado aportado por los mineros.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Número de bloques a incluir (-1 = desde el último ajuste).",
    },
    {
      ...English.inputs[1],
      description: "Altura de referencia (-1 = chain tip).",
    },
  ],
};
