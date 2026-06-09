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
    "Imagine a un alpinista a punto de ascender una montaña que desea saber cuán difícil será la ascensión en comparación con las montañas ya escaladas. El comando «getdifficulty» de la red Bitcoin ofrece información similar pero para los mineros. Indica cuán difícil resulta encontrar un nuevo bloque en ese instante, en comparación con el escenario más sencillo posible. Esta dificultad se ajusta automáticamente con el paso del tiempo, en función de la potencia de cálculo total de los mineros, para que se encuentre un bloque aproximadamente cada 10 minutos.",
};
