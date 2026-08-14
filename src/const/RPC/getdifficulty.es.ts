import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getdifficulty")!;

export const getdifficultyEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Devuelve la dificultad actual del proof-of-work.",
  description:
    "Devuelve un múltiplo de la dificultad mínima en coma flotante.",
  howIsThisUsed:
    "Imagina a un alpinista que, antes de subir una montaña, quiere saber qué tan difícil será en comparación con las que ya ha escalado. El comando «getdifficulty» de la red Bitcoin ofrece información similar, pero para los mineros. Indica qué tan difícil es encontrar un nuevo bloque en ese instante, en comparación con el escenario más sencillo posible. Esta dificultad se ajusta automáticamente con el paso del tiempo, en función de la potencia de cálculo total de los mineros, para que se encuentre un bloque aproximadamente cada 10 minutos.",
};
