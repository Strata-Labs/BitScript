import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "savemempool")!;

export const savemempoolEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Guarda inmediatamente el mempool en el disco.",
  description:
    "Fuerza la serialización del mempool actual en `mempool.dat`.",
  howIsThisUsed:
    "El comando savemempool es utilizado generalmente por operadores de nodos y desarrolladores para asegurarse de que las transacciones no confirmadas presentes en el mempool no se pierdan durante las paradas. Al guardar el mempool en disco, se preservan las transacciones pendientes y se evita que sean expulsadas al detener el nodo. Es especialmente importante para los mineros que se apoyan en el mempool para incluir transacciones en los bloques minados. Los desarrolladores también pueden utilizarlo para estrategias personalizadas de gestión del mempool o análisis de transacciones pendientes.",
};
